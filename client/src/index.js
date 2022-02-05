import { AuthContextProvider } from "./context/AuthContext";
import { render } from "react-dom";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
