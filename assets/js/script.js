var input = document.querySelector("#newtask input");

input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addtask();
    }
});

if (localStorage.getItem("mytasks") == null) {
    localStorage.setItem("mytasks", "[]");
} else {
    showTask();
}

document.querySelector("#addbtn").onclick = function () {
    addtask();
};

function addtask() {
    if (document.querySelector("#newtask input").value.length == 0) {
        alert("Please Enter a Task!");
    } else {
        if (localStorage.getItem("mytasks") == null) {
            localStorage.setItem("mytasks", "[]");
        }

        var newtask = document.querySelector("#newtask input").value;

        oldtasks = JSON.parse(localStorage.getItem("mytasks"));
        oldtasks.push(newtask);
        localStorage.setItem("mytasks", JSON.stringify(oldtasks));

        showTask();

        input.value = "";
    }
}

function showTask() {
    mytasks = JSON.parse(localStorage.getItem("mytasks"));
    document.querySelector(".task-container").innerHTML = "";
    for (i = 0; i < mytasks.length; i++) {
        document.querySelector(".task-container").innerHTML += `
        <div class="task-card">
        <span class="taskname" id="${i}" onclick="completed(${i})">
        ${mytasks[i]}
        </span>
        <button class="trash" onclick="deleteTask(${i})">
        <i class="fas fa-trash"></i>
        </button>
        </div>
        `;
    }
}

function deleteTask(index) {
    mytasks = JSON.parse(localStorage.getItem("mytasks"));
    mytasks.splice(index, 1);
    localStorage.setItem("mytasks", JSON.stringify(mytasks));
    showTask();
}

function completed(index) {
    var element = document.getElementById(index);
    element.classList.toggle("completed");
}
