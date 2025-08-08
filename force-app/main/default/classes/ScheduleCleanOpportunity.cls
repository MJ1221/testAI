global class ScheduleCleanOpportunity implements Schedulable {
    public void execute(SchedulableContext ctx) {
        List<Opportunity> opptys = [SELECT Id, Name, OwnerId, CloseDate FROM Opportunity WHERE IsClosed = True AND CloseDate = LAST_N_DAYS:60];
    try{
        if(opptys != null && opptys.size() > 0) {
        delete opptys;}
    
    }
    catch(Exception e){
    	System.debug('Error occurred while deleting opportunities '+e.getMessage());
    }}
}