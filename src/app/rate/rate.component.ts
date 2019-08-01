import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';
import {Message} from 'primeng/primeng';
import {WebSocketService} from '../web-socket.service';
import { RateData } from '../data-models/rate-data';

@Component({
    selector: 'app-rate',
    templateUrl: './rate.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./rate.component.scss'],
    providers: [WebSocketService]
})

export class RateComponent implements OnInit {

    public msgs: Message[] = [];
    public msg: string = "";
    public rateDetails: RateData = new RateData();
    
    constructor(private router  : Router) {
        WebSocketService.getInstance().rateBookBehaviorSubject.subscribe(data=>this.rateBookBehaviorSubjectHandler(data));
        WebSocketService.getInstance().loginStatusBehaviorSubject.subscribe(data=>this.loginStatusBehaviorSubjectHandler(data));
        WebSocketService.getInstance().selectedBookBehaviorSubject.subscribe(data=>this.selectedBookBehaviorSubjectHandler(data));
    }

    ngOnInit() {
    }

    handleRate(event) {
        this.msg = "You have rated " + event.value;
    }

    handleCancel(event) {
        this.msg = "Rating Cancelled";
    }

    submit(){
        WebSocketService.getInstance().sendMessage({
            action : "rateBook",
            message : {
                "name" : this.rateDetails.name,
                "emailId" : this.rateDetails.emailId,
                "date" : this.rateDetails.date,
                "value" : this.rateDetails.value,
                "review" : this.rateDetails.review,
                "bookName" : this.rateDetails.bookName
            }
        });
    }

    showListPage(){
        this.router.navigate(['/showList']);
        WebSocketService.getInstance().rateBookBehaviorSubject.next('');
    }
    
    rateBookBehaviorSubjectHandler(data){
        console.log("Rate Component : rateBookBehaviorSubjectHandler : data",data);
        if(data != undefined){
            if(data != ''){
                if(data.status == 'Success'){
                    console.log("Inside rateBookBehaviorSubjectHandler :-----",data);
                    this.msgs.push({severity:'success', summary:'Successfully Added'});
                }
                else{
                    alert("Display failed");
                }
            }
        }
    }
    
    loginStatusBehaviorSubjectHandler(data){
        if(data != undefined && data != ''){
            console.log("Inside rateBookComponent :loginStatusBehaviorSubjectHandler : data",data);
            console.log("Inside rateBookComponent :loginStatusBehaviorSubjectHandler : data.message.emailId",data.message[0].emailId);
            this.rateDetails.emailId = data.message[0].emailId;
            console.log("Inside rateBookComponent :loginStatusBehaviorSubjectHandler : data.message.name",data.message[0].name);
            this.rateDetails.name = data.message[0].name;
            console.log("Inside addBookComponent :loginStatusBehaviorSubjectHandler : name",this.rateDetails.name,this.rateDetails.emailId);
        }
    }
    
    selectedBookBehaviorSubjectHandler(data){
        console.log("Inside rateBookComponent :selectedBookBehaviorSubjectHandler : data",data);
        console.log("Inside rateBookComponent :selectedBookBehaviorSubjectHandler : data.message",data.message);
        this.rateDetails.bookName = data.message;
        console.log("Inside rateBookComponent : selectedBookBehaviorSubjectHandler : rateDetails.bookName",this.rateDetails.bookName);
    }
}
