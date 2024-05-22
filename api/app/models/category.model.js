import db from "../common/connect.js";
import Notification from "./notification.model.js";
class Category {
  constructor(
    id,
    label,
    icon,
    type,
    positionId,
    manufactureDate,
    expiryDate,
    subPositionId,
    fridgeId,
    value,
    quantity,
    unit,
    defaultDuration,
    completed,
    no
  ) {
    this.id = id;
    this.label = label;
    this.icon = icon;
    this.type = type;
    this.positionId = positionId;
    this.subPositionId = subPositionId;
    this.manufactureDate = manufactureDate;
    this.expiryDate = expiryDate;
    this.fridgeId = fridgeId;
    this.completed = completed;
    this.no = no;
    this.quantity = quantity;
    this.unit = unit;
    this.defaultDuration = defaultDuration;
    this.value = value;
  }
}

/!* Create a new Category */;
Category.create = (data, result) => {
  db.query("INSERT INTO categories SET ?", data, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      Notification.create(
        {
          fridgeId: data.fridgeId,
          type: "fridge",
          action: "expire",
          createdAt: data.expiryDate,
          read: 0,
          categoryId: res.insertId,
        },
        (err, res) => {
          if (err) {
            console.log(err);
            result(err, null);
            return;
          }
        }
      );
      result(null, { id: res.insertId, ...data });
    }
  });
};

Category.getTotalCategory = (fridgeId, firstDay, lastDay, sort, result) => {
  var query = `
  SELECT type, COUNT(*) AS total
  FROM categories
  WHERE fridgeId = ? AND manufactureDate BETWEEN ? AND ?
  GROUP BY type
`;
  if (sort) {
    var validSortValues = ["asc", "desc"];
    if (!validSortValues.includes(sort.toLowerCase())) {
      result(new Error('Invalid sort value. Must be "asc" or "desc".'), null);
      return;
    }
    query += ` ORDER BY total ${sort}`;
  }
  function capitalizeFirstLetter(str) {
    if (str.length === 0) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  db.query(query, [fridgeId, firstDay, lastDay], (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    var totalCategories = {};
    res.forEach((row) => {
      totalCategories[`totalCategory${capitalizeFirstLetter(row.type)}`] =
        row.total;
    });

    result(null, totalCategories);
  });
};

Category.createNewCategory = (data, result) => {
  db.query("INSERT INTO new_category SET ?", data, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      Notification.create(
        {
          fridgeId: data.fridgeId,
          type: "fridge",
          action: "newCategory",
          read: 0,
          categoryId: res.insertId,
        },
        (err, res) => {
          if (err) {
            console.log(err);
            result(err, null);
            return;
          }
        }
      );
      result(null, { id: res.insertId, ...data });
    }
  });
};

/!* Get all Categories */;
Category.getAllCategoryInFridge = (fridgeId, result) => {
  db.query(
    "SELECT * FROM categories WHERE fridgeId = ? AND positionId <> 0 AND deleted = 0 ORDER BY manufactureDate DESC",
    [fridgeId],
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        console.log(res);
        result(null, res);
      }
    }
  );
};

/!* Get Category */;
Category.findById = (id, result) => {
  db.query(`SELECT * FROM categories WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Category.findByPositionId = (
  { positionId, fridgeId, sortBy, sort },
  result
) => {
  db.query(
    `SELECT * FROM categories WHERE positionId = ${positionId} AND fridgeId = ${fridgeId} AND deleted = 0 ORDER BY ${sortBy} ${sort}`,
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Category.getNewCategoryByFridgeId = (fridgeId, result) => {
  db.query(
    `SELECT * FROM new_category WHERE fridgeId = ${fridgeId}`,
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

/!* Update Category */;
Category.update = (data, result) => {
  db.query(
    "UPDATE categories SET ? WHERE id = ?",
    [data, data.id],
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, { id: data.id, ...data });
      }
    }
  );
};

Category.updatePosition = (data, result) => {
  db.query(
    "UPDATE categories SET positionId = ? WHERE id = ?",
    [data.positionId, data.id],
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, { id: data.id, ...data });
      }
    }
  );
};

Category.completed = (data, result) => {
  db.query(
    `UPDATE categories SET completed = ? WHERE id = ?`,
    [data.completed, data.id],
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      } else {
        if (data.completed === 0) {
          db.query(
            "UPDATE categories SET no = no - 1 WHERE no > ? AND fridgeId = ?",
            [data.no, data.fridgeId],
            (err, res) => {
              if (err) {
                console.log(err);
                result(err, null);
                return;
              } else {
                db.query(
                  "UPDATE categories SET no = ? WHERE id = ?",
                  [data.maxNo, data.id],
                  (err, res) => {
                    if (err) {
                      console.log(err);
                      result(err, null);
                      return;
                    }
                  }
                );
              }
            }
          );
        } else {
          db.query(
            "UPDATE categories SET no = no + 1 WHERE no < ? AND fridgeId = ?",
            [data.no, data.fridgeId],
            (err, res) => {
              if (err) {
                console.log(err);
                result(err, null);
                return;
              } else {
                db.query(
                  "UPDATE categories SET no = 1 WHERE id = ?",
                  [data.id],
                  (err, res) => {
                    if (err) {
                      console.log(err);
                      result(err, null);
                      return;
                    }
                  }
                );
              }
            }
          );
        }
        result(null, res);
      }
    }
  );
};

Category.reOrderCategory = (data, result) => {
  if (data.newOrder !== null) {
    db.query(
      `UPDATE categories SET no = no - 1 WHERE no > ? AND fridgeId = ?`,
      [data.oldOrder, data.fridgeId],
      (err, res) => {
        if (err) {
          console.log(err);
          result(err, null);
          return;
        }
      }
    );
  } else {
    const isMoveUp = data.newOrder > data.oldOrder;
    if (isMoveUp) {
      db.query(
        `UPDATE categories SET no = no - 1 WHERE no <= ? AND no > ? AND fridgeId = ?`,
        [data.newOrder, data.oldOrder, data.fridgeId],
        (err, res) => {
          if (err) {
            console.log(err);
            result(err, null);
            return;
          } else {
            db.query(
              "UPDATE categories SET no = ? WHERE id = ?",
              [data.newOrder, data.id],
              (err, res) => {
                if (err) {
                  console.log(err);
                  result(err, null);
                  return;
                }
              }
            );
            result(null, res);
          }
        }
      );
    } else {
      db.query(
        `UPDATE categories SET no = no + 1 WHERE no < ? AND no >= ? AND fridgeId = ?`,
        [data.oldOrder, data.newOrder, data.fridgeId],
        (err, res) => {
          if (err) {
            console.log(err);
            result(err, null);
            return;
          } else {
            db.query(
              "UPDATE categories SET no = ? WHERE id = ?",
              [data.newOrder, data.id],
              (err, res) => {
                if (err) {
                  console.log(err);
                  result(err, null);
                  return;
                }
              }
            );
            result(null, res);
          }
        }
      );
    }
  }
};

/!* Delete Category */;
Category.delete = (id, result) => {
  db.query("UPDATE categories SET deleted = 1 WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Category.deleteByFridgeId = (fridgeId, result) => {
  db.query(
    `UPDATE categories SET deleted = 1 WHERE fridgeId = ${fridgeId}`,
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

export default Category;
