import Save from "../models/save.model.js";

export const createSave = (req, res, next) => {
    var data = req.body;
    Save.create(data, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.send(result);
        }
    });
}

export const unSaved = (req, res, next) => {
    var data = req.body;
    Save.unSaved(data, (err, result) => {
      if (err) {
        next(err);
      } else {
        res.send(result);
      }
    });
}