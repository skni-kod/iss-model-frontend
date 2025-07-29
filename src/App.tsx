import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import Overview from "./pages/Overview";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Overview />} />
        <Route path="telemetry" element={<div>Telemetry Page</div>} />
        <Route path="astronauts" element={<div>Astronauts Page</div>} />
        <Route path="other" element={<div>Other Page</div>} />
        <Route path="knowledge-base" element={<div>Knowledge Base Page</div>} />
      </Route>
    </Routes>
  );
}

export default App;
