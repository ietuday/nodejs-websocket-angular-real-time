import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/share';
import { LoginData } from './data-models/login-data';

@Injectable()
export class WebSocketService {

    private static _instance: WebSocketService = new WebSocketService();
    private ws: WebSocket;
    private pingInterval: number;
    private messageQueue: Array<string> = new Array();
    private wsCreated: boolean = false;

    // define all your behavioural subjects below this
    public loginStatusBehaviorSubject : BehaviorSubject<any> = new BehaviorSubject('');
    public newUserStatusBehaviorSubject : BehaviorSubject<any> = new BehaviorSubject('');
    public addBookBehaviorSubject : BehaviorSubject<any> = new BehaviorSubject('');
    public getBooksBehaviorSubject : BehaviorSubject<any> = new BehaviorSubject('');
    public rateBookBehaviorSubject : BehaviorSubject<any> = new BehaviorSubject('');
    public selectedBookBehaviorSubject : BehaviorSubject<any> = new BehaviorSubject('');
    public showReviewsBehaviorSubject : BehaviorSubject<any> = new BehaviorSubject('');
    public requestDetailsBehaviorSubject : BehaviorSubject<any> = new BehaviorSubject('');
    public showOnlineRequestsBehaviorSubject : BehaviorSubject<any> = new BehaviorSubject('');
    public showRequestsBehaviorSubject : BehaviorSubject<any> = new BehaviorSubject('');
    public showMessagesBehaviorSubject : BehaviorSubject<any> = new BehaviorSubject('');
    public deleteBookBehaviorSubject : BehaviorSubject<any> = new BehaviorSubject('');
    public returnBookBehaviorSubject : BehaviorSubject<any> = new BehaviorSubject('');
    public returnSelectedBookBehaviorSubject : BehaviorSubject<any> = new BehaviorSubject('');
    
  constructor() {
      if (WebSocketService._instance) {
            throw new Error("Error: Instantiation failed: Use WebSocketService.getInstance() instead of new.");
        }
        WebSocketService._instance = this;
  }

    public static getInstance(): WebSocketService {
        console.log("WebSocketService: getInstance")
        return WebSocketService._instance; 
    }

    public connect() {
        if ("WebSocket" in window) {
            console.log("WebSocket is supported by your Browser!");

        if (!this.wsCreated) {
            console.log("this wsCreated");

            // Let us open a web socket
            var url = ("https:" == document.location.protocol ? "wss://" : "ws://") + (document.location.hostname) + ("" == document.location.port ? "" : ":9000") + "/wsendpoint";
            console.log("ws url", url);
            this.ws = new WebSocket(url);

            this.ws.onopen = () => {
                console.log("Connection opened...");
                this.cleanMessageQueue();
            };

            this.ws.onmessage = (evt) => {
                try {
                    var message = JSON.parse(evt.data);
                    console.log("message", message);
                 
                    if (message.action == 'login') {
                        console.log("WS message : loginCase",message);
                        this.loginStatusBehaviorSubject.next(message);
                    } 
                    
                    else if (message.action == 'newUser') {
                        console.log("WS message : newUserCase",message);
                        this.newUserStatusBehaviorSubject.next(message);
                    } 
                    
                    else if (message.action == 'addBook') {
                        console.log("WS message : addBookCase",message);
                        this.addBookBehaviorSubject.next(message);
                    } 
                    
                    else if (message.action == 'getBooks') {
                        console.log("WS message : getBooksCase",message);
                        this.getBooksBehaviorSubject.next(message);
                    }
                    
                    else if (message.action == 'rateBook') {
                        console.log("WS message : rateBookCase",message);
                        this.rateBookBehaviorSubject.next(message);
                    } 
                    
                    else if (message.action == 'selectedBook') {
                        console.log("WS message : selectedBookCase",message);
                        this.selectedBookBehaviorSubject.next(message);
                    } 
                    
                    else if (message.action == 'showReviews') {
                        console.log("WS message : showReviewsCase",message);
                        this.showReviewsBehaviorSubject.next(message);
                    } 
                
                    else if (message.action == 'request') {
                        console.log("WS message : ***********requestCase",message);
                        this.requestDetailsBehaviorSubject.next(message);
                    } 
                    
                    else if (message.action == 'showRequests') {
                        console.log("WS message : showRequestsCase",message);
                        this.showRequestsBehaviorSubject.next(message);
                    } 
                    
                    else if (message.action == 'showMessages') {
                        console.log("WS message : showMessagesCase",message);
                        this.showMessagesBehaviorSubject.next(message);
                    } 
                    
                    else if (message.action == 'deleteBook') {
                        console.log("WS message : deleteBookCase",message);
                        this.deleteBookBehaviorSubject.next(message);
                    }
                    
                    else if (message.action == 'requestStatus') {
                        console.log("WS message : requestStatusCase",message);
                        this.showRequestsBehaviorSubject.next(message);
                    }
                    
                    else if (message.action == 'returnBook') {
                        console.log("WS message : returnBookCase",message);
                        this.returnBookBehaviorSubject.next(message);
                    }
                    
                    else if (message.action == 'returnSelectedBook') {
                        console.log("WS message : returnSelectedBookCase",message);
                        this.returnSelectedBookBehaviorSubject.next(message);
                    }
                    
                    else if (message.action == 'showOnlineRequests') {
                        console.log("WS message : showOnlineRequests",message);
                        this.showOnlineRequestsBehaviorSubject.next(message);
                    }
                    
                } catch (e) {
                    // console.log("Message received... Catch Error", evt.data, "error", e);
                }
            };

            this.ws.onclose = () => {
                // websocket is closed.
                console.log("Connection is closed...");
                clearInterval(this.pingInterval);
            };

            this.wsCreated = true;
        }

        } else {
            // The browser doesn't support WebSocket
            console.log("WebSocket NOT supported by your Browser!");
        }
    }

    public sendMessage(message: any) {
        console.log("Inside sendMessage: message.action", message.action);
        let sendFlag = this.ws === undefined ? false : (this.ws.readyState === 1);
        if (sendFlag) {
            this.ws.send(JSON.stringify(message));
            // this.ws.send(btoa(JSON.stringify(message)));
            console.log("Inside sendMessage: Message ", message);
        } else {
            console.log("Error");

            // Keep Alive Mechanism
            this.messageQueue.push(JSON.stringify(message));
            this.wsCreated = false;
            this.connect();
        }
    }

    // Ping Message Mechanism
    private cleanMessageQueue: any = function () {
        console.log("cleanMessageQueue");
        while (this.messageQueue.length > 0) {
            this.ws.send(this.messageQueue[0]);
            this.messageQueue.shift();
        }
        setInterval(function () {
            console.log("Sending Ping");
            this.ws.send(JSON.stringify({a: 'p'}));
        }, 50000);
    }

}