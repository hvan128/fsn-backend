import User from "../models/user.model.js";

export const getAllUser = (req, res, next) => {
  User.getAllUser((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    } else res.send(data);
  });
};

export const findById = (req, res, next) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

export const findByEmail = (req, res) => {
  User.findByEmail(req.body.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with email ${req.body.email}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with email " + req.body.email,
        });
      }
    } else res.send(data);
  });
};

export const findByFridgeId = (req, res) => {
  User.findByFridgeId(req.params.fridgeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with fridgeId ${req.params.fridgeId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with fridgeId " + req.params.fridgeId,
        });
      }
    } else if (data == null || data.length == 0) {
      res.status(200).send("No data");
    } else {
      res.status(200).send({
        message: "Success",
        data: data,
      });
    }
  });
};

export const update = (req, res) => {
  User.update(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.body.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating User with id " + req.body.id,
        });
      }
    } else res.send(data);
  });
};

export const deleteFridge = (req, res, next) => {
  User.deleteFridge(req.params.id, (err, data) => {
    if (err) {
      return next(err);
    } else res.send(data);
  });
};
