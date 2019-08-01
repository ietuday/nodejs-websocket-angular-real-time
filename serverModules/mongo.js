var MongoClient = require('mongodb').MongoClient
        , assert = require('assert');
var url = 'mongodb://localhost:27017/BookApp';

exports.insertDocuments = function (collName, insObject, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection(collName).insertMany(insObject, function (err, result) {
            if (err) {
                console.log(err);
                if (JSON.stringify(err).indexOf('timed out') === -1) {
                    assert.equal(err, null);
                }
            }
            console.log("Inserted a document into the " + collName + " collection.", result, err);
            callback(err, result);
            db.close();
        });
    });
};

exports.findDocument = function (collname, query, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection(collname)
                .find(query).toArray(function (err, result) {
            if (err) {
                console.log(err)
                if (JSON.stringify(err).indexOf('timed out') === -1) {
                    assert.equal(err, null);
                }
            }
            callback(result);
            db.close();
        });
    });
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

exports.findDocumentFieldsLimit = function (collname, query, fields, limit, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection(collname)
                .find(query, fields).limit(limit).toArray(function (err, result) {
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

exports.findDocumentFieldsLimitReverse = function (collname, query, fields, limit, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection(collname)
                .find(query, fields).sort({$natural: -1}).limit(limit).toArray(function (err, result) {
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

exports.findDocumentSort = function (collname, query, sort, direction, callback) {
    // console.log("sort#######",sort,direction)
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection(collname)
                .find(query).sort(sort).toArray(function (err, result) {
            if (err) {
                console.log(err);
                if (JSON.stringify(err).indexOf('timed out') === -1) {
                    //  assert.equal(err, null);
                }
            }
            callback(err, result);
            db.close();
        });
    });
};

exports.updateArrayDocumentPull = function (collname, query, pushObj, callback) {
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
                    callback(err, result);
                    db.close();
                });
    });
};

exports.updateArrayDocument = function (collname, query, pushObj, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection(collname)
                .update(query, {$push: pushObj}, {"$upsert": true}, function (err, result) {
                    if (err) {
                        console.log(err);
                        if (JSON.stringify(err).indexOf('timed out') === -1) {
                            assert.equal(err, null);
                        }
                    }
                    // console.log(" Inserted object into Array", result, err);
                    callback(err, result);
                    db.close();
                });
    });
};

exports.updateOldArrayDocument = function (collname, query, updateObject, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection(collname)
                .updateMany(query, {$set: updateObject}, function (err, result) {
                    if (err) {
                        console.log(err);
                        if (JSON.stringify(err).indexOf('timed out') === -1) {
                            assert.equal(err, null);
                        }
                    }
                    // console.log(" Updated object into Array", result, err);
                    callback(err, result);
                    db.close();
                });
    });
};

exports.updateOldArrayDocument1 = function (collname, query, updateObject, callback) {
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
                    // console.log(" Updated object into Array", result, err);
                    callback(query, err, result);
                    db.close();
                });
    });
};

exports.insertDocument = function (collname, insObj, callback) {
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
                    callback(err, result);
                    db.close();
                });
    });
};

exports.updateDocumentUpsert = function (collname, query, setValues, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection(collname)
                .updateOne(query, {$set: setValues}, {"$upsert": true}, function (err, result) {
                    if (err) {
                        console.log(err);
                        if (JSON.stringify(err).indexOf('timed out') === -1) {
                            assert.equal(err, null);
                        }
                    }
                    // console.log("Updated a document into the " + collname + " collection.", result, err);
                    callback(result, query, setValues);
                    db.close();
                });
    });
};

exports.findArticles = function (collname, query, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection(collname)
                .find(query).sort({"_id": -1}).toArray(function (err, result) {
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

exports.deleteDocument = function (collname, obj, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection(collname).deleteOne(obj, function (err, result) {
            if (err) {
                console.log(err);
                if (JSON.stringify(err).indexOf('timed out') === -1) {
                    assert.equal(err, null);
                }
            }
            callback(err, result);
            db.close();
        });
    });
};
