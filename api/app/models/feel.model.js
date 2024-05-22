import db from "../common/connect.js";
import Dish from "./dish.model.js";
import Notification from "./notification.model.js";
class Feel {
  constructor(type, userId, dishId, feedbackId, createdAt, updatedAt, id) {
    this.type = type;
    this.userId = userId;
    this.dishId = dishId;
    this.feedbackId = feedbackId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.id = id;
  }
}

Feel.create = (data, result) => {
  db.query("INSERT INTO feel SET ?", data, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      Dish.findById(data.dishId, (err, dish) => {
        if (err) {
          console.log(err);
          result(err, null);
          return;
        } else {
          Notification.create(
            {
              userId: data.userId,
              targetId: dish.ownerId,
              type: "community",
              action: "feel",
              dishId: dish.id,
              read: 0,
              feelType: data.type,
            },
            (err, res) => {
              if (err) {
                console.log(err);
                result(err, null);
                return;
              }
            }
          );
        }
      });

      result(null, { id: res.insertId, ...data });
    }
  });
};

Feel.findByDishId = (dishId, result) => {
  db.query("SELECT * FROM feel WHERE dishId = ?", [dishId], (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      result(null, res);
    }
  });
};

Feel.findByFeedbackId = (feedbackId, result) => {
  db.query(
    "SELECT * FROM feel WHERE feedbackId = ?",
    [feedbackId],
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      } else {
        result(null, res);
      }
    }
  );
};

Feel.deleteFeelDish = (userId, dishId, type, result) => {
  db.query("DELETE FROM feel WHERE userId = ? AND dishId = ? AND type = ?", [userId, dishId, type], (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      result(null, res);
    }
  });
};

Feel.deleteFeelFeedback = (userId, feedbackId, type, result) => {
  db.query("DELETE FROM feel WHERE userId = ? AND feedbackId = ?", [userId, feedbackId, type], (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      result(null, res);
    }
  });
}

export default Feel;
