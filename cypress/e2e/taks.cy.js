/// <reference type="cypress" >
import { faker } from "@faker-js/faker";

describe("Tarefas", () => {
  let testData; //Começa vazia

  before(() => {
    cy.fixture("tasks").then((t) => {
      testData = t;
    });
  });

  context("Cadastro", () => {
    it("Deve cadastrar uma nova tarefas", () => {
      const taskName = "Ler Livro Teste de Software.js";

      cy.removeTaskByName(taskName);
      cy.createTask(taskName);

      cy.contains("main div p", "Ler Livro Teste de Software.js").should(
        "be.visible"
      );
    });

    it("Não deve cadastrar uma nova tarefas", () => {
      const taks = testData.dupli;

      cy.removeTaskByName(taks.name);

      //dado que tenho uma tarefa duplicada
      cy.addTaskApi(taks);

      //Quando faço o cadastro novamente
      cy.createTask(taks.name);

      //Então vejo a mensagem de duplicidade
      cy.get(".swal2-html-container")
        .should("be.visible")
        .should("have.text", "Task already exists!");
    });

    it("Campo obrigatório", () => {
      cy.createTask();
      cy.isRequired("This is a required field");
    });
  });

  context("Atualização", () => {
    it("Deve concluir uma tarefa", () => {
      const task = {
        name: "Organizar contas de História",
        is_done: false,
      };

      cy.removeTaskByName(task.name);
      cy.addTaskApi(task);

      cy.visit("/");
      cy.contains("p", task.name)
        .parent() //Parent:  pega o elemento pai da tarefa
        .find("button[class*=ItemToggle]") //Expressão regular
        .click();

      cy.contains("p", task.name).should(
        "have.css",
        "text-decoration-line",
        "line-through"
      );
    });
  });

  context("Exclusão", () => {
    it("Deve remover uma tarefa", () => {
      const task = {
        name: "Tocar Violão",
        is_done: false,
      };

      cy.removeTaskByName(task.name);
      cy.addTaskApi(task);

      cy.visit("/");
      cy.contains("p", task.name)
        .parent() //Parent:  pega o elemento pai da tarefa
        .find("button[class*=ItemDelete]") //Expressão regular
        .click();

      cy.contains("p", task.name).should("not.exist");
    });
  });
});
