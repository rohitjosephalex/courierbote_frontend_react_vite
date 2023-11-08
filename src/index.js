import React from "react";
import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import LandingPage from "./Landing";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>

		<LandingPage />

	</React.StrictMode>
);

reportWebVitals();
