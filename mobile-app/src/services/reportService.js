import axios from "axios";
import { Platform } from "react-native";

const defaultBaseUrl =
  Platform.OS === "android" ? "http://10.0.2.2:5000" : "http://localhost:5000";

const apiClient = axios.create({
  baseURL: defaultBaseUrl,
  timeout: 10000,
});

export const fetchUsers = async () => {
  const response = await apiClient.get("/api/users");
  return response.data?.users || [];
};

export const fetchSafetyReports = async () => {
  const response = await apiClient.get("/api/reports");

  return response.data?.reports || [];
};

export const fetchHeatmapReports = async () => {
  const response = await apiClient.get("/api/reports/heatmap");

  return response.data?.heatmap || [];
};

export const createSafetyReport = async (payload) => {
  const response = await apiClient.post("/api/reports/create", payload);

  return response.data?.report;
};

export const sendSosAlert = async (payload) => {
  const response = await apiClient.post("/api/alerts/sos", payload);

  return response.data?.alert;
};

export const fetchAlerts = async () => {
  const response = await apiClient.get("/api/alerts");

  return response.data?.alerts || [];
};

export const startJourney = async (payload) => {
  const response = await apiClient.post("/api/journey/start", payload);

  return response.data?.journey;
};

export const fetchJourneys = async () => {
  const response = await apiClient.get("/api/journey/list");

  return response.data?.journeys || [];
};

export { apiClient, defaultBaseUrl };
