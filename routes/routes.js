const express = require('express');

const db = require('../data/database');

const routes = express.Router();

routes.get('/', function (req, res) {
    res.redirect('view');
});

routes.get('/view', async function(req, res) {
    try {
        const query = `SELECT * from mydb.users`;
        const [users] = await db.query(query);
        console.log('Query result: ',users);
        res.render('view', { users: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});

routes.get('/edit/:id', async function(req, res) {
    const query = `SELECT * from mydb.users WHERE id = ?`;

    const [users] = await db.query(query, [req.params.id]);

    if(users.length === 0) {
        res.status(404).send('User not found');
        return;
    }
    res.render('update', { user: users[0] });
});

routes.post('/edit/:id', async function(req, res) {
    const query = `UPDATE mydb.users SET name=?, age=?, gender=?, district=? WHERE id = ?`;

    await db.query(query, [req.body.name, req.body.age, req.body.gender, req.body.district, req.params.id]);
    res.redirect('/view');
});

routes.get('/delete/:id', async function(req, res) {
    const query = `DELETE from mydb.users WHERE id = ?`;

    await db.query(query, [req.params.id]);
    res.redirect('/view');
});

routes.get('/create', function(req, res) {
    res.render('create');
});

routes.post('/user', async function(req, res) {
    const data = [
        req.body.name,
        req.body.age,
        req.body.gender,
        req.body.district
    ]
    
    await db.query(`INSERT into mydb.users (name,age,gender,district) VALUES (?)`, [data]);
    res.redirect('/view');

});

module.exports = routes;
