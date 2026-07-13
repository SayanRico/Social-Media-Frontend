import axios from "axios";
import { API_URL } from "./config";

let cached = null;

export const fetchFirebasePublicConfig = async (force = false) => {
  if (cached && !force) return cached;

  const res = await axios.get(`${API_URL}/api/integrations/firebase/public`, {
    withCredentials: true,
  });

  cached = res.data;
  return cached;
};

export const clearFirebaseConfigCache = () => {
  cached = null;
};
