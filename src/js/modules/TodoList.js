import Todo from './Todo';
import todoListTemplate from './templates/todoList';

export default class TodoList{
	constructor (data){
	this.elt = document.querySelector(data.elt);  // selection du #app
	this.elt;
	this.notCompletedNumber;
	this.todos = [];
	this.loadTodos(data.todos);
  this.template = todoListTemplate;
	this.render(this.todos);
	}
	loadTodos (todos){
		for (let todo of todos){
			this.todos.push(new Todo({parent: this, todo: todo}));
		}

	}



  render(todos){
    this.elt.innerHTML = this.template;
		this.listElt = this.elt.querySelector('.todo-list');

		for (let todo of todos){
			todo.render();
		}
			this.setNotCompletedNumber();
			this.activerBtns();
	}

	setNotCompletedNumber(){
	// méthode array filter
	this.notCompletedNumber = this.todos.filter(function(todo){
	return todo.completed === false;
	}).length;
	//console.log(this.notCompletedNumber);
	this.elt.querySelector('#todo-count').innerText = this.notCompletedNumber;
	}


	addTodo(){
	const content = this.elt.querySelector('.new-todo').value;
	const id = this.todos[this.todos.length - 1].id + 1;
	const todo = {id, content: content, completed: false};
	const newTodo  = new Todo({parent: this, todo});
	this.todos.push(newTodo);
	newTodo.render();
	this.elt.querySelector('.new-todo').value = '';
	this.setNotCompletedNumber();
	}

	removeOneById(id){
		this.todos = this.todos.filter(function(todo){
		return todo.id != id;
		});
		this.setNotCompletedNumber();
	}

	_filter(filter){
	
		switch (filter) {

			case 'active':
				//alert("filtre active");
				this.render(this.todos.filter(function(todo){
					return !todo.completed;
				}));
				break;
			case 'completed':
			this.render(this.todos.filter(function(todo){
				return todo.completed;
			}));
				break;
			default:
			this.render(this.todos);

		}
	}


activerBtns(){
	this.elt.querySelector('.new-todo').onkeyup = (e) =>{
	if(e.keyCode === 13){
		this.addTodo();
		}
	}

	const filterBtns = this.elt.querySelectorAll('.filter');
	for (let filterBtn of filterBtns){
		filterBtn.onclick = () => {
				this._filter(filterBtn.dataset.filter);
		}
	}
};

}
