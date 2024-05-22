import db from "../common/connect.js";
class Save {
    constructor(userId, dishId, savedAt) {
        this.userId = userId;
        this.dishId = dishId;
        this.savedAt = savedAt;
    }
}

Save.create = (data, result) => {
    db.query('INSERT INTO saved_dish SET ?', data, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        } else {
            result(null, { id: res.insertId, ...data });
        }
    });
}

Save.findByDishId = (dishId, result) => {
    db.query('SELECT * FROM saved_dish WHERE dishId = ?', [dishId], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        } else {
            result(null, res);
        }
    })
}

Save.unSaved = (data, result) => {
    db.query('DELETE FROM saved_dish WHERE userId = ? AND dishId = ?', [data.userId, data.dishId], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        } else {
            result(null, res);
        }
    })
}

export default Save