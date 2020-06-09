const express = require('express')
const nunjucks = require('nunjucks')
const db = require('./database/db')

const server = express()
server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))

nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server.get('/', (req, res) => {
    return res.render("index.html", {
        title: 'Seu marketplace de coleta de resíduos'
    })
})

server.get('/register-point', (req, res) => {
    return res.render("register-point.html")
})

server.post('/savepoint', (req, res) => {
    const query = `
        INSERT INTO places (
            name,
            image,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `
    const values = [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items,
    ]

    db.run(query, values, function (err) {
        if (err) {
            console.log(err)
            return res.render("register-point.html", { dbSuccess: false })
        }
        console.log('Cadastrado com sucesso')
        console.log(this)
        return res.render("register-point.html", { dbSuccess: true })
    })
})

server.get('/search', (req, res) => {
    const search = req.query.search
    
    let sql = ''

    if (search === '') {
        sql = `SELECT * FROM places`
    } else {
        sql = `SELECT * FROM places WHERE city LIKE '%${search}%' OR state LIKE '%${search}%'`
    }

    db.all(sql, function (err, rows) {
        if (err) {
            console.log(err)
            return res.render("search-results.html", { dbSuccess: false })
        }
        const total = rows.length
        return res.render("search-results.html", { places: rows, total })
    })  
})

server.listen(3000)