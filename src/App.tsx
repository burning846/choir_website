import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { LangProvider } from "@/lib/lang";
import { ThemeProvider } from "@/context/theme";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotFound from "@/pages/NotFound";
import May10Performance from "@/pages/May10Performance";
import FirstChord from "@/pages/FirstChord";

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <ErrorBoundary>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/performance-may-10" element={<May10Performance />} />
              <Route path="/firstchord" element={<FirstChord />} />
              <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ErrorBoundary>
      </LangProvider>
    </ThemeProvider>
  );
}
