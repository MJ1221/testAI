/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 12-02-2024
 * @last modified by  : minju.park@dkbmc.com
**/
public with sharing class AccountUtils {
    public static List<Account> accountsByState (String state)

    {

        return [SELECT Name From Account WHERE BillingState =:state];

    }
}