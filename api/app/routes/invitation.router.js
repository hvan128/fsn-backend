import * as InvitationController from "../controllers/invitation.controller.js";

export default (router) => {
    router.get('/api/v1/invitation/:receiverId', function(req, res, next) {
        InvitationController.getAllInvitationByReceiver(req, res, next);
    })
    router.post('/api/v1/invitation', function(req, res, next) {
        InvitationController.createInvitation(req, res, next);
    })
    router.put('/api/v1/invitation', function(req, res, next) {
        InvitationController.acceptInvitation(req, res, next);
    })
}