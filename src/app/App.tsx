import AppRoutes from "./Router";
import AppProvider from "./Provider";
import { BrowserRouter as Router } from "react-router-dom";

export const App = () =>{
  return (
    <Router>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </Router>
  );
}

export default App;
