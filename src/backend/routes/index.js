const express = require("express");
const jwtDecode = require("jwt-decode");

const router = express.Router();

// A route that should be accessible for everyone
router.get("/", (req, res) =>
  res.status(200).json({
    message: "This is an unprotected endpoint that is available to everyone.",
  }),
);

// A route that should only be accessible for users with a valid access token
router.get("/protected/", (req, res) => {
  let scopesArray = [];
  const authHeader = req.header("authorization");

  if (authHeader) {
    const jwtToken = authHeader.split(" ")[1]; // Header ist "Bearer eyJhbGciOi..." and this will get the last part, which is the JWT
    const jwtPayload = jwtDecode(jwtToken); // This Node Package returns the decoded payload from the JWT Token
    scopesArray = jwtPayload?.scope.split(" "); // The scope is space separated string
  }

  return res.status(200).json({
    message:
      "This is a secret message that only authorized users should be able to get from the API.",
    availableScopes: scopesArray,
  });
});

module.exports = router;
