/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 01-08-2024
 * @last modified by  : minju.park@dkbmc.com
**/
global class DailyLeadProcessor implements Schedulable {
    public void execute(SchedulableContext sc) {
        List<Lead> firstOfLead = [SELECT Id FROM Lead WHERE LeadSource = null LIMIT 200];

        List<Lead> firstOfUpdateLead = new List<Lead>();
        if(!firstOfLead.isEmpty()){
            for(Lead ld : firstOfLead){
                ld.LeadSource = 'Dreamforce';
                firstOfUpdateLead.add(ld);
            }
            UPDATE firstOfUpdateLead; 
        }
    }
}