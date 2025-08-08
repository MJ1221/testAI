public with sharing class DataController {
     
    
    @AuraEnabled(Cacheable = true)
    public static List<Account> sortAccountList(){
        List<Account> accListObj= [SELECT Id, Name, Phone, Industry, Type, Website FROM Account WHERE Phone != null LIMIT 10 ];
        return accListObj;
    }
    

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountData(Integer offSetCount) {
       
        List<Account> accountDataList =[SELECT Id, Name, Phone, Industry, Type, Website FROM Account ORDER BY Name LIMIT 10 OFFSET : offSetCount];
       
        return accountDataList;
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getSearchData() {
       
        List<Account> searchDataList =[SELECT Id, Name, Phone, Industry, Type, Website FROM Account ORDER BY Name  ];
        
        return searchDataList;
    }
    
    
 
}