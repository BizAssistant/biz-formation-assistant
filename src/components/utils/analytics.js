// src/components/utils/analytics.js
export function track(event, payload = {}) {
  // Replace with real analytics (Segment, GA4, PostHog...) easily.
  // For now this logs and adds window.dataLayer event if present.
  try {
    const time = new Date().toISOString();
    console.debug("[Analytics]", event, payload);
    if (window && window.dataLayer) {
      window.dataLayer.push({ event, time, ...payload });
    }
    // Optionally send to a REST endpoint:
    // navigator.sendBeacon('/api/analytics', JSON.stringify({event, payload, time}));
  } catch (e) {}
}
