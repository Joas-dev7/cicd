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