import Feel from "../models/feel.model.js";

export const createFeel = (req, res, next) => {
  var data = req.body;
  Feel.create(data, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.send(result);
    }
  });
};

export const deleteFeelDish = (req, res, next) => {
  var userId = req.query.userId;
  var dishId = req.query.dishId;
  var type = req.query.type;
  Feel.deleteFeelDish(userId, dishId, type, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.send(result);
    }
  });
};

export const deleteFeelFeedback = (req, res, next) => {
  var userId = req.query.userId;
  var feedbackId = req.query.feedbackId;
  var type = req.query.type;
  Feel.deleteFeelFeedback(userId, feedbackId, type, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.send(result);
    }
  });
};
