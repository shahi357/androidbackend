var userModel = require('../model/user');
const jwt = require('jsonwebtoken');
const config = require('../config')
const nodemailer= require('nodemailer')

module.exports = {
    async RegisterUser(req, res) {

        let fullname = req.body.fullname;
        let address = req.body.address;
        let mobile_number = req.body.mobile_number;
        let email = req.body.email;
        let password = req.body.password;
        let user_type = req.body.user_type

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
            to: req.body.email,
            subject: 'Account created ',
            text: '',
            html:
                '<div class="container-fluid main-container">' +
                'New Account Created <br> <br>' +

                '<hr>' +

                '<h1>New Account created</h1>' +
                '<hr>' +
                '<p> Name : <b>' + req.body.fullname + '</b> </p>' +
                '<p> Email : <b>' + req.body.email + '</b> </p>' +
                '<p> Address: <b>' + req.body.address + '</b> </p>' +
                '<p> Number : <b>' + req.body.mobile_number + '</b> </p>' +

                '<footer class="conteiner-fluid no-gutters"> <br> <br> <hr>' +
                '<div class="w-100 footer-heading"> Auction Copyright all right reserved </div>' +
                '</footer>' +
                '</div>'
        };

        userModel.findOne({
            email: email
        }).then(function (result) {
            if (result == null) {
                var addUser = new userModel({
                    fullname: fullname,
                    address: address,
                    mobile_number: mobile_number,
                    email: email,
                    password: password,
                    user_type: user_type
                });

                addUser.save().then(function () {


                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        registered: true,
                        message: 'New user registered'
                    }, null, 3));
                }).catch(function () {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        registered: false,
                        message: 'Something went wrong please try again'
                    }, null, 3));
                })
            }
            else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    error: true,
                    message: 'User already exist'
                }, null, 3));
            }
        })
    },

    async LoginUser(req, res) {

        let email = req.body.email;
        let password = req.body.password;

        userModel.find({
            email: email,
            password: password
        }).then(function (userdata) {
            console.log(userdata)
            res.send(userdata)
        })
    },

    async UpdateUser(req, res) {
        console.log('req received')

        let fullname = req.body.fullname;
        let address = req.body.address;
        let mobile_number = req.body.mobile_number;
        let email = req.body.email;
        let password = req.body.password;

        userModel.updateOne({
            email: email
        }, {
            $set: {
                fullname: fullname,
                address: address,
                mobile_number: mobile_number,
                email: email,
                password: password
            }
        }).then(function () {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                updated: true,
                message: 'Profile updated'
            }, null, 3));
        }).catch(function () {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                registered: false,
                message: 'Failed to update profile'
            }, null, 3));
        })
    },
}