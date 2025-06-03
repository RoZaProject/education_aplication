import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const AuthorisationPage = React.lazy(() =>
  import("auth_app/AuthorisationPage")
);
const HomePage = React.lazy(() => import("dashboard_app/HomePage"));
const ResultsPage = React.lazy(() => import("result_app/ResultsPage"));
const LandingPage = React.lazy(() => import("land_app/LandingPage"));
console.log("🚦 [host_app] Current route:", location.pathname);

function App() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path="/auth" element={<AuthorisationPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/result" element={<ResultsPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
