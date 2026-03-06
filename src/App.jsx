import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import VisitorManagement from "./pages/modules/VisitorManagement";
import MeetingRoomBooking from "./pages/modules/MeetingRoomBooking";
import HelpdeskTicketing from "./pages/modules/HelpdeskTicketing";
import FacilityManagement from "./pages/modules/FacilityManagement";
import RoleUserManagement from "./pages/modules/RoleUserManagement";
import AnalyticsInsights from "./pages/modules/AnalyticsInsights";

const App = () => {
  return (
    <Router>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Nav />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/visitor-management" element={<VisitorManagement />} />
            <Route path="/meeting-room-booking" element={<MeetingRoomBooking />} />
            <Route path="/helpdesk-ticketing" element={<HelpdeskTicketing />} />
            <Route path="/facility-management" element={<FacilityManagement />} />
            <Route path="/role-user-management" element={<RoleUserManagement />} />
            <Route path="/analytics-insights" element={<AnalyticsInsights />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
