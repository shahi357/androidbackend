const app= module.exports= require('express')();

app.get('/', function(req, res){
    res.send({msg:'server is on'})
})

app.use('/user', require('./user'))
app.use('/auction', require('./auction'))
app.use('/bidding', require('./bidding'))