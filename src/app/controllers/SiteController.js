class SiteController {
    index(req, res) {
        res.render('home');
    }

    login(req, res) {
        res.render('Login');
    }
    signup(req, res) {
        res.render('Signup');
    }
    search(req, res) {
        res.render('search');
    }
}

export default new SiteController();
