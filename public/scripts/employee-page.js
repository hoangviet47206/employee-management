document.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll("table tbody tr");
  const modal = document.querySelector(".edit-modal");
  const closeBtn = document.querySelector(".close-btn");
  const form = document.querySelector(".edit-form");

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

  rows.forEach((row) => {
    row.addEventListener("click", () => {
      const dataStr = row.getAttribute("data-employee");
      if (!dataStr) return;

      const employee = JSON.parse(dataStr);

      fields.forEach((field) => {
        const input = form.querySelector(`#edit-${field}`);
        if (input) {
          input.value =
            employee[field] !== null && employee[field] !== undefined
              ? employee[field]
              : "";
          input.dataset.original = input.value;
        }
      });

      modal.classList.add("open");
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
    }
  });

  const deleteBtn = form.querySelector('button[type="button"]');

  deleteBtn.addEventListener("click", async () => {
    const employeeNumber = form.querySelector("#edit-employeeNumber").value;
    if (!employeeNumber) return;

    try {
      const response = await fetch("/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeeNumber }),
      });

      if (response.ok) {
        location.reload();
      } else {
        const text = await response.text();
        alert("Delete failed: " + text);
      }
    } catch (err) {
      console.error(err);
      alert("Server error!");
    }
  });
});
