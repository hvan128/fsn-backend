import db from "../common/connect.js";
class Invitation {
  constructor(id, senderId, receiverId, fridgeId, createdAt, active) {
    this.id = id;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.fridgeId = fridgeId;
    this.createdAt = createdAt;
    this.active = active;
  }
}

/!* Create a new Invitation */;
Invitation.create = (data, result) => {
  db.query("INSERT INTO invitations SET ?", data, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      result(null, { id: res.insertId, ...data });
    }
  });
};

/!* Get all Invitations */;
Invitation.getAllInvitationByReceiver = (id, result) => {
  db.query("SELECT * FROM invitations WHERE receiverId = ? AND active = 1 ORDER BY createdAt DESC", [id], (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      console.log(res);
      result(null, res);
    }
  });
};

Invitation.acceptInvitation = (data, result) => {
  db.query(
    "UPDATE invitations SET active = ? WHERE id = ?",
    [data.active, data.id],
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      } else {
        db.query("UPDATE users SET fridgeId = ? WHERE id = ?", [data.fridgeId, data.receiverId], (err, res) => {
          if (err) {
            console.log(err);
            result(err, null);
            return;
          }
        })
        result(null, { id: data.id, ...data });
      }
    }
  );
}

export default Invitation;
