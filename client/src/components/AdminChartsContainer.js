import React, { useState } from "react";
import { useAppContext } from "../context/appContext";
import AdminAreaChart from "./AdminAreaChart";
import AdminBarChart from "./AdminBarChart";
import Wrapper from "../assets/wrappers/ChartsContainer";

const AdminChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthelUserCreations: data } = useAppContext();
  return (
    <Wrapper>
      <h4>Monthly User Creations</h4>

      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "AreaChart" : "BarChart"}
      </button>
      {barChart ? (
        <AdminBarChart data={data} />
      ) : (
        <AdminAreaChart data={data} />
      )}
    </Wrapper>
  );
};

export default AdminChartsContainer;
