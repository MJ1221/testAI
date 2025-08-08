public with sharing class CustomRelatedList {
    @AuraEnabled
    public static List<SelectWrapper> allDataList(String oppSearch, String accSearch, String sortVal) {
        List<SelectWrapper> resultList = new List<SelectWrapper>();
        String oppAccData = '';
        String oppAccData_WHERE = ' WHERE Name != null';
        String oppAccData_ORDER = '';
        oppAccData += 'SELECT Name, Type, Amount, ExpectedRevenue, CloseDate, StageName, Probability, OrderNumber__c, MainCompetitors__c,CurrentGenerators__c,';
        oppAccData +=  ' DeliveryInstallationStatus__c,TrackingNumber__c, Account.Name, Account.AccountNumber, Account.Type, ';                    
        oppAccData += ' Account.BillingAddress, Account.ShippingAddress, Account.Phone, Account.Sic, Account.Industry, Account.CustomerPriority__c,';                
        oppAccData += ' Account.SLA__c,Account.NumberofLocations__c,Account.UpsellOpportunity__c,Account.SLASerialNumber__c,Account.SLAExpirationDate__c FROM Opportunity ';                                     
        if (String.isNotBlank(oppSearch)) {
        oppAccData_WHERE += ' AND Name LIKE \'%' + oppSearch + '%\''; // LIKE===> 포함시키는 조건 
        }  
        if (String.isNotBlank(accSearch)) {
            oppAccData_WHERE += ' AND Account.Name LIKE \'%' + accSearch + '%\''; // LIKE===> 포함시키는 조건 
        }       
        oppAccData_ORDER = ' ORDER BY Name ' + sortVal;
        List<Opportunity> oppList = Database.query(oppAccData + oppAccData_WHERE + oppAccData_ORDER);                               
                                                
                   
        for(Opportunity target : oppList  ){
            System.debug('List===>'+ target);
            SelectWrapper selectWrap = new SelectWrapper();
            selectWrap.OppName = String.valueOf(target.Name);
            selectWrap.OppType = String.valueOf(target.Type);
            selectWrap.OppExpectedRevenue = String.valueOf(target.ExpectedRevenue);
            selectWrap.OppCloseData = String.valueOf(target.CloseDate);
            selectWrap.OppStageName = String.valueOf(target.StageName);
            selectWrap.OppProbability = String.valueOf(target.Probability);
            selectWrap.OppOrderNumber = String.valueOf(target.OrderNumber__c);
            selectWrap.OppMainCompetitors = String.valueOf(target.MainCompetitors__c);
            selectWrap.OppCurrentGenerators = String.valueOf(target.CurrentGenerators__c);
            selectWrap.OppDeliveryInstallationStatus = String.valueOf(target.DeliveryInstallationStatus__c);
            selectWrap.OppTrackingNumber = String.valueOf(target.TrackingNumber__c);
            selectWrap.AccName = String.valueOf(target.Account.Name);
            selectWrap.AccNumnber = String.valueOf(target.Account.AccountNumber);
            selectWrap.AccType = String.valueOf(target.Account.Type);
            selectWrap.AccBillingAddress = String.valueOf(target.Account.BillingAddress);
            selectWrap.AccShippingAddress = String.valueOf(target.Account.ShippingAddress);
            selectWrap.AccPhone = String.valueOf(target.Account.Phone);
            selectWrap.AccSic = String.valueOf(target.Account.Sic);
            selectWrap.AccIndustry = String.valueOf(target.Account.Industry);
            selectWrap.AccCustomerPriority = String.valueOf(target.Account.CustomerPriority__c);
            selectWrap.AccSLA = String.valueOf(target.Account.SLA__c);
            selectWrap.AccNumberofLocations = String.valueOf(target.Account.NumberofLocations__c);
            selectWrap.AccUpsellOpportunity = String.valueOf(target.Account.UpsellOpportunity__c);
            selectWrap.AccSLASerialNumber = String.valueOf(target.Account.SLASerialNumber__c);
            selectWrap.AccSLAExpirationDate = String.valueOf(target.Account.SLAExpirationDate__c);
            
            resultList.add(selectWrap);
        }
    
        return resultList;
                                                
    }

    public class SelectWrapper{
        @AuraEnabled public String OppName {get;set;}
        @AuraEnabled public String OppType {get;set;}
        @AuraEnabled public String OppExpectedRevenue {get;set;}
        @AuraEnabled public String OppCloseData {get;set;}
        @AuraEnabled public String OppStageName {get;set;}
        @AuraEnabled public String OppProbability {get;set;}
        @AuraEnabled public String OppOrderNumber {get;set;}
        @AuraEnabled public String OppMainCompetitors{get;set;}
        @AuraEnabled public String OppCurrentGenerators {get;set;}
        @AuraEnabled public String OppDeliveryInstallationStatus {get;set;}
        @AuraEnabled public String OppTrackingNumber {get;set;}
        @AuraEnabled public String AccName {get;set;}
        @AuraEnabled public String AccNumnber {get;set;}
        @AuraEnabled public String AccType {get;set;}
        @AuraEnabled public String AccBillingAddress {get;set;}
        @AuraEnabled public String AccShippingAddress {get;set;}
        @AuraEnabled public String AccPhone {get;set;}
        @AuraEnabled public String AccSic {get;set;}
        @AuraEnabled public String AccIndustry {get;set;}
        @AuraEnabled public String AccCustomerPriority {get;set;}
        @AuraEnabled public String AccSLA {get;set;}
        @AuraEnabled public String AccNumberofLocations {get;set;}
        @AuraEnabled public String AccUpsellOpportunity {get;set;}
        @AuraEnabled public String AccSLASerialNumber {get;set;}
        @AuraEnabled public String AccSLAExpirationDate {get;set;}
        
        public SelectWrapper(){

        }
    }
    
    @AuraEnabled
    public static List<ResultWrapper> fetchRecordList(SearchWrapper inputWrap) {
        System.debug('inputWrap ::: ' + inputWrap);
        try {
            List<ResultWrapper> resultWrapList = new List<ResultWrapper>();

            if(inputWrap != null) {
                String fieldToQuery = 'SELECT Id, ';
                if(String.isNotBlank(inputWrap.fieldApiName)) {
                    fieldToQuery = fieldToQuery + inputWrap.fieldApiName;
                }
                if(String.isNotBlank(inputWrap.otherFieldApiName)) {
                    fieldToQuery = fieldToQuery + ', ' + inputWrap.otherFieldApiName;
                }
                String strQuery = fieldToQuery + ' FROM ' + inputWrap.objectApiName;
                String filterCriteria = inputWrap.fieldApiName + ' LIKE ' + '\'' + String.escapeSingleQuotes(inputWrap.searchString.trim()) + '%\' LIMIT 10';
                if(String.isNotBlank(inputWrap.selectedRecordId)) {
                    strQuery += ' WHERE Id = \'' + inputWrap.selectedRecordId + '\'';
                } else if(String.isNotBlank(inputWrap.parentFieldApiName) && String.isNotBlank(inputWrap.parentRecordId)) {
                    strQuery += ' WHERE ' + inputWrap.parentFieldApiName + ' = \'' + inputWrap.parentRecordId + '\'';
                    strQuery += ' AND ' + filterCriteria;
                } else {
                    strQuery += ' WHERE ' + filterCriteria;
                }

                for(SObject obj : Database.query(strQuery)) {
                    ResultWrapper resultWrap = new ResultWrapper();
                    resultWrap.mainField    = (String) obj.get(inputWrap.fieldApiName);
                    resultWrap.subField     = (String) obj.get(inputWrap.otherFieldApiName);
                    resultWrap.id           = (String) obj.get('id');
                    resultWrapList.add(resultWrap);
                }
                return resultWrapList;
            }
            return null;
        } catch(Exception e) {
            throw new AuraHandledException('ERROR ::: ' + e.getMessage());
        }
    }

    public class ResultWrapper {
        @AuraEnabled public String mainField    {get; set;}
        @AuraEnabled public String subField     {get; set;}
        @AuraEnabled public String id           {get; set;}
        
        public ResultWrapper() {}
    }

    public class SearchWrapper {
        @AuraEnabled public String objectApiName        {get; set;}
        @AuraEnabled public String fieldApiName         {get; set;}
        @AuraEnabled public String otherFieldApiName    {get; set;}
        @AuraEnabled public String searchString         {get; set;}
        @AuraEnabled public String selectedRecordId     {get; set;}
        @AuraEnabled public String parentRecordId       {get; set;}
        @AuraEnabled public String parentFieldApiName   {get; set;}

        public SearchWrapper() {}
    }

    @AuraEnabled
    public static String submitData(
        String opptyName, 
        String opptyType,  
        String opptyCloseDate, 
        String opptyStageName, 
        String opptyNextStep, 
        String opptyProbability, 
        String opptyDeliveryAmt2, 
        String opptyLeadSource, 
        String opptyAccountTest, 
        String opptyAccountId, 
        String opptyDateTest,
        String opptyDetail, 
        String opptyOwner, 
        String opptyDate, 
        String opptyCampaignIn,
        String opptyAmount
        ) {
        Opportunity allData = new Opportunity();
        if(opptyName != null) { allData.Name = opptyName; }
        if(opptyType != null) { allData.Type = opptyType; }
        if(opptyCloseDate != null) { allData.CloseDate = Date.valueOf(opptyCloseDate); }
        if(opptyStageName != null) { allData.StageName = opptyStageName; }
        if(opptyNextStep != null) { allData.NextStep = opptyNextStep; }
        if(opptyProbability != null) { allData.Probability = Decimal.valueOf(opptyProbability); }
        if(opptyDeliveryAmt2 != null) { allData.Delivery_Amt_2__c = Decimal.valueOf(opptyDeliveryAmt2); }
        if(opptyLeadSource != null) { allData.LeadSource = opptyLeadSource; }
        if(opptyAccountTest != null) { allData.Account_Test__c = opptyAccountTest; }
        if(opptyAccountId != null) { allData.AccountId = opptyType; }
        if(opptyDateTest != null) { allData.dateTest__c =  Date.valueOf(opptyDateTest); }
        if(opptyDetail != null) { allData.Opportunity_Detail__c = opptyDetail; }
        if(opptyOwner != null) { allData.Opportunity_Owner__c = opptyOwner; }
        if(opptyDate != null) { allData.Opportunity_Date__c = Date.valueOf(opptyDate); }
        if(opptyCampaignIn != null) { allData.CampaignId = opptyCampaignIn; }
        if(opptyAmount != null) { allData.Amount = Decimal.valueOf(opptyAmount); }
        
        // allData.CloseDate = Date.valueOf(opptyCloseDate);
        // allData.StageName = opptyStageName;
        // allData.NextStep = opptyNextStep;
        // allData.Probability = Decimal.valueOf(opptyProbability);
        // allData.Delivery_Amt_2__c = Decimal.valueOf(opptyDeliveryAmt2);
        // allData.LeadSource = opptyLeadSource;
        // allData.Account_Test__c = opptyAccountTest;
        // allData.AccountId = opptyType;
        // allData.dateTest__c =  Date.valueOf(opptyDateTest);
        // allData.Opportunity_Detail__c = opptyDetail;
        // allData.Opportunity_Owner__c = opptyOwner;
        // allData.Opportunity_Date__c = Date.valueOf(opptyDate);
        // allData.CampaignId = opptyCampaignIn;
        // allData.Amount = Decimal.valueOf(opptyAmount);
        System.debug('add---->' + allData);
        
        if(allData != null) {
            insert allData;
            return '성공';
        } else {
            return '실패';
        }
        
    }
}