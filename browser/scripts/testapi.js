(function(){

      var itemTemplate = _.template('<div><%=label%> <a href="#remove" class="remove">remove</a> </div>');

    var ListItemView = Backbone.View.extend({
        tagName:'li',
        events:{
            'click .remove':'removeHandler'
        },
        render:function(){
            this.$el.html(itemTemplate(this.model.toJSON()));
        },
        removeHandler:function(e){
            e.preventDefault();
            this.model.destroy();


        }
    });



    var ListView = Backbone.View.extend({

        tagName:'ul',
        render:function(){
            this.$el.empty();
            this.collection.each(function(model){
                var li = new ListItemView({
                    model:model
                });
                li.render();
                li.$el.appendTo(this.$el);
            }, this);

            this.listenToOnce(this.collection, 'add remove change', this.render);
        }
    });


    var ListModel = Backbone.Model.extend({
        idAttribute:'_id'
    });

    var ListCollection = Backbone.Collection.extend({
        url:'/api/lists',
        model:ListModel
    });


    var createTemplate = '<div><form><label>Name: <input type="text"> </label> <button type="submit">Create List</button> </form> </div>';

    var CreateView =  Backbone.View.extend({
        events:{
            'submit form':'submitHandler'
        },
        render:function(){
            this.$el.html(createTemplate);
        },
        submitHandler:function(e){
            e.preventDefault();
            var _this = this;

            var input =  this.$('input');
            if(input.val() === ''){
                return;
            }

            var newListObj = {
                label:this.$('input').val()
            };

            this.collection.create(newListObj);
            _this.$('input').val('');
        }
    });


    var coll = new ListCollection();
    coll.fetch();



    var view = new CreateView({
        collection:coll
    });
    view.render();
    view.$el.appendTo('body');



    var listView = new ListView({
        collection:coll
    });

    listView.render();
    listView.$el.appendTo('body');




})();