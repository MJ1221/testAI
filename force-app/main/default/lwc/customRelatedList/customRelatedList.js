import { LightningElement,api} from 'lwc';
import oppAccData from "@salesforce/apex/CustomRelatedList.allDataList";
import submitData from "@salesforce/apex/CustomRelatedList.submitData";




const allColumns =[
    { apiName:"Name",fieldName: "Name"},
    { apiName:"Type", fieldName: "Type" },
    { apiName:"Amount", fieldName: "Amount" },
    { apiName:"CloseDate", fieldName: "Close Date"},
    { apiName:"StageName", fieldName: "Stage"},
    { apiName:"Probability", fieldName: "Probability"},
    { apiName:"OrderNumber__c", fieldName: "Order Number" },
    { apiName:"MainCompetitors__c", fieldName: "Main Competitors"},
    { apiName:"CurrentGenerators__c", fieldName: "Curent Generators"},
    { apiName:"DeliveryInstallationStatus__c", fieldName: "Delivery Installation Status"},
    { apiName:"TrackingNumber__c", fieldName: "Tracking Number"},
    { apiName:"Name",fieldName: "Account Name"},
    { apiName:"AccountNumber",fieldName: "Account Number"},
    { apiName:"Type",fieldName: "Type"},
    { apiName:"BillingAddress",fieldName: "Billing Address"},
    { apiName:"ShippingAddress",fieldName: "Shipping Address"},
    { apiName:"Phone",fieldName: "Phone"},
    { apiName:"Sic",fieldName: "Sic"},
    { apiName:"Industry",fieldName: "Industry"},
    { apiName:"CustomerPriority__c",fieldName: "Customer Priority"},
    { apiName:"SLA__c",fieldName: "SLA"},
    { apiName:"NumberofLocations__c",fieldName: "Number of Locations"},
    { apiName:"UpsellOpportunity__c",fieldName: "Upsell Opportunity"},
    { apiName:"SLASerialNumber__c",fieldName: "SLA Serial Number"},
    { apiName:"SLAExpirationDate__c",fieldName: "SLA Expiration Date"}
];

const COMBOOPTION = [
    {label : '내림차순', value :'DESC' },
    {label : '오름차순', value :'ASC' }
];


export default class BasicDatatable extends LightningElement {
    options = COMBOOPTION;
    allList =[];
    allColumns = allColumns;
    @api oppSearch;
    @api accSearch;
    optionValue = 'DESC';
    sortVal = '';
    modal;

    opptyName;
    opptyAmount;
    opptyType;
    opptyCloseDate;
    opptyStageName;
    opptyNextStep;
    opptyProbability;
    opptyDeliveryAmt2;
    opptyLeadSource;
    opptyAccountTest;
    opptyAccountId;
    opptyDateTest;
    opptyDetail;
    opptyOwner;
    opptyDate;
    opptyCampaignId;
 
    
    
    
    allDataList(){
        oppAccData({'oppSearch' : this.oppSearch,'accSearch' : this.accSearch, 'sortVal' : this.sortVal}).then((result)=>{ //''<== apex의 파라미터 이름!
            console.log("data===>",result);
            this.allList = result;
        })
        .catch((error)=>{   
            console.log("error===>", error);
        });
    }

    submitData(){
        submitData({ 'opptyName' : this.opptyName,
        'opptyType' : this.opptyType,
        'opptyCloseDate' : this.opptyCloseDate,
        'opptyStageName' : this.opptyStageName,
        'opptyNextStep' : this.opptyNextStep,
        'opptyProbability' : this.opptyProbability,
        'opptyDeliveryAmt2' : this.opptyDeliveryAmt2,
        'opptyLeadSource' : this.opptyLeadSource,
        'opptyAccountTest' : this.opptyAccountTest,
        'opptyAccountId' : this.opptyAccountId,
        'opptyDateTest' : this.opptyDateTest,
        'opptyDetail' : this.opptyDetail,
        'opptyOwner' : this.opptyOwner,
        'opptyDate' : this.opptyDate,
        'opptyCampaignIn' : this.opptyCampaignIn,
        'opptyAmount' : this.opptyAmount})
        .then((result)=>{ //''<== apex의 파라미터 이름!
            console.log("data===>",result);
            this.allList = result;
            
        })
        .catch((error)=>{   
            console.log("error===>", error);
        });
    }


    searchOpp(event){
        this.oppSearch = event.detail.value;
        console.log("searchopp===>",this.oppSearch);
        
    }

    searchAcc(event){
        this.accSearch = event.detail.value;
        console.log("searchopp===>",this.accSearch);
    }

    handleClick(){
        this.allList = [];
        this.allDataList();
    }

    handleCombo(event) {
        console.log('event.detail.value ::: ', event.detail.value);
        this.sortVal = event.detail.value;
    }

    handleModal(){
        this.modal=true;
    }

    handleChange(event) {
        // this.value = event.detail.value;

        console.log("value===>",event.target.fieldName);

        if(event.target.fieldName === 'Name') {
            this.opptyName = event.target.value;
        } else if(event.target.fieldName === 'Amount') {
            this.opptyAmount = event.target.value;
        }
         else if(event.target.fieldName === 'Type') {
            this.opptyType = event.target.value;
        }
         else if(event.target.fieldName === 'CloseDate') {
            this.opptyCloseDate = event.target.value;
        }
         else if(event.target.fieldName === 'StageName') {
            this.opptyStageName = event.target.value;
        }
         else if(event.target.fieldName === 'NextStep') {
            this.opptyNextStep = event.target.value;
        }
         else if(event.target.fieldName === 'Probability') {
            this.opptyProbability = event.target.value;
        }
         else if(event.target.fieldName === 'Delivery_Amt_2__c') {
            this.opptyDeliveryAmt2 = event.target.value;
        }
         else if(event.target.fieldName === 'LeadSource') {
            this.opptyLeadSource = event.target.value;
        }
         else if(event.target.fieldName === 'Account_Test__c') {
            this.opptyAccountTest = event.target.value;
        }
         else if(event.target.fieldName === 'AccountId') {
            this.opptyAccountId = event.target.value;
        }
         else if(event.target.fieldName === 'dateTest__c') {
            this.opptyDateTest = event.target.value;
        }
         else if(event.target.fieldName === 'Opportunity_Detail__c') {
            this.opptyDetail = event.target.value;
        }
         else if(event.target.fieldName === 'Opportunity_Owner__c') {
            this.opptyOwner = event.target.value;
        }
         else if(event.target.fieldName === 'Opportunity_Date__c') {
            this.opptyDate = event.target.value;
        }
         else if(event.target.fieldName === 'CampaignId') {
            this.opptyCampaignId = event.target.value;
        }
      
    }

    closeModal() {
        this.modal = false;
        
    }
   
}