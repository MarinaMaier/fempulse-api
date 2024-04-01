const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
const signupRoutes = require('./routes/signup-routes');
const loginRoutes = require('./routes/login-routes');
const homeRoutes = require('./routes/home-routes');

app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN }));
app.use((req, _res, next) => {
    next();
});
app.use('/signup', signupRoutes); // Use signup routes
app.use('/login', loginRoutes);   // Use login routes
app.use('/home', homeRoutes);  // Calendar routes

app.get('/', (_req, res) => {
    res.send('Welcome to FemPulse');
  });

app.listen(PORT, function () {
    console.log(`Server is now listening at ${PORT}`);
});