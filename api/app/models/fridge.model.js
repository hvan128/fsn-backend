import db from "../common/connect.js";
class Fridge {
  constructor(id, name, ownerId, usersId) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
    this.usersId = usersId;
  }
}

Fridge.create = (data, result) => {
  db.query("INSERT INTO fridges SET ?", data, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      db.query(
        "UPDATE users SET fridgeId = ? WHERE id = ?",
        [res.insertId, data.ownerId],
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

Fridge.getFridgeById = (id, result) => {
  db.query(`SELECT * FROM fridges WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Fridge.delete = (id, result) => {
  db.query(`DELETE FROM fridges WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

export default Fridge;
