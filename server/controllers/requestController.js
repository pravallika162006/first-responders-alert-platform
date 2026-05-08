const Request = require("../models/Request");

const createRequest = async (req, res) => {

  try {

    const { emergencyType, description, location } = req.body;

    const newRequest = new Request({
      emergencyType,
      description,
      location,
    });

    await newRequest.save();

    res.status(201).json({
      message: "Emergency alert sent successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getRequests = async (req, res) => {

  try {

    const requests = await Request.find().sort({ createdAt: -1 });

    res.status(200).json(requests);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const acceptRequest = async (req, res) => {

  try {

    const request = await Request.findById(req.params.id);

    if (request.status === "Pending") {
      request.status = "Ongoing";
    }

    else if (request.status === "Ongoing") {
      request.status = "Completed";
    }

    await request.save();

    res.status(200).json({
      message: "Status updated",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
module.exports = {
  createRequest,
  getRequests,
  acceptRequest,
};