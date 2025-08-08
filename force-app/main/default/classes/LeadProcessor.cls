/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 01-05-2024
 * @last modified by  : minju.park@dkbmc.com
**/
public class LeadProcessor implements
    Database.Batchable<sObject> {
    public Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator(
            'SELECT ID FROM Lead'
        );
    }
    public void execute(Database.BatchableContext bc, List<Lead> scope){
        // process each batch of records
        List<Lead> leads = new List<Lead>();
        for (Lead lead : scope) {
            lead.LeadSource = 'Dreamforce';
            leads.add(lead);
        }
        update leads;
    }
    public void finish(Database.BatchableContext bc){
       
    }
}