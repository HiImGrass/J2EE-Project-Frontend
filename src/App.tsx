import { useEffect } from "react";
import { testApiConnection } from "./features/test-connection/test.connection";
import { Outlet } from "react-router-dom";

function App() {
  useEffect(() => {
    testApiConnection();
  }, []);

  return (
    <Outlet />
  );
}

export default App;
