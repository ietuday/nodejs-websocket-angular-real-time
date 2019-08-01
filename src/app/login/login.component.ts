import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../web-socket.service';
import { LoginData } from '../data-models/login-data';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./login.component.scss'],
    providers: [WebSocketService]
})

export class LoginComponent implements OnInit {

    public loginDetails: LoginData = new LoginData();

    constructor(private router : Router) {
        WebSocketService.getInstance().loginStatusBehaviorSubject.subscribe(data=>this.loginStatusBehaviorSubjectHandler(data));
    }

    ngOnInit() {
        console.log("Inside LoginComponent");
    }

    login(){
        WebSocketService.getInstance().sendMessage({
            action : "login",
            message : {
                "emailId" : this.loginDetails.emailId,
                "password" : this.loginDetails.password
            },
            status : "sent"
        });
    }

    newUser(){
        this.router.navigate(['/newUser']);
    }

    loginStatusBehaviorSubjectHandler(data){
        console.log("LoginComponent : loginStatusBehaviorSubjectHandler : data",data);
        if(data != undefined){
            console.log("Inside data != undefined");
            if(data != ''){
                console.log("Inside data != null");
                if(data.status == 'Success'){
                    console.log("Status:-----",data);
                    sessionStorage.setItem("emailId", this.loginDetails.emailId);
                    this.router.navigate(['/showList']);
                }
                else{
                    alert("Login Failed");
                }
            }
        }
    }
}
