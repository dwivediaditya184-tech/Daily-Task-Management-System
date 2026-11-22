// Four simple JavaScript functionalities
var tasks = [];

function addTask() {
    var input = document.getElementById("taskInput");
    var priority = document.getElementById("taskPriority").value;
    var taskName = input.value.trim();

    if (taskName === "") {
        document.getElementById("message").innerHTML = "Please enter a task name.";
        return;
    }

    tasks.push({name: taskName, priority: priority, completed: false});
    input.value = "";
    document.getElementById("message").innerHTML = "";
    showTasks();
}

function showTasks() {
    var list = document.getElementById("taskList");
    list.innerHTML = "";

    if (tasks.length === 0) {
        list.innerHTML = '<li class="empty-message">No tasks yet. Add your first task above.</li>';
    }

    for (var i = 0; i < tasks.length; i++) {
        var item = document.createElement("li");
        item.className = "task-item";
        var taskText = document.createElement("span");
        taskText.className = "task-name";
        taskText.innerHTML = tasks[i].name;
        if (tasks[i].completed) taskText.className = "task-name completed";

        var priorityText = document.createElement("span");
        priorityText.className = "priority";
        priorityText.innerHTML = tasks[i].priority;

        var completeButton = document.createElement("button");
        completeButton.className = "complete-button";
        completeButton.innerHTML = tasks[i].completed ? "Undo" : "Complete";
        completeButton.onclick = (function(index) {
            return function() {
                tasks[index].completed = !tasks[index].completed;
                showTasks();
            };
        })(i);

        var deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = (function(index) {
            return function() {
                tasks.splice(index, 1);
                showTasks();
            };
        })(i);

        item.appendChild(taskText);
        item.appendChild(priorityText);
        item.appendChild(completeButton);
        item.appendChild(deleteButton);
        list.appendChild(item);
    }
    updateCounter();
}

function updateCounter() {
    var completed = 0;
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].completed) completed++;
    }
    document.getElementById("totalTasks").innerHTML = tasks.length;
    document.getElementById("completedTasks").innerHTML = completed;
    document.getElementById("pendingTasks").innerHTML = tasks.length - completed;
}
