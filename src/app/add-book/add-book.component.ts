import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Message} from 'primeng/primeng';
import {WebSocketService} from '../web-socket.service';
import {AddBookData} from '../data-models/addBook-data';

@Component({
    selector: 'app-add-book',
    templateUrl: './add-book.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./add-book.component.scss'],
    providers: [WebSocketService]
})

export class AddBookComponent implements OnInit {

    public msgs: Message[] = [];
    public addBookDetails: AddBookData = new AddBookData();

    constructor(private router : Router) {
        WebSocketService.getInstance().addBookBehaviorSubject.subscribe(data=>this.addBookBehaviorSubjectHandler(data));
        WebSocketService.getInstance().loginStatusBehaviorSubject.subscribe(data=>this.loginStatusBehaviorSubjectHandler(data));
    }

    ngOnInit() {
    }

    add(){
        WebSocketService.getInstance().sendMessage({
            action : "addBook",
            message : { 
                "emailId" : this.addBookDetails.emailId,
                "bookName" : this.addBookDetails.bookName,
                "author" : this.addBookDetails.author,
                "isbn" : this.addBookDetails.isbn,
                "status" : this.addBookDetails.status,
                "noOfPages" : this.addBookDetails.noOfPages,
                "genre" : this.addBookDetails.genre,
                "cover" : this.addBookDetails.cover,
                "price" : this.addBookDetails.price,
                "noOfEditions" : this.addBookDetails.noOfEditions,
                "publisher" : this.addBookDetails.publisher,
                "publicationYear" : this.addBookDetails.publicationYear,
                "language" : this.addBookDetails.language
            }
        });
    }

    showListPage(){
        this.router.navigate(['/showList']);
        WebSocketService.getInstance().addBookBehaviorSubject.next('');
    }
    
    addBookBehaviorSubjectHandler(data){
        console.log("addBookComponent : addBookBehaviorSubjectHandler : data",data);
        if(data != undefined){
            if(data != ''){
                if(data.status == 'Success'){
                    console.log("Status:-----",data);
                    this.msgs.push({severity:'success', summary:'Successfully Added'});
                }
                else{
                    alert("Adding Book Failed");
                }
            }
        }
    }
    
    loginStatusBehaviorSubjectHandler(data){
        console.log("Inside addBookComponent :loginStatusBehaviorSubjectHandler : data",data);
        if(data != undefined && data != ''){
        this.addBookDetails.emailId = data.message[0].emailId;
            console.log("Inside addBookComponent :loginStatusBehaviorSubjectHandler : emailId",this.addBookDetails.emailId);
        }
    }   
}