/* eslint-disable no-undef */
/* Face Meet — Firebase Cloud Messaging service worker (config injected at runtime) */

let messagingReady = false;

const initMessaging = (webConfig) => {
  if (messagingReady || !webConfig?.projectId) return;

  importScripts(
    "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js"
  );

  firebase.initializeApp(webConfig);
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    const title = payload.notification?.title || "Face Meet";
    const options = {
      body: payload.notification?.body || "",
      icon: payload.notification?.image || "/logo192.png",
      data: payload.data || {},
    };
    self.registration.showNotification(title, options);
  });

  messagingReady = true;
};

self.addEventListener("message", (event) => {
  if (event.data?.type === "FIREBASE_CONFIG" && event.data.webConfig) {
    initMessaging(event.data.webConfig);
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url;
  if (!url) return;
  const target = new URL(url, self.location.origin).href;
  event.waitUntil(clients.openWindow(target));
});
