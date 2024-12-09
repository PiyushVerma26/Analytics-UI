import { useState, useEffect } from "react";
import api from "./utils/api.js";
import BarChartComponent from "./components/Charts/BarChartComponent.jsx";
import LineChartComponent from "./components/Charts/LineChartComponent.jsx";
import FilterPanel from "./components/Filters/FilterPanel.jsx";
function App() {
  console.log(
    "%c Welcome to My Beautiful Console!",
    "margin:10px;font-size: 15px;   color: white; background-color: blue; padding: 15px; border-radius: 10px; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);"
  );
  const [data, setData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedFeature, setSelectedFeature] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/data", { params: filters });
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [filters]);

  const handleBarClick = (bar) => {
    const featureData = data.filter((item) => item.feature === bar.feature);
    setLineData(featureData);
    setSelectedFeature(bar.feature);
  };

  return (
    <div>
      <FilterPanel filters={filters} setFilters={setFilters} />
      <BarChartComponent data={data} onBarClick={handleBarClick} />
      {selectedFeature && <LineChartComponent data={lineData} />}
    </div>
  );
}

export default App;
