/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 01-05-2024
 * @last modified by  : minju.park@dkbmc.com
**/
public class AccountProcessor {
    @future
    public static void countContacts(List<Id> accountIds) {
        List<Account> accList = [SELECT Id, Number_Of_Contacts__c,(SELECT Id FROM Contacts) FROM Account WHERE Id IN :accountIds];

        for(Account acc : accList){
            acc.Number_Of_Contacts__c = acc.Contacts.size();
        }
        update accList;
    }
}