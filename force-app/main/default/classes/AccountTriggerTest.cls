/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 12-02-2024
 * @last modified by  : minju.park@dkbmc.com
**/
@isTest

public class AccountTriggerTest {

    @isTest static void TestCreate200Records(){

        List<Account> accts = new List<Account>();

        for(Integer i=0; i < 200; i++) {

            Account acct = new Account(Name='Test Account ' + i, BillingState = 'CA');

            accts.add(acct);

        }

        Test.startTest();

        insert accts;

        Test.stopTest();

        System.assertEquals(200, [SELECT Count() FROM Account WHERE ShippingState = 'CA' ]);

    }

}