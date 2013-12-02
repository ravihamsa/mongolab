(function(){

    var newListObj = {
        label:'List Label'+new Date().getTime(),
        listOptions:[
            {label:'label1'},{label:'label2'}
        ]
    };

    var request = $.ajax({
        url:'/api/lists',
        method:'post',
        data:newListObj
    });


    /*
    request.done(function(resp){
        _.each(resp, function(list){
             $.ajax({
                 url:'/api/lists/'+list._id,
                 method:'delete'
             });


        });
    });

    */




})();