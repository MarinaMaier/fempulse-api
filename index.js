const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
const interceptorMiddleware = require("./utils/interceptor-middleware");
const signupRoutes = require("./routes/signup-routes");
const loginRoutes = require("./routes/login-routes");
const homeRoutes = require("./routes/home-routes");
const logoutRoutes = require("./routes/logout-routes");

app.use(express.json());
// Configure CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Check if origin is allowed
      if (!origin || process.env.ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use((req, _res, next) => {
  next();
});
app.use(interceptorMiddleware); // Intercepts and validates token
app.use("/signup", signupRoutes); // Use signup routes
app.use("/login", loginRoutes); // Use login routes
app.use("/home", homeRoutes); // Use home routes
app.use("/logout", logoutRoutes);

app.get("/", (_req, res) => {
  res.send("Welcome to FemPulse API");
});

app.listen(PORT, function () {
  console.log(`Server is now listening at ${PORT}`);
});
