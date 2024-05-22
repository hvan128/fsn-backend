import Fridge from "../models/fridge.model.js";
import User from "../models/user.model.js";
export const getAllFridge = (req, res, next) => {
  Fridge.getAllFridge((err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.status(200).send({
        message: "Success",
        data: data,
      });
    }
  });
};

export const create = (req, res, next) => {
  Fridge.create(req.body, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.send(result);
    }
  });
};

export const getFridgeById = (req, res) => {
  var id = req.params.id;
  Fridge.getFridgeById(id, (err, result) => {
    res.send(result);
  });
};

export const deleteFridge = (req, res, next) => {
  var id = req.params.id;
  User.deleteFridge(id, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.send(result);
    }
  });
};
