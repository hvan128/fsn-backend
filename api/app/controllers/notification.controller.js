import fcm from "fcm-node";
import admin from "firebase-admin";
import serviceAccount from "../../config/push-notification-key.js";
import Notification from "../models/notification.model.js";

const certPath = admin.credential.cert(serviceAccount);
var FCM = new fcm(certPath);

export const sendPushNotification = async (req, res, next) => {
  try {
    const message = {
      to: req.body.receiverToken,
      notification: {
        title: req.body.title,
        body: req.body.body,
      },
      data: req.body.data,
    };
    FCM.send(message, function (err, response) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(response);
      }
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createNotification = async (req, res, next) => {
  var data = req.body;
  Notification.create(data, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.send(result);
    }
  });  
};

export const getCommunityNotification = (req, res, next) => {
  var id = req.params.id;
  Notification.getCommunityNotification(id, (err, data) => {
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
  })
};

export const getFridgeNotification = (req, res, next) => {
  var id = req.params.id;
  Notification.getFridgeNotification(id, (err, data) => {
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
}

export const read = (req, res, next) => {
  var id = req.params.id;
  Notification.read(id, (err, result) => {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      res.send(result);
    }
  });
};
