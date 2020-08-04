import todoTemplate from './templates/todo';

export default class Todo {
	constructor (data){
		this.parent = data.parent;
		this.elt;
		this.id = data.todo.id;
		this.content = data.todo.content;
		this.completed = data.todo.completed;
		this.template = todoTemplate;
	}

	_replaceTemplate(){
		for (let propriete in this){
			this.template = this.template.replace('{{'+propriete+'}}', this[propriete]);
		}
		this.template = this.template.replace('{{isCompletedClass}}', (this.completed === true?'completed':''));
		this.template = this.template.replace('{{isCompletedChecked}}', (this.checked === true?'checked="checked"':''));
	}

	render(){
		this._replaceTemplate();
		this.elt = document.createElement('div');
		this.elt.innerHTML = this.template;
		this.parent.listElt.appendChild(this.elt);
		this._activerBtns();
	}

	_toggleCompleted(){
		this.completed = ! this.completed;
		this.elt.querySelector('li').classList.toggle('completed');
		this.parent.setCompletedNumber();
	}

	_activerBtns(){
			this.elt.querySelector('.toggle').onclick = () =>{
				this._toggleCompleted();
			};
	}
}
