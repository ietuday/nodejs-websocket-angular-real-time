import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../data-models/menu-item';
import { WebSocketService } from '../web-socket.service';
import { ReturnBookData } from '../data-models/returnBook-data';

@Component({
    selector: 'app-return',
    templateUrl: './return.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./return.component.scss'],
    providers: [WebSocketService]
})
export class ReturnComponent implements OnInit {

    public returnBookDetails: ReturnBookData = new ReturnBookData();
    public menuItem: MenuItem = new MenuItem();
    public returnSelectedBook: any;
    
    constructor(private router : Router) {
        WebSocketService.getInstance().returnBookBehaviorSubject.subscribe(data=>this.returnBookBehaviorSubjectHandler(data));
        WebSocketService.getInstance().loginStatusBehaviorSubject.subscribe(data=>this.loginStatusBehaviorSubjectHandler(data));
        WebSocketService.getInstance().returnSelectedBookBehaviorSubject.subscribe(data=>this.returnSelectedBookBehaviorSubjectHandler(data));
    }

    ngOnInit() {
        this.menuItem.items = [
            {label: 'Return Book', icon: 'fa-search',command: (event) => this.returnSelectedBook1(this.returnSelectedBook)},
            {label: 'Report', icon: 'fa-search', command: (event) => this.report(this.returnSelectedBook)}
        ];
    }
    
    showListPage(){
        this.router.navigate(['/showList']);
    }
    
    returnSelectedBook1(returnSelectedBook){
        console.log("Inside returnSelectedBook--returnSelectedBook",returnSelectedBook);
        WebSocketService.getInstance().sendMessage({
            action : "returnSelectedBook",
            message : {
                "bookName" : this.returnSelectedBook.bookName,
                "bookOwnerEmailId" : this.returnSelectedBook.bookOwnerEmailId,
                "requestedDate" : this.returnSelectedBook.bookOwnerEmailId,
                "emailId" : this.returnBookDetails.emailId
            }
        });
    }
    
    report(returnSelectedBook){
        console.log("Inside report--returnSelectedBook",returnSelectedBook);
        WebSocketService.getInstance().sendMessage({
            action : "reportSelectedBook",
            message : {
                "bookName" : this.returnSelectedBook.bookName,
                "bookOwnerEmailId" : this.returnSelectedBook.bookOwnerEmailId,
                "requestedDate" : this.returnSelectedBook.bookOwnerEmailId,
                "emailId" : this.returnBookDetails.emailId
            }
        });
    }
    
    returnBookBehaviorSubjectHandler(data){
        console.log("returnSelectedBook : getBooksBehaviorSubjectHandler : data",data);
        if(data != undefined){
            if(data != ''){
                if(data.status == 'Success'){
                    console.log("Status:-----",data);
                    this.returnBookDetails.returnedBooks = data.message[0].messages;
                    console.log("Inside return returned books:",this.returnBookDetails.returnedBooks);
                }
                else{
                        alert("Display failed");
                }
            }
        }
    }
    
    loginStatusBehaviorSubjectHandler(data){
        if(data != undefined && data != ''){
            console.log("Inside returnSelectedBook :loginStatusBehaviorSubjectHandler : data",data);
            console.log("Inside returnSelectedBook :loginStatusBehaviorSubjectHandler : data.message.emailId",data.message[0].emailId);
            this.returnBookDetails.emailId = data.message[0].emailId;
        }
    }
    
    returnSelectedBookBehaviorSubjectHandler(data){
        console.log("Inside returnSelectedBookBehaviorSubjectHandler :returnSelectedBookBehaviorSubjectHandler : data",data);
    }

}