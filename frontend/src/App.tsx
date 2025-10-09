import CreateAccountPage from "./components/pages/CreateAccountPage";
import TestPage from "./components/pages/TestPage";
import SignInPage from "./components/pages/SignInPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import TransactionPage from "./components/pages/TransactionPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TransactionPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/signin" element={<SignInPage />} />


        </Routes>
      </Router>
    </>
  );
}

export default App;
