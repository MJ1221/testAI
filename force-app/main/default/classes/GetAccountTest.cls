/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 04-15-2024
 * @last modified by  : minju.park@dkbmc.com
**/
public with sharing class GetAccountTest {
    @InvocableMethod(label = 'Insert Account' description = 'Insert Account')
    public static void insertAccount(List<InputVariables> inputVariables) {
      
        String test = inputVariables.get(0).testName;
        System.debug('test >> ' + test);
        // insert acc;
        methodName();

    }

    public class InputVariables {

        @InvocableVariable
        public String testName;

    }

    

    @AuraEnabled
    public static Account getAccount() {
        System.debug('getAccount');
       return [SELECT Id FROM Account WHERE id = '0015i00000kLclgAAC'];
    }

    @AuraEnabled
    public static void methodName(){
      System.debug('o');
    }
}