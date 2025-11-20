import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import plaidRoutes from "./routes/plaidRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/plaid", plaidRoutes);

const PORT = process.env.PORT || 8000;
try {
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("Server failed to start:", err);
}
