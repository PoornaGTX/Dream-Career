import { useAppContext } from "../context/appContext";
import StatsJobAppItem from "./StatsJobAppItem";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
const StatsJobAppContainer = () => {
  const { jobAppStats, AppliedJobs } = useAppContext();
  const HybridJobs = AppliedJobs.filter((app) => app.jobType === "Hybrid");
  const OnJobs = AppliedJobs.filter((app) => app.jobType === "On-location");
  const RemoteJobs = AppliedJobs.filter((app) => app.jobType === "Remote");

  const defaultStats = [
    {
      title: "Hybrid",
      count: jobAppStats.Hybrid || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
      jobsData: HybridJobs,
    },
    {
      title: "Remote",
      count: jobAppStats.Remote || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
      jobsData: RemoteJobs,
    },
    {
      title: "On-location",
      count: jobAppStats["On-location"] || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
      jobsData: OnJobs,
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatsJobAppItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsJobAppContainer;
