var app = app || {};
app.TodoView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#item-template').html()),

  events: {
    'click .toggle': 'toggleCompleted',
    'click .destroy': 'clear',
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'keydown .edit': 'revertOnEscape',
    'blur .edit': 'close'
  },


  initialize: function(){
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'visible', this.toggleVisible);

  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.toggleClass('completed', this.model.get('completed'));;
    this.toggleVisible();
    this.$input = this.$('.edit');
    return this;
  },

  toggleVisible: function() {
    console.log(this.isHidden());
    this.$el.toggleClass('hidden', this.isHidden());
  },

  isHidden: function() {
    return this.model.get('completed') ?
    app.TodoFilter === 'active' :
    app.TodoFilter === 'completed';
  },

  edit: function(){
    this.$el.addClass('editing');
    this.$input.focus();
  },

  toggleCompleted: function(){
    this.model.toggle();
  },

  updateOnEnter: function(e) {
    if (e.which === ENTER_KEY) {
      this.close();
    }
  },

  revertOnEscape: function(e) {
    if(e.which === ESC_KEY) {
      this.$el.removeClass('editing');
      this.$input.val(this.model.get('title'));
    }
  },

  close: function(){
    var value = this.$input.val();
    var trimmedValue = value.trim();

    if (trimmedValue) {
      this.model.save({title: trimmedValue});

    }

    this.$el.removeClass('editing');

  },

  clear: function() {
    this.model.destroy();
  }
});
