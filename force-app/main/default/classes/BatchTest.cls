public with sharing class BatchTest implements Database.Batchable<sObject>, Database.Stateful, Schedulable {
    public BatchTest() {}

    public Database.QueryLocator start(Database.BatchableContext bc){
        // String query = 'SELECT Amount, Probability, MainCompetitors__c, CurrentGenerators__c, Description, dateTest__c  FROM Opportunity';
        // System.debug('query====>'+ Database.query(query));
        date myDate = date.today();
        date dueDate = myDate.addDays(-3);
        System.debug('myDate ::: ' + myDate);
        System.debug('dueDate ::: ' + dueDate);
        return Database.getQueryLocator([
            SELECT Id, Amount, Probability, MainCompetitors__c, CurrentGenerators__c, Description, dateTest__c FROM Opportunity
            WHERE Name LIKE '%test%' AND dateTest__c < :dueDate  
            
        ]);

    }

    public void execute(Database.BatchableContext bc, List<Opportunity> opptyList){
        List<Opportunity> updateList = new List<Opportunity>();

       for(Opportunity trail : opptyList){
        Opportunity oppObj = new Opportunity();
        oppObj.Id = trail.Id;
        oppObj.Amount = null;
        oppObj.Probability = null;
        oppObj.MainCompetitors__c = null;
        oppObj.CurrentGenerators__c = null;
        oppObj.Description = null;
        oppObj.StageName = 'Closed Lost';

        updateList.add(oppObj);
       }

       if(!opptyList.isEmpty()) {
           update opptyList;
       }
    }

    public void finish(Database.BatchableContext bc){

    }

    public void execute(SchedulableContext sc){
        Database.executeBatch(new BatchTest(),100);
    }
}