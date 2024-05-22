import * as UserController from '../controllers/user.controller.js';

export default (router) => {
    router.get('/api/v1/user', function(req, res, next) {
        UserController.getAllUser(req, res, next);
    })

    router.get('/api/v1/user/:id', function(req, res, next) {
        UserController.findById(req, res);
    })

    router.get('/api/v1/user/fridge/:fridgeId', function(req, res, next) {
        UserController.findByFridgeId(req, res);
    })

    router.post('/api/v1/user/email', function(req, res, next) {
        UserController.findByEmail(req, res);
    })

    router.post('/api/v1/user', function(req, res, next) {
        UserController.create(req, res);
    })

    router.put('/api/v1/user', function(req, res) {
        UserController.update(req, res);
    })
}