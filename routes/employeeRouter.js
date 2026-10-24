const { Router } = require("express");

const {
  renderEmployee,
  addEmployee,
  deleteEmployee,
  updateEmployee,
} = require("../controllers/employeeController");

const {
  requireAuth,
} = require("../middleware/authMiddleware");

const employeeRouter = Router();

employeeRouter.get(
  "/",
  requireAuth,
  renderEmployee
);

employeeRouter.post(
  "/add",
  requireAuth,
  addEmployee
);

employeeRouter.post(
  "/delete",
  requireAuth,
  deleteEmployee
);

employeeRouter.post(
  "/update",
  requireAuth,
  updateEmployee
);

module.exports = employeeRouter;