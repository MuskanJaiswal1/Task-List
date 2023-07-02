const addTask = document.getElementById("addTask");
const addTaskBtnText = addTask.innerText;
const task = document.getElementById("task");
const recordsDisplay = document.getElementById("records");
let taskArray = [];
let edit_id = null;

let objStr = localStorage.getItem('taskitems');
if (objStr != null) {
    taskArray = JSON.parse(objStr);
}
displayInfo();
addTask.onclick = () => {
    const tasks = task.value;
    if (edit_id != null) {
        // edit
        taskArray.splice(edit_id, 1, { 'taskArrayItem': tasks })
        edit_id = null;
    }
    else {
        // insert
        if(tasks!=''){
        const tasks = task.value;
        taskArray.push({ 'taskArrayItem': tasks });
        }
    }
    saveInfo(taskArray);
    console.log(taskArray);
    task.value = '';
    addTask.innerText = addTaskBtnText;
}

function saveInfo(taskArray) {
    let str = JSON.stringify(taskArray);
    localStorage.setItem('taskitems', str);
    displayInfo();
}

function displayInfo() {
    let statement = '';
    taskArray.forEach((element, i) => {
        statement += `<tr>
                 <th scope="row">${i + 1}</th>
                 <td>${element.taskArrayItem}</td>
                 <td><span class="btn btn-info mx-3 text-white glyphicon" onclick='editInfo(${i})'>&#x270f;</span> <span class="btn btn-danger text-white glyphicon"  onclick='deleteInfo(${i})'>&#xe083;</span> </td>
               </tr>`;
    });
    recordsDisplay.innerHTML = statement;
}

function editInfo(id) {
    edit_id = id;
    task.value = taskArray[id].taskArrayItem;
    addTask.innerText = "Save changes";
}

function deleteInfo(id) {
    taskArray.splice(id, 1);
    saveInfo(taskArray);
}


