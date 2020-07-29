import todos from './data.js';
import TodoList from './modules/TodoList.js';



new TodoList({
	elt: '#app',
	todos   // ou todos:todos
});
