import axios from "axios";

const API_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Types
interface SignupResponse {
  user: {
    id: string;
    email: string;
    created_at: string;
  };
  message?: string;
}

interface SigninResponse {
  user: {
    id: string;
    email: string;
  };
  session: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
}

export const authAPI = {
  signup: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<SignupResponse> => {
    const response = await api.post<SignupResponse>("/auth/signup", {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  },

  signin: async (email: string, password: string): Promise<SigninResponse> => {
    const response = await api.post<SigninResponse>("/auth/signin", {
      email,
      password,
    });
    
    // Store token
    if (response.data.session?.access_token) {
      localStorage.setItem("access_token", response.data.session.access_token);
    }
    
    return response.data;
  },

  signout: async (): Promise<{ message: string }> => {
    const response = await api.post("/auth/signout");
    localStorage.removeItem("access_token");
    return response.data;
  },
};



export default api;