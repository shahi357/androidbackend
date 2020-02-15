const app= module.exports= require('express')();
const biddingCOntroller= require('../controllers/bidding');

app.post('/addbidding', biddingCOntroller.AddBidding);
app.get('/getbidding', biddingCOntroller.getBidding);
app.get('/getbiddingforadmin', biddingCOntroller.getbiddingForAdmin);
app.get('/endbatting', biddingCOntroller.getbiddingForAdmin);
app.delete('/endbidding', biddingCOntroller.endBidding);