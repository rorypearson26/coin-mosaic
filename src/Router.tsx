import { HashRouter, Route, Routes } from "react-router-dom";

import { HomePage } from "./pages/Home.page";

export function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </HashRouter>
  );
}
