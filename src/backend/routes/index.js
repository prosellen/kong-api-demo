const express = require("express");

const router = express.Router();

// A route that should be accessible for everyone
router.get("/", (req, res) =>
  res.status(200).json({
    message: "This is the root-route. Nothing to see here.",
  }),
);

module.exports = router;
