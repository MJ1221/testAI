/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 12-02-2024
 * @last modified by  : minju.park@dkbmc.com
**/
public with sharing class AccountTriggerHandler {
    public static void CreateAccounts(List<Account> accts) {
        for(Account acc : accts){

            if(acc.ShippingState!=acc.BillingState){

                acc.ShippingState = acc.BillingState;

            }

        }

    }
}