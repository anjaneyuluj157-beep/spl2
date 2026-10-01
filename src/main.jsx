import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./components/ThemeContext";
import "./styles.css";
import "./team.css";
import "./admin.css";
import "./admin-code-editor.css";
import "./admin-responsive.css";
import "./admin-fullscreen.css";
import "./theme.css";

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</BrowserRouter>,
);
