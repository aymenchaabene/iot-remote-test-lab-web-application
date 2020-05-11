const express = require('express')
const cardModels = express.Router()
const cors = require('cors')
const CardModel = require('../models/CardModel')
const Card = require('../models/Card')
var mongoose = require('mongoose');
cardModels.use(cors())

process.env.SECRET_KEY = 'secret'

cardModels.post('/addModel', (req, res) => {
  const today = new Date()
  const modelData = {
    name: req.body.name,
    description: req.body.description,
    image: "null",
    //cards:[],
   
  }

  CardModel.findOne({
    name: req.body.name
  })
    .then(cardModel => {
      if (!cardModel) {
          CardModel.create(modelData)
            .then(cardModel => {
              res.json({ status: cardModel.name + '  Added!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
       
      } else {
        res.json({ error: 'Model already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

cardModels.get('/getModels', (req, res) => {
 CardModel.find()
      .then(cardModel => {
     
          res.json({cardModel})
        
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })






module.exports = cardModels