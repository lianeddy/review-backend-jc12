const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors')
const mysql = require('mysql');
const util = require('util');
const port = 2000;

app.use(bodyParser());
app.use(cors());

const db = mysql.createConnection({
    host : 'localhost',
    user : 'lianeddy',
    password : 'asd123',
    database : 'moviesindoxxi',
    port : 3306
});

const dba = util.promisify(db.query).bind(db);

app.get('/', (req,res) => {
    res.status(200).send('<h1>Review Backend Development</h1>')
})

// =========================== Movies ============================ //
app.get('/get-movies', async (req,res) => {
    let sql = `select * from movies`;
    try{
        let response = await dba(sql);
        res.status(200).send(response);
    }catch(err){
        res.status(500).send(err.message)
    }
});

app.post('/add-movies', async (req,res) => {
    let sql = `insert into movies set ?`;
    try{
        await dba(sql, req.body);
        let get = `select * from movies`;
        let response = await dba(get);
        res.status(200).send(response);
    }catch(err){
        res.status(500).send(err.message);
    };
});

app.patch('/edit-movies/:id', async (req,res) => {
    let sql = `update movies set ? where id = ${req.params.id}`;
    try{
        await dba(sql, req.body);
        let get = `select * from movies`;
        let response = await dba(get);
        res.status(200).send(response);
    }catch(err){
        res.status(500).send(err.message);
    };
});

app.delete('/delete-movies/:id', async (req,res) => {
    let sql = `delete from movies where id = ${req.params.id}`;
    try{
        await dba(sql, req.body);
        let get = `select * from movies`;
        let response = await dba(get);
        res.status(200).send(response);
    }catch(err){
        res.status(500).send(err.message);
    };
});

// ========================= Movies End ========================== //
// ========================== Categories ========================= //
app.get('/get-categories', async (req,res) => {
    let sql = `select * from categories`;
    try{
        let response = await dba(sql);
        res.status(200).send(response);
    }catch(err){
        res.status(500).send(err.message)
    }
});

app.post('/add-categories', async (req,res) => {
    let sql = `insert into categories set ?`;
    try{
        await dba(sql, req.body);
        let get = `select * from categories`;
        let response = await dba(get);
        res.status(200).send(response);
    }catch(err){
        res.status(500).send(err.message);
    };
});

app.patch('/edit-categories/:id', async (req,res) => {
    let sql = `update categories set ? where id = ${req.params.id}`;
    try{
        await dba(sql, req.body);
        let get = `select * from categories`;
        let response = await dba(get);
        res.status(200).send(response);
    }catch(err){
        res.status(500).send(err.message);
    };
});

app.delete('/delete-categories/:id', async (req,res) => {
    let sql = `delete from categories where id = ${req.params.id}`;
    try{
        await dba(sql, req.body);
        let get = `select * from categories`;
        let response = await dba(get);
        res.status(200).send(response);
    }catch(err){
        res.status(500).send(err.message);
    };
});
// ========================= Categories End ====================== //
// =========================== MovCat ============================ //
app.get('/get-movcat', async (req,res) => {
    let sql =  `select m.nama as 'Nama Movie', c.nama as 'Nama Category' from movcat mc join movies m on mc.idmovie = m.id join categories c on c.id = mc.idcategory;`
    try{
        let response = await dba(sql);
        res.status(200).send(response)
    }catch(err){
        res.status(500).send(err.message);
    }
})

app.post('/add-movcat', async (req,res) => {
    let sql = `insert into movcat set ?`;
    try{
        await dba(sql, req.body);
        let get = `select m.nama as 'Nama Movie', c.nama as 'Nama Category' from movcat mc join movies m on mc.idmovie = m.id join categories c on c.id = mc.idcategory;`;
        let response = await dba(get);
        res.status(200).send(response);
    }catch(err){
        res.status(500).send(err.message);
    };
});

app.delete('/delete-movcat/:idmovie/:idcategory', async (req,res) => {
    let sql = `delete from movcat where idmovie = ${req.params.idmovie} and idcategory = ${req.params.idcategory}`;
    try{
        await dba(sql, req.body);
        let get = `select m.nama as 'Nama Movie', c.nama as 'Nama Category' from movcat mc join movies m on mc.idmovie = m.id join categories c on c.id = mc.idcategory;`;
        let response = await dba(get);
        res.status(200).send(response);
    }catch(err){
        res.status(500).send(err.message);
    };
});
// ================== End Movcat ==========================//
app.listen(port, () => console.log(`API ACTIVE AT PORT ${port}`));