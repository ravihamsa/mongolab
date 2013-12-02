exports.index = function (req, res) {

    res.render('index', {
        title: 'Test web page on node.js using Express',
        pagetitle: 'Hello there',
        group:"D",
        teams:[]
    });




};
