import * as dishController from "../controllers/dish.controller.js";
import * as feelController from "../controllers/feel.controller.js";
import * as saveController from "../controllers/save.controller.js";
import * as feedbackController from "../controllers/feedback.controller.js";

export default (router) => {
  router.get("/api/v1/community/dish", function (req, res, next) {
    dishController.getAllDish(req, res, next);
  });

  router.get("/api/v1/community/dish/:id", function (req, res, next) {
    dishController.getDishById(req, res, next);
  });

  router.get("/api/v1/community/dish/owner/:id", function (req, res, next) {
    dishController.getDishByOwnerId(req, res, next);
  });

  router.get("/api/v1/community/dish/saved/:id", function (req, res, next) {
    dishController.getSavedDishesByUserId(req, res, next);
  });

  router.get("/api/v1/community/dish/feedback/:id", function (req, res, next) {
    feedbackController.getFeedbackByDishId(req, res, next);
  });

  router.get("/api/v1/community/feedback", function (req, res, next) {
    feedbackController.getAllFeedback(req, res, next);
  })

  router.post("/api/v1/community/dish/keyword", function (req, res, next) {
    dishController.getDishByKeyword(req, res, next);
  })

  router.post("/api/v1/community/dish", function (req, res, next) {
    dishController.createDish(req, res, next);
  });

  router.post("/api/v1/community/dish/ingredient", function (req, res, next) {
    dishController.getDishByIngredient(req, res, next);
  });

  router.post("/api/v1/community/dish/feel", function (req, res, next) {
    feelController.createFeel(req, res, next);
  });

  router.post("/api/v1/community/dish/save", function (req, res, next) {
    saveController.createSave(req, res, next);
  });

  router.post("/api/v1/community/dish/unsaved", function (req, res, next) {
    saveController.unSaved(req, res, next);
  });

  router.post("/api/v1/community/dish/feedback", function (req, res, next) {
    feedbackController.create(req, res, next);
  });

  router.put("/api/v1/community/dish/:id", function (req, res, next) {
    dishController.updateDish(req, res, next);
  });

  router.delete("/api/v1/community/dish/feel", function (req, res, next) {
    feelController.deleteFeelDish(req, res, next);
  });

  router.delete("/api/v1/community/dish/feedback/feel", function (req, res, next) {
    feelController.deleteFeelFeedback(req, res, next);
  })
};
