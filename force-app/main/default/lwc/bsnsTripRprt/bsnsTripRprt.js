/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 01-12-2024
 * @last modified by  : minju.park@dkbmc.com
**/

import getbsnsTripRprtData from "@salesforce/apex/bsnsTripRprtLookup.getbsnsTripRprtList";
import { LightningElement } from 'lwc';
// import Name from "@salesforce/label/c.Name"; // custom label
// import Money from "@salesforce/label/c.money";

const columns = [
  
        { apiName:"Name",fieldName: "Name"},
        { apiName:"CreatedById",fieldName: "CreatedById"},
        { apiName:"money", fieldName: "money" }];

export default class BsnsTripRprt extends LightningElement {

    modal;
    data=[];
    columns = columns;
    connectedCallback() {
        this.loadbsnsTripRprtData();
     
    }

    
    loadbsnsTripRprtData() {
        console.log("offset===>", this.offSetCount);
        getbsnsTripRprtData({  })
          .then((result) => {
            console.log("result ::: ", JSON.stringify(result));
            this.data = result;
          })
    
          .catch((error) => {
            console.log("error ::: ", JSON.parse(JSON.stringify(error)));
          });
      }
    

    handleModal(){
        this.modal=true; // true, false 로 닫기,열기 (html if:true)
    }

    closeModal(){
        this.modal = false;
    }


    parentAccountSelectedRecord;
    handleValueSelectedOnAccount(event) {
        console.log('parentAccountSelectedRecord==>');
        this.parentAccountSelectedRecord = event.detail;
        console.log('parentAccountSelectedRecord==>', this.parentAccountSelectedRecord);
    }

    handleChange(event){
        var moneyValue = event.target.value;
        console.log('money==>', moneyValue);
    }

}