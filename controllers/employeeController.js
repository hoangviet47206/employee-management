const db = require("../models/queries");


// ========================
// RENDER EMPLOYEE
// ========================

const renderEmployee = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const filters = {
      employeeNumber: req.query.employeeNumber || "",
      lastName: req.query.lastName || "",
      firstName: req.query.firstName || "",
      extension: req.query.extension || "",
      email: req.query.email || "",
      officeCode: req.query.officeCode || "",
      reportsTo: req.query.reportsTo || "",
      jobTitle: req.query.jobTitle || "",
    };

    const isFiltering = Object.values(filters).some((v) => v);

    let employees;
    let totalItems;

    if (isFiltering) {
      employees = await db.getEmployees(page, filters);
      totalItems = await db.getEmployeeCount(filters);
    } else {
      employees = await db.getEmployees(page);
      totalItems = await db.getEmployeeCount();
    }

    const totalPages = Math.ceil(totalItems / db.PAGE_SIZE);

    res.render("employee-page", {
      employees,
      totalEmployees: totalItems,
      currentpage: page,
      totalPages,
      filters,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).render("error-page", {
      message: error.message,
    });
  }
};


// ========================
// VALIDATION
// ========================

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validateNumber = (value) => {
  return (
    value !== undefined &&
    value !== null &&
    value !== "" &&
    !isNaN(Number(value))
  );
};


// ========================
// ADD EMPLOYEE
// ========================

const addEmployee = async (req, res) => {
  const {
    employeeNumber,
    lastName,
    firstName,
    extension,
    email,
    officeCode,
    reportsTo,
    jobTitle,
  } = req.body;

  if (!employeeNumber || !validateNumber(employeeNumber)) {
    return res.status(400).render("error-page", {
      message: "Invalid employee number",
    });
  }

  if (!lastName || lastName.length > 50) {
    return res.status(400).render("error-page", {
      message: "Invalid last name",
    });
  }

  if (!firstName || firstName.length > 50) {
    return res.status(400).render("error-page", {
      message: "Invalid first name",
    });
  }

  if (!jobTitle || jobTitle.length > 50) {
    return res.status(400).render("error-page", {
      message: "Invalid job title",
    });
  }

  if (!email || !validateEmail(email)) {
    return res.status(400).render("error-page", {
      message: "Invalid email",
    });
  }

  if (extension && extension.length > 10) {
    return res.status(400).render("error-page", {
      message: "Extension too long",
    });
  }

  if (officeCode && officeCode.length > 10) {
    return res.status(400).render("error-page", {
      message: "Office code too long",
    });
  }

  if (reportsTo && !validateNumber(reportsTo)) {
    return res.status(400).render("error-page", {
      message: "reportsTo must be a number",
    });
  }

  try {
    await db.addNewEmployee({
      employeeNumber: Number(employeeNumber),
      lastName,
      firstName,
      extension,
      email,
      officeCode,
      reportsTo: reportsTo ? Number(reportsTo) : null,
      jobTitle,
    });

    res.redirect("/");
  } catch (error) {
    console.error(error);

    return res.status(500).render("error-page", {
      message: error.message,
    });
  }
};


// ========================
// DELETE EMPLOYEE
// ========================

const deleteEmployee = async (req, res) => {
  try {
    const employeeNumber = parseInt(req.body.employeeNumber);

    if (!employeeNumber) {
      return res.status(400).render("error-page", {
        message: "Invalid employee number",
      });
    }

    await db.deleteEmployee(employeeNumber);

    res.redirect("/");
  } catch (error) {
    console.error(error);

    return res.status(500).render("error-page", {
      message: error.message,
    });
  }
};


// ========================
// UPDATE EMPLOYEE
// ========================

const updateEmployee = async (req, res) => {
  try {
    const employeeNumber = parseInt(req.body.employeeNumber);

    if (!employeeNumber) {
      return res.status(400).render("error-page", {
        message: "Invalid employee number",
      });
    }

    const {
      lastName,
      firstName,
      extension,
      email,
      officeCode,
      reportsTo,
      jobTitle,
    } = req.body;

    if (lastName && lastName.length > 50) {
      return res.status(400).render("error-page", {
        message: "Last name too long",
      });
    }

    if (firstName && firstName.length > 50) {
      return res.status(400).render("error-page", {
        message: "First name too long",
      });
    }

    if (jobTitle && jobTitle.length > 50) {
      return res.status(400).render("error-page", {
        message: "Job title too long",
      });
    }

    if (email && !validateEmail(email)) {
      return res.status(400).render("error-page", {
        message: "Invalid email",
      });
    }

    if (extension && extension.length > 10) {
      return res.status(400).render("error-page", {
        message: "Extension too long",
      });
    }

    if (officeCode && officeCode.length > 10) {
      return res.status(400).render("error-page", {
        message: "Office code too long",
      });
    }

    if (reportsTo && !validateNumber(reportsTo)) {
      return res.status(400).render("error-page", {
        message: "reportsTo must be a number",
      });
    }

    const updateData = {
      employeeNumber,
      lastName,
      firstName,
      extension,
      email,
      officeCode,
      reportsTo: reportsTo ? Number(reportsTo) : null,
      jobTitle,
    };

    await db.updateEmployee(updateData);

    res.redirect("/");
  } catch (error) {
    console.error(error);

    return res.status(500).render("error-page", {
      message: error.message,
    });
  }
};


// ========================
// EXPORT
// ========================

module.exports = {
  renderEmployee,
  addEmployee,
  deleteEmployee,
  updateEmployee,
};