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
app.get('/weather',(req,res)=>{
  const url=`https://api.darksky.net/forecast/${process.env.DARK_SKY_API}/${req.query.latitude},${req.query.longitude}`
  superagent.get(url)
    .then(result=>{
      //res.send(result.body)
      res.send(new temp(result))
    })
})
app.get('/movies',(req,res)=>{
  const url=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API}&query=${req.query.query}`
  superagent.get(url)
    .then(result=>{
      res.send( new Movies(result))
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
  this.latitude=result.body.latitude
  this.time = result.body.currently.time
  this.summary = result.body.currently.summary
  this.icon = result.body.currently.icon
  this.temp = result.body.currently.temperature
}
const Yelp=function(result){
  for(let i=0;i<3;i++){
    this. name=result.body.businesses[i].name
    this.image_url=result.body.businesses[i].image_url
    this.rating=result.body.businesses[i].rating
    this.url=result.body.businesses[i].url
  }
}
const Movies=function(result){
  this.title=result.body.results[0].title,
  this.overview=result.body.results[0].overview,
  this.average_vote=result.body.results[0].vote_average,
  this.total_vote=result.body.results[0].vote_count,
  this.image_url=result.body.results[0].homepage,
  this.popularity=result.body.results[0].popularity,
  this.released_on=result.body.results[0].release_date
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
