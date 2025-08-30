import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter } from "react-router";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./index.css";
import App from "./App.jsx";
import { store } from "./app/store.js";

function ThemedApp() {
  const { theme } = useSelector((state) => state.auth);
  return (
    <Theme radius="small" appearance={theme}>
      <App />
    </Theme>
  );
}

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <ThemedApp />
    </BrowserRouter>
  </Provider>
  // </StrictMode>
);
