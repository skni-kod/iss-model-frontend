import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import Overview from "./pages/Overview";
import Astronauts from "./pages/Astronauts";
import KnowledgeBase from "./pages/KnowledgeBase";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="telemetry" element={<Overview />} />
        <Route path="astronauts" element={<Astronauts />} />
        <Route path="other" element={<div>Other Page</div>} />
        <Route path="knowledge-base" element={<KnowledgeBase />} />
        <Route path="knowledge-base/:postId" element={<KnowledgeBase />} />
      </Route>
    </Routes>
  );
}

export default App;
