public with sharing class LWCDataTableSortingExample {
    @AuraEnabled(Cacheable = true)
    public static List<Account> sortAccountList(){
        List<Account> accListObj= [SELECT Id, Name, Phone, Industry, Type, Website FROM Account Where Phone != null limit 20 ];
        return accListObj;
    }


}