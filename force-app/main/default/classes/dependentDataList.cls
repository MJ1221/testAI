public with sharing class dependentDataList {

    @AuraEnabled(cacheable=true)
    public static List<String> getPicklistValues(String picklistName) {
        Schema.DescribeFieldResult fieldDescription = Account.SObjectType.getDescribe().fields.getMap().get(picklistName).getDescribe();
        List<Schema.PicklistEntry> entries = fieldDescription.getPicklistValues();
        List<String> activeEntries = new List<String>();
        for(Schema.PicklistEntry entry : entries) {
            if (entry.isActive()) {
                activeEntries.add(entry.getValue());
            }
        }
        return activeEntries;
    }
}