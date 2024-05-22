import db from "../common/connect.js";
class Ingredient {
  constructor(category, quantity, unit, id, dishId) {
    this.category = category;
    this.quantity = quantity;
    this.unit = unit;
    this.id = id;
    this.dishId = dishId;
  }
}

Ingredient.create = (data, result) => {
  db.query("INSERT INTO ingredient SET ?", data, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
  });
};

Ingredient.deleteIngredientByDishId = (dishId, result) => {
  db.query("DELETE FROM ingredient WHERE dishId = ?", [dishId], (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
  });
}

Ingredient.getIngredientsByDishId = (dishId, result) => {
  db.query(
    "SELECT * FROM ingredient WHERE dishId = ?",
    [dishId],
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



export default Ingredient;
