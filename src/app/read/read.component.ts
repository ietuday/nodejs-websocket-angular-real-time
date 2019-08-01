import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';
import {WebSocketService} from '../web-socket.service';
import { ReadData } from '../data-models/read-data';

@Component({
    selector: 'app-read',
    templateUrl: './read.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./read.component.scss'],
    providers: [WebSocketService]
})

export class ReadComponent implements OnInit {

    public readDetails: ReadData = new ReadData();
    constructor(private router  : Router) {
        WebSocketService.getInstance().selectedBookBehaviorSubject.subscribe(data=>this.selectedBookBehaviorSubjectHandler(data));
        WebSocketService.getInstance().loginStatusBehaviorSubject.subscribe(data=>this.loginStatusBehaviorSubjectHandler(data));
        WebSocketService.getInstance().requestDetailsBehaviorSubject.subscribe(data=>this.requestDetailsBehaviorSubjectHandler(data));
    }

    ngOnInit() {
    }
    
    showListPage(){
        this.router.navigate(['/showList']);
    }
    
    request(){
        WebSocketService.getInstance().sendMessage({
            action : "request",
            message : {
                "bookName" : this.readDetails.bookName,
                "bookOwnerEmailId" : this.readDetails.bookOwnerEmailId,
                "requesterEmailId" : this.readDetails.requesterEmailId,
                "date" : this.readDetails.date
            }
        });
    }
    
    selectedBookBehaviorSubjectHandler(data){
        console.log("Inside readComponent :selectedBookBehaviorSubjectHandler : data",data);
        console.log("Inside readComponent :selectedBookBehaviorSubjectHandler : data",data.message);
        if(data.message != undefined){
            this.readDetails.bookOwnerEmailId = data.message.emailId;
            console.log("Inside readComponent :selectedBookBehaviorSubjectHandler : this.readDetails.bookOwnerEmailId",this.readDetails.bookOwnerEmailId);
            this.readDetails.bookName = data.message.bookName;
            console.log("Inside readComponent :selectedBookBehaviorSubjectHandler : this.readDetails.bookName",this.readDetails.bookName);
        }
    }
    
    loginStatusBehaviorSubjectHandler(data){
        if(data != undefined && data != ''){
            console.log("Inside readComponent :loginStatusBehaviorSubjectHandler : data",data);
            this.readDetails.requesterEmailId = data.message[0].emailId;
            console.log("Inside readComponent :loginStatusBehaviorSubjectHandler : this.readDetails.requesterEmailId",this.readDetails.requesterEmailId);
        }
    }
    
    requestDetailsBehaviorSubjectHandler(data){
        console.log("************************Read Component : requestDetailsBehaviorSubjectHandler : data",data);
        if(data != undefined){
            if(data != ''){
                if(data.status == 'Success'){
                    console.log("Inside requestDetailsBehaviorSubjectHandler :-----",data);
                    this.router.navigate(['/messages']);
                }
                else{
                    alert("Display failed");
                }
            }
        }
    }
}
