import Wrapper from "../assets/wrappers/StatItem";
import JsPDF from "jspdf";
import "jspdf-autotable";
import { AiFillPrinter } from "react-icons/ai";

function StatsJobAppItem({ count, title, icon, color, bcg, jobsData }) {
  const colums = [
    { title: "company", field: "company" },
    { title: "position", field: "position" },
    { title: "location", field: "location" },
    { title: "education", field: "education" },
    { title: "jobType", field: "jobType" },
  ];

  let tableName = "Application Data ";
  if (jobsData.jobType === "Hybrid") {
    tableName += "Hybrid";
  } else if (jobsData.jobType === "Remote") {
    tableName += "Remote";
  } else if (jobsData.jobType === "On-location") {
    tableName += "On-location";
  }

  const pdfGen = () => {
    const doc = new JsPDF();
    doc.text(tableName, 20, 10);

    doc.autoTable({
      theme: "grid",
      columns: colums.map((col) => ({ ...col, dataKey: col.field })),
      body: jobsData,
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
        <text>Generate Report</text>
        <AiFillPrinter onClick={pdfGen} size="30px" />
      </div>
    </Wrapper>
  );
}

export default StatsJobAppItem;
