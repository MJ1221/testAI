public with sharing class contactcreate {

     public void createcontact(){

       Account conobj=new Account();
         if(conobj.isCheck__c == true){
             System.debug('isTrue>>>' + conobj.isCheck__c);
         }
       
     }
}