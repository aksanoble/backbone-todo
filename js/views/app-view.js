var app = app || {};

app.AppView = Backbone.View.extend({
  el: '#todoapp',

  events: {
    'keypress #new-todo': 'createOnEnter'
  },

  initialize: function() {
    this.$main = this.$('#main');
    this.$input = this.$('#new-todo');
    this.$list = this.$('#todo-list');
    this.listenTo(app.todos, 'add', this.addOne);


    app.todos.fetch();

    },

  newAttributes: function() {
    return {
      title: this.$input.val().trim(),
      order: app.todos.nextOrder(),
      completed: false
    }
  },

  createOnEnter: function(e) {
    if (e.which === ENTER_KEY && this.$input.val().trim()){
      app.todos.create(this.newAttributes());
      this.$input.val('');
    }
  },

  render: function() {
      //this.$list.show();
      //this.$main.show();
  },

  addOne: function(todo) {
    var view = new app.TodoView({model: todo});
    this.$list.append(view.render().el);
  }

});
