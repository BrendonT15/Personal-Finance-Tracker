import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const session = localStorage.getItem("session");
      const user = localStorage.getItem("user");
      const accessToken = localStorage.getItem("access_token");

      if (!session || !user || !accessToken) {
        setIsAuthenticated(false);
        setIsChecking(false);
        return;
      }

      try {
        const sessionData = JSON.parse(session);
        // Check if token exists
        if (sessionData.access_token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
      
      setIsChecking(false);
    };

    checkAuth();
  }, []);

  if (isChecking) {
    // Optional: show a loading spinner while checking
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Clear any stale data
    localStorage.removeItem("session");
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;