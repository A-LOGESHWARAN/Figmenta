import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import bookmarkRoutes from "./routes/bookmark.js";

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

/* ===========================
   Rate Limiting
=========================== */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

/* ===========================
   Routes
=========================== */

app.use("/bookmarks", bookmarkRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend running 🚀" });
});

/* ===========================
   Global Error Handler
=========================== */

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

/* ===========================
   Start Server
=========================== */

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
