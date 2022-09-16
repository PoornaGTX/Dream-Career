import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import {
  AdminStatsContainer,
  Loading,
  AdminChartsContainer,
} from "../../components";

const Stats = () => {
  const { adminShowStats, isLoading, monthelUserCreations } = useAppContext();

  useEffect(() => {
    adminShowStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <AdminStatsContainer />
      {monthelUserCreations.length > 0 && <AdminChartsContainer />}
    </>
  );
};

export default Stats;
