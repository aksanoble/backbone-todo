var app = app || {};
app.TodoView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#item-template').html()),

  events: {
    'click .destroy': 'clear'
  },


  initialize: function(){
    this.listenTo(this.model, 'destroy', this.remove);

  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  clear: function() {
    this.model.destroy();
  }
});
