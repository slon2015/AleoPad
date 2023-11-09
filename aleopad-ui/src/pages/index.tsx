// Or use @loadable/component, as part of the tutorial - uncritically
import { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const ManagePage = lazy(() => import("./manage"));
const TicketsListPage = lazy(() => import("./tickets-list"));
const LaunchesListPage = lazy(() => import("./launches-list"));
const LaunchPage = lazy(() => import("./launch-info"));
const TokenPage = lazy(() => import("./token-info"));
const TokensListPage = lazy(() => import("./tokens-list"));

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<LaunchesListPage />} />
      <Route path="/launches/:id" element={<LaunchPage />} />
      <Route path="/tokens" element={<TokensListPage />} />
      <Route path="/tokens/:id" element={<TokenPage />} />
      <Route path="/tickets" element={<TicketsListPage />} />
      <Route path="/tickets/:launchId" element={<TicketsListPage />} />
      <Route path="/manage" element={<ManagePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
