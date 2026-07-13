import { initializeApp, deleteApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";

let app = null;
let messaging = null;
let currentProjectId = null;

export const initFirebaseWithConfig = async (webConfig) => {
  if (!webConfig?.projectId) return null;

  if (app && currentProjectId === webConfig.projectId) {
    return app;
  }

  if (app) {
    await deleteApp(app);
    app = null;
    messaging = null;
  }

  app = initializeApp(webConfig);
  currentProjectId = webConfig.projectId;
  return app;
};

export const getFirebaseMessaging = async (webConfig) => {
  const supported = await isSupported();
  if (!supported) return null;

  await initFirebaseWithConfig(webConfig);
  if (!app) return null;

  if (!messaging) {
    messaging = getMessaging(app);
  }
  return messaging;
};

export const resetFirebaseClient = async () => {
  if (app) {
    await deleteApp(app);
  }
  app = null;
  messaging = null;
  currentProjectId = null;
};
