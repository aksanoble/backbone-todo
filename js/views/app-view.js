var app = app || {};

app.AppView = Backbone.View.extend({
  el: '#todoapp',

  statsTemplate: _.template($('#stats-template').html()),

  events: {
    'keypress #new-todo': 'createOnEnter',
    'click #toggle-all': 'toggleAllComplete'
  },

  initialize: function() {
    console.log(this.$('#toggle-all'));
    this.$main = this.$('#main');
    this.$input = this.$('#new-todo');
    this.$list = this.$('#todo-list');
    this.$footer = this.$('#footer');
    this.listenTo(app.todos, 'add', this.addOne);
    this.allCheckbox = this.$('#toggle-all')[0];

    this.listenTo(app.todos, 'all', this.render);


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
    var completed = app.todos.completed().length;
    var remaining = app.todos.remaining().length;

    if(app.todos.length) {
      this.$main.show();
      this.$footer.show();
    }

    this.$footer.html(this.statsTemplate({
      completed: completed,
      remaining: remaining
    }));
  },

  toggleAllComplete: function() {
    var completed = this.allCheckbox.checked;
    console.log(completed);
    app.todos.each(function (todos) {
      todos.save({
        completed: completed
      });
    });
  },

  addOne: function(todo) {
    var view = new app.TodoView({model: todo});
    this.$list.append(view.render().el);
  }

});
