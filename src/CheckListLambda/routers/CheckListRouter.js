const Express = require('express');
const CheckListTaskController = require('../controllers/CheckListTaskController');
const CheckListCategoryController = require('../controllers/CheckListCategoryController');

const CheckListRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { COMPANY_NAME, CHECKLIST_TASK_TABLE, CHECKLIST_CATEGORY_TABLE } = environment;
  const { Logger, DocumentClient } = dependencies;
  const checkListTaskController = new CheckListTaskController(
    Logger, DocumentClient,
    COMPANY_NAME, CHECKLIST_TASK_TABLE,
  );
  const checkListCategoryController = new CheckListCategoryController(
    Logger, DocumentClient,
    COMPANY_NAME, CHECKLIST_CATEGORY_TABLE,
  );

  router.post('/task/describe', checkListTaskController.describe);
  router.post('/task/update', checkListTaskController.update);
  router.post('/task/list', checkListTaskController.list);
  router.post('/task/delete', checkListTaskController.delete);
  router.post('/task/create', checkListTaskController.create);

  router.post('/category/describe', checkListCategoryController.describe);
  router.post('/category/update', checkListCategoryController.update);
  router.post('/category/list', checkListCategoryController.list);
  router.post('/category/delete', checkListCategoryController.delete);
  router.post('/category/create', checkListCategoryController.create);

  return router;
};

module.exports = CheckListRouter;
