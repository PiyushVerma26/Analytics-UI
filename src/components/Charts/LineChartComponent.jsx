import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = ({ data }) => {
  const [lineChartData, setLineChartData] = useState([]);
  const [filterLineChartData, setFilterLineChartData] = useState([]);
  useEffect(() => {
    if (data) {
      const tempData = data.map((item) => {
        const isoDate = item.date;
        const dateObj = new Date(isoDate);

        const formattedDate = dateObj.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });

        item.date = formattedDate;
        return item;
      });
      setLineChartData(tempData);
    }
  }, [data]);

  useEffect(() => {
    const filterObj = {};

    lineChartData.forEach((item) => {
      if (filterObj[item.date]) {
        filterObj[item.date] += item.timeSpent;
      } else {
        filterObj[item.date] = item.timeSpent;
      }
    });
    const tempArray = [];
    for (let key in filterObj) {
      tempArray.push({ date: key, timeSpent: filterObj[key] });
    }

    setFilterLineChartData(tempArray);
  }, [lineChartData]);

  return (
    <div className="w-full  md:py-5 px-5 rounded-md bg-yellow-50  shadow-white  h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={filterLineChartData}>
          <XAxis dataKey="date" />
          <YAxis dataKey="timeSpent" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line type="monotone" dataKey="timeSpent" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

LineChartComponent.propTypes = {
  data: PropTypes.array.isRequired,
};
export default LineChartComponent;
