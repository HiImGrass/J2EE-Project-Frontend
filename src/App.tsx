import { useEffect } from "react";
import { testApiConnection } from "./features/test-connection/test.connection";
import { Outlet } from "react-router-dom";
import { useRestoreSession } from "@/features/auth/hooks/useRestoreSession";

function App() {
  useRestoreSession();

  useEffect(() => {
    testApiConnection();
  }, []);

  return (
    <Outlet />
  );
}

export default App;
