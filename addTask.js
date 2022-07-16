let button_add = document.getElementById("add-task-button");
let task_list = document.getElementById("task-list");
let delete_btn = document.querySelectorAll(".delete-btn");
taskList = []

const createLi = function (span_value, task_textDecoration) {
   let li = document.createElement("li");
   let input = document.createElement("input");
   let span = document.createElement("span");
   let delButton = document.createElement("button");
   let divContainer = document.createElement("div");

   input.setAttribute("type","checkbox");
   input.addEventListener('change',function (){
      if (this.checked) {
         let task = this.parentElement.querySelector(".task");
         task.style.textDecoration = "line-through";
      } else {
         let task = this.parentElement.querySelector(".task");
         task.style.textDecoration = "none";
      }
   });

   span.className = "task";
   span.innerText = span_value;
   span.style.textDecoration = task_textDecoration;

   delButton.className = "delete-btn";
   delButton.addEventListener("click", function () {
      let deleted = delButton.parentElement.parentElement;
      task_list.removeChild(deleted);
      for (let i = 0; i < taskList.length; ++i) {
         if (taskList[i]!==null) {
            if (taskList[i]["value"]===span_value)  {
               delete(taskList[i]);
               localStorage.setItem("list_item", JSON.stringify(taskList));
               break;
            }
         }
      }
   });

   divContainer.appendChild(input);
   divContainer.appendChild(span);
   divContainer.appendChild(delButton);

   li.appendChild(divContainer);

   return li;
}

let taskList_ = JSON.parse(localStorage.getItem("list_item")) || [];
for (let i = 0; i < taskList_.length; ++i) {
   let l_task = taskList_[i];
   if (l_task!==null) {
      let li = createLi(l_task["value"],l_task["textDecoration"]);
      task_list.appendChild(li);
      taskList.push(taskList_[i]);
   }
}

for (let i = 0; i < delete_btn.length; ++i) {
   delete_btn[i].addEventListener("click", function (){
      let deleted = delete_btn[i].parentElement.parentElement;
      task_list.removeChild(deleted);
   });
}

button_add.addEventListener("click", function () {
   let span_task = document.getElementById("input-task");
   let value = span_task.value;

   let li = createLi(value, "none");
   let attr = Object();
   attr["value"] = value;
   attr["textDecoration"] = "none";

   taskList.push(attr);
   localStorage.setItem("list_item", JSON.stringify(taskList));

   task_list.appendChild(li);
});

let checkbox = document.querySelectorAll(".div-task input");
for (let i = 0; i < checkbox.length; ++i) {
   checkbox[i].addEventListener('change',function (){
      if (this.checked) {
         let task = this.parentElement.querySelector(".task");
         task.style.textDecoration = "line-through";
      } else {
         let task = this.parentElement.querySelector(".task");
         task.style.textDecoration = "none";
      }
   });
}




