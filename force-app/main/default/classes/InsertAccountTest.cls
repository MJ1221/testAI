/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 04-15-2024
 * @last modified by  : minju.park@dkbmc.com
**/
public with sharing class InsertAccountTest {
    @InvocableMethod(label='Log Debug Message' description='Outputs messages to the debug log')
    public static void trace(List<String> debugMessages) {
        for (String debugMessage : debugMessages) {
            system.debug(debugMessage);
        }
    }
}