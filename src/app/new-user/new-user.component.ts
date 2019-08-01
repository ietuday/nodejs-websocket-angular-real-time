import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import {Router} from '@angular/router';
import {Message} from 'primeng/primeng';
import {WebSocketService} from '../web-socket.service';
import { NewUserData } from '../data-models/newUser-data';

@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./new-user.component.scss'],
    providers: [WebSocketService]
})

export class NewUserComponent implements OnInit {

    public newUserDetails: NewUserData = new NewUserData();
    public msgs: Message[] = [];
    
    constructor(private router : Router) {
        WebSocketService.getInstance().newUserStatusBehaviorSubject.subscribe(data=>this.newUserStatusBehaviorSubjectHandler(data));
    }

    ngOnInit() {
        console.log("Inside newUser component");
    }

    loginPage(){
        this.router.navigate(['/login']);
    }

    showSuccess(){
        this.newUserDetails.address = {
            "buildingName" : this.newUserDetails.buildingName,
            "streetNumber" : this.newUserDetails.streetNumber,
            "country" : this.newUserDetails.country,
            "state" : this.newUserDetails.state,
            "pincode" : this.newUserDetails.pincode,             
         }
        WebSocketService.getInstance().sendMessage({
            action : "newUser",
            message : {
                "name" : this.newUserDetails.name,
                "emailId" : this.newUserDetails.emailId,
                "password" : this.newUserDetails.password,
                "mobileNumber" : this.newUserDetails.mobileNumber,
                "address": this.newUserDetails.address,
                "requests" : this.newUserDetails.requests,
                "onlineRequests" : this.newUserDetails.onlineRequests,
                "messages" : this.newUserDetails.messages
            }
        })
    }
    
    newUserStatusBehaviorSubjectHandler(data){
        console.log("newUserComponent : newUserStatusBehaviorSubjectHandler : data",data);
        if(data != undefined){
            if(data != ''){
                if(data.status == 'Success'){
                    console.log("Status:-----",data);
                    this.msgs.push({severity:'success', summary:'Successfully Registered'});
                }
                else{
                    alert("Registration Failed");
                }
            }
        }
    }
}
