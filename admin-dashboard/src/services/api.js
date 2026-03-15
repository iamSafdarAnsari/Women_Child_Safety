import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  timeout: 10000,
});

const extractId = (item) => {
  if (!item?.userId) {
    return null;
  }

  if (typeof item.userId === "string") {
    return item.userId;
  }

  return item.userId._id || item.userId.id || null;
};

const extractUser = (item) => {
  const userValue = item?.userId;

  if (!userValue || typeof userValue === "string") {
    return null;
  }

  return {
    id: userValue._id || userValue.id,
    name: userValue.name || "Unknown user",
    email: userValue.email || "Not available",
    phone: userValue.phone || "Not available",
  };
};

const mergeUsersFromActivity = (alerts, reports) => {
  const userMap = new Map();

  [...alerts, ...reports].forEach((item) => {
    const user = extractUser(item);

    if (user?.id && !userMap.has(user.id)) {
      userMap.set(user.id, user);
    }
  });

  return Array.from(userMap.values());
};

export const getAlerts = async () => {
  const response = await apiClient.get("/api/alerts/history");

  return response.data?.alerts || [];
};

export const getReports = async () => {
  const response = await apiClient.get("/api/reports/list");

  return response.data?.reports || [];
};

export const getUsers = async () => {
  try {
    const response = await apiClient.get("/api/admin/users");

    return {
      users: response.data?.users || [],
      source: "backend",
    };
  } catch (error) {
    if (error.response?.status === 404) {
      return {
        users: [],
        source: "inferred",
      };
    }

    throw error;
  }
};

export const getAdminOverview = async () => {
  const [alerts, reports, userResponse] = await Promise.all([
    getAlerts(),
    getReports(),
    getUsers(),
  ]);

  const inferredUsers = mergeUsersFromActivity(alerts, reports);
  const users = userResponse.users.length ? userResponse.users : inferredUsers;

  return {
    alerts,
    reports,
    users,
    stats: {
      totalUsers: users.length,
      activeAlerts: alerts.filter((alert) => alert.status === "active").length,
      unsafeLocations: reports.length,
    },
    userSource: userResponse.users.length ? userResponse.source : "inferred",
  };
};

export { apiClient, extractId, extractUser };
