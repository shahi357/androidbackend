const auctionModel= require('../model/auction');

module.exports={
     
    async getALlAuction(req, res){
        auctionModel.find().then(function(auctiondata){
                res.send(auctiondata)
        })
    }
}