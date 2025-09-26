
document.addEventListener("DOMContentLoaded", () => {
  let inputs = document.querySelector("#input_task");
  let adddBtn = document.querySelector("#add_btn");
  let taskList = document.querySelector(".task_list");
  let task = [];
  let localStorageData = localStorage.getItem("task array");

  if (localStorageData != null) {
    let ogData = JSON.parse(localStorageData);
    task = ogData;
    makeToDo();
  }

  adddBtn.addEventListener("click", () => {
    let query = inputs.value;
    inputs.value = "";
    if (query.trim() === "") {
      alert("No task entered");
      throw new Error("empty input error");
    }

    let taskObj = {
      id: Date.now(),
      text: query
    }

    task.push(taskObj);
    localStorage.setItem("task array", JSON.stringify(task));
    makeToDo();
  });

  function makeToDo() {

    taskList.innerHTML = "";
    for (let i = 0; i < task.length; i++) {
      let { id, text } = task[i];
      let element = document.createElement("div");
      element.classList.add("todo");
      element.innerHTML = `
    <span class="task">${text}</span>
    <button class ="edit">Edit</button>
    <span class ="delete" title = "delete"><i class="fa-solid fa-trash"></i></span>
    `;

      let taskText = element.querySelector(".task");
      let deleteBtn = element.querySelector(".delete");
      let editBtn = element.querySelector(".edit");

      //Delete

      deleteBtn?.addEventListener("click", () => {
        let filteredArray = task.filter(function (taskObj) {
          return taskObj.id != id;
        });
        task = filteredArray;
        localStorage.setItem("task array", JSON.stringify(task));
        taskList.removeChild(element);
      });

      //Edit

      editBtn.addEventListener("click", () => {
        if (editBtn.innerText === "Edit") {
          taskText.setAttribute("contenteditable", "true");   //Enable editing
          taskText.focus();   //focus on text to start editing
          editBtn.innerText = "Save";
        }

        else {
          taskText.setAttribute("contenteditable", "false");
          let updatedText = taskText.innerText.trim();
          if (updatedText !== "") {
            task = task.map(function (taskObj) {
              if (taskObj.id === id) {
                taskObj.text = updatedText;
              }
              return taskObj;
            });
            localStorage.setItem("task array", JSON.stringify(task));
          }
          else {
            alert("No task entered");
            taskText.innerText = "No task entered";
            task = task.map(function (taskObj) {
              if (taskObj.id === id) {
                taskObj.text = taskText.innerText;
              }
              return taskObj;
            });
            localStorage.setItem("task array", JSON.stringify(task));
          }
          editBtn.innerText = "Edit";
        }
      });

      taskList.appendChild(element);

    }
  }
});