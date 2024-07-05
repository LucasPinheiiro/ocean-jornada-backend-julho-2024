const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const app = express()

const dbURL = 'mongodb+srv://admin:sESkgMfI92ctVf41@cluster0.rtveojx.mongodb.net/'
const dbName = 'ocean-jornada-backend'

const client = new MongoClient(dbURL)


async function main() {
  console.log('Conectando ao banco de dados')
  await client.connect()
  console.log('Banco de dados conectado com sucesso')

  app.get('/', function (req, res) {
    res.send('Hello World')
  })
  app.get('/oi', function (req, res) {
    res.send('Olá, mundo!?')
  })

  //lista de personangens
  const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']

  const db = client.db(dbName)
  const collection = db.collection  ('item')

  //READ all - [GET] /item
  app.get('/item', async function (req, res) {
    //Obter todos os documentos da collections
    const documentos = await collection.find().toArray()
    //Pegamos os documentos e enviamos como resposta HTTP
    res.send(documentos)
  })

  //READ by ID - [GET] /item/:id
  app.get('/item/:id', async function (req, res) {
    const id = req.params.id
    //console.log(id)
    console.log(req.params)
    const item = await collection.findOne({_id:new ObjectId(id)})
    res.send(item)
  })

  //sinalizar que usaremos JSON no Body para o Express
  app.use(express.json())

  //Create -[POST] /item
  app.post('/item', async function (req, res) {
    const item = req.body

    //Insere o item na collection
    await collection.insertOne(item)
  
    //Exibe o item adicionado
    res.send(item)
  })

  //Update - [PUT] /item/:id
  app.put('/item/:id', async function (req, res) {
    const id = req.params.id
    const novoItem = req.body
    await collection.updateOne(
      {_id: new ObjectId(id)},
      {$set: novoItem}
    )
    res.send("item atualizado com sucesso")
  })

  //delete
  app.delete('/item/:id', async function(req, res){
    const id = req.params.id
    //remove
    await collection.deleteOne({_id: new ObjectId(id)})

    //evia msg de sucesso
    res.send('item deletado com sucesso')
  })

  app.listen(3000)
}

main()