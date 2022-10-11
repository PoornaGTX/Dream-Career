import React from "react";
import Wrapper from "../assets/wrappers/StatItem";
import JsPDF from "jspdf";
import "jspdf-autotable";
import { AiFillPrinter } from "react-icons/ai";

const AdminStatItem = ({
  title,
  count,
  icon,
  color,
  bcg,
  userData,
  dateType,
}) => {
  const colums = [
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Email", field: "email" },
    { title: "Location", field: "location" },
  ];

  let tableName;

  if (dateType === "Applicants") {
    tableName = "Applicants Data";
  } else if (dateType === "Recruiters") {
    tableName = "Recruiters Data";
  } else {
    tableName = "Admin Data";
  }

  const pdfGen = () => {
    const doc = new JsPDF();
    doc.text(tableName, 20, 10);

    doc.autoTable({
      theme: "grid",
      columns: colums.map((col) => ({ ...col, dataKey: col.field })),
      body: userData,
    });

    doc.save(`${tableName}.pdf`);
  };

  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <div className="icon">{icon}</div>
      </header>
      <h5 className="title">{title}</h5>
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
    </Wrapper>
  );
};

export default AdminStatItem;
