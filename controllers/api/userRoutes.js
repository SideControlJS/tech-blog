const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/users
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', password: 'password1234'}
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(userData => {
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;

                res.json(userData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/users/login
router.post('/login', (req, res) => {
    // expects {username: 'Lernantino', password: 'password1234'}
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(userData => {
            if (!userData) {
                res.status(400).json({ message: 'No user with that username!' });
                return;
            }

            // Verify user
            const validPassword = userData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password!' });
                return;
            }

            req.session.save(() => {
                // declare session variables
                req.session.user_id = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;

                res.json({ user: userData, message: 'You are now logged in!' });
            });
        });
});

// POST /api/users/logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        // remove session variables
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', password: 'password1234'}
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
        // since there is a hook to hash only the password, the option is added here to indicate that
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(userData => {
            if (!userData[0]) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
