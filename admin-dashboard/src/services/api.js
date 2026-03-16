import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  timeout: 10000,
});

export const getAlerts = async () => {
  const response = await apiClient.get("/api/alerts");

  return response.data?.alerts || [];
};

export const getReports = async () => {
  const response = await apiClient.get("/api/reports");

  return response.data?.reports || [];
};

export const getUsers = async () => {
  const response = await apiClient.get("/api/users");
  return response.data?.users || [];
};

export const getAdminOverview = async () => {
  const [alerts, reports, users] = await Promise.all([
    getAlerts(),
    getReports(),
    getUsers(),
  ]);

  return {
    alerts,
    reports,
    users,
    stats: {
      totalUsers: users.length,
      activeAlerts: alerts.filter((alert) => alert.status === "active").length,
      unsafeLocations: reports.length,
    },
    userSource: "backend",
  };
};

export { apiClient };
