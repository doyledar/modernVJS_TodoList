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

	_destroy(){
		this.elt.remove();
		this.parent.removeOneById(this.id);
		//this.parent.SetNotCompletedNumber();

	}

	_edit(){
		this.elt.querySelector('.editable').innerHTML = `
		<input type="text" class="validate" value : "${this.content}" />
	`	;
this._activerBtns();
	}

	_validate(){
			//alert("coucou");
			this.content = this.elt.querySelector('.validate').value;
			this.elt.querySelector('.editable').innerHTML = this.content;
			this._activerBtns();
	}


	_activerBtns(){
			this.elt.querySelector('.toggle').onclick = () =>{
				this._toggleCompleted();
			};

			this.elt.querySelector('.destroy').onclick = () =>{
				this._destroy();
			};

			this.elt.querySelector('.editable').ondblclick = () =>{
				this._edit();
			};

			if(this.elt.querySelector('.validate')){
				this.elt.querySelector('.validate').onkeyup = (e) =>{
				if(e.keyCode === 13){
				this._validate();
					}
				}
			}

	}


}
