let biddingModel = require('../model/bidding');
let auction = require('../model/auction')
var nodemailer = require('nodemailer');

module.exports = {
    async AddBidding(req, res) {
        console.log(req.body)

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            requireTLS: true,
            auth: {
                user: 'ktmnpl0001@gmail.com',
                pass: 'Kathmandu01'
            }
        });

        var mailOptions = {
            from: 'ktmnpl0001@gmail.com',
            to: req.body.useremail,
            subject: 'Bidding Made ',
            text: '',
            html:
                '<div class="container-fluid main-container">' +
                'New Bidding Made <br> <br>' +

                '<hr>' +

                '<h1>Bidding  Details</h1>' +
                '<hr>' +
                '<p> Name : <b>' + req.body.username + '</b> </p>' +
                '<p> Email : <b>' + req.body.useremail + '</b> </p>' +
                '<p> Bidding item: <b>' + req.body.auctiontitle + '</b> </p>' +
                '<p> Bidding price : <b>' + req.body.acutionprice + '</b> </p>' +

                '<footer class="conteiner-fluid no-gutters"> <br> <br> <hr>' +
                '<div class="w-100 footer-heading"> Acution </div>' +
                '</footer>' +
                '</div>'
        };

        let addBidding = new biddingModel({
            username: req.body.username,
            auctiontitle: req.body.auctiontitle,
            acutionprice: req.body.acutionprice,
            biddingprice: req.body.biddingprice,
            auctionimage: req.body.auctionimage,
            userid: req.body.userid,
            auctionid: req.body.auctionid,
            useremail: req.body.useremail
        });

        addBidding.save().then(function () {

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                added: true,
                message: 'Bidding placed'
            }, null, 3));
        }).catch(function (err) {
            console.log(err)
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                added: false,
                message: 'Fail to add bidding'
            }, null, 3));
        })
    },

    async getBidding(req, res) {
        biddingModel.find().then(function (biddingdata) {
            console.log(biddingdata)
            res.send(biddingdata)
        })
    },

    async getbiddingForAdmin(req, res) {
        biddingModel.find().then(function (biddingdata) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                data: biddingdata,
                selected: true,
                message: 'Fail to add bidding'
            }, null, 3));
        })
    },

    async endBidding(req, res) {
        let useremail = req.body.useremail;
        let auctionid = req.body.auctionid;

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            requireTLS: true,
            auth: {
                user: 'ktmnpl0001@gmail.com',
                pass: 'Kathmandu01'
            }
        });

        var mailOptions = {
            from: 'ktmnpl0001@gmail.com',
            to: useremail,
            subject: 'Winner announced',
            text: '',
            html:
                '<div class="container-fluid main-container">' +
                'Congrulation you have won the bidding <br> <br>' +

                '<hr>' +

                '<h1>Winner</h1>' +
                '<hr>' +
                '<p> Bidding item: <b>' + req.body.biddingtitle + '</b> </p>' +

                '<footer class="conteiner-fluid no-gutters"> <br> <br> <hr>' +
                '<div class="w-100 footer-heading"> Acution </div>' +
                '</footer>' +
                '</div>'
        };

        biddingModel.deleteMany({
            auctionid: auctionid
        }).then(function () {
            auction.deleteOne({
                _id: auctionid
            }).then(function () {


                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
    
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    ended: true,
                    message: 'Auction ended winnder has been notified'
                }, null, 3));
            })
        })

    }



}