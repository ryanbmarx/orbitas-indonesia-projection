// polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill

const BROWSER =
  typeof window !== "undefined" && typeof document !== "undefined";

(function() {
  if (!BROWSER) return;

  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    const evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    );
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();

function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  const copy = obj.constructor();
  for (const attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

export function fireEvent(action, data = {}) {
  let gaData = {
    route: {
      url: "",
      name: document.title
    }
  };

  if (typeof ga_data !== "undefined") gaData = clone(ga_data);
  gaData.route.url = window.location.href;

  const detail = {
    action,
    data,
    route: gaData.route,
    name: gaData.name
  };

  window.dispatchEvent(
    new CustomEvent("ga-event", {
      detail
    })
  );
  if (process.env.NODE_ENV === "development") console.log(`ga-event`, detail);
}

export function firePageView() {
  let gaData = {
    route: {
      url: "",
      name: document.title
    }
  };

  if (typeof ga_data !== "undefined") gaData = clone(ga_data);
  gaData.route.url = window.location.href;

  const detail = {
    route: gaData.route,
    name: gaData.name
  };

  window.dispatchEvent(
    new CustomEvent("ga-page-view", {
      detail
    })
  );

  if (process.env.NODE_ENV === "development")
    console.log("ga-page-view", detail);
}

export function hotjar() {
  (function(h, o, t, j, a, r) {
    h.hj =
      h.hj ||
      function() {
        (h.hj.q = h.hj.q || []).push(arguments);
      };
    h._hjSettings = { hjid: 939038, hjsv: 6 };
    a = o.getElementsByTagName("head")[0];
    r = o.createElement("script");
    r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
}
