/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 01-11-2024
 * @last modified by  : minju.park@dkbmc.com
**/
public without sharing class bsnsTripRprtLookup {
     
    @AuraEnabled(cacheable=true)
    public static list<sObject> searchLookupData(string searchKey , string sObjectApiName) {    
        List < sObject > returnList = new List < sObject > ();
        string sWildCardText = '%' + searchKey + '%';
        string sQuery = 'Select Id,Name From ' + sObjectApiName + ' Where Name Like : sWildCardText order by Name DESC ';
        for (sObject obj: database.query(sQuery)) {
            returnList.add(obj);
        }
        return returnList;
    }
     
    // Method to fetch lookup default value 
    @AuraEnabled
    public static sObject searchDefaultRecord(string recordId , string sObjectApiName) {
        string sRecId = recordId;    
        string sQuery = 'Select Id,Name From ' + sObjectApiName + ' Where Id = : sRecId LIMIT 1';
        for (sObject obj: database.query(sQuery)) {
            return obj;
        }
        return null;
    }

    @AuraEnabled
    public static List<SelectWrapper> getbsnsTripRprtList() {
        List<SelectWrapper> bsnsData = new List<SelectWrapper>();
        List<bsnsTripRprt__c> bsnsList = [SELECT Id, Name, money__c, CreatedById FROM bsnsTripRprt__c];
        System.debug('bsnsList===>' + bsnsList);
        for (bsnsTripRprt__c record : bsnsList) {
            SelectWrapper wrapper = new SelectWrapper();
            wrapper.Id = record.Id;
            wrapper.Name = record.Name;
            wrapper.money = Integer.valueOf(record.money__c);
            wrapper.CreatedById = record.CreatedById;
            bsnsData.add(wrapper);
        }
        System.debug('bsnsData===>' + bsnsData);
        return bsnsData;
    }

    public class SelectWrapper {
        @AuraEnabled public String Id { get; set; }
        @AuraEnabled public String Name { get; set; }
        @AuraEnabled public Integer money { get; set; }
        @AuraEnabled public String CreatedById { get; set; }
        public  SelectWrapper() {
        }
    }
    

}