$(function(){


  var Todo = Backbone.Model.extend({
    defaults: {
      title: '',
      order: Todos.nextOrder(),
      done: false
    };
  })


















});
