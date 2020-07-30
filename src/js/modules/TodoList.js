import Todo from './Todo';
import todoListTemplate from './templates/todoList';

export default class TodoList{
	constructor (data){
	this.elt = document.querySelector(data.elt);  // selection du #app
	this.elt;
	this.todos = [];
	this.loadTodos(data.todos);
  this.template = todoListTemplate;
	this.render();
	}
	loadTodos (todos){
		for (let todo of todos){
			this.todos.push(new Todo({parent: this, todo: todo}));
		}
	}
  render(){
    this.elt.innerHTML = this.template;
		this.listElt = this.elt.querySelector('.todo-list');
		for (let todo of this.todos){
			todo.render();
		}
  }
}
