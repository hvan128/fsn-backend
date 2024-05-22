export const getAllPosition = (req, res) => {
    Position.getAllPosition((err, data) => {
        res.send({result: data})
    })
}

export const deletePosition = (req, res) => {
    var id = req.body.id
    Position.delete(id, (result) => {
        res.send(result)
    })
}

export const addPosition = (req, res) => {
    var data = req.body
    Position.create(data, (result) => {
        res.send(result)
    })
}