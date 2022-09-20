import React, { useState } from "react";
import { useAppContext } from "../context/appContext";
import AdminAreaChart from "./AdminAreaChart";
import AdminBarChart from "./AdminBarChart";
import Wrapper from "../assets/wrappers/ChartsContainer";
import { AiFillPrinter } from "react-icons/ai";
import JsPDF from "jspdf";
import "jspdf-autotable";

const AdminChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthelUserCreations: data } = useAppContext();

  const statsColums = [
    { title: "date", field: "date" },
    { title: "count", field: "count" },
  ];

  const pdfGenStats = () => {
    const doc = new JsPDF();
    doc.text("User Creations details", 20, 10);

    doc.autoTable({
      theme: "grid",
      columns: statsColums.map((col) => ({ ...col, dataKey: col.field })),
      body: data,
    });

    doc.save("User_Stats.pdf");
  };

  return (
    <Wrapper>
      <h4>Monthly User Creations</h4>

      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "AreaChart" : "BarChart"}
      </button>
      <br></br>
      <AiFillPrinter
        onClick={pdfGenStats}
        style={{ color: "black" }}
        size="20px"
      />

      {barChart ? (
        <AdminBarChart data={data} />
      ) : (
        <AdminAreaChart data={data} />
      )}
    </Wrapper>
  );
};

export default AdminChartsContainer;
