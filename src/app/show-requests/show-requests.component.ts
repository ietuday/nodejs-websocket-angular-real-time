import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';
import {WebSocketService} from '../web-socket.service';
import { ShowRequestsData } from '../data-models/showRequests-data';

@Component({
    selector: 'app-show-requests',
    templateUrl: './show-requests.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./show-requests.component.scss'],
    providers: [WebSocketService]
})

export class ShowRequestsComponent implements OnInit {

    public showRequests: ShowRequestsData = new ShowRequestsData();
    
    constructor(private router : Router) {
        WebSocketService.getInstance().showRequestsBehaviorSubject.subscribe(data=>this.showRequestsBehaviorSubjectHandler(data));
        WebSocketService.getInstance().loginStatusBehaviorSubject.subscribe(data=>this.loginStatusBehaviorSubjectHandler(data));
        WebSocketService.getInstance().showMessagesBehaviorSubject.subscribe(data=>this.showMessagesBehaviorSubjectHandler(data));
    }

    ngOnInit() {
    }
  
    showListPage(){
        this.router.navigate(['/showList']);
    }
    
    accept(i,reviewIndex){
        console.log("Inside accept");
        console.log("Inside accept i & reviewIndex",i,reviewIndex);
        console.log("Inside accept this.showRequests.returnedRequests[i].requests[reviewIndex]",this.showRequests.returnedRequests[i].requests[reviewIndex]);
            WebSocketService.getInstance().sendMessage({
            action : "requestStatus",
            message : {
                "bookOwnerEmailId" : this.showRequests.bookOwnerEmailId,
                "requesterEmailId" : this.showRequests.returnedRequests[i].requests[reviewIndex].requesterEmailId,
                "bookName" : this.showRequests.returnedRequests[i].requests[reviewIndex].bookName,
                "isbn" : this.showRequests.returnedRequests[i].requests[reviewIndex].isbn,
                "date" : this.showRequests.returnedRequests[i].requests[reviewIndex].date,
                "status" : "Accepted"
            }
        });
    }
    
    reject(i,reviewIndex){
        console.log("Inside reject");
        console.log("Inside reject i & reviewIndex",i,reviewIndex);
        console.log("Inside reject this.showRequests.returnedRequests[i].requests[reviewIndex]",this.showRequests.returnedRequests[i].requests[reviewIndex]);
            WebSocketService.getInstance().sendMessage({
            action : "requestStatus",
            message : {
                "bookOwnerEmailId" : this.showRequests.bookOwnerEmailId,
                "requesterEmailId" : this.showRequests.returnedRequests[i].requests[reviewIndex].requesterEmailId,
                "bookName" : this.showRequests.returnedRequests[i].requests[reviewIndex].bookName,
                "isbn" : this.showRequests.returnedRequests[i].requests[reviewIndex].isbn,
                "date" : this.showRequests.returnedRequests[i].requests[reviewIndex].date,
                "status" : "Rejected"
            }
        });
    }
    
    
    loginStatusBehaviorSubjectHandler(data){
        console.log("Inside showRequestsComponent :loginStatusBehaviorSubjectHandler : data",data, this.showRequests.date);
        if(data != undefined && data != ''){
            this.showRequests.bookOwnerEmailId = data.message[0].emailId;
        console.log("Inside showRequestsComponent :loginStatusBehaviorSubjectHandler : this.showRequests.bookOwnerEmailId",this.showRequests.bookOwnerEmailId);
        WebSocketService.getInstance().sendMessage({
            action : "showRequests",
            message : {
                "emailId" : this.showRequests.bookOwnerEmailId
            }
        });
        WebSocketService.getInstance().sendMessage({
            action : "showMessages",
            message : {
                "emailId" : this.showRequests.bookOwnerEmailId
            }
        });
        }
    }
    
    showRequestsBehaviorSubjectHandler(data){
        console.log("Inside showRequestsBehaviorSubjectHandler ---data",data);
        if(data.message != undefined){
            this.showRequests.returnedRequests = data.message;
            console.log("Inside showRequestsBehaviorSubjectHandler :this.showRequests.returnedRequests",this.showRequests.returnedRequests); 
        }
    }
    
    showMessagesBehaviorSubjectHandler(data){
        console.log("Inside showMessagesBehaviorSubjectHandler ---data",data);
        if(data.message != undefined){
            this.showRequests.returnedMessages = data.message;
            console.log("Inside showMessagesBehaviorSubjectHandler :this.showRequests.returnedMessages",this.showRequests.returnedMessages);  
        }
    }
}