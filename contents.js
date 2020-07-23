const draggable = window['vuedraggable'];

var app = new Vue({
	el: '#app',
	components: {
		'draggable': draggable,
	},
	data: {
		addText: '',
		list: [],
		id: 0,
	},
	methods: {
		addToDo(event){
			if (this.addText) {
				//日本語変換中のエンターを除外
				if (event.keyCode !== 13) return

				this.list.unshift({
					'text': this.addText,
					'id': this.id,
					'flg': true,
				});
				this.addText = ''; //初期化
				this.id++;
			}
		},
		deleteToDo(id) {
			var deleteIndex = '';
			var check = confirm('本当に削除していいですか？');
			if (check === true) {
				this.list.some(function (value, index) {
					if (value.id === id) {
						deleteIndex = index;
					}
				});
				this.list.splice(deleteIndex, 1);
			}
		},
		editToDo(id) {
			var newText = window.prompt('この内容で更新します。');
			if (newText === '') {
				alert('何か入力してください。');
			} else if (newText !== null) {
				this.edit(id, newText);
			}
		},
		edit(id, text) {
			var editIndex = '';
			this.list.some(function (value, index) {
				if (value.id === id) {
					editIndex = index;
				}
			});
			this.list[editIndex].text = text;
		},
		changeToDo(id) {
			var changeIndex = '';
			this.list.some(function (value, index) {
				if (value.id === id) {
					changeIndex = index;
				}
			});
			this.list[changeIndex].flg = this.change(changeIndex);
		},
		change(changeIndex) {
			if (this.list[changeIndex].flg === true) {
				return false;
			} else {
				return true;
			}
		}
	}
});
