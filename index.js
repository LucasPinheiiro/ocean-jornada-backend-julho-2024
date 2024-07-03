const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/oi', function (req, res) {
    res.send('Olá, mundo!?')
  })

//lista de personangens
const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']

//READ all - [GET] /item
app.get('/item', function (req, res) {
  res.send(lista)
})

//sinalizar que usaremos JSON no Body para o Express
app.use(express.json())
//Create -[POST] /item
app.post('/item', function(req, res){
  const item = req.body.nome
  lista.push(item)
  //console.log(req.body)
  res.send('Item criado com sucesso')
})

app.listen(3000)