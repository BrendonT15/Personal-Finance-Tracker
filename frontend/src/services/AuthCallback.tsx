import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        localStorage.setItem("session", JSON.stringify(session));
        localStorage.setItem("user", JSON.stringify(session.user));
        navigate("/home", { replace: true });
      } else {
        navigate("/signin", { replace: true });
      }
    });
  }, [navigate]);

  return (
    <div className="">
      <p>Loading</p>
    </div>
  );
};

export default AuthCallback;
