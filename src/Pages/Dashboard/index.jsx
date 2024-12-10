import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BarChartComponent from "../../components/Charts/BarChartComponent";
import LineChartComponent from "../../components/Charts/LineChartComponent";
import Card from "./components/card";
import { IoMdLogOut as Logout } from "react-icons/io";
import api from "../../utils/api.js";
import DropDown from "./components/Dropdown/index.jsx";
import DateRangePickerComponents from "./components/DateRange/index.jsx";
import AuthContext from "../../context/auth.context.js";

function Dashboard() {
  const [name, setName] = useState(null);
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
  const [loading, setLoading] = useState(true); // Loading state for preventing flickering

  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Logout functionality
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

  // Update filter values
  const handleFilterChange = (name, value) => {
    if (name === "ageGroup" && value === ">25") {
      value = "25";
    }
    setQueryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update date range
  const handleDateSelect = (startDate, endDate) => {
    setQueryData((prev) => ({ ...prev, startDate, endDate }));
  };

  // Clear all filters
  const handleFilterRemove = () => {
    setQueryData({
      ageGroup: "",
      startDate: "",
      endDate: "",
      gender: "",
    });
  };

  // Handle bar chart click
  const handleBarClick = (feature) => {
    setFeatureData(feature);
  };

  // Build query string from queryData
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

  const getData = async () => {
    try {
      setLoading(true);
      const queryString = buildQueryString(queryData);
      const { data, status } = await api.get(`/getData?${queryString}`);
      if (status !== 200) throw new Error("Something went wrong");
      setName(data?.userData?.name);
      setData(data?.data);
      setLineChartData(data.data);
    } catch (err) {
      console.error("Something went wrong:", err);
    } finally {
      setLoading(false);
    }
  };

  // Sync queryData to URL
  useEffect(() => {
    const queryString = buildQueryString(queryData);
    navigate(`?${queryString}`, { replace: true });
  }, [queryData, navigate]);

  // Initialize filters from URL on page load
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const initialQueryData = {
      ageGroup: searchParams.get("ageGroup") || "",
      startDate: searchParams.get("startDate") || "",
      endDate: searchParams.get("endDate") || "",
      gender: searchParams.get("gender") || "",
    };
    console.log("first,initialQueryData");
    setQueryData(initialQueryData);
  }, [location.search]);

  // Fetch data whenever queryData changes
  useEffect(() => {
    getData();
  }, [queryData]);

  // Process data for bar chart and feature summary
  useEffect(() => {
    const tempArray = [];
    if (data && data.length > 0) {
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
        feature: "",
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

  // Update line chart data when feature changes
  useEffect(() => {
    if (data) {
      const lineData = data.filter((item) => {
        return item.feature === feature;
      });
      setLineChartData(lineData);
    }
  }, [feature]);

  // Generic URL share button function
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out the Dashboard",
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          alert("URL copied to clipboard!");
        })
        .catch((err) => console.error("Error copying URL: ", err));
    }
  };

  return (
    <div className="w-full p-4 min-h-screen h-full bg-slate-200 ">
      <div className="max-w-[1300px] mx-auto py-5 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row w-full justify-between">
          <h1 className="text-2xl text-gray-700">Dashboard</h1>
          <div className="text-xl flex items-center">
            <span className="font-light text-black flex items-center gap-2">
              {name} <Logout onClick={handleLogoutClick} />
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
            optionList={[">25", "15-25"]}
            name={"ageGroup"}
            handleChange={handleFilterChange}
          />
          <DateRangePickerComponents handleDateSelect={handleDateSelect} />
          <button
            className="max-w-max px-3 bg-white rounded-lg relative py-2 capitalize"
            onClick={handleFilterRemove}
          >
            Remove Filter
          </button>

          <button
            onClick={handleShare}
            className="max-w-max px-3 bg-blue-500 text-white rounded-lg relative py-2 capitalize"
          >
            Share This URL
          </button>
        </div>

        <h2 className="mt-12 text-3xl">Time Analysis of Features</h2>

        {loading ? (
          <p>Loading...</p> // Show loading text while data is being fetched
        ) : data.length ? (
          <div className="w-full flex md:flex-row flex-col items-center mt-4 gap-5 ">
            <BarChartComponent
              data={barData || []}
              onBarClick={handleBarClick}
            />
            <LineChartComponent data={lineChartData} />
          </div>
        ) : (
          <p>No Data Found</p>
        )}

        {/* Share Button */}
      </div>
    </div>
  );
}

export default Dashboard;
