export const addSubPosition = (req, res) => {
    var data = req.body
    SubPosition.create(data, (result) => {
        res.send(result)
    })
}

export const getSubPositionByPositionId = (req, res) => {
    var positionId = req.params.positionId
    SubPosition.findByPositionId(positionId, (err, result) => {
        res.send(result)
    })
}