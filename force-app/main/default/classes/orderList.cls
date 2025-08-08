/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 12-21-2023
 * @last modified by  : minju.park@dkbmc.com
**/
public with sharing class orderList {

    @AuraEnabled
    public static List<SelectWrapper> ordList(String searchOrderName, String searchProductName, String searchOrderDate, Boolean isActive, String selectedStatus ) {
        List<SelectWrapper> allList = new List<SelectWrapper>();
        System.debug('ordListApex===>');
        
        String baseQuery = 'SELECT Id, Amount__c, Date__c, Name, Price__c, Product__r.Name, Status__c, isActive__c FROM Order__c';
        String strQuery_Where = '';
        
        if (!String.isBlank(searchOrderName)) {
            strQuery_Where += ' AND Name LIKE \'%' + searchOrderName + '%\'';
        }
        
        if (!String.isBlank(searchProductName)) {
            strQuery_Where += ' AND Product__r.Name LIKE \'%' + searchProductName + '%\'';
        }

        if (!String.isBlank(searchOrderDate)) {
            Date formattedDate;
            try {
                formattedDate = Date.valueOf(searchOrderDate);
                strQuery_Where += ' AND Date__c = :formattedDate';
            } catch (Exception e) {
               System.debug('error' + e);
            }
        }

        if (isActive != null) {
            strQuery_Where += ' AND isActive__c = :isActive';
        }

        if (!String.isBlank(selectedStatus)) {
            strQuery_Where += ' AND Status__c = \'' + selectedStatus + '\'';
        }
        
        String finalQuery = baseQuery;
        if (!String.isBlank(strQuery_Where)) {
            strQuery_Where = strQuery_Where.substring(5);
            finalQuery += ' WHERE ' + strQuery_Where;
        }

       
        
        List<Order__c> ordListRecords = Database.query(finalQuery);
        
        for (Order__c target : ordListRecords) {
            SelectWrapper selectWrap = new SelectWrapper();
            selectWrap.Id = String.valueOf(target.Id);
            selectWrap.Amount = String.valueOf(target.Amount__c);
            selectWrap.SaveDate = String.valueOf(target.Date__c);
            selectWrap.Name = String.valueOf(target.Name);
            selectWrap.Price = String.valueOf(target.Price__c);
            selectWrap.ProductName = String.valueOf(target.Product__r.Name);
            selectWrap.Status = String.valueOf(target.Status__c);
            selectWrap.isActive =Boolean.valueOf(target.isActive__c);
            // selectWrap.isEdit = false;
            // selectWrap.checked = false;
            
            allList.add(selectWrap);
        }

        System.debug('allList===>' + allList);
        System.debug('Final Query: ' + finalQuery);
        return allList;
    }

    @AuraEnabled
    public static String updateList(List<Order__c> orders) {
        System.debug('apex updateList====>');
        System.debug('apex updateList====>' + orders);
        
        try {
            List<Order__c> amountEdit = new List<Order__c>();
            List<Order__c> isActiveEdit = new List<Order__c>();
    
            for (Order__c order : orders) {
                if (order != null) {
                    System.debug('Order Id: ' + order.Id + ', Amount__c: ' + order.Amount__c + ', isActive__c: ' + order.isActive__c);
            
                    if (order.Amount__c != null) {
                        amountEdit.add(new Order__c(Id = order.Id, Amount__c = order.Amount__c));
                    }
            
                    if (order.isActive__c != null) {
                        isActiveEdit.add(new Order__c(Id = order.Id, isActive__c = order.isActive__c));
                    }
                }
            }
    
            if (!amountEdit.isEmpty()) {
                update amountEdit;
            }
    
            // Update isActive__c
            if (!isActiveEdit.isEmpty()) {
                update isActiveEdit;
            }
    
            return 'SUCCESS';
        } catch (Exception ex) {
            System.debug('Exception: ' + ex.getMessage());
            return 'ERROR: ' + ex.getMessage(); 
        }
    }

    @AuraEnabled
    public static List<StatusWrapper> getPicklistValues() {
        List<StatusWrapper> statusList = new List<StatusWrapper>();
        try {
            for (PicklistEntry entry : Order__c.Status__c.getDescribe().getPicklistValues()) {
                statusList.add(new StatusWrapper(entry.getLabel(), entry.getValue()));
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return statusList;
    }
  

    public class SelectWrapper {
        @AuraEnabled public String Id {get; set;}
        @AuraEnabled public String Amount {get; set;}
        @AuraEnabled public String SaveDate {get; set;}
        @AuraEnabled public String Name {get; set;}
        @AuraEnabled public String Price {get; set;}
        @AuraEnabled public String ProductName {get; set;}
        @AuraEnabled public String Status {get; set;}
        @AuraEnabled public Boolean isActive {get; set;}
        @AuraEnabled public Boolean isEdit {get; set;}
        @AuraEnabled public Boolean checked {get; set;}

        public SelectWrapper() {
        }
    }

    
    public class StatusWrapper {
        @AuraEnabled public String label {get; set;}
        @AuraEnabled public String value {get; set;}

        public StatusWrapper(String label, String value) {
            this.label = label;
            this.value = value;
        }
    }
}