import CreateAccountPage from "./components/pages/CreateAccountPage";
import TestPage from "./components/pages/TestPage";
import SignInPage from "./components/pages/SignInPage";
import AnalyticsPage from "./components/pages/AnalyticsPage";
import ProtectedRoute from "./routes/ProtectedRoute";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import TransactionPage from "./components/pages/TransactionPage";
import DashboardPage from "./components/pages/DashboardPage";
import SettingsPage from "./components/pages/SettingsPage";
import HomePageLayout from "./components/pages/HomePageLayout";
import BudgetPage from "./components/pages/BudetPage";
import AccountInfoPage from "./components/pages/settings/AccountInfoPage";
import BankAccountInfoPage from "./components/pages/settings/BankAccountInfoPage";
import NotificationPage from "./components/pages/settings/NotificationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/signin" element={<SignInPage />} />

        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePageLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<DashboardPage />} />
          <Route path="transactions" element={<TransactionPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="budget" element={<BudgetPage />} />

          <Route path="settings" element={<SettingsPage />}>
            <Route index element={<AccountInfoPage />} />
            <Route path="account" element={<AccountInfoPage />} />
            <Route path="bank-account" element={<BankAccountInfoPage />} />
            <Route path="notifications" element={<NotificationPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
