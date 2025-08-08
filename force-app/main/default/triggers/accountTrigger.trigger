/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 12-02-2024
 * @last modified by  : minju.park@dkbmc.com
**/
trigger accountTrigger on Account (before insert) {
    if(Trigger.isBefore && Trigger.isInsert){

        AccountTriggerHandler.CreateAccounts(Trigger.New);
    }
}