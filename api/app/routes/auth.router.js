import * as authController from '../controllers/auth.controller.js'

export default (router) => {
    router.post('/api/v1/auth/login', function(req, res, next) {
        authController.login(req, res);
    })

    router.post('/api/v1/auth/register', function(req, res, next) {
        authController.register(req, res);
    })

    router.post('/api/v1/auth/login-with-google', function(req, res, next) {
        authController.loginWithGoogle(req, res);
    })
}