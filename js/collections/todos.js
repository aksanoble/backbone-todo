var app = app || {};

var Todos = Backbone.Collection.extend({
	model: app.Todo,

	localStorage: new Backbone.LocalStorage('todos-backbone'),

	nextOrder: function(){
		return this.length ? this.last().get('order') + 1 : 1;
	}
})

app.todos = new Todos();
