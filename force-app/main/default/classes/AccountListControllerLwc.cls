/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 02-01-2024
 * @last modified by  : minju.park@dkbmc.com
**/
public with sharing class AccountListControllerLwc {
    @AuraEnabled
    public static List<Account> queryAccountsByRevenue(Decimal annualRevenue) {
        return [
            SELECT Name
            FROM Account
            WHERE annualRevenue >= :annualRevenue
        ];

    }
}