import db from "../common/connect.js";
class Feedback {
  constructor(userId, dishId, content, image, createdAt, id) {
    this.userId = userId;
    this.dishId = dishId;
    this.content = content;
    this.image = image;
    this.createdAt = createdAt;
    this.id = id;
  }
}

Feedback.create = (data, result) => {
  db.query("INSERT INTO feedback SET ?", data, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      result(null, { id: res.insertId, ...data });
    }
  });
};

Feedback.findById = (id, result) => {
  db.query(`SELECT * FROM feedback WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      result(null, res);
    }
  });
};

Feedback.getAll = (page, pageSize, result) => {
  const offset = (page - 1) * pageSize;
  var feedbacks = [];

  db.query(
    `SELECT COUNT(*) AS total FROM feedback`,
    (err, countResult) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }  

      const totalCount = countResult[0].total;

      const query = `
        SELECT f.*, d.label AS originalDish, d.ownerId AS dishOwnerId, u.displayName AS ownerDish, u.imageUrl as ownerDishImage
        FROM feedback f
        LEFT JOIN dish d ON f.dishId = d.id
        LEFT JOIN users u ON d.ownerId = u.id
        ORDER BY f.createdAt DESC
        LIMIT ${pageSize} OFFSET ${offset}
      `;
      db.query(query, (err, res) => {
        if (err) {
          console.log(err);
          result(err, null);
          return;
        }

        const promises = res.map((feedback) => {
          return new Promise((resolve, reject) => {
            const feedbackId = feedback.id;
            db.query(
              `SELECT * FROM feel WHERE feedbackId = ${feedbackId}`,
              (err, feels) => {
                if (err) {
                  reject(err);
                } else {
                  feedbacks.push({ ...feedback, feels });
                  resolve();
                }
              }
            );
          });
        });

        Promise.all(promises)
          .then(() => {
            result(null, { total: totalCount, data: feedbacks });
          })
          .catch((err) => {
            console.log(err);
            result(err, null);
          });
      });
    }
  );
};

Feedback.getByUserId = (userId, result) => {
  db.query(`SELECT * FROM feedback WHERE userId = ${userId}`, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      result(null, res);
    }
  });
};

Feedback.getByDishId = (dishId, page, pageSize, result) => {
  const offset = (page - 1) * pageSize;
  var feedbacks = [];

  db.query(
    `SELECT COUNT(*) AS total FROM feedback WHERE dishId = ${dishId}`,
    (err, countResult) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }

      const totalCount = countResult[0].total;

      const query = `
        SELECT f.*, d.label AS originalDish, d.ownerId AS dishOwnerId, u.displayName AS ownerDish, u.imageUrl as ownerDishImage
        FROM feedback f
        LEFT JOIN dish d ON f.dishId = d.id
        LEFT JOIN users u ON d.ownerId = u.id
        WHERE f.dishId = ${dishId}
        ORDER BY f.createdAt DESC
        LIMIT ${pageSize} OFFSET ${offset}
      `;
      db.query(query, (err, res) => {
        if (err) {
          console.log(err);
          result(err, null);
          return;
        }

        const promises = res.map((feedback) => {
          return new Promise((resolve, reject) => {
            const feedbackId = feedback.id;
            db.query(
              `SELECT * FROM feel WHERE feedbackId = ${feedbackId}`,
              (err, feels) => {
                if (err) {
                  reject(err);
                } else {
                  feedbacks.push({ ...feedback, feels });
                  resolve();
                }
              }
            );
          });
        });

        Promise.all(promises)
          .then(() => {
            result(null, { total: totalCount, data: feedbacks });
          })
          .catch((err) => {
            console.log(err);
            result(err, null);
          });
      });
    }
  );
};

export default Feedback;
