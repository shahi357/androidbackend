const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    title: {
        type: String
    },
    minimalprice: {
        type: String
    },
    auctionissuedate: {
        type: String
    },
    auctionenddate: {
        type: String
    },

    auctionphoto: {
        type: String
    },

    description: {
        type: String
    }
})

const auction = mongoose.model('auction', auctionSchema);
module.exports = auction;

