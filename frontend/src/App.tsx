import {
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layout/MainLayout";

import Landing from "./pages/Landing";
import Cars from "./pages/Cars";
import Explore from "./pages/Explore";
import Partners from "./pages/Partners";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Support from "./pages/Support";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OAuthSuccess from "./pages/OAuthSuccess";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import GDPR from "./pages/GDPR";
import { Spotlight } from "./components/Spotlight";
import { SpotlightProvider } from "./context/SpotlightContext";

const Refund = () => <div />;
const Legal = () => <div />;

function App() {
  return (
    <SpotlightProvider>
      <Spotlight />
      <Routes>
        <Route element={<MainLayout />}>
          {/* MAIN */}
          <Route path="/" element={<Landing />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />

          {/* LEGAL */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/gdpr" element={<GDPR />} />
          <Route path="/legal" element={<Legal />} />
        </Route>
      </Routes>
    </SpotlightProvider>
  );
}

export default App;