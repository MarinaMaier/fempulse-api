const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN }));
app.use((req, _res, next) => {
    next();

});

app.get('/', (_req, res) => {
    res.send('Welcome to FemPulse');
  });

app.listen(PORT, function () {
    console.log(`Server is now listening at ${PORT}`);
});