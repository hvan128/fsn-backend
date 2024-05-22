class SubPosition {
    constructor(id, label, positionId) {
        this.id = id
        this.label = label
        this.value = label.toLowerCase().replace(' ', '-')
        this.positionId = positionId
    }
}

SubPosition.create = (data, result) => {
    db.query('INSERT INTO sub_positions SET ?', data, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        } else {
            result(null, { id: res.insertId, ...data });
        }
    })
}

SubPosition.findByPositionId = (positionId, result) => {
    db.query(`SELECT * FROM sub_positions WHERE positionId = ${positionId}`, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}