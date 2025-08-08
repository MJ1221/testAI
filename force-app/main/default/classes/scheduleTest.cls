/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 04-08-2024
 * @last modified by  : minju.park@dkbmc.com
**/

global class scheduleTest implements Schedulable {
   
    public static String CRON_EXP = '0 0 15 * * ?';

    global void execute(SchedulableContext ctx) {
        CronTrigger ct = [SELECT Id, CronExpression, TimesTriggered, NextFireTime
                    FROM CronTrigger WHERE Id = :ctx.getTriggerId()];
    
        System.assertEquals(CRON_EXP, ct.CronExpression);
        System.assertEquals(0, ct.TimesTriggered);
        System.assertEquals('2024-04-09 15:00:00', String.valueOf(ct.NextFireTime));
    
        Account a = [SELECT Id, Name FROM Account WHERE Name = 
                    'scheduleTest'];
        a.name = 'scheduleTestUpdate';
        update a;
    }   
}