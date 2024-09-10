var express = require('express');
var router = express.Router();

// Giả sử đây là danh sách người dùng của bạn
var listUser = [
    { name: 'Lam', address: "Hanoi" },
    { name: 'MMMMM', address: "Fra" },
    { name: 'Lam3', address: "Dangn" }
];

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('listUser', { listUser: listUser });
});

// Route để hiển thị form chỉnh sửa
router.get('/edit/:index', function (req, res, next) {
    const index = req.params.index;
    const user = listUser[index];
    if (user) {
        res.render('editUser', { user: user, index: index });
    } else {
        res.status(404).send('User not found');
    }
});

// Route để xử lý việc cập nhật người dùng
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

// Route để xóa người dùng
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