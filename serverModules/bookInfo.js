var MongoClient = require('mongodb').MongoClient
        , assert = require('assert');

var url = 'mongodb://localhost:27017/BookApp';
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    // createCollection1(db, function () {
  //insertDocuments(db, function () {
        db.close();
    });
//});


var createCollection1 = function (db, callback) {
    db.createCollection("users", function (err, results) {
        console.log("Collection created.");
        callback();
    }
    );
};

var insertDocuments = function (db, callback) {

    var collection = db.collection('users');

    collection.insertMany([
        {
            "name": "Priyanka",
            "emailId": "koshtipriyanka27@gmail.com",
            "password": "priyanka",
            "address": {
                "buildingName": "Laxmi_Nivas",
                "streetNumber": 25,
                "country": "India",
                "city": "Pune",
                "state": "Maharashtra",
                "pincode": 411033
            },
            "phoneNumber": 7776018458,

            "books": [{
                    "bookName": "Wings_Of_Fire",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 1,
                    "status": "Available",
                    "price": 300,
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{
                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]

                },
                {
                    "bookname": "Ignited_Minds",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 2,
                    "price": 250,
                    "status": "Available",
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{
                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]

                },
                {
                    "bookname": "India_2020",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 3,
                    "price": 270,
                    "status": "Available",
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{
                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]
                },
                {
                    "bookname": "Indomitable_Spirit",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 4,
                    "price": 300,
                    "status": "Available",
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{
                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]

                },
                {
                    "bookname": "Turning_Points",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 5,
                    "price": 300,
                    "status": "Available",
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{
                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]
                },
                {
                    "bookname": "Transcendence",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 6,
                    "price": 350,
                    "status": "Available",
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{
                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]
                },
                {
                    "bookname": "My_Journey",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 7,
                    "price": 250,
                    "status": "Available",
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{
                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]

                },
                {
                    "bookname": "Target_3_Billion",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 8,
                    "price": 300,
                    "status": "Available",
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{
                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]
                }
            ]
        },

        {
            "name": "Devendra",
            "emailId": "devendra@gmail.com",
            "password": "devendra",
            "address": {
                "buildingName": "Aashirwad",
                "streetNumber": 56,
                "country": "India",
                "city": "Pune",
                "state": "Maharashtra",
                "pincode": 411033
            },
            "phoneNumber": 8601258690,
            "books": [{
                    "bookname": "Envisioning_An_Empower",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 9,
                    "price": 676,
                    "status": "Available",
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{
                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]

                },
                {
                    "bookname": "Forge_Your_Future",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 10,
                    "price": 676,
                    "status": "Available",
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{
                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]
                },
                {
                    "bookname": "The_Luminious_Sparks",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 11,
                    "price": 676,
                    "status": "Available",
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{
                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]

                },
                {
                    "bookname": "Guiding_Souls",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 12,
                    "price": 676,
                    "status": "Available",
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{
                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]
                },
                {
                    "bookname": "Reignited",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 13,
                    "price": 676,
                    "status": "Available",
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{
                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]

                },
                {
                    "bookname": "The_Life_Tree",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 14,
                    "price": 676,
                    "status": "Available",
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{
                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]

                },
                {
                    "bookname": "A_Manifesto_For_Change",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 15,
                    "price": 676,
                    "status": "Available",
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{
                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]
                },
                {
                    "bookname": "Children_Ask_Kalam",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 16,
                    "price": 676,
                    "status": "Available",
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{
                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]

                },
                {
                    "bookname": "Advantage_India",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 17,
                    "price": 676,
                    "status": "Available",
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{

                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]

                },
                {
                    "bookname": "Beyond_2020",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 18,
                    "price": 676,
                    "status": "Available",
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{
                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]

                }
            ]
        },

        {
            "name": "Deepali",
            "emailId": "deepali@gmail.com",
            "password": "deepali",
            "address": {
                "buildingName": "Arohi",
                "streetNumber": 45,
                "country": "India",
                "city": "Pune",
                "state": "Maharashtra",
                "pincode": 411033
            },
            "phoneNumber": 8601458236,
            "books": [{
                    "bookname": "You_Are_Born_To_Blossom",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 19,
                    "price": 676,
                    "status": "Available",
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{
                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]

                },

                {
                    "bookname": "Governance_For_Growth_In_India",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 20,
                    "price": 676,
                    "status": "Available",
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{
                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]

                },
                {
                    "bookname": "Spirit_Of_India",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 21,
                    "price": 676,
                    "status": "Available",
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{
                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]

                },
                {
                    "bookname": "The_Family_And_The_Nation",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 22,
                    "price": 676,
                    "status": "Available",
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{
                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]

                },
                {
                    "bookname": "My_India_The_Ideas_For_Future",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 23,
                    "price": 676,
                    "status": "Available",
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{
                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]

                },
                {
                    "bookname": "Squaring_The Circle",
                    "author": "APJ_Abdul_Kalam",
                    "isbn": 24,
                    "price": 676,
                    "status": "Available",
                    "reviews": [{
                            "name": " ",
                            "rating": '',
                            "date": "",
                            "review": ""
                        }],
                    "requests": [{
                            "requesterId": '',
                            "isbn": '',
                            "requesterDate": ""
                        }],
                    "messages": [{
                            "senderId": "",
                            "bookName": "",
                            "message": ""
                        }]

                }

            ]
        }

    ], function (err, result) {
        assert.equal(err, null);
        console.log("Inserted 24 documents into the collection");
        callback(result);
    });
}

exports.sendWsMessage = function (connection, data) {
//     console.log("message inside sendWsMessage",message)
    try {
      //message.source = 'mongoClient';
        connection.send((JSON.stringify(data)), function ack(error) {
            if (error !== undefined) {
                console.log("Error sending data", JSON.stringify(data), error);
            }
        });
    } catch (e) {
        console.log("Error sending data", JSON.stringify(data));
    }
};


exports.findDocumentFields = function (collname, query, fields, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection(collname)
                .find(query, fields).toArray(function (err, result) {
            if (err) {
                console.log(err);
                if (JSON.stringify(err).indexOf('timed out') === -1) {
                    assert.equal(err, null);
                }
            }
            callback(result);
            db.close();
        });
    });
};


exports.insertDocument = function (collname, insObj) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection(collname)
                .insertOne(insObj, function (err, result) {
                    if (err) {
                        console.log(err);
                        if (JSON.stringify(err).indexOf('timed out') === -1) {
                            assert.equal(err, null);
                        }
                    }
                    // console.log("Inserted a document into the " + collname + " collection.", result, err);
//                    callback(err, result);
                    db.close();
                });
    });
};

exports.updateOldArrayDocument1 = function (collname, query, updateObject) {
    MongoClient.connect(url, function (err, db) {
        // assert.equal(null, err);
        db.collection(collname)
                .updateOne(query, {$set: updateObject}, function (err, result) {
                    if (err) {
                        console.log(err);
                        if (JSON.stringify(err).indexOf('timed out') === -1) {
                            assert.equal(err, null);
                        }
                    }
                  console.log(" Updated object into Array", result, err);
                    
                    db.close();
                });
    });
};

exports.updateArrayDocumentPull = function (collname, query, pushObj) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection(collname)
                .update(query, {$pull: pushObj}, {"$upsert": true}, function (err, result) {
                    if (err) {
                        console.log(err);
                        if (JSON.stringify(err).indexOf('timed out') === -1) {
                            assert.equal(err, null);
                        }
                    }
                    // console.log(" Inserted object into Array", result, err);
                  
                    db.close();
                });
    });
};

//addBook
    //mongo.updateOldArrayDocument("users", {"name": data.message.name},book);
    //mongo.findDocumentFields("users", {"name": data.message.name}, {"books": true, "_id": false}, function (returnedBooks) {
        //console.log("Inside findDocumentFields returnedBooks :", returnedBooks);
        //  mongo.insertDocument("users",  data.message.book, function(addedBooks){
      //  mongo.updateOldArrayDocument1("users", {"name": data.message.name},  data.message.book, function (addedBooks) {
       //     console.log("addedBooks", addedBooks);
      //  });
   // });
   
   // mongo.updateOldArrayDocument1("users",{"name":data.message.name},returnedBooks,function(query, err, result){
//   console.log("PublishedArticles Updated Successfully");
//   mongo.findArticles("users",{"books" : true},function(result){
//     console.log("result"+result);
////     mongo.sendTo(connection, {
////       action: "articles",
////       data: result,
////       status: "gotArticles"
////     });
//mongo.sendWsMessage(connection, data);
//   });
//  })
    