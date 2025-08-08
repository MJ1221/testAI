/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 01-08-2024
 * @last modified by  : minju.park@dkbmc.com
**/
@isTest
public with sharing class addPrimaryContactTest {
    @isTest
    static void TestList() {
        List<Account> addtest = new List<Account>();
        for(Integer i=0; i<50; i++){
            addtest.add( new Account(BillingState = 'CA', name = 'Test' + i));
        }
        for(Integer j=0; j<50; j++){
            addtest.add( new Account(BillingState = 'NY', name = 'Test' + j));
        }
        insert addtest;

        Contact co = new Contact();
        co.FirstName = 'demo';
        co.LastName = 'demo';
        insert co; 
        String state = 'CA';

        addPrimaryContact apc = new AddprimaryContact(co, state);
        Test.startTest();
        System.enqueueJob(apc);
        Test.stopTest();
    }
}