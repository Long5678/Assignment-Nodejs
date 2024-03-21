class UserController {
    index(req, res) {
        res.render('user');
    }
    create(req, res){
        res.render('create');
    }
    show(req, res) {
        console.log(req.params.id);
        res.send('show');
    }

}

export default new UserController();