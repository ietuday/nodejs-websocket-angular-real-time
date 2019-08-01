export class ShowRequestsData{
   public requesterEmailId : string = "";
   public date : Date = new Date();
   public bookName : string ="";
   public returnedRequests : any[]=[];
   public returnedMessages : any[]=[];
   public bookOwnerEmailId : string = "";
   public isbn : number;
}