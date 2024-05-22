class Position {
    constructor(id, label) {
        this.id = id
        this.label = label
        this.value = label.toLowerCase().replace(' ', '-')
    }
}

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

Position.create = (data, result) => {
    db.query('INSERT INTO positions SET ?', data, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        } else {
            result(null, { id: res.insertId, ...data });
        }
    })
}

Position.getAllPosition = (result) => {
    db.query('SELECT * FROM positions', (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    })
}

Position.delete = (id, result) => {
    db.query(`DELETE FROM positions WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}