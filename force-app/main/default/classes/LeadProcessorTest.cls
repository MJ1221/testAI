/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 01-05-2024
 * @last modified by  : minju.park@dkbmc.com
**/
@isTest
private class LeadProcessorTest {
    @testSetup
    static void setup() {
        List<Lead> leads = new List<Lead>();
        // insert 10 accounts
        for (Integer i=0;i<200;i++) {
            leads.add(new Lead(LastName='Lead '+i, Company='Test co'));
        }
        insert leads;
   
    }
    @isTest static void test() {
        Test.startTest();
       
        LeadProcessor myLeads = new LeadProcessor();
        Id batchId = Database.executeBatch(myLeads);
        Test.stopTest();
        // after the testing stops, assert records were updated properly
        System.assertEquals(200, [SELECT count() FROM Lead WHERE LeadSource = 'Dreamforce']);
    }
}