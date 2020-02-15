const app = module.exports = require('express')();
const auctioncontroller = require('../controllers/auction')
const auctionmodel = require('../model/auction')
let multer = require('multer')
let path= require('path')




var ImagefileName = '';
var storage = multer.diskStorage({
    destination: 'asset/uploads/images/auctions',
    filename: function (req, file, callback) {
        const extension = path.extname(file.originalname);
        ImagefileName = file.fieldname + Date.now() + extension;
        callback(null, ImagefileName);

    }
});


var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
};

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 10000000
    }
});
app.post('/addauction', upload.single('auctionphoto'), function (req, res) {

    let addAuction = new auctionmodel({
        title: req.body.title,
        minimalprice: req.body.minimalprice,
        auctionissuedate: req.body.auctionissuedate,
        auctionenddate: req.body.auctionenddate,
        auctionphoto: ImagefileName,
        description: req.body.description
    });

    addAuction.save().then(function () {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            added: true,
            message: 'new auction added'
        }, null, 3));
    }).catch(function () {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            added: false,
            message: 'Failed to add auction'
        }, null, 3));
    })


})

app.get('/getauction', auctioncontroller.getALlAuction);