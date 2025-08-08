public with sharing class DependentPicklist {

    // * System.debug(JSON.serialize(DependentPicklist.getRegionValue()));
    @AuraEnabled
    public static List<SelectWrapper> getRegionValue(){
        List<SelectWrapper> resultWrapper = new List<SelectWrapper>();
        List<Schema.PicklistEntry> entryList = Account.Region__c.getDescribe().getPicklistValues();
        for(Schema.PicklistEntry entry : entryList){
            resultWrapper.add(new SelectWrapper(entry.getLabel(),entry.getValue()));
        }
        System.debug('resultWrapper :::: ' + resultWrapper);
        return resultWrapper;
    }
    
    // * System.debug(JSON.serialize(DependentPicklist.getZoneValue('Canada')));
    @AuraEnabled
    public static List<SelectWrapper> getZoneValue(String region){
        System.debug('region===>' + region);
        List<SelectWrapper> resultWrapper = new List<SelectWrapper>();
        Map<String,List<Map<String,String>>> dependMap = getDependencyPicklist(Account.Zone__c);
        List<List<Map<String,String>>> dependList = dependMap.values();
        List<Map<String,String>> mapList = dependMap.get(region);
        System.debug('dependMap===>' +dependMap);
        System.debug('dependList===>'+dependList);
        System.debug('mapList===>'+mapList);

        for(Map<String,String> target : mapList){
            if(!String.isBlank(target.get('value'))){
                resultWrapper.add(new SelectWrapper(target.get('label'),target.get('value')));
            }
        }
        return resultWrapper;
    }

    public static Map<String,List<Map<String, String>>> getDependencyPicklist(Schema.SObjectField dependField) {
        Schema.DescribeFieldResult dependRes = dependField.getDescribe();
        Schema.SObjectField controllToken = dependRes.getController();
        System.debug('dependField ::: ' + dependField);
        System.debug('dependRes ::: ' + dependRes);
        System.debug('controllToken ::: ' + controllToken);

        if(controllToken == null) { return new Map<String,List<Map<String, String>>>();}

        Schema.DescribeFieldResult controll = controllToken.getDescribe();
        System.debug('controll ::: ' + controll);
        List<Schema.PicklistEntry> entryList;
        if(controll.getType() != Schema.DisplayType.BOOLEAN) { entryList = controll.getPicklistValues(); }

        String base64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        Map<String,List<Map<String, String>>> dependencyMap = new Map<String,List<Map<String, String>>>();

        for(Schema.PicklistEntry entry : dependRes.getPicklistValues()) {
            if(entry.isActive() && String.isNotEmpty(String.valueOf(((Map<String, Object>)JSON.deserializeUntyped(JSON.serialize(entry))).get('validFor')))) {
                List<String> base64List = String.valueOf(((Map<String, Object>)JSON.deserializeUntyped(JSON.serialize(entry))).get('validFor')).split('');
                for(Integer index = 0; index < (entryList != null ? entryList.size() : 2); index++) {
                    Object controllValue = (entryList == null ? (Object)(index == 1) : (Object)(entryList[index].isActive() ? entryList[index].getValue() : null));
                    Integer bitIndex = index / 6;

                    if(bitIndex > base64List.size() - 1) { break; }
                    Integer bitShift = 5 - Math.mod(index, 6);
                    if(controllValue == null || (base64.indexOf(base64List[bitIndex]) & (1 << bitShift)) == 0) { continue; }
                    if(!dependencyMap.containsKey((String)controllValue)) {
                        List<Map<String, String>> defaultList = new List<Map<String, String>>();
                        Map<String, String> defaultMap = new Map<String, String>();
                        defaultMap.put('label', 'All');
                        defaultMap.put('value', '');
                        defaultList.add(defaultMap);

                        dependencyMap.put((String) controllValue, defaultList);
                    }

                    Map<String, String> pickMap = new Map<String, String>();
                    pickMap.put('label', entry.getLabel());
                    pickMap.put('value', entry.getValue());
                    dependencyMap.get((String)controllValue).add(pickMap);
                }
            }
        }
        return dependencyMap;
    }

    // public static Map<String,List<Map<String,String>>> getDependencyPicklist(Schema.SObjectField dependField){
    //     // Map<String,List<Map<String,String>>> result = new Map<String,List<Map<String,String>>>(); ==> 코드 중간 테스트 중간 debug
    //     Schema.DescribeFieldResult dependResult = dependField.getDescribe();
    //     Schema.SObjectField controllToken = dependResult.getController();
    //     if(controllToken == null) {
    //             return new Map<String,List<Map<String,String>>>();
    //         }
    //     System.debug('dependField ::: ' + dependField);
    //     System.debug('dependResult ::: ' + dependResult);
    //     System.debug('controllToken ::: ' + controllToken);
        
    //     Schema.DescribeFieldResult controll = controllToken.getDescribe();
    //     System.debug('controll ::: ' + controll);
    //     List<Schema.PicklistEntry> entryList;
    //     if(controll.getType() != Schema.DisplayType.BOOLEAN){
    //         entryList = controll.getPicklistValues();
    //     }
        
    //     String base64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    //     Map<String,List<Map<String,String>>> dependencyMap = new Map<String,List<Map<String,String>>>();
        
    //     for(Schema.PicklistEntry entry : dependResult.getPicklistValues()){
    //         if(entry.isActive() && String.isNotEmpty(String.valueOf(((Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(entry))).get('vaildFor')))) {
    //             System.debug('IF');
    //             List<String> base64List = String.valueOf(((Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(entry))).get('vaildFor')).split('');
    //             System.debug('base64List ::: ' + base64List);
    //             for(Integer index = 0; index < (entryList != null ? entryList.size() : 2); index++){
    //                 Object controllValue = (entryList == null ? (Object)(index == 1) : (Object)(entryList[index].isActive() ? entryList[index].getValue() : null));
    //                 Integer bitIndex = index / 6;

    //                 if(bitIndex > base64List.size() - 1){ break; }
    //                 Integer bitShift = 5 - Math.mod(index, 6);
    //                 if(controllValue == null || (base64.indexOf(base64List[bitIndex]) & (1 << bitShift)) == 0){continue;}
    //                 if(!dependencyMap.containsKey((String)controllValue)){
    //                     List<Map<String, String>> defaultList = new List<Map<String, String>>();
    //                     Map<String,String> defaultMap = new Map<String, String>();
    //                     defaultMap.put('label', 'All');
    //                     defaultMap.put('value', '');
    //                     defaultList.add(defaultMap);

    //                     System.debug('defaultMap ::: ' + defaultMap);
    //                     System.debug('defaultList ::: ' + defaultList);
    //                     dependencyMap.put((String)controllValue,defaultList);
    //                 }
    //                 Map<String, String> pickMap = new Map<String, String>();
    //                 pickMap.put('label', entry.getLabel());
    //                 pickMap.put('value', entry.getValue());
    //                 System.debug('pickMap ::: ' + pickMap);
    //                 dependencyMap.get((String)controllValue).add(pickMap);
    //             }
    //         }
    //     }
    //     System.debug('dependencyMap ::: ' + dependencyMap);
    //     return dependencyMap;
    // }
    
    public class SelectWrapper {
        @AuraEnabled public String label {get; set;}
        @AuraEnabled public String value {get; set;}

        public SelectWrapper(String label, String value){
            this.label = label;
            this.value = value;
        }
    }
}