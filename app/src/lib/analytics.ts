/* eslint @typescript-eslint/no-empty-function: 0 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const gaEnabled = process.env.REACT_APP_ANALYTICS_ENABLED === "1";

// hook
let usePageViews = () => {};
// goals
let gaChangeGraphOption = (_: { label: string; action: string }) => {};

if (gaEnabled) {
  import("react-ga").then((ReactGA) => {
    ReactGA.initialize("UA-136783019-2");
    usePageViews = () => {
      const location = useLocation();
      useEffect(() => {
        ReactGA.pageview(location.pathname + location.search);
      }, [location.pathname, location.search]);
    };

    gaChangeGraphOption = ({ label, action }) => {
      ReactGA.event({
        category: "Change Graph Options",
        action,
        label,
      });
    };
  });
}

export { usePageViews, gaChangeGraphOption };
