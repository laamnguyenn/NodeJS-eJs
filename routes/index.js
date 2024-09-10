var express = require('express');
var router = express.Router();

var listUser = [
    { name: 'Lam', address: "Hanoi" },
    { name: 'MMMMM', address: "Fra" },
    { name: 'Lam3', address: "Dangn" }
];
router.get('/', function (req, res, next) {
    res.render('listUser', { listUser: listUser });
});

router.get('/create', function (req, res, next) {
    res.render('createUser');
});

router.post('/create', function (req, res, next) {
    const { name, address } = req.body;
    listUser.push({ name, address });
    res.redirect('/');
});

router.get('/edit/:index', function (req, res, next) {
    const index = req.params.index;
    const user = listUser[index];
    if (user) {
        res.render('editUser', { user: user, index: index });
    } else {
        res.status(404).send('User not found');
    }
});

router.post('/edit/:index', function (req, res, next) {
    const index = req.params.index;
    const { name, address } = req.body;
    if (listUser[index]) {
        listUser[index] = { name, address };
        res.redirect('/');
    } else {
        res.status(404).send('User not found');
    }
});

router.post('/delete/:index', function (req, res, next) {
    const index = req.params.index;
    if (index >= 0 && index < listUser.length) {
        listUser.splice(index, 1);
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
});

module.exports = router;