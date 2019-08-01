// Global variables
var port = '9000';
var openSessions = {};
var http = require('http');
var ejs = require('ejs');
var request = require('request');
var url = require('url');
var fs = require('fs');
var book = require("./serverModules/book.js");
var WebSocketServer = require('ws').Server;
var bodyParser = require('body-parser')
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/dist'));
app.set('views', __dirname + '/dist');
var MongoClient = require('mongodb').MongoClient
        , assert = require('assert');
var connections = {};

app.engine('html', ejs.renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => res.render('index.html'));
app.get('*', (req, res) => res.render('index.html'));

var httpServer = http.createServer(app);
httpServer.listen(port);
console.log("Listen PORT: ", port);

var wss = new WebSocketServer({
    server: httpServer
});

wss.on("open", function (con) {
    console.log(
            "open", con
            );
});

MongoClient.connect('mongodb://localhost:27017/BookApp', function (err, db) {
    assert.equal(null, err);
    db.collection('onlineUsers').drop();
    db.createCollection('onlineUsers', function () {
        console.log("New Collection created");
    })
});

wss.on('connection', function (connection) {
    console.log("******** new app connected: connection.id", connection._ultron.id);
    connection.send(JSON.stringify({
        action: "wsConnected",
        emailId: "",
        data: "",
        status: "New ws connection"
    }));
    connection.on('message', function (message) {
        console.log("Server onMessage", message);

        var data;
        try {
            data = JSON.parse(message);
            if (data.a == undefined) {
                data.message = data.message;
            } else {
                return;
            }
        } catch (e) {
            console.log("Invalid JSON");
            return;
        }

        console.log("process action", data.action);
        switch (data.action) {
            case "login" :
                console.log("Inside Server : login case", data);
                book.login(connection, openSessions, data);
                break;

            case "newUser" :
                console.log("Inside server : newUser case", data);
                book.newUser(connection, openSessions, data);
                break;

            case "addBook" :
                console.log("Inside server : addBook case", data);
                book.addBook(connection, openSessions, data);
                break;

            case "getBooks" :
                console.log("Inside server : getBooks case", data);
                book.getBooks(connection, openSessions, data);
                break;

            case "rateBook" :
                console.log("Inside server : rateBook case", data);
                book.rateBook(connection, openSessions, data);
                break;

            case "selectedBook" :
                console.log("Inside server : selectedBook case", data);
                book.selectedBook(connection, openSessions, data);
                break;

            case "showReviews" :
                console.log("Inside server : showReviews case", data);
                book.showReviews(connection, openSessions, data);
                break;

            case "request" :
                console.log("Inside server : request case", data);
                book.request(connection, openSessions, data);
                break;

            case "insertRequest" :
                console.log("Inside server : insertRequest case", data);
                book.insertRequest(connection, openSessions, data);
                break;

            case "showRequests" :
                console.log("Inside server : showRequests case", data);
                book.showRequests(connection, openSessions, data);
                break;

            case "requestStatus" :
                console.log("Inside server : requestStatus case", data);
                book.requestStatus(connection, openSessions, data);
                break;

            case "showMessages" :
                console.log("Inside server : showMessages case", data);
                book.showMessages(connection, openSessions, data);
                break;

            case "deleteBook" :
                console.log("Inside server : deleteBook case", data);
                book.deleteBook(connection, openSessions, data);
                break;

            case "logout" :
                book.logout(connection, openSessions);
                break;

            case "returnBook" :
                book.returnBook(connection, openSessions, data);
                break;

            case "returnSelectedBook" :
                book.returnSelectedBook(connection, openSessions, data);
                break;

            case "reportSelectedBook" :
                book.reportSelectedBook(connection, openSessions, data);
                break;
                
            case "showOnlineRequests" :
                book.showOnlineRequests(connection, openSessions, data);
                break;
        }
    });

    connection.on("close", function () {
        console.log("Closing connection");
        book.logout(connection, openSessions);
    });
});
