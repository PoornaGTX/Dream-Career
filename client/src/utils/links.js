import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  { id: 1, text: "stats", path: "/", icon: <IoBarChartSharp /> },
  { id: 2, text: "All users", path: "all-users", icon: <MdQueryStats /> },
  { id: 3, text: "all jobs", path: "all-jobs", icon: <MdQueryStats /> },
  { id: 4, text: "profile", path: "profile", icon: <ImProfile /> },
  { id: 5, text: "Applied jobs", path: "applied-jobs", icon: <FaWpforms /> },
  { id: 6, text: "Job requests", path: "job-requests", icon: <MdQueryStats /> },
  { id: 8, text: "add job", path: "add-job", icon: <FaWpforms /> },
];

export default links;
