import CreateAccountPage from "./components/pages/CreateAccountPage";
import SignInPage from "./components/pages/SignInPage";
import AnalyticsPage from "./components/pages/AnalyticsPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import AccountsPage from "./components/pages/AccountsPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TransactionPage from "./components/pages/TransactionPage";
import DashboardPage from "./components/pages/DashboardPage";
import SettingsPage from "./components/pages/SettingsPage";
import HomePageLayout from "./components/pages/HomePageLayout";
import BudgetPage from "./components/pages/BudgetPage";
import AccountInfoPage from "./components/pages/settings/AccountInfoPage";
import BankAccountInfoPage from "./components/pages/settings/BankAccountInfoPage";
import NotificationPage from "./components/pages/settings/NotificationPage";
import AuthCallback from "./services/AuthCallback";
import LandingPage from "./components/pages/LandingPage";
import ToS from "./components/pages/settings/ToS";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/" element={<LandingPage />} />

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
            <Route path="accounts" element={<AccountsPage />} />

            <Route path="settings" element={<SettingsPage />}>
              <Route index element={<AccountInfoPage />} />
              <Route path="account" element={<AccountInfoPage />} />
              <Route path="bank-account" element={<BankAccountInfoPage />} />
              <Route path="notifications" element={<NotificationPage />} />
              <Route path="tos" element={<ToS />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
