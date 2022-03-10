var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'login'
});

connection.connect();

router.get(
    '/loginGetAll',
    (req, res, next) => {
        connection.query('select * from login',
            (results, error) => {
                if (error) res.send(error);
                else res.send(results)
            }
        );
    }
);

router.get(
    '/loginGetById/:id',
    (req, res, next) => {
        var id = parseInt(req.params.id)
        connection.query('select * from login lg where lg.idlogin = ?',
            [id],
            (results, error) => {
                if (error) res.send(error);
                else res.send(results)
            }
        );
    }
);

router.post(
    '/loginInsert',
    (req,res) => {
        var login = req.body.login
        var senha = req.body.senha
        var nome = req.body.nome
        var sobrenome = req.body.sobrenome
        connection.query('insert into login (login,senha,nome,sobrenome) values (?,?,?,?)',
            [login,senha,nome,sobrenome],
            (results,error) => {
                if(error) res.send(error);
                else res.send(results)
            }
        );
    }
);

router.patch(
    '/loginUpdate/:id',
    (req,res) => {
        var id = parseInt(req.params.id)
        var login = req.body.login
        var senha = req.body.senha
        var nome = req.body.nome
        var sobrenome = req.body.sobrenome
        connection.query('update login lg set lg.login = ?, lg.senha = ?, lg.nome = ?, lg.sobrenome = ? where lg.idlogin = ?',
            [login,senha,nome,sobrenome,id],
            (results,error) => {
                if(error) res.send(error);
                else res.send(results)
            }
        );
    }
);

router.delete(
    '/loginDelete/:id',
    (req,res) => {
        var id = parseInt(req.params.id)
        connection.query('delete from login lg where lg.idlogin = ?',
            [id],
            (results,error) => {
                if(error) res.send(error);
                else res.send(results)
            }
        );
    }
);

router.post(
    '/realizarlogin',
    (req,res) => {
        var login = req.body.login
        var senha = req.body.senha
        res.set({
            'Access-Control-Allow-Origin': 'http:\\localhost:3000',
            'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization'
        });
        connection.query('select 1 from login lg where lg.login = ? and lg.senha = ?',
            [login,senha],
            (results,error) => {
                if(error) res.send(error);
                else if(results.length > 0) res.send('OK');
                else res.send('Não foi possivel realizar o login',);
            }
        );
    }
);


module.exports = router;