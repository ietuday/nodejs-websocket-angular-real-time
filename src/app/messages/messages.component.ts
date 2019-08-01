import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';
import { MessagesData } from '../data-models/messages-data';
import {WebSocketService} from '../web-socket.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./messages.component.scss'],
    providers: [WebSocketService]
})
export class MessagesComponent implements OnInit {

    public messagesDetails: MessagesData = new MessagesData();

    constructor(private router : Router) { 
        WebSocketService.getInstance().requestDetailsBehaviorSubject.subscribe(data=>this.requestDetailsBehaviorSubjectHandler(data));
    }

    ngOnInit() {
        WebSocketService.getInstance().sendMessage({
            action : "insertRequest",
            message : {
                "bookOwnerEmailId" : this.messagesDetails.bookOwnerEmailId,
                "requesterEmailId" : this.messagesDetails.requesterEmailId,
                "bookName" : this.messagesDetails.bookName,
                "isbn" : this.messagesDetails.isbn,
                "date" : this.messagesDetails.date,
                "status" : this.messagesDetails.status
            }
        });
    }

    showListPage(){
        this.router.navigate(['/showList']);
    }
    
    requestDetailsBehaviorSubjectHandler(data){
        console.log("Inside messages component : requestDetailsBehaviorSubjectHandler",data);
        if(data != undefined){
            if(data != ''){ 
                this.messagesDetails.bookOwnerEmailId = data.message.bookOwnerEmailId;
                this.messagesDetails.bookName = data.message.bookName;
                this.messagesDetails.date = data.message.date;
                this.messagesDetails.isbn = data.message.requiredIsbn[0].isbn;
                this.messagesDetails.requesterEmailId = data.message.requesterEmailId;
                this.messagesDetails.requiredId = data.message.requiredId[0]._id;
                console.log("&&&&&&",this.messagesDetails.requiredId);                
            }
        }
    }
}
