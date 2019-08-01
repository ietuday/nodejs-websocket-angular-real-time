import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../data-models/menu-item';
import { WebSocketService } from '../web-socket.service';
import { ShowListData } from '../data-models/showList-data';

@Component({
    selector: 'app-show-list',
    templateUrl: './show-list.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./show-list.component.scss'],
    providers: [WebSocketService]
})

export class ShowListComponent implements OnInit {

    public showListDetails: ShowListData = new ShowListData();
    public menuItem: MenuItem = new MenuItem();
    public selectedBook: any;
    public display : boolean = false;
   
    constructor(private router : Router) {
        WebSocketService.getInstance().requestDetailsBehaviorSubject.next('');
        WebSocketService.getInstance().getBooksBehaviorSubject.subscribe(data=>this.getBooksBehaviorSubjectHandler(data));
        WebSocketService.getInstance().selectedBookBehaviorSubject.subscribe(data=>this.selectedBookBehaviorSubjectHandler(data));
        WebSocketService.getInstance().loginStatusBehaviorSubject.subscribe(data=>this.loginStatusBehaviorSubjectHandler(data));
        WebSocketService.getInstance().deleteBookBehaviorSubject.subscribe(data=>this.deleteBookBehaviorSubjectHandler(data));
        WebSocketService.getInstance().showOnlineRequestsBehaviorSubject.subscribe(data=>this.showOnlineRequestsBehaviorSubjectHandler(data));
    }

    ngOnInit() {
        this.menuItem.items = [
            {label: 'Show Reviews', icon: 'fa-search',command: (event) => this.showReviews(this.selectedBook)},
            {label: 'Rate', icon: 'fa-search', command: (event) => this.rate(this.selectedBook)},
            {label: 'Read', icon: 'fa-search', command: (event) => this.read(this.selectedBook)},
            {label: 'Delete', icon: 'fa-search', command: (event) => this.delete(this.selectedBook)},
        ];
        WebSocketService.getInstance().sendMessage({
            action : "getBooks"
        });
    }

    showReviews(selectedBook){
        console.log("Inside showReviews, selectedBook", selectedBook);
        this.router.navigate(['/showReviews']);
        WebSocketService.getInstance().sendMessage({
            action : "selectedBook",
            message : {
                "bookName" : this.selectedBook.bookName
            }
        });
    }

    rate(selectedBook){
        console.log("Inside rate, selectedBook", selectedBook);
        this.router.navigate(['/rate']);
        WebSocketService.getInstance().sendMessage({
            action : "selectedBook",
            message : {
                "bookName" : this.selectedBook.bookName
            }
        });
    }

    read(selectedBook){
        if(this.selectedBook.emailId == this.showListDetails.emailId){
            alert("Cannot request book from own collection");
        }
        else if(this.selectedBook.status == "Unavailable" || this.selectedBook.status == "Lost"){
            alert("Cannot request book as status is Unavailable/lost");
        }
        else{
            console.log("Inside read, selectedBook", selectedBook);
            WebSocketService.getInstance().sendMessage({
                action : "selectedBook",
                message : {
                    "bookName" : this.selectedBook.bookName,
                    "emailId" : this.selectedBook.emailId
                }
            });
            this.router.navigate(['/read']);
        }
    }

    returnBook(){
        this.router.navigate(['/return']);
        WebSocketService.getInstance().sendMessage({
            action : "returnBook",
            message : {
                "emailId" : this.showListDetails.emailId
            }
        }); 
    }
    
    delete(selectedBook){
        if(this.selectedBook.emailId != this.showListDetails.emailId){
            alert("Cannot delete book from others collection");
        } 
        else{
            WebSocketService.getInstance().sendMessage({
                action : "deleteBook",
                message : {
                    "bookName" : this.selectedBook.bookName,
                    "bookOwnerEmailId" : this.selectedBook.emailId,
                    "emailId" : this.showListDetails.emailId
                }
            }); 
        }
    }
    
    showDialog() {
        this.display = true;
    }
    
    accept(reviewIndex){
        console.log("Inside accept");
        console.log("Inside accept reviewIndex",reviewIndex);
        console.log("Inside accept this.showListDetails.returnedOnlineRequests",this.showListDetails.returnedOnlineRequests[reviewIndex]);
            WebSocketService.getInstance().sendMessage({
            action : "requestStatus",
            message : {
                "bookOwnerEmailId" : this.showListDetails.emailId,
                "requesterEmailId" : this.showListDetails.returnedOnlineRequests[reviewIndex].requesterEmailId,
                "bookName" : this.showListDetails.returnedOnlineRequests[reviewIndex].bookName,
                "isbn" : this.showListDetails.returnedOnlineRequests[reviewIndex].isbn,
                "date" : this.showListDetails.returnedOnlineRequests[reviewIndex].date,
                "status" : "Accepted"
            }
        });
    }
    
    reject(reviewIndex){
        console.log("Inside reject");
        console.log("Inside reject reviewIndex",reviewIndex);
        console.log("Inside reject this.showListDetails.returnedOnlineRequests",this.showListDetails.returnedOnlineRequests[reviewIndex]);
            WebSocketService.getInstance().sendMessage({
            action : "requestStatus",
            message : {
                "bookOwnerEmailId" : this.showListDetails.emailId,
                "requesterEmailId" : this.showListDetails.returnedOnlineRequests[reviewIndex].requesterEmailId,
                "bookName" : this.showListDetails.returnedOnlineRequests[reviewIndex].bookName,
                "isbn" : this.showListDetails.returnedOnlineRequests[reviewIndex].isbn,
                "date" : this.showListDetails.returnedOnlineRequests[reviewIndex].date,
                "status" : "Rejected"
            }
        });
    }
    
    messages(){
        this.router.navigate(['/messages']);
    }

    addBook(){
        this.router.navigate(['/addBook']);
    }

    requests(){
        this.router.navigate(['/showRequests']);
    }

    logout(){
        sessionStorage.clear();
        WebSocketService.getInstance().loginStatusBehaviorSubject.next('');
        WebSocketService.getInstance().sendMessage({
            action: "logout",
            message: {},
            status: "Sent"
        });
        this.router.navigate(['/login']);
    }

    getBooksBehaviorSubjectHandler(data){
        console.log("showListComponent : getBooksBehaviorSubjectHandler : data",data);
        if(data != undefined){
            if(data != ''){
                if(data.status == 'Success'){
                    console.log("Status:-----",data);
                    this.showListDetails.returnedBooks = data.message;
                    console.log("Inside showList returned books:",this.showListDetails.returnedBooks);
                }
                else{
                        alert("Display failed");
                }
            }
        }
    }
    
    selectedBookBehaviorSubjectHandler(data){
        console.log("Inside showListComponent :selectedBookBehaviorSubjectHandler : data",data);
        console.log("Inside showListComponent :selectedBookBehaviorSubjectHandler : data.message",data.message);
    }   
    
    loginStatusBehaviorSubjectHandler(data){
        console.log("Inside showListComponent :loginStatusBehaviorSubjectHandler : data",data);
        if(data != undefined){
            console.log("Inside data != undefined");
            if(data != ''){
                console.log("Inside showListComponent :loginStatusBehaviorSubjectHandler : data.message.emailId",data.message[0].emailId);
                this.showListDetails.emailId = data.message[0].emailId;
                this.showListDetails.name = data.message[0].name;
            }
        }
    }
    
    deleteBookBehaviorSubjectHandler(data){
        console.log("showListComponent : deleteBookBehaviorSubjectHandler : data",data);
        if(data != undefined){
            if(data != ''){
                if(data.status == 'Success'){
                    console.log("Status:-----",data);
                    WebSocketService.getInstance().sendMessage({
                        action : "getBooks"
                    });
                }
            }
        }
    }
    
    showOnlineRequestsBehaviorSubjectHandler(data) {
        console.log("showListComponent: showOnlineRequestsBehaviorSubjectHandler", data);
        if(data != undefined){
            if(data != ''){
                this.showListDetails.returnedOnlineRequests = data.message[0].onlineRequests;
                if(this.showListDetails.returnedOnlineRequests != ''){
                    this.display = true;
                }
                console.log("showListComponent: showOnlineRequestsBehaviorSubjectHandler---this.showListDetails.returnedOnlineRequests",this.showListDetails.returnedOnlineRequests);
            }
        }
        else{
            this.display = false;
        }
    }
}