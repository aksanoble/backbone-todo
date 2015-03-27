var app = app || {};
app.TodoView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#item-template').html()),


  initialize: function(){

  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});
