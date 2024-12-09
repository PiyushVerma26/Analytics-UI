import { useContext, useEffect, useState } from "react";
import BarChartComponent from "../../components/Charts/BarChartComponent";
import LineChartComponent from "../../components/Charts/LineChartComponent";
import Card from "./components/card";
import { IoMdLogOut as Logout } from "react-icons/io";
import api from "../../utils/api.js";
import DropDown from "./components/Dropdown/index.jsx";
import DateRangePickerComponents from "./components/DateRange/index.jsx";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth.context.js";

function Dashboard() {
  const [barData, setBarData] = useState(null);
  const [data, setData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [featureCount, setFeatureCount] = useState(0);
  const [trending, setTrending] = useState(null);
  const [feature, setFeatureData] = useState("All");
  const [queryData, setQueryData] = useState({
    ageGroup: "",
    startDate: "",
    endDate: "",
    gender: "",
  });

  const { handleLogout } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogoutClick = async () => {
    try {
      const isLogin = await handleLogout();
      if (!isLogin) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (name, value) => {
    setQueryData({
      ...queryData,
      [name]: value,
    });
  };

  const handleBarClick = (feature) => {
    setFeatureData(feature);
  };

  const handleDateSelect = (startDate, endDate) => {
    setQueryData({ ...queryData, startDate: startDate, endDate: endDate });
  };
  async function getData() {
    try {
      const queryString = buildQueryString(queryData);

      const { data, status } = await api.get(`/getData?${queryString}`);
      if (status !== 200) throw new Error("Something went Wrong");

      setData(data.data);
      setLineChartData(data.data);
    } catch (err) {
      console.log(err.response?.data.message);
    }
  }

  const buildQueryString = (queryData) => {
    const queryParams = [];

    for (let key in queryData) {
      if (queryData[key]) {
        queryParams.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(queryData[key])}`
        );
      }
    }

    return queryParams.join("&");
  };

  useEffect(() => {
    getData();
  }, [queryData]);

  useEffect(() => {
    const tempArray = [];
    if (data) {
      const featureSums = {};

      data.forEach((item) => {
        const { feature, timeSpent } = item;

        if (featureSums[feature]) {
          featureSums[feature] += timeSpent;
        } else {
          featureSums[feature] = timeSpent;
        }
      });

      for (const feature in featureSums) {
        tempArray.push({ feature, timeSpent: featureSums[feature] });
      }
      let max = {
        feature: "A",
        timeSpent: 0,
      };

      tempArray.forEach((item) => {
        if (item.timeSpent > max.timeSpent) {
          max.timeSpent = item.timeSpent;
          max.feature = item.feature;
        }
      });

      setTrending(max);
      setFeatureCount(tempArray.length);
      setBarData(tempArray);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const lineData = data.filter((item) => {
        return item.feature === feature;
      });
      setLineChartData(lineData);
    }
  }, [feature]);

  return (
    <div className="w-full p-4 min-h-screen h-full bg-slate-200 ">
      <div className="max-w-[1300px] mx-auto py-5 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row w-full justify-between">
          <h1 className="text-2xl text-gray-700">Dashboard</h1>
          <div className="text-xl flex items-center">
            <span className="font-light text-black flex items-center gap-2">
              Piyush Verma <Logout onClick={handleLogoutClick} />
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
          <Card title={"Total Features"} value={featureCount} />
          <Card title={"Trending Features"} value={trending?.feature} />
          <Card title={"Maximum Time"} value={trending?.timeSpent} />
          <Card title={"Selected Features"} value={feature} />
        </div>
        <div className="w-full max-w-max bg-slate-300 p-3 rounded-lg flex flex-wrap gap-5 items-center ">
          <DropDown
            optionList={["Male", "Female"]}
            name={"gender"}
            handleChange={handleFilterChange}
          />
          <DropDown
            optionList={["25", "15-25"]}
            name={"ageGroup"}
            handleChange={handleFilterChange}
          />
          <DateRangePickerComponents handleDateSelect={handleDateSelect} />
        </div>

        <h2 className="mt-12 text-3xl">Time Analysis of Features</h2>

        <div className="w-full flex md:flex-row flex-col items-center mt-4 gap-5 ">
          <BarChartComponent data={barData || []} onBarClick={handleBarClick} />
          <LineChartComponent data={lineChartData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
