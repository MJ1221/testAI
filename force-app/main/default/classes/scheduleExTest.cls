@isTest
public class scheduleExTest {



   static testmethod void test() {
   Test.startTest();

      Account a = new Account();
      a.Name = 'scheduleTest';
      insert a;

      // Schedule the test job

      String jobId = System.schedule('testBasicScheduledApex',
      scheduleTest.CRON_EXP, 
         new scheduleTest());

      // Get the information from the CronTrigger API object
      CronTrigger ct = [SELECT Id, CronExpression, TimesTriggered, 
         NextFireTime
         FROM CronTrigger WHERE id = :jobId];

      // Verify the expressions are the same
      System.assertEquals(scheduleTest.CRON_EXP, 
         ct.CronExpression);

      // Verify the job has not run
      System.assertEquals(0, ct.TimesTriggered);

      // Verify the next time the job will run
      System.assertEquals('2024-04-09 15:00:00', 
         String.valueOf(ct.NextFireTime));
      System.assertNotEquals('scheduleTestUpdate',
         [SELECT id, name FROM account WHERE id = :a.id].name);

   Test.stopTest();

   System.assertEquals('scheduleTestUpdate',
   [SELECT Id, Name FROM Account WHERE Id = :a.Id].Name);

   }
}