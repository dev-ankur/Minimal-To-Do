

let allTasks = JSON.parse(localStorage.getItem('tasks'));
let emptyMsg = document.getElementById('empty-msg');

if(!allTasks){
    allTasks = [];
    localStorage.setItem('tasks', JSON.stringify([]));
}

if(allTasks.length !== 0){
    emptyMsg.style.display = 'none';
}

localStorage.setItem('selectedTask', null);

// let selectedTask = JSON.parse(localStorage.getItem('selectedTask'));

// dummy data

// var allTasks = [
//     {id: 1, title: 'hello world', description: 'This is nothing serious! Leave it!', status: 1},
//     {id: 2, title: 'hello galaxy', description: 'Again same thing', status: 0},
//     {id: 3, title: 'hello universe', description: 'And again same thing', status: 0}
// ];


// list category

var categoryList = [
    'all',
    'remaining',
    'done'
];

var selectedCategory = 'all';           // default

var categoryTasksList = allTasks;       // default

// category reference

var selectAll = document.getElementById('select-all');
var selectRemaining = document.getElementById('select-remaining');
var selectDone = document.getElementById('select-done');


// create list DOM


var categoryNotes = document.querySelector('#category-notes ul');
createList();

// select category

var categories = document.querySelectorAll('#category span a');

categories.forEach((cat, i, all)=>{

    cat.addEventListener('click', (e)=>{
        e.preventDefault();

        selectedCategory = e.target.id.split('-')[1];

        
        all.forEach(val=>{
            val.classList.remove('selected')
        })
        e.target.classList.add('selected');

        createList();
        prepareList();
    })

});


// add task

var addTask = document.getElementById('add-task');

addTask.addEventListener('click', ()=>{

    localStorage.setItem('newTask', '1');
    window.location.href = 'task.html';

})



function createList(){

    categoryNotes.innerHTML = '';
    if(selectedCategory == 'all') 
        categoryTasksList = allTasks;
    else{
        categoryTasksList = allTasks.filter(
            (val) => val.status == ((selectedCategory == 'done')?1:0) 
        );
    }

    for(let i=0;i<categoryTasksList.length;i++){
        var li = document.createElement('li');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'task-'+categoryTasksList[i].id;
        checkbox.checked = !!categoryTasksList[i].status;

        var span = document.createElement('a');
        span.href = '#';
        // span.style.color = '#000';
        span.textContent = categoryTasksList[i].title;
        span.style.textDecorationLine = categoryTasksList[i].status ? 'line-through': 'none';

        var removeList = document.createElement('a');
        removeList.href='#';
        removeList.style.color = '#c00';
        removeList.innerText = '⨂';
        removeList.style.float = 'right';
        removeList.dataset.index = categoryTasksList[i].id;

        checkbox.addEventListener('change', (e)=>{
            
            e.target.nextSibling.style
            .textDecorationLine = (e.target.checked) ? 'line-through':'none';
            categoryTasksList[i].status = (e.target.checked) ? 1 : 0;

            localStorage.setItem('tasks', JSON.stringify(allTasks));

            createList();
            prepareList();
        })
        span.addEventListener('click', async (e)=>{
            e.preventDefault();

            // open preview page here

            await localStorage.setItem('selectedTask', JSON.stringify(categoryTasksList[i]))
            
            window.location.href = 'task.html';
            
        })
        removeList.addEventListener('click', (e)=>{
            e.preventDefault();
            let sure = confirm('Your task will be removed permanently! Are you sure you want to remove this task!');
            if(!sure) return;
            
            // console.log('delete', e.target.dataset.index);
            allTasks.splice(allTasks.findIndex(x => x.id == e.target.dataset.index), 1);
            localStorage.setItem('tasks', JSON.stringify(allTasks));

            createList();
            prepareList();
        })

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(removeList);

        categoryNotes.appendChild(li);

    }

    if(allTasks.length == 0){
        emptyMsg.style.display = 'block';
    }

}


// search

var search = document.getElementById('search');

search.addEventListener('input', (e)=>{
    
    // let searchTerm = e.target.value;

    prepareList();
    
})

search.addEventListener('search', (e)=>{

    console.log('hallo');
    prepareList();
})


function prepareList(){
    categoryTasksList.map((val, i)=>{
        if(!(val.title.toLowerCase().includes(search.value.toLowerCase()) 
            || val.description.toLowerCase().includes(search.value.toLowerCase()))
        ){
            categoryNotes.children[i].style.display = 'none';
        }else{
            categoryNotes.children[i].style.display = 'list-item';
        }
    })
}