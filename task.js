// 'Add' or 'Edit' task page script

var tasks = JSON.parse(localStorage.getItem('tasks'));
var selectedTask = JSON.parse(localStorage.getItem('selectedTask'));
var newTask = JSON.parse(localStorage.getItem('newTask'));   // 1 or 0

var title = document.getElementById('task-title');
var description = document.getElementById('task-description');

var editBtn = document.getElementById('btn-edit');
var homeBtn = document.getElementById('btn-home');
var previewBtn = document.getElementById('btn-preview');

var writeTask = document.getElementById('write-task');
var preview = document.getElementById('preview');


if(selectedTask && selectedTask.title){
    title.value = selectedTask.title;
    description.value = selectedTask.description;
}

if(newTask){

    var taskId = (tasks.length > 0) ? (tasks[0].id)+1 : 1;

    selectedTask = {
        id: taskId,
        title: '',
        description: '',
        status: 0
    };
    tasks.unshift(selectedTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}else{
    editBtn.style.display = 'unset';
    previewBtn.style.display = 'none';

    writeTask.style.display = 'none';
    preview.style.display = 'unset';

    preview.children[0].innerText = selectedTask.title;
    preview.children[1].innerText = selectedTask.description;
}

var saveStatus = document.getElementById('save-status');

var timer = null;
let selectedTaskIndex = (newTask == 1) ? 0 : tasks.map(e => e.id).indexOf(selectedTask.id);

title.addEventListener('input', (e)=>{
    
    if(timer) clearTimeout(timer); 

    timer = setTimeout(() => {

        selectedTask.title = e.target.value;
        tasks[selectedTaskIndex].title = selectedTask.title;
        localStorage.setItem('selectedTask', JSON.stringify(selectedTask));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, 300);

})

description.addEventListener('input', (e)=>{

    if(timer) clearTimeout(timer); 

    timer = setTimeout(() => {

        selectedTask.description = e.target.value;
        tasks[selectedTaskIndex].description = selectedTask.description;
        localStorage.setItem('selectedTask', JSON.stringify(selectedTask));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, 300);
})

// home

homeBtn.addEventListener('click', (e)=>{

    if(newTask && !tasks[0].title.trim()){
        tasks.shift();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
        
    localStorage.setItem('selectedTask', null);
    localStorage.setItem('newTask', '0');

    window.location.href = '/';
})


// edit

editBtn.addEventListener('click', (e)=>{
    editBtn.style.display = 'none';
    previewBtn.style.display = 'unset';

    writeTask.style.display = 'unset';
    preview.style.display = 'none';

})

// preview

previewBtn.addEventListener('click', (e)=>{


    if(!selectedTask.title.trim()){
        selectedTask.title = '';
        title.value = '';
        alert("'Title' is required for preview");
        return;
    }

    editBtn.style.display = 'unset';
    previewBtn.style.display = 'none';

    writeTask.style.display = 'none';
    preview.style.display = 'unset';

    preview.children[0].innerText = selectedTask.title;
    preview.children[1].innerText = selectedTask.description;

})