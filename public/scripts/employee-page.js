document.addEventListener("DOMContentLoaded", () => {
  // ========================
  // ELEMENTS
  // ========================

  const rows = document.querySelectorAll(".employee-row");

  const modal = document.getElementById("editModal");
  const closeBtn = document.getElementById("closeModal");

  const updateForm = document.getElementById("updateForm");
  const deleteForm = document.getElementById("deleteForm");

  if (!modal || !updateForm || !deleteForm) {
    return;
  }


  // ========================
  // EDIT INPUTS
  // ========================

  const editEmployeeNumber =
    document.getElementById("editEmployeeNumber");

  const editFirstName =
    document.getElementById("editFirstName");

  const editLastName =
    document.getElementById("editLastName");

  const editExtension =
    document.getElementById("editExtension");

  const editEmail =
    document.getElementById("editEmail");

  const editOfficeCode =
    document.getElementById("editOfficeCode");

  const editReportsTo =
    document.getElementById("editReportsTo");

  const editJobTitle =
    document.getElementById("editJobTitle");

  const deleteEmployeeNumber =
    document.getElementById("deleteEmployeeNumber");


  // ========================
  // OPEN EDIT MODAL
  // ========================

  rows.forEach((row) => {
    row.addEventListener("click", () => {
      const employeeNumber =
        row.dataset.employeeNumber;

      const firstName =
        row.dataset.firstName;

      const lastName =
        row.dataset.lastName;

      const extension =
        row.dataset.extension;

      const email =
        row.dataset.email;

      const officeCode =
        row.dataset.officeCode;

      const reportsTo =
        row.dataset.reportsTo;

      const jobTitle =
        row.dataset.jobTitle;


      // Fill update form
      editEmployeeNumber.value =
        employeeNumber || "";

      editFirstName.value =
        firstName || "";

      editLastName.value =
        lastName || "";

      editExtension.value =
        extension || "";

      editEmail.value =
        email || "";

      editOfficeCode.value =
        officeCode || "";

      editReportsTo.value =
        reportsTo || "";

      editJobTitle.value =
        jobTitle || "";


      // Employee number dùng cho delete
      deleteEmployeeNumber.value =
        employeeNumber || "";


      // Open modal
      modal.classList.add("open");
    });
  });


  // ========================
  // CLOSE MODAL
  // ========================

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("open");
    });
  }


  // Click outside modal
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("open");
    }
  });


  // ========================
  // ESC TO CLOSE
  // ========================

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      modal.classList.contains("open")
    ) {
      modal.classList.remove("open");
    }
  });


  // ========================
  // DELETE CONFIRMATION
  // ========================

  deleteForm.addEventListener("submit", (event) => {
    const confirmed = confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) {
      event.preventDefault();
    }
  });
});