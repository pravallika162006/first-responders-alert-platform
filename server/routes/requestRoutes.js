const express = require("express");

const router = express.Router();

const {
  createRequest,
  getRequests,
  acceptRequest,
} = require("../controllers/requestController");

router.post("/", createRequest);

router.get("/", getRequests);

router.put("/:id", acceptRequest);

module.exports = router;