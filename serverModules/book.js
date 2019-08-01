var mongo = require('./mongo');
var connections = {};
var url = 'mongodb://localhost:27017/BookApp';
var MongoClient = require('mongodb').MongoClient
        , assert = require('assert');

exports.login = function (connection, openSessions, data) {
    openSessions[connection._ultron.id] = {
        "connection": connection,
        "emailId": data.message.emailId,
        "password": data.message.password
    };
    console.log("login fuction:", data);
    console.log("Inside book.js: login", data.message.emailId, data.message.password);
    mongo.findDocumentFields("users", {'emailId': data.message.emailId, 'password': data.message.password}, {"name": true, "emailId": true, "_id": false}, function (message) {
        console.log("Login data", data);
        console.log("Login message", message);
        data.message = message;
        console.log("inside field documents data.message :", data.message);
        data.status = message.length == 1 ? "Success" : "Fail";
        console.log("inside field documents data.status:", data.status);
        console.log("inside field documents data:message", data.message);
        console.log("inside field documents data:data", data);
        mongo.sendWsMessage(connection, data);
    });
    var onlineUser = data.message;
    connections[onlineUser.emailId] = connection;
    // Use connect method to connect to the server
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        db.collection('onlineUsers').insert(onlineUser, {"emailId": data.message.emailId}, function (err, result) {
            assert.equal(err, null);
            console.log("Inserted obj in onlineUsers", result);
            // db.collections('onlineUsers').find({ name: })
            db.collection('onlineUsers').find().toArray().then(function (data) {
                console.log("Got onlineUers", data);
                for (i in connections) {
                    data.message = data;
                    console.log("Inside online user----data.message", data.message);
                    data.action = "getOnlineUsers";
                    console.log("^HFGHGEG", data);
                    mongo.sendWsMessage(connection, data);
                    connections[i].send(JSON.stringify(data));
                }
            });
            // db.close();
        })
    });
};

exports.newUser = function (connection, openSessions, data) {

    openSessions[connection._ultron.id] = {
        "connection": connection,
        "name ": data.message.name,
        "emailId": data.message.emailId,
        "password": data.message.password,
        "mobileNumber": data.message.mobileNumber,
        "address": data.message.address,
        "requests": data.message.requests,
        "messages": data.message.messages
    }
    console.log("newUser fuction:", data);
    mongo.insertDocument("users", data.message, function (message) {
        console.log("Inside newUser message", message);
        data.status = "Success";
        for (i in connections) {
            connections[i].send(JSON.stringify(data));
        }
    });
};

exports.addBook = function (connection, openSessions, data) {
    openSessions[connection._ultron.id] = {
        "connection": connection,
        "emailId": data.message.emailId,
        "bookName": data.message.bookName,
        "author": data.message.author,
        "isbn": data.message.isbn,
        "status": data.message.status,
        "noOfPages": data.message.noOfPages,
        "genre": data.message.genre,
        "cover": data.message.cover,
        "price": data.message.price,
        "noOfEditions": data.message.noOfEditions,
        "publisher": data.message.publisher,
        "publicationYear": data.message.publicationYear,
        "language": data.message.language
    };
    console.log("addBook fuction:", data);
    console.log("Inside book.js: addBook", data.message);
    mongo.insertDocument("books", data.message, function (result) {
        console.log("Inserted 1 object", result);
    });
    data.status = "Success";
    for (i in connections) {
        connections[i].send(JSON.stringify(data));
    }
};

exports.getBooks = function (connection, openSessions, data) {
    openSessions[connection._ultron.id] = {
        "connection": connection
    };
    console.log("getBooks fuction:", data);
    mongo.findDocumentFields("books", {}, {"_id": false, "emailId": true, "bookName": true, "author": true, "isbn": true, "status": true, "price": true}, function (message) {
        console.log("getBooks message", message);
        data.message = message;
        data.status = "Success";
        console.log("Inside getBooks : data", data);
        for (i in connections) {
            connections[i].send(JSON.stringify(data));
        }
    });
};

exports.rateBook = function (connection, openSessions, data) {
    openSessions[connection._ultron.id] = {
        "connection": connection,
        "name": data.message.name,
        "emailId": data.message.emailId,
        "date": data.message.date,
        "value": data.message.value,
        "review": data.message.review,
        "bookName": data.message.bookName.bookName
    };
    var reviewInsert = {
        "name": data.message.name,
        "emailId": data.message.emailId,
        "date": data.message.date,
        "value": data.message.value,
        "review": data.message.review
    }
    console.log("rateBook fuction:", data);
    console.log("rateBook Function data.message.bookName", data.message.bookName);
    mongo.findDocumentFields("books", {"bookName": data.message.bookName.bookName}, {"reviews": true, "_id": false}, function (message) {
        mongo.updateArrayDocument("books", {"bookName": data.message.bookName.bookName}, {"reviews": reviewInsert}, function (message) {
            console.log("Inside rateBook function updateArrayDocument: message", message);
        });
        console.log("Inside rateBook function reviews", message);
    });
    data.status = "Success";
    for (i in connections) {
        connections[i].send(JSON.stringify(data));
    }
};

exports.selectedBook = function (connection, openSessions, data) {
    openSessions[connection._ultron.id] = {
        "connection": connection,
        "bookName": data.message.bookName,
        "emailId": data.message.emailId
    };
    console.log("selectedBook fuction:", data);
    mongo.sendWsMessage(connection, data);
};

exports.showReviews = function (connection, openSessions, data) {
    openSessions[connection._ultron.id] = {
        "connection": connection,
        "bookName": data.message.bookName
    };
    console.log("showReviews fuction:", data);
    console.log("showReviews function:data.message.bookName", data.message.bookName);
    if (data.message.bookName != undefined) {
        mongo.findDocumentFields("books", {"bookName": data.message.bookName.bookName}, {"reviews": true, "_id": false}, function (message) {
            console.log("showReviews message", message);
            data.message = message;
            console.log("Inside showReviews function: data.message", data.message);
            console.log("Inside showReviews : data", data);
            for (i in connections) {
                connections[i].send(JSON.stringify(data));
            }
        });
    }
};

exports.request = function (connection, openSessions, data) {
    openSessions[connection._ultron.id] = {
        "connection": connection,
        "bookName": data.message.bookName,
        "bookOwnerEmailId": data.message.bookOwnerEmailId,
        "requesterEmailId": data.message.requesterEmailId,
        "date": data.message.date
    };
    console.log("request fuction:", data);
    mongo.findDocumentFields("users", {"emailId": data.message.requesterEmailId}, {"_id": true}, function (result) {
        console.log("Inside request function : findDocumentFields result", result);
        data.message.requiredId = result;
        console.log("Inside request function : findDocumentFields data.message.requiredId", data.message.requiredId);
        console.log("############", data.message);
        mongo.findDocumentFields("books", {"bookName": data.message.bookName}, {"_id": false, "isbn": true}, function (isbn) {
            console.log("Inside request function : findDocumentFields isbn", isbn);
            data.message.requiredIsbn = isbn;
            console.log("Inside request function : findDocumentFields data.message.requiredIsbn", data.message.requiredIsbn);
            console.log("############", data.message);
            data.status = "Success";
            mongo.sendWsMessage(connection, data);
        });
    });
};

exports.insertRequest = function (connection, openSessions, data) {
    openSessions[connection._ultron.id] = {
        "connection": connection,
        "bookOwnerEmailId": data.message.bookOwnerEmailId,
        "requesterEmailId": data.message.requesterEmailId,
        "bookName": data.message.bookName,
        "isbn": data.message.isbn,
        "date": data.message.date,
        "status": data.message.status
    };
    var insertRequest = {
        "requesterEmailId": data.message.requesterEmailId,
        "bookName": data.message.bookName,
        "isbn": data.message.isbn,
        "date": data.message.date,
        "status": data.message.status
    }
    mongo.findDocumentFields("onlineUsers", {$or: [{"emailId": data.message.requesterEmailId}, {"emailId": data.message.bookOwnerEmailId}]}, {"_id": true}, function (result) {
        console.log("Inside insert request online users#########", result);
        if (result[1] != null) {
            console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
            console.log("insertRequest onlineUsers fuction:", data);
            mongo.findDocumentFields("users", {"bookName": data.message.bookName, "isbn": data.message.isbn}, {"requests": true, "_id": false}, function (result) {
                mongo.updateArrayDocument("users", {"emailId": data.message.bookOwnerEmailId}, {"onlineRequests": insertRequest}, function (message) {
                    console.log("Inside onlineInsertRequest function updateArrayDocument: message", message);
                    mongo.findDocumentFields("users", {"emailId": data.message.bookOwnerEmailId}, {"onlineRequests": true, "_id": false}, function (message1) {
                        var emailId1 = data.message.bookOwnerEmailId;
                        console.log("showOnlineRequests message", message1);
                        data.action = "showOnlineRequests";
                        data.message = message1;
                        connections[emailId1].send(JSON.stringify(data));
                    });
                });
                console.log("Inside insertRequest onlineUsers function request", result);
                mongo.updateArrayDocument("users", {"emailId": data.message.bookOwnerEmailId}, {"requests": insertRequest}, function (message) {
                    console.log("Inside insertRequest function updateArrayDocument: message", message);
                });
            });
        } else {
            console.log("insertRequest fuction:", data);
            mongo.findDocumentFields("users", {"bookName": data.message.bookName, "isbn": data.message.isbn}, {"requests": true, "_id": false}, function (result) {
                mongo.updateArrayDocument("users", {"emailId": data.message.bookOwnerEmailId}, {"requests": insertRequest}, function (message) {
                    console.log("Inside insertRequest function updateArrayDocument: message", message);
                });
                console.log("Inside insertRequest function request", result);
            });
        }
    });
};

exports.showRequests = function (connection, openSessions, data) {
    openSessions[connection._ultron.id] = {
        "connection": connection,
        "emailId": data.message.emailId
    };
    console.log("showRequests fuction:", data);
    console.log("showRequests function:data.message.emailId", data.message.emailId);
    mongo.findDocumentFields("users", {"emailId": data.message.emailId}, {"requests": true, "_id": false}, function (message) {
        console.log("showRequests message", message);
        data.message = message;
        console.log("Inside showRequests function: data.message", data.message);
        console.log("Inside showRequests : data", data);
        mongo.sendWsMessage(connection, data);
    });
};

exports.requestStatus = function (connection, openSessions, data) {
    openSessions[connection._ultron.id] = {
        "connection": connection,
        "bookOwnerEmailId": data.message.bookOwnerEmailId,
        "requesterEmailId": data.message.requesterEmailId,
        "bookName": data.message.bookName,
        "isbn": data.message.isbn,
        "date": data.message.date,
        "status": data.message.status
    };
    var emailIdReq1 = data.message.requesterEmailId;
    var emailIdReq2 = data.message.bookOwnerEmailId;
    console.log("Inside request status function--data", data);
    mongo.updateOldArrayDocument("users", {$and: [{"emailId": data.message.bookOwnerEmailId}, {"requests.bookName": data.message.bookName}, {"requests.isbn": data.message.isbn}, {"requests.date": data.message.date}]}, {"requests.$.status": data.message.status}, function (result) {
        console.log("#######", result);
        var message1 = {
            "bookOwnerEmailId": data.message.bookOwnerEmailId,
            "bookName": data.message.bookName,
            "isbn": data.message.isbn,
            "date": data.message.date,
            "status": data.message.status
        }
        mongo.updateArrayDocument("users", {"emailId": data.message.requesterEmailId}, {"messages": message1}, function (result1) {
            console.log("$$$$$$$$$", result1);
            mongo.findDocumentFields("users", {"emailId": data.message.bookOwnerEmailId}, {"requests": true, "_id": false}, function (message) {
                console.log("showRequests message", message);
                data.action = "showRequests";
                data.message = message;
                console.log("Inside showRequests function: data.message", data.message);
                console.log("Inside showRequests : data", data);
                mongo.sendWsMessage(connection, data);
            });

        });

        mongo.findDocumentFields("users", {"emailId": data.message.requesterEmailId}, {"messages": true, "_id": false}, function (message) {
            console.log("showMessages message", message);
            data.action = "showMessages";
            data.message = message;
            console.log("Inside showMessages function: data.message", data.message);
            console.log("Inside showMessages : data", data);
            connections[emailIdReq1].send(JSON.stringify(data));
        });
        var message2 = {
            "requesterEmailId": data.message.requesterEmailId,
            "bookName": data.message.bookName,
            "isbn": data.message.isbn,
            "date": data.message.date,
            "status": ""
        }
        mongo.updateArrayDocumentPull("users", {"emailId": data.message.bookOwnerEmailId, "onlineRequests.bookName": data.message.bookName, "onlineRequests.requesterEmailId": data.message.requesterEmailId}, {"onlineRequests": message2}, function (result1) {
            console.log("Deleted message", result1);

        });
        mongo.findDocumentFields("users", {"emailId": data.message.bookOwnerEmailId}, {"_id": false, "onlineRequests": true}, function (message) {
            console.log("Inside online requests #########", message);
            data.action = "showOnlineRequests";
            data.message = message;
            data.status = "Success";
            console.log("Inside online requests /////////////", emailIdReq2, data);
            connections[emailIdReq2].send(JSON.stringify(data));
        });
    });
    if (data.message.status == "Accepted") {
        console.log("Inside if case of request status");
        mongo.updateOldArrayDocument("books", {"emailId": data.message.bookOwnerEmailId, "bookName": data.message.bookName}, {"status": "Unavailable"}, function (result1) {
            console.log("$$$$$$$$$", result1);
            console.log("Inside if case of request status function--data", data);
            mongo.findDocumentFields("books", {}, {"_id": false}, function (message) {
                data.action = "getBooks";
                data.message = message;
                data.status = "Success";
                for (i in connections) {
                    connections[i].send(JSON.stringify(data));
                }
            });
        });
    }
};

exports.showMessages = function (connection, openSessions, data) {
    openSessions[connection._ultron.id] = {
        "connection": connection,
        "emailId": data.message.emailId
    };
    console.log("showMessages fuction:", data);
    console.log("showMessages function:data.message.emailId", data.message.emailId);
    mongo.findDocumentFields("users", {"emailId": data.message.emailId}, {"messages": true, "_id": false}, function (message) {
        console.log("showMessages message", message);
        data.message = message;
        console.log("Inside showMessages function: data.message", data.message);
        console.log("Inside showMessages : data", data);
        mongo.sendWsMessage(connection, data);
    });
};

exports.deleteBook = function (connection, openSessions, data) {
    openSessions[connection._ultron.id] = {
        "connection": connection,
        "bookName": data.message.bookName,
        "bookOwnerEmailId": data.message.bookOwnerEmailId,
        "emailId": data.message.emailId
    };
    console.log("showMessages fuction:", data);
    if (data.message.bookOwnerEmailId == data.message.emailId) {
        mongo.findDocumentFields("books", {"emailId": data.message.emailId, "bookName": data.message.bookName}, {}, function (message) {
            console.log("Found document--message", message);
            var deleteBook = message[0];
            console.log("########", deleteBook);
            mongo.deleteDocument("books", deleteBook, function (result) {
                console.log("Deleted Book", result);
                data.status = "Success";
                for (i in connections) {
                    connections[i].send(JSON.stringify(data));
                }
            });
        });
    } 
};

exports.logout = function (connection, openSessions) {
    console.log("Inside logout--openSessions", openSessions);
    for (i in connections) {
        if (connections[i] == connection) {
            console.log("i is printed", i);

            MongoClient.connect(url, function (err, db) {
                assert.equal(null, err);

                db.collection('onlineUsers').remove({"emailId": i}, function () {
                    console.log("Deleted from Database", i);
                });
            });
            delete connections[i];
        }
    }
    console.log("######", openSessions);
};

exports.returnBook = function (connection, openSessions, data) {
    openSessions[connection._ultron.id] = {
        "connection": connection,
        "emailId": data.message.emailId
    };
    console.log("Inside returnBook function", data);
    mongo.findDocumentFields("users", {"emailId": data.message.emailId}, {"messages": true, "_id": false}, function (result) {
        console.log("Inside returnBook function--result", result);
        data.message = result;
        data.status = "Success";
        console.log("Inside returnBook : data", data);
        mongo.sendWsMessage(connection, data);
    });
};

exports.returnSelectedBook = function (connection, openSessions, data) {
    openSessions[connection._ultron.id] = {
        "bookName": data.message.bookName,
        "bookOwnerEmailId": data.message.bookOwnerEmailId,
        "requestedDate": data.message.bookOwnerEmailId,
        "emailId": data.message.emailId
    };
    var emailId2 = data.message.bookOwnerEmailId;
    console.log("Inside returnSelectedBook function", data);
    mongo.findDocumentFields("users", {"emailId": data.message.emailId, "messages.bookName": data.message.bookName}, {"messages.$": true, "_id": false}, function (result) {
        console.log("Inside returnBook function--result", result);
        var returnedMessage = result[0].messages[0];
        console.log("######## returned message", returnedMessage);
        mongo.updateArrayDocumentPull("users", {"emailId": data.message.emailId, "messages.bookName": data.message.bookName, "messages.bookOwnerEmailId": data.message.bookOwnerEmailId}, {"messages": returnedMessage}, function (result1) {
            console.log("Deleted message", result1);
            mongo.findDocumentFields("users", {"emailId": data.message.emailId}, {"messages": true, "_id": false}, function (result) {
                data.action = "returnBook";
                data.message = result;
                data.status = "Success";
                mongo.sendWsMessage(connection, data);
            });
        });
        mongo.findDocumentFields("users", {"emailId": data.message.bookOwnerEmailId, "requests.bookName": data.message.bookName}, {"requests.$": true, "_id": false}, function (result2) {
            console.log("Inside returnBook function--result2", result2);
            var returnedRequest = result2[0].requests[0];
            console.log("######## returned request", returnedRequest)
            mongo.updateArrayDocumentPull("users", {"emailId": data.message.bookOwnerEmailId, "requests.bookName": data.message.bookName, "requests.requesterEmailId": data.message.emailId}, {"requests": returnedRequest}, function (result1) {
                console.log("Deleted request", result1);
                mongo.findDocumentFields("users", {"emailId": data.message.bookOwnerEmailId}, {"requests": true, "_id": false}, function (result) {
                    data.action = "showRequests";
                    data.message = result;
                    data.status = "Success";
                    console.log("##############", emailId2);
                    connections[emailId2].send(JSON.stringify(data));
                });
            });
        });
        mongo.updateOldArrayDocument("books", {"emailId": data.message.bookOwnerEmailId, "bookName": data.message.bookName}, {"status": "Available"}, function (result1) {
            console.log("$$$$$$$$$", result1);
            mongo.findDocumentFields("books", {}, {"_id": false, "emailId": true, "bookName": true, "author": true, "isbn": true, "status": true, "price": true}, function (message) {
                console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^", message);
                data.action = "getBooks";
                data.message = message;
                data.status = "Success";
                for (i in connections) {
                    connections[i].send(JSON.stringify(data));
                }
            });
        });
    });
};
exports.reportSelectedBook = function (connection, openSessions, data) {
    openSessions[connection._ultron.id] = {
        "bookName": data.message.bookName,
        "bookOwnerEmailId": data.message.bookOwnerEmailId,
        "requestedDate": data.message.bookOwnerEmailId,
        "emailId": data.message.emailId
    };
    var emailId2 = data.message.bookOwnerEmailId;
    console.log("Inside returnSelectedBook function", data);
    mongo.findDocumentFields("users", {"emailId": data.message.emailId, "messages.bookName": data.message.bookName}, {"messages.$": true, "_id": false}, function (result) {
        console.log("Inside returnBook function--result", result);
        var returnedMessage = result[0].messages[0];
        console.log("######## returned message", returnedMessage);
        mongo.updateArrayDocumentPull("users", {"emailId": data.message.emailId, "messages.bookName": data.message.bookName, "messages.bookOwnerEmailId": data.message.bookOwnerEmailId}, {"messages": returnedMessage}, function (result1) {
            console.log("Deleted message", result1);
            mongo.findDocumentFields("users", {"emailId": data.message.emailId}, {"messages": true, "_id": false}, function (result) {
                data.action = "returnBook";
                data.message = result;
                data.status = "Success";
                mongo.sendWsMessage(connection, data);
            });
        });
        mongo.findDocumentFields("users", {"emailId": data.message.bookOwnerEmailId, "requests.bookName": data.message.bookName}, {"requests.$": true, "_id": false}, function (result2) {
            console.log("Inside returnBook function--result2", result2);
            var returnedRequest = result2[0].requests[0];
            console.log("######## returned request", returnedRequest)
            mongo.updateArrayDocumentPull("users", {"emailId": data.message.bookOwnerEmailId, "requests.bookName": data.message.bookName, "requests.requesterEmailId": data.message.emailId}, {"requests": returnedRequest}, function (result1) {
                console.log("Deleted request", result1);
                mongo.findDocumentFields("users", {"emailId": data.message.bookOwnerEmailId}, {"requests": true, "_id": false}, function (result) {
                    data.action = "showRequests";
                    data.message = result;
                    data.status = "Success";
                    connections[emailId2].send(JSON.stringify(data));
                });
            });
        });
        mongo.updateOldArrayDocument("books", {"emailId": data.message.bookOwnerEmailId, "bookName": data.message.bookName}, {"status": "Lost"}, function (result1) {
            console.log("$$$$$$$$$", result1);
            mongo.findDocumentFields("books", {}, {"_id": false}, function (message) {
                data.action = "getBooks";
                data.message = message;
                data.status = "Success";
                for (i in connections) {
                    connections[i].send(JSON.stringify(data));
                }
            });
        });
    });
};

exports.showOnlineRequests = function (connection, openSessions, data) {
    openSessions[connection._ultron.id] = {
        "connection": connection,
        "emailId": data.message.emailId
    };
    console.log("showOnlineRequests fuction:", data);
    console.log("showOnlineRequests function:data.message.emailId", data.message.emailId);
    mongo.findDocumentFields("users", {"emailId": data.message.emailId}, {"onlineRequests": true, "_id": false}, function (message) {
        console.log("showOnlineRequests message", message);
        data.message = message;
        console.log("Inside showOnlineRequests function: data.message", data.message);
        console.log("Inside showOnlineRequests : data", data);
        mongo.sendWsMessage(connection, data);
    });
};