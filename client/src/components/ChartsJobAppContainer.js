import React, { useState } from "react";
import JobAppBarChart from "./JobAppBarChart";
import JobAppAreaChart from "./JobAppAreaChart";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/ChartsContainer";
import JsPDF from "jspdf";
import "jspdf-autotable";
import { AiFillPrinter } from "react-icons/ai";
export default function ChartsJobAppContainer() {
  const [barChart, setBarChart] = useState(true);
  const { monthlyJobAppApplications: data } = useAppContext();

  const colums = [
    { title: "Date", field: "date" },
    { title: "Applied job count", field: "count" },
  ];

  let tableName = "Applied jobs stats";

  const pdfGen = () => {
    const doc = new JsPDF();
    doc.text(tableName, 20, 10);

    doc.autoTable({
      theme: "grid",
      columns: colums.map((col) => ({ ...col, dataKey: col.field })),
      body: data,
    });

    doc.save(`${tableName}.pdf`);
  };

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>

      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "AreaChart" : "BarChart"}
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <text>Genarate Report</text>
        <AiFillPrinter onClick={pdfGen} size="30px" />
      </div>
      {barChart ? (
        <JobAppBarChart data={data} />
      ) : (
        <JobAppAreaChart data={data} />
      )}
    </Wrapper>
  );
}
