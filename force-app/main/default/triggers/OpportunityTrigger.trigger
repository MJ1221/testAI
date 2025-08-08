trigger OpportunityTrigger on Opportunity (before insert, before update) {
    for (Opportunity opp : Trigger.new) {
        if (Trigger.isInsert) {
            // 레코드 생성 시 Custom Created Date를 오늘 날짜로 설정
            opp.dateTest__c = System.today();
        }

        // Opportunity Detail 필드가 입력되면 Opportunity Owner, Opportunity Date 업데이트
        if (opp.Opportunity_Detail__c != null) {
            opp.Opportunity_Owner__c = UserInfo.getUserId();
            opp.Opportunity_Date__c = System.today();
        }

        // 현재 단계가 Qualification이고 필수 필드가 입력되면 Needs Analysis로 변경
        if (opp.StageName == 'Qualification' &&
            opp.Amount != null && opp.ExpectedRevenue != null &&
            opp.NextStep != null && opp.AccountId != null) {
            opp.StageName = 'Needs Analysis';
        }

        // Opportunity Detail 필드는 Needs Analysis 단계에서만 편집 가능
        if (opp.StageName != 'Needs Analysis' && opp.Opportunity_Detail__c != null) {
            opp.Opportunity_Detail__c = null;
        }

        // 현재 단계가 Needs Analysis이고 필수 필드가 입력되면 Value Proposition으로 변경
        if (opp.StageName == 'Needs Analysis' && opp.Type != null && opp.OrderNumber__c != null && opp.MainCompetitors__c != null && opp.CurrentGenerators__c != null && opp.Opportunity_Detail__c != null) {
            opp.StageName = 'Value Proposition';
        }

        // 현재 단계가 Value Proposition이고 필수 필드가 입력되면 Closed로 변경
        if (opp.StageName == 'Value Proposition' && opp.DeliveryInstallationStatus__c != null && opp.TrackingNumber__c != null) {
            opp.StageName = 'Closed';
        }
    }
}