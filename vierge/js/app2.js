//const toDoList=document.querySelector('.todo-list');
//const newTodo=document.querySelector('.new-todo');

//AJOUT D'UNE TACHE
function ajouterTache(){
  $('.todo-list').append('<li data-id="1"> <input class="toggle" type="checkbox" /><label>(".new-todo").value</label> <button class="destroy"></button>  </li>');
  alert ('coucou');
}


$('.new-todo').on('keyup', function(e){
    if(e.keyCode == '13'){
      ajouterTache();
    }
});
