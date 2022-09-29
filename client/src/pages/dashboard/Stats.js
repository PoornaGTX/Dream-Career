import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import {
  StatsJobAppContainer,
  ChartsJobAppContainer,
  Loading,
} from "../../components";

const Stats = () => {
  const { showJobAppStats, isLoading, monthlyJobAppApplications } =
    useAppContext();
  useEffect(() => {
    showJobAppStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsJobAppContainer />
      {monthlyJobAppApplications.length > 0 && <ChartsJobAppContainer />}
    </>
  );
};

export default Stats;
