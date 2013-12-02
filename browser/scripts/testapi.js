(function(){

    var newListObj = {
        label:'List Label'+new Date().getTime(),
        listOptions:[
            {label:'label1'},{label:'label2'}
        ]
    };



    /*
    var createRequest = $.ajax({
        url:'/api/lists',
        method:'post',
        data:newListObj
    });
    */



/*
    var getListsRequest = $.ajax({
        url:'/api/lists',
        method:'get'
    });




    getListsRequest.done(function(resp){
        _.each(resp, function(list){
             $.ajax({
                 url:'/api/lists/'+list._id,
                 method:'delete'
             });


        });
    });



*/


})();