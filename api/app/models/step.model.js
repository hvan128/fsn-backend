import db from "../common/connect.js";
class Step {
  constructor(no, description, id, dishId, listImage) {
    this.no = no;
    this.description = description;
    this.id = id;
    this.dishId = dishId;
    this.listImage = listImage;
  }
}

Step.create = (data, result) => {
  db.query("INSERT INTO step SET ?", data, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
  });
};

Step.deleteStepByDishId = (dishId, result) => {
  db.query("DELETE FROM step WHERE dishId = ?", [dishId], (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
  });
};

Step.getStepsByDishId = (dishId, result) => {
  db.query("SELECT * FROM step WHERE dishId = ?", [dishId], (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      result(null, res);
    }
  });
};

export default Step;
