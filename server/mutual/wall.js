var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
var jsonWrite = function(res, ret){
    if(typeof ret === 'undefined'){
        res.json({
            code: 'emmm',
            msg: '报错了emmmm'
        })
    }else{
        res.json(ret)
    }
}
module.exports = {
    getAllComments:function(req, res, next){
        // Connect using MongoClient
        const client = new MongoClient(url);
        client.connect(function(err) {
            const wall = client.db('node').collection('wall')
            wall.find({}).toArray(function(err, docs){
                jsonWrite(res, err||docs)
                err? console.log(err):null
            })
            client.close();
        });
    },
    addComments: function(req, res, next){
        var params = req.body
        client.connect(function(err) {
            const wall = client.db('node').collection('wall')
            wall.insertMany([{
                name: params.name,
                content: params.content,
                head: 'https://imgsa.baidu.com/forum/pic/item/6059252dd42a28345099e49552b5c9ea15cebf75.jpg',
                time: Date.now()
            }],function(err, result){
                assert.equal(err, null);
                jsonWrite(res, err||result)      
            })
            client.close();
        });
    }
}