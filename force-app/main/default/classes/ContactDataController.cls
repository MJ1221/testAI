public with sharing class ContactDataController {
    
    @AuraEnabled(Cacheable = true)
    public static List<Contact> contactDataList(String recordId) {
        List<Contact> relatedCon = [SELECT Id, AccountId, Phone, Email, Title, Name, FirstName, LastName FROM Contact WHERE AccountId = :recordId];
        return relatedCon;
      
    }

    @AuraEnabled
    public static String updateContact(List<Contact> editRowSt){
        System.debug('editRowSt===>'+ editRowSt);
        if(!editRowSt.isEmpty()) {
            try {
                update editRowSt; 
            } catch (Exception e) {
                System.debug('Error : ' + e);
            }
            return 'SUCCESS';
        } else {
            return 'Fail';
        }
    }    

    @AuraEnabled
    public static String checkContact(List<Contact> check){
        Set<String> idSet = new Set<String>();
        for(Contact param : check) {
            idSet.add(param.Id);
        }
        List<Contact> checkList = [SELECT Id FROM Contact WHERE Id IN :idSet];

        if(!checkList.isEmpty()) {
            delete checkList;
            return 'success';
        } else{
            return 'fail';
        }
        
    }

    @AuraEnabled
    public static String delOneRow(String delOne){

        List<Contact> delOneSt = [SELECT Id FROM Contact WHERE Id =: delOne];
        System.debug('delOneSt===>'+deloneSt);
        if(!delOneSt.isEmpty()){
            delete delOneSt;
            return 'success';
        } else {
            return 'fail';
        }
    }

    @AuraEnabled
    public static String newContact(List<Contact> newCon) {
        System.debug('newcon ::: ' + newCon);
        if(!newCon.isEmpty()) {
            insert newCon;
            return 'success';
        } else {
            return 'fail';
        }
    }

    @AuraEnabled
    public static Map<String, String> getFetch(String recordId) {   //Map <key,value>
        System.debug('recordId ::: ' + recordId);
        Map<String, String> returnMap = new Map<String, String>();  // return 초기화
        String accName = [SELECT Id, Name FROM Account WHERE Id = :recordId LIMIT 1].Name;  // AccountName 가져오기 (현재 들어와있는)
        // String ownerName = [SELECT Id, Name FROM User WHERE Id = :UserInfo.getUserId()].Name;  // ownerName 가져오기 
        String ownerName = UserInfo.getName();  // ownerName 가져오기 +
        String ownerId = UserInfo.getUserId();

        returnMap.put('accName', accName);  //Map 값 세팅
        returnMap.put('ownerName', ownerName);
        returnMap.put('ownerId', ownerId);
        System.debug('accName ::: ' + accName);
        System.debug('ownerName ::: ' + ownerName);
        System.debug('returnMap ::: ' + returnMap);

        return returnMap;
    }
    
    public class EditWrapper {
        @AuraEnabled public String FirstName        {get; set;}
        @AuraEnabled public String LastName         {get; set;}
        @AuraEnabled public String Title            {get; set;}
        @AuraEnabled public String Email            {get; set;}
        @AuraEnabled public String Phone            {get; set;}

        public EditWrapper() {}
    }
}