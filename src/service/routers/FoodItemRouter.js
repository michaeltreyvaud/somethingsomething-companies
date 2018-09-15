const Express = require('express');
const FoodItemController = require('../controllers/fooditem/FoodItemController');

const FoodItemRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { COMPANY_NAME, FOOD_ITEM_TABLE } = environment;
  const { Logger, DocumentClient } = dependencies;
  const controller = new FoodItemController(Logger, DocumentClient, COMPANY_NAME, FOOD_ITEM_TABLE);

  router.post('/describe', controller.describe);
  router.post('/update', controller.update);
  router.post('/list', controller.list);
  router.post('/delete', controller.delete);
  router.post('/create', controller.create);

  return router;
};

module.exports = FoodItemRouter;