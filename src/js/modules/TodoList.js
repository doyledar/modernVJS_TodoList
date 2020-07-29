import Todo from './Todo.js';

export default class TodoList{
	constructor (data){
	this.elt = document.querySelector(data.elt);
	this.todos = [];
	this.loadTodos(data.todos);
	console.table(this.todos);
	}
	loadTodos (todos){
		for (let todo of todos){
			this.todos.push(new Todo(todo));
		}
	}
}
