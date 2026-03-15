import axios from "axios";
import { Platform } from "react-native";

const defaultBaseUrl =
  Platform.OS === "android" ? "http://10.0.2.2:5000" : "http://localhost:5000";

const apiClient = axios.create({
  baseURL: defaultBaseUrl,
  timeout: 10000,
});

export const fetchSafetyReports = async () => {
  const response = await apiClient.get("/api/reports/list");

  return response.data?.reports || [];
};

export { defaultBaseUrl };
