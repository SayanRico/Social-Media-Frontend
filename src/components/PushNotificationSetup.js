import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getToken, onMessage } from "firebase/messaging";
import { getFirebaseMessaging } from "../firebase/initFirebase";
import { fetchFirebasePublicConfig } from "../utils/firebaseApi";
import { postDataAPI } from "../utils/fetchData";

const showForegroundNotification = (payload) => {
  if (document.visibilityState !== "hidden") return;
  if (!("Notification" in window) || Notification.permission !== "granted") {
    return;
  }

  const title = payload.notification?.title || "Face Meet";
  const options = {
    body: payload.notification?.body || "",
    icon: payload.notification?.image || undefined,
    data: payload.data || {},
  };

  const n = new Notification(title, options);
  n.onclick = (e) => {
    e.preventDefault();
    const url = payload.data?.url;
    if (url) {
      window.focus();
      window.location.assign(url);
    }
  };
};

const injectConfigIntoServiceWorker = async (registration, webConfig) => {
  const worker = registration.active || registration.waiting || registration.installing;
  if (!worker) return;

  worker.postMessage({
    type: "FIREBASE_CONFIG",
    webConfig,
  });
};

const PushNotificationSetup = () => {
  const { auth } = useSelector((state) => state);
  const tokenRef = useRef(null);

  useEffect(() => {
    if (!auth.token) return undefined;

    let unsubscribe = () => {};

    const setup = async () => {
      try {
        if (!("serviceWorker" in navigator) || !("Notification" in window)) {
          return;
        }

        const { enabled, vapidKey, webConfig } = await fetchFirebasePublicConfig();
        if (!enabled || !webConfig?.projectId || !vapidKey) return;

        if (Notification.permission === "default") {
          await Notification.requestPermission();
        }
        if (Notification.permission !== "granted") return;

        const registration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js"
        );
        await injectConfigIntoServiceWorker(registration, webConfig);

        const messaging = await getFirebaseMessaging(webConfig);
        if (!messaging) return;

        const token = await getToken(messaging, {
          vapidKey,
          serviceWorkerRegistration: registration,
        });

        if (!token || token === tokenRef.current) return;

        tokenRef.current = token;
        await postDataAPI(
          "devices/register",
          { token, platform: "web" },
          auth.token
        );

        unsubscribe = onMessage(messaging, (payload) => {
          showForegroundNotification(payload);
        });
      } catch (err) {
        console.warn("[FCM] setup skipped:", err?.message || err);
      }
    };

    setup();

    return () => {
      unsubscribe();
    };
  }, [auth.token]);

  useEffect(() => {
    if (auth.token) return undefined;

    const token = tokenRef.current;
    if (!token) return undefined;

    postDataAPI("devices/unregister", { token }).catch(() => {});
    tokenRef.current = null;

    return undefined;
  }, [auth.token]);

  return null;
};

export default PushNotificationSetup;
