import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import {
  AdminStatsContainer,
  Loading,
  AdminChartsContainer,
} from "../../components";

const AdminStats = () => {
  const { adminShowStats, isLoading, monthelUserCreations, getUsersPDF } =
    useAppContext();

  useEffect(() => {
    adminShowStats();
    getUsersPDF();
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

export default AdminStats;
