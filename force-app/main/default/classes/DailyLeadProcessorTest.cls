/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 01-08-2024
 * @last modified by  : minju.park@dkbmc.com
**/
@isTest
public class DailyLeadProcessorTest {
    @testSetup
    static void setup(){
        List<Lead> fristOfLead = new List<Lead>();
        for(Integer i =1; i<= 200; i++){
            Lead ld = new Lead(Company = 'Comp' + i, LastName = 'NL' + i, Status = 'Working - Contacted');
            fristOfLead.add(ld);
        }

        insert fristOfLead;
    }
    public static String sch = '0 5 12 * * ?';
    static testmethod void testDailyLeadProcessorScheduledJob(){
        Test.startTest();
        String jobId = System.schedule('ScheduledApexText', sch, new DailyLeadProcessor());

        List<Lead> firstOfLead = [SELECT Id FROM Lead WHERE LeadSource = null LIMIT 200];
        System.assertEquals(200, firstOfLead.size());

        Test.stopTest();
    }
}