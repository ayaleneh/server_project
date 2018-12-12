'use strict'
const express = require('express')
const superagent=require('superagent')
const cors=require('cors')
const app=express()
require('dotenv').config()
const PORT=process.env.PORT||3000
app.use(cors())

app.get(('/location'),(req,res)=>{
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address}&key=${process.env.API_KEY}`
  superagent(url) 
    .then(result=>{
      console.log(result)
      res.send(new Location(result))
    })
    .catch(err => res.send('Got an error'))
})

app.get('/locationn', (req, res) => {
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
app.get('/yelp',(req,res)=>{
  const url=`https://api.yelp.com/v3/businesses/search?latitude=${req.query.latitude}&longitude=${req.query.longitude}`
  superagent.get(url).set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
    .then(result=>{
      res.send(new Yelp(result))
    })
})
app.get('temp',(req,res)=>{
  const url=`https://api.darksky.net/forecast/${process.env.TEMP}/${req.query.latitude},${req.query.longitude}`
  superagent.get(url)
    .then(result=>{
      res.send(result.body)
      //res.send(new temp(result))
    })
})
app.get('/',(req,res)=>{
  res.send("<h1>home page right here</h1>")
})
app.get('*', (req, res) => {
  res.send('<img src="https://http.cat/404" />')
})


app.listen(PORT, () => {
  console.log(`Listening on portt ${PORT}`)
})

const Location =function(result){
  this.latitude=result.body.results[0].geometry.location.lat
  this.longitude=result.body.results[0].geometry.location.lng
}
const temp=function(result){
  this.time=result.body.time
  this.summary=result.body.summary
}
const Yelp=function(result){
  for(let i=0;i<3;i++){
  this. name=result.body.businesses[i].name
  this.image_url=result.body.businesses[i].image_url
  this.rating=result.body.businesses[i].rating
  this.url=result.body.businesses[i].url
  }
}






























































/*'use strict'

const express = require('express')
const superagent = require('superagent')

const app = express()


const cors = require('cors')

require('dotenv').config()
const PORT = process.env.PORT || 3000

app.use(cors())

app.get('/location', (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address}&key=${process.env.GOOGLE_API_KEY}`
  superagent.get(url)
    .then(result => {
      res.send(new Location(result))
    })
    .catch(err => res.send('Got an error'))
})

app.get('/', (req, res) => {
  res.send('<div>This is the Home Route</div>')
})

app.use('*', (req, res) => {
  res.send('<img src="https://http.cat/404" />')
})


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

const Location = function(loc) {
  this.lat = loc.body.results[0].geometry.location.lat
  this.lng = loc.body.results[0].geometry.location.lng
}

*/
