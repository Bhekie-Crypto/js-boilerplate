const express = require('express')
const mysql = require('mysql')

//create create connection
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'rootr00t',
    database:'nodemysql'
})

//connect to mySQL
db.connect(err => {
    if(err) {
        throw err
    }
    console.log('mySQL conneted')
})

const app = express()

//create database
app.get('/createdb', (req, res) =>{
    let sql = 'CREATE DATABASE nodemysql'
    db.query(sql, err => {
        if (err) {
            throw err 
        }
       res.send('database created')
    })
})

app.get('/createemployee', (req, res) =>{
    let sql = 'CREATE TABLE employee(id int AUTO_INCREMENT, name varchar(255), designation varchar(255), PRIMARY KEY(id))'
    db.query(sql, err => {
        if(err){
            throw err
        }
        res.send('employee table created')
    })
})


app.get('/employee1', (req, res) =>{
    let post = {name:'Bheki Tsabedze', designation:'Chief Executive Officer'}
    let sql = 'INSERT INTO employee SET ?'
    let query = db.query(sql, post, err =>{
        if(err){
            throw err
        }
        res.send('Employee added success')
    }) 
})

app.get('/getemployee', (req, res) =>{
    let sql = 'SELECT * FROM employee'
    let query = db.query(sql, (err, result) =>{
        if(err){
            throw err
        }
        console.log(result)
        res.send('Employee details fetched')
    })
})

app.get('/updateemployee/:id',(req, res) => {
    let newName = 'updated name'
    let sql = `UPDATE employee SET name = '${newName}' WHERE id = '${req.params.id}'`
    let query = db.query(sql, err => {
        if(err){
            throw err
        }
        res.send('employee updated')
    })
})

app.get('/deleteemployee/:id',(req, res) => {
    let sql = `DELETE from employee WHERE id = '${req.params.id}'`
    let query = db.query(sql, err => {
        if(err){
            throw err
        }
        res.send('employee deleted')
    })
})
app.listen('3000', () => {
    console.log('Server started on port 3000')
})