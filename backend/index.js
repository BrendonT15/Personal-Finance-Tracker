import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import supabase from "./config/supabase.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Sign up

app.post("/auth/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ user: data.user });
});

app.get("/test-supabase", async (req, res) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: "test@example.com",
      password: "test123456",
      options: {
        data: {
          first_name: "Test",
          last_name: "User",
        },
      },
    });

    if (error) {
      return res.status(400).json({
        error: error.message,
        details: error,
      });
    }

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
