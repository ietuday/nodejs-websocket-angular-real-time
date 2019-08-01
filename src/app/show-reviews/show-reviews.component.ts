import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';
import {WebSocketService} from '../web-socket.service';
import { ShowReviewsData } from '../data-models/showReviews-data';

@Component({
    selector: 'app-show-reviews',
    templateUrl: './show-reviews.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./show-reviews.component.scss'],
    providers: [WebSocketService]
})
export class ShowReviewsComponent implements OnInit {
    
    public showReviews: ShowReviewsData = new ShowReviewsData();
    
    constructor(private router : Router) {
        WebSocketService.getInstance().selectedBookBehaviorSubject.subscribe(data=>this.selectedBookBehaviorSubjectHandler(data));
        WebSocketService.getInstance().showReviewsBehaviorSubject.subscribe(data=>this.showReviewsBehaviorSubjectHandler(data));
    }

    ngOnInit() {
    }

    showListPage(){
        this.router.navigate(['/showList']);
    }
    
    selectedBookBehaviorSubjectHandler(data){
        console.log("Inside showReviewsComponent :selectedBookBehaviorSubjectHandler : data",data);
        console.log("Inside showReviewsComponent :selectedBookBehaviorSubjectHandler : data.message",data.message);
        this.showReviews.bookName = data.message;
        console.log("Inside showReviewsComponent : selectedBookBehaviorSubjectHandler : this.showReviews.bookName",this.showReviews.bookName);
        WebSocketService.getInstance().sendMessage({
            action : "showReviews",
            message : {
                "bookName" : this.showReviews.bookName
            }
        });
    }
    
    showReviewsBehaviorSubjectHandler(data){
        console.log("Inside showReviewsComponent :showReviewsBehaviorSubjectHandler : data",data);
        console.log("Inside showReviewsComponent :showReviewsBehaviorSubjectHandler : data.message",data.message);
        this.showReviews.returnedReviews = data.message;
        console.log("Inside showReviewsComponent :showReviewsBehaviorSubjectHandler : this.showReviews.returnedReviews",this.showReviews.returnedReviews);
        if(data.message != undefined){
            console.log("##########", this.showReviews.returnedReviews[0].reviews);
            this.showReviews.name = this.showReviews.returnedReviews[0].reviews[0].name;
            this.showReviews.date = this.showReviews.returnedReviews[0].reviews[0].date;
            this.showReviews.review = this.showReviews.returnedReviews[0].reviews[0].review;
            console.log("$$$$$",this.showReviews.name,this.showReviews.date,this.showReviews.review);
        }
    }
}
