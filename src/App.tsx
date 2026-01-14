import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { LangProvider } from "@/lib/lang";
import { DocProvider } from "@/context/doc";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <LangProvider>
      <DocProvider>
        <ErrorBoundary>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ErrorBoundary>
      </DocProvider>
    </LangProvider>
  );
}
