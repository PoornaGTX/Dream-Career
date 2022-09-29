import Wrapper from '../assets/wrappers/StatItem'
import JsPDF from "jspdf";
import "jspdf-autotable";
import { AiFillPrinter } from "react-icons/ai";

const RecStatsItem = ({ count, title, icon, color, bcg, jobData }) => {

  const colums = [
    { title: "Company Name", field: "company" },
    { title: "Job Position", field: "position" },
    { title: "Job Type", field: "jobType" },
    { title: "Job Location", field: "jobLocation" },
  ];
  console.log(jobData);
  let tableName;

  if (title === "Remote Jobs") {
    tableName = "Remote Job Data";
  } else if (title === "Internships") {
    tableName = "Internship Data";
  }

  const pdfGen = () => {
    const doc = new JsPDF();
    doc.text(tableName, 20, 10);

    doc.autoTable({
      theme: "grid",
      columns: colums.map((col) => ({ ...col, dataKey: col.field })),
      body: jobData,
    });

    doc.save(`${tableName}.pdf`);
  };

  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className='count'>{count}</span>
        <span className='icon'>{icon}</span>
      </header>
      <h5 className='title'>{title}</h5>
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
  )
}

export default RecStatsItem
