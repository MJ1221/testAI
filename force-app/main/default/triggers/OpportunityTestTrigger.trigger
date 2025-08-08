trigger OpportunityTestTrigger on Opportunity (before update, before insert) {
    if(Trigger.isBefore){
        if(Trigger.isInsert){
            for(Opportunity opp : Trigger.new ){
                    opp.dateTest__c = date.today();
            }
        }
    }
    if(Trigger.isBefore){
        if(Trigger.isUpdate){
            for(Opportunity opp : Trigger.new){
                if(opp.Opportunity_Detail__c != null){
                    opp.Opportunity_Owner__c = UserInfo.getUserId();
                    opp.Opportunity_Date__c = date.today();
                }
                // if(opp.StageName == 'Qualification' && opp.Amount != null && opp.ExpectedRevenue != null && opp.NextStep && opp.AccountId != null){
                //     opp.StageName = 'Needs Analysis';
                // }
                if(opp.StageName == 'Needs Analysis' && opp.Type != null && opp.OrderNumber__c != null && opp.MainCompetitors__c != null && opp.CurrentGenerators__c != null && opp.Opportunity_Detail__c != null){
                   opp.StageName = 'Value Proposition';
                }
                if(opp.StageName == 'Value Proposition' && opp.DeliveryInstallationStatus__c != null && opp.TrackingNumber__c != null){
                    opp.StageName = 'Closed';
                }
                if(opp.StageName != 'Needs Analysis'){
                    opp.Opportunity_Detail__c = null;
                }
            }
        }
    }
}