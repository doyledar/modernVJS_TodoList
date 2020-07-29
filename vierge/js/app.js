const toDoList=document.querySelector('.todo-list');
const newTodo=document.querySelector('.new-todo');

//AJOUT D'UNE TACHE
function addItem(elt){
  const newTask = document.createElement('li');
  newTask.setAttribute('class', 'unvisible');
  newTask.setAttribute('data-id', '1');
  newTask.innerHTML =
            ` <input class="toggle" type="checkbox" />
              <label>${newTodo.value}</label>
              <button class="destroy"></button>
            `;
  toDoList.insertBefore(newTask, toDoList.childNodes[0]);
  setTimeout(function(){
  toDoList.childNodes[0].classList.remove('unvisible');
  });
  newTodo.value='';
}

//POUR COMPTER LE NOMBRE DE TACHES NON TERMINEES
function displayNotCompleted(){
  const tasks=document.querySelectorAll('.todo-list li:not(.completed)').length;
  const itemsLeft=document.querySelector('.todo-count strong');
  itemsLeft.innerText=tasks;
}

//------------------------------------------------
newTodo.addEventListener('keyup', function(e){
  if(e.keyCode===13){
  addItem(this);
  displayNotCompleted();
  activerCheckboxes(this);
  activerItems();
  activerDeleteBtns();
  }
});


function toggleItem(elt){
  const task = elt.closest('li');
//  console.log(task);
  task.classList.toggle("completed");
  displayNotCompleted();
}


function activerCheckboxes(){
  const coches = document.querySelectorAll('input[type=checkbox]');
  for (let coche of coches){
    coche.onclick = function(){
      toggleItem(this);
    };
 }
}

/* ou
function activerCheckboxes(){
  for (let checkboxe of checkboxes){
    checkboxe.addEventListener('click', toogleItem(checkboxe));
 }
}
*/



/* PAS VALABLE CAR LE FAIT PLUSIEURS FOIS
function activerCheckboxes(){
  //const coches = document.querySelectorAll('input[type=checkbox]');
  const coches = document.querySelectorAll('.toggle');
  for(let coche of coches){
    coche.addEventListener('click', function(){
    toggleItem(this);
    });
  }
}
*/

function editItem(elt){
//  alert(elt.innerText);
  elt.innerHTML = `
          <input type="text" value = "${elt.innerText}" class="input" />
          `;
  }


function activerItems(){
  const task = document.querySelector('li label');
  task.addEventListener('dblclick', function(){
  editItem(this);
  activerInputs();
  });
}


function updateItem(elt){
  const label = elt.closest('label');
  const texte = elt.value;
  label.innerHTML = texte;
}

function activerInputs(){
  const input = document.querySelector('.input');
    input.addEventListener('keyup', function(e){
    if (e.keyCode === 13){
      updateItem(this);
      displayNotCompleted();
    }
  });
}

function deleteItem(elt){
  const task = elt.closest('li');
  const taskToDel = task;
  task.closest('li').classList.add('unvisible');
  setTimeout(function(){
  taskToDel.closest('li').remove();
}), 300;
}

function activerDeleteBtns(){
  const destroys = document.querySelectorAll('.destroy');
  for (let destroy of destroys){
    destroy.addEventListener('click', function(){
      deleteItem(this);
      displayNotCompleted();
    });
  }
}

function active(){
  const tasks = document.querySelectorAll('.todo-list li')
  for (let task of tasks){
    task.classList.add('unvisible');
  }
  const filteredTasks = document.querySelectorAll('.todo-list li:not(.completed)' );
  for (let filteredTask of filteredTasks){
    setTimeout(function(){
      filteredTask.classList.remove('unvisible');
    }), 300;
  }
}

function completed(){
  const tasks = document.querySelectorAll('.todo-list li')
  for (let task of tasks){
    task.classList.add('unvisible');
  }
  const filteredTasks = document.querySelectorAll('.todo-list li.completed' );
  for (let filteredTask of filteredTasks){
    setTimeout(function(){
      filteredTask.classList.remove('unvisible');
    }), 300;
  }
}

function all(){
  const tasks = document.querySelectorAll('.todo-list li')
  for (let task of tasks){
    task.classList.add('unvisible');
  }
  const filteredTasks = document.querySelectorAll('.todo-list li' );
  for (let filteredTask of filteredTasks){
    setTimeout(function(){
      filteredTask.classList.remove('unvisible');
    }), 300;
  }
}

function filterItems(elt){
  filtre = elt.innerText;
  //alert(filtre);
  if(filtre == "Completed"){
    completed();
  }
  else if(filtre == "Active"){
    active();
  }
  else{
    all();
  }
}

const filtres = document.querySelectorAll('.filters a');
for (let filtre of filtres){
  filtre.addEventListener('click', function(){
    filterItems(this);
  });
}

function deleteAllCompleted(){
  const completedTasks = document.querySelectorAll('.todo-list li.completed');
  for (let completedTask of completedTasks){
    setTimeout(function(){
      completedTask.remove();
    }), 300;
  }
}

const clear = document.querySelector('.clear-completed');
clear.addEventListener('click', function(){
  deleteAllCompleted();
});

displayNotCompleted();
activerCheckboxes();
activerItems();
activerDeleteBtns();
