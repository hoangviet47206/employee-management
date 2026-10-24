document.addEventListener("DOMContentLoaded", () => {
  // ========================
  // ELEMENTS
  // ========================

  const rows =
    document.querySelectorAll(
      "table tbody tr[data-employee]"
    );

  const modal =
    document.querySelector(
      ".edit-modal"
    );

  const closeBtn =
    document.querySelector(
      ".close-btn"
    );

  const form =
    document.querySelector(
      ".edit-form"
    );

  // Employee không có modal
  // nên JS kết thúc ở đây
  if (!modal || !form) {
    return;
  }


  // ========================
  // EDIT FIELDS
  // ========================

  const fields = [
    "employeeNumber",
    "firstName",
    "lastName",
    "extension",
    "email",
    "officeCode",
    "reportsTo",
    "jobTitle",
  ];


  // ========================
  // OPEN MODAL
  // ========================

  rows.forEach((row) => {
    row.addEventListener(
      "click",
      () => {
        const employeeData =
          row.getAttribute(
            "data-employee"
          );

        if (!employeeData) {
          return;
        }

        let employee;

        try {
          employee =
            JSON.parse(
              employeeData
            );
        } catch (error) {
          console.error(
            "Invalid employee data:",
            error
          );

          return;
        }


        // Fill edit form
        fields.forEach(
          (field) => {
            const input =
              form.querySelector(
                `#edit-${field}`
              );

            if (!input) {
              return;
            }

            input.value =
              employee[field] ??
              "";
          }
        );


        // Open modal
        modal.classList.add(
          "open"
        );
      }
    );
  });


  // ========================
  // CLOSE MODAL
  // ========================

  if (closeBtn) {
    closeBtn.addEventListener(
      "click",
      () => {
        modal.classList.remove(
          "open"
        );
      }
    );
  }


  // Click outside modal
  modal.addEventListener(
    "click",
    (event) => {
      if (
        event.target === modal
      ) {
        modal.classList.remove(
          "open"
        );
      }
    }
  );


  // ========================
  // ESC TO CLOSE
  // ========================

  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key ===
          "Escape" &&
        modal.classList.contains(
          "open"
        )
      ) {
        modal.classList.remove(
          "open"
        );
      }
    }
  );


  // ========================
  // DELETE
  // ADMIN ONLY
  // ========================

  const deleteBtn =
    form.querySelector(
      ".delete-button"
    );

  // Manager không có nút Delete,
  // nên phần này chỉ chạy với admin
  if (deleteBtn) {
    deleteBtn.addEventListener(
      "click",
      async () => {
        const employeeNumber =
          form.querySelector(
            "#edit-employeeNumber"
          )?.value;

        if (!employeeNumber) {
          return;
        }


        const confirmed =
          confirm(
            "Are you sure you want to delete this employee?"
          );

        if (!confirmed) {
          return;
        }


        try {
          const response =
            await fetch(
              "/delete",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body:
                  JSON.stringify({
                    employeeNumber,
                  }),
              }
            );


          if (response.ok) {
            location.reload();

            return;
          }


          const message =
            await response.text();

          alert(
            `Delete failed: ${message}`
          );
        } catch (error) {
          console.error(
            "Delete error:",
            error
          );

          alert(
            "Server error!"
          );
        }
      }
    );
  }
});