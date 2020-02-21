//Carregando módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require("body-parser")
const app = express()
const admin = require("./routes/admin")
const path = require("path")
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")
require("./models/Postagem")
const Postagem = mongoose.model("postagens")

//Configurações
    //Sessão
    app.use(session({
        secret: "cursodenode",
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())
//Middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        next()
    })
    //Body parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    //Mongoose
    mongoose.Promise = global.Promise
        mongoose.connect("mongodb://localhost/blogapp").then(() => {
            console.log("Conectado ao mongo")
        }).catch((erro) => {
            console.log("Erro ao se conectar: " + erro)
        })
        //Em breve
    //Public
        app.use(express.static(path.join(__dirname,"public")))

//Rotas
    app.get('/', (req, res) => {
        Postagem.find().populate("categoria").sort({data: "desc"}).then((postagens) => {
            res.render("index", {postagens: postagens})
        }).catch((erro) => {
            req.flash("erro_msg", "Houve um erro interno")
            res.redirect("/404")
        })

    })

    app.get('/posts', (req, res) => {
        res.send("Lista de posts")
    })
    app.use('/admin', admin)

//Outros
const PORT = 8081
app.listen(PORT,() => {
    console.log("Servidor rodando")
})
