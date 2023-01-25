Cypress.Commands.add("createTask", (taskName = "") => {
  cy.visit("/");
  cy.get('input[placeholder="Add a new Task"]').as("inputTasks");

  if (taskName !== "") {
    cy.get("@inputTasks").type(taskName);
  }

  cy.contains("button", "Create").click();
});

Cypress.Commands.add("removeTaskByName", (taskName) => {
  cy.request({
    url: Cypress.env("apiUrl") + "/helper/tasks",
    method: "DELETE",
    body: { name: taskName },
  }).then((response) => {
    expect(response.status).to.eq(204);
  });
});

Cypress.Commands.add("addTaskApi", (taks) => {
  cy.request({
    url: Cypress.env("apiUrl") + "/tasks",
    method: "POST",
    body: taks,
  }).then((response) => {
    expect(response.status).to.eq(201);
  });
});

Cypress.Commands.add("isRequired", (targetMassage) => {
  cy.get("@inputTasks")
    .invoke("prop", "validationMessage")
    .should((text) => {
      expect(targetMassage).to.eq(text);
    });
});
