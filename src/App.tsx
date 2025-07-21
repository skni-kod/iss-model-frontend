import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import Overview from "./pages/Overview";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Overview />} />
      </Route>
    </Routes>
  );
}

export default App;
