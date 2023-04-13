import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Success from "./pages/success";
import { SupabaseProvider } from "./libs/supabase-context";

function App() {
  return (
    <SupabaseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Router>
    </SupabaseProvider>
  );
}

export default App;
