import express from "express";
import cors from "cors";
import roleRoutes from "./src/routes/role.js";
import userRoutes from "./src/routes/user.js";

const app = express();

// SETUP CORS
app.use(cors());

// SETUP body parser
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

// ROUTES
app.use("/api/v1", roleRoutes);
app.use("/api/v2", userRoutes);

app.listen(3001, () => console.log("Service running on http://localhost:3001"));
