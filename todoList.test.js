const { JSDOM } = require("jsdom");

describe("To-Do List", () => {
    let document;
    let window;
    let taskInput;
    let taskList;

    beforeEach(() => {
        // Création du DOM simulé
        const dom = new JSDOM(`<!DOCTYPE html>
            <html>
            <body>
                <input type="text" id="taskInput">
                <ul id="taskList"></ul>
            </body>
            </html>`, { runScripts: "dangerously" });

        window = dom.window;
        document = window.document;
        taskInput = document.getElementById("taskInput");
        taskList = document.getElementById("taskList");

        // Injection manuelle de la fonction addTask dans JSDOM
        window.eval(`
            function addTask() {
                let taskInput = document.getElementById("taskInput");
                let taskText = taskInput.value.trim();
                if (taskText === "") return;

                let taskList = document.getElementById("taskList");
                let li = document.createElement("li");
                li.className = "task";
                li.textContent = taskText;

                let deleteButton = document.createElement("span");
                deleteButton.textContent = "❌";
                deleteButton.className = "delete";
                deleteButton.addEventListener("click", function () {
                    li.remove();
                });

                li.appendChild(deleteButton);
                taskList.appendChild(li);

                taskInput.value = "";
            }
        `);
    });

    test("Ajout d'une tâche", () => {
        taskInput.value = "Nouvelle tâche";
        window.addTask();  // Utilisation correcte
        expect(taskList.children.length).toBe(1);
        expect(taskList.children[0].textContent.includes("Nouvelle tâche")).toBe(true);
    });

    test("Ajout d'une tâche vide ne doit rien ajouter", () => {
        taskInput.value = " ";
        window.addTask();
        expect(taskList.children.length).toBe(0);
    });

    test("Suppression d'une tâche", () => {
        taskInput.value = "Tâche à supprimer";
        window.addTask();
        let deleteButton = taskList.children[0].querySelector(".delete");
        deleteButton.click();
        expect(taskList.children.length).toBe(0);
    });
});
