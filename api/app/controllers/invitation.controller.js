import Invitation from "../models/invitation.model.js";

export const getAllInvitationByReceiver = (req, res, next) => {
  var id = req.params.receiverId;
  Invitation.getAllInvitationByReceiver(id, (err, data) => {
    console.log(data);
    if (err) {
      return next(err);
    } else if (data == null || data.length == 0) {
      return res.status(200).send("No data");
    } else {
      return res.status(200).send({
        message: "Success",
        data: data,
      });
    }
  });
};

export const acceptInvitation = (req, res, next) => {
  var data = req.body;
  Invitation.acceptInvitation(data, (err, result) => {
    if (err) {
      return next(err);
    } else {
      res.send(result);
    }
  });
};

export const createInvitation = (req, res, next) => {
  var data = req.body;
  Invitation.create(data, (err, result) => {
    if (err) {
      return next(err);
    } else {
      res.send(result);
    }
  });
};
