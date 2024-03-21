class PostController {

    // GET /posts
    index(req, res) {
        res.render('post');
    }

    // GET /posts/:id
    show(req, res) {
        console.log(req.params.id);
        res.send('show');
    }
}

export default new PostController();