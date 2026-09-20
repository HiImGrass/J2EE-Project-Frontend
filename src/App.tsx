import { useEffect } from "react";
import { testApiConnection } from "./features/test-connection/test.connection";

function App() {
  useEffect(() => {
    testApiConnection();
  }, []);

  return (
    <div>
      <h1>Hello From React</h1>
    </div>
  );
}

export default App;
