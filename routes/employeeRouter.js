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

const {
  requireRole,
} = require("../middleware/roleMiddleware");

const employeeRouter = Router();


// ========================
// VIEW / FILTER EMPLOYEES
// employee / manager / admin
// ========================

employeeRouter.get(
  "/",
  requireAuth,
  renderEmployee
);


// ========================
// ADD EMPLOYEE
// manager / admin
// ========================

employeeRouter.post(
  "/add",
  requireAuth,
  requireRole("manager", "admin"),
  addEmployee
);


// ========================
// UPDATE EMPLOYEE
// manager / admin
// ========================

employeeRouter.post(
  "/update",
  requireAuth,
  requireRole("manager", "admin"),
  updateEmployee
);


// ========================
// DELETE EMPLOYEE
// admin only
// ========================

employeeRouter.post(
  "/delete",
  requireAuth,
  requireRole("admin"),
  deleteEmployee
);


module.exports = employeeRouter;