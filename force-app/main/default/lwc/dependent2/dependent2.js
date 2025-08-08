import { getPicklistValue } from "lightning/uiObjectInfoApi";
import { LightningElement,track } from 'lwc';
import getRegionValue from '@salesforce/apex/DependentPicklist.getRegionValue';
// import Zone__c from "@salesforce/schema/Account.Zone__c";
// import Region__c from "@salesforce/schema/Account.Region__c";

export default class dependent2 extends LightningElement {



    @track regionValue = [];
    
   
    connectedCallback(){
        // console.log('Click_here Label===>', this.label.Click_here);
        getRegionValue().then(result => {
            console.log('result ::: ', result);
            this.regionValue.push({label: this.label , value: this.value});
       
        });
    }




    handleChange(event) {
        this.regionValue = event.detail.value;
    }
}