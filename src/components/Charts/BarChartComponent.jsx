import PropTypes from "prop-types";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({ data, onBarClick }) => {
  return (
    <div className="w-full bg-white md:py-5 px-5 rounded-md h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="feature" />
          <YAxis dataKey={"timeSpent"} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar
            dataKey="timeSpent"
            fill="#8884d8"
            onClick={(data) => onBarClick(data.feature)}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

BarChartComponent.propTypes = {
  data: PropTypes.array.isRequired,
  onBarClick: PropTypes.func.isRequired,
};

export default BarChartComponent;
