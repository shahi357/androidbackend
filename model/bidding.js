const mongoose = require('mongoose');

const biddingSchema = new mongoose.Schema({
    username: {
        type: String
    },
    auctiontitle: {
        type: String
    },
    acutionprice: {
        type: String
    },
    biddingprice: {
        type: String
    },
    auctionimage: {
        type: String
    },
    userid: {
        type: String
    },
    auctionid: {
        type: String
    },
    useremail: {
        type: String
    }

})

const bidding = mongoose.model('bidding', biddingSchema);
module.exports = bidding;

