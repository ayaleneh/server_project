'use strict'

const express = require('express')
const superagent = require('superagent')

const app = express()


const cors = require('cors')

require('dotenv').config()
const PORT = process.env.PORT || 3000

app.use(cors())

app.get('/location', (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${process.env.API_KEY}`
  superagent.get(url)
    .then(result => {
      res.send({
        longitude: result.body.results[0].geometry.location.lng,
        latitude: result.body.results[0].geometry.location.lat
      })
    })
    .catch(err => res.send('Got an error'))
})

app.get('/', (req, res) => {
  res.send('<div>This is the Home Route</div>')
})

app.use('*', (req, res) => {
  res.send('Something Broke')
})


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
