/**
 * @description       : 
 * @author            : hayoon.jung@dkbmc.com
 * @group             : 
 * @last modified on  : 12-11-2023
 * @last modified by  : hayoon.jung@dkbmc.com
**/

public with sharing class ProductSearchController {
    /**
    * @description Product의 Type1 필드 Picklist Return
    * @author hayoon.jung@dkbmc.com | 12-07-2023 
    * @return List<SelectWrapper> 
    * System.debug(JSON.serialize(ProductSearchController.getType1Options()));
    **/
    @AuraEnabled
    public static List<SelectWrapper> getType1Options(){
        List<SelectWrapper> returnList = new List<SelectWrapper>();
        try {
            returnList.add(new SelectWrapper('All', 'All'));
            for(PicklistEntry entry : Product2.Type1__c.getDescribe().getPicklistValues()) {
                returnList.add(new SelectWrapper(entry.getLabel(), entry.getValue()));
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return returnList;
    }
    
    /**
    * @description Product의 Type2 필드 Picklist Return
    * @author hayoon.jung@dkbmc.com | 12-07-2023 
    * @param String type1St 
    * @return List<SelectWrapper> 
    * System.debug(JSON.serialize(ProductSearchController.getType2Options('남성 의류')));
    **/
    @AuraEnabled
    public static List<SelectWrapper> getType2Options(String type1St){
        List<SelectWrapper> returnList = new List<SelectWrapper>();
        try {
            if(type1St == 'All') {
                returnList.add(new SelectWrapper('All', 'All'));
                for(PicklistEntry entry : Product2.Type2__c.getDescribe().getPicklistValues()) {
                    returnList.add(new SelectWrapper(entry.getLabel(), entry.getValue()));
                }
            } else {
                Map<String, List<Map<String, String>>> optionMap = getDependencyPicklist(Product2.Type2__c);
                List<List<Map<String, String>>> optionList = optionMap.values();
                List<Map<String, String>> mapList = optionMap.get(type1St);
                
                returnList.add(new SelectWrapper('All', 'All'));
                for(Map<String, String> target : mapList) {
                    if(!String.isBlank(target.get('value'))) {
                        returnList.add(new SelectWrapper(target.get('label'), target.get('value')));
                    }
                }
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

        return returnList;
    }

    /**
    * @description 제품 리스트 리턴(테스트용 Init)
    * @author hayoon.jung@dkbmc.com | 12-07-2023 
    * @return List<ProductWrapper> 
    * System.debug(JSON.serialize(ProductSearchController.getProductList()));
    **/
    @AuraEnabled
    public static List<ProductWrapper> getInitRecord(){
        List<ProductWrapper> prodWrapList = new List<ProductWrapper>();
        try {
            List<Product2> prodList = [
                SELECT Id, Name, Amount__c, Currency__c, Type1__c, Type2__c
                FROM Product2
            ];
    
            for(Product2 prod : prodList) {
                ProductWrapper prodWrap = new ProductWrapper();
                prodWrap.prodId         = prod.Id;
                prodWrap.prodName       = prod.Name;
                prodWrap.prodAmount     = Integer.valueOf(prod.Amount__c);
                prodWrap.prodCurrency   = Integer.valueOf(prod.Currency__c);
                prodWrap.prodType1      = prod.Type1__c;
                prodWrap.prodType2      = prod.Type2__c;
    
                prodWrapList.add(prodWrap);
            }
    
            return prodWrapList;
        } catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    /**
    * @description 제품 리스트 리턴(검색어 필터링)
    * @author hayoon.jung@dkbmc.com | 12-07-2023 
    * @param String nameSt 
    * @param Integer startAmountInt 
    * @param Integer endAmountInt 
    * @param String Type1St 
    * @param String Type2St 
    * @return List<ProductWrapper> 
    **/
    @AuraEnabled
    public static List<ProductWrapper> getProductList(String nameSt, String startAmountSt, String endAmountSt, String Type1St, String Type2St){
        System.debug('nameSt :::: ' + nameSt);
        System.debug('startAmountSt :::: ' + startAmountSt);
        System.debug('endAmountSt :::: ' + endAmountSt);
        System.debug('Type1St :::: ' + Type1St);
        System.debug('Type2St :::: ' + Type2St);
        List<ProductWrapper> prodWrapList = new List<ProductWrapper>();
        try {
            String strQuery = 'SELECT Id, Name, Amount__c, Currency__c, Type1__c, Type2__c FROM Product2 ';
            String strQuery_Where = ' WHERE isActive__c = true ';
            String strQuery_Order = ' ORDER BY Name';

            if(!String.isBlank(nameSt)) { strQuery_Where += ' AND Name LIKE \'%' + nameSt + '%\''; }
            if(!String.isBlank(startAmountSt)) { strQuery_Where += ' AND Amount__c >= ' + Integer.valueOf(startAmountSt); }
            if(!String.isBlank(endAmountSt)) { strQuery_Where += ' AND Amount__c <= ' + Integer.valueOf(endAmountSt); }
            if(!String.isBlank(Type1St) && Type1St != 'All') { strQuery_Where += ' AND Type1__c = :Type1St'; }
            if(!String.isBlank(Type1St) && Type2St != 'All') { strQuery_Where += ' AND Type2__c = :Type2St'; }

            List<Product2> prodList = Database.query(strQuery + strQuery_Where + strQuery_Order);
            System.debug('prodList ::: ' + prodList);

            for(Product2 prod : prodList) {
                ProductWrapper prodWrap = new ProductWrapper();
                prodWrap.prodId         = prod.Id;
                prodWrap.prodName       = prod.Name;
                prodWrap.prodAmount     = Integer.valueOf(prod.Amount__c);
                prodWrap.prodCurrency   = Integer.valueOf(prod.Currency__c);
                prodWrap.prodType1      = prod.Type1__c;
                prodWrap.prodType2      = prod.Type2__c;
    
                prodWrapList.add(prodWrap);
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return prodWrapList;
    }

    /**
    * @description Order__c, OrderHistory__c 생성
    * @author hayoon.jung@dkbmc.com | 12-08-2023 
    * @param String prodIdSt 
    * @param Integer amountInt 
    * @return String 
    **/
    @AuraEnabled
    public static String insertOrder(String prodIdSt, Integer amountInt){
        try {
            Order__c newOrd = new Order__c();
            newOrd.Product__c = prodIdSt;
            newOrd.Amount__c = amountInt;
            newOrd.Date__c = Date.today();
            newOrd.Status__c = '주문 완료';
            insert newOrd;

            OrderHistory__c newOrdHistory = new OrderHistory__c();
            newOrdHistory.Order__c = newOrd.Id;
            newOrdHistory.Amount__c = amountInt;
            newOrdHistory.Date__c = Date.today();
            newOrdHistory.Status__c = '주문 완료';
            insert newOrdHistory;

            Decimal prodAmount = [SELECT Id, Amount__c FROM Product2 WHERE Id = :prodIdSt].Amount__c;
            System.debug('prodAmount ::: ' + prodAmount);

            Product2 updateProd = new Product2();
            updateProd.Id = prodIdSt;
            updateProd.Amount__c = prodAmount - amountInt;
            update updateProd;
            
            System.debug('newOrd ::: ' + newOrd);
            System.debug('newOrdHistory ::: ' + newOrdHistory);
            System.debug('updateProd ::: ' + updateProd);

            return 'SUCCESS';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static Map<String,List<Map<String, String>>> getDependencyPicklist(Schema.SObjectField dependToken) {
        Schema.DescribeFieldResult depend = dependToken.getDescribe();
        Schema.SObjectField controllToken = depend.getController();
        System.debug('dependToken ::: ' + dependToken);
        System.debug('depend ::: ' + depend);
        System.debug('controllToken ::: ' + controllToken);

        if(controllToken == null) {
            return new Map<String,List<Map<String, String>>>();
        }

        Schema.DescribeFieldResult controll = controllToken.getDescribe();
        System.debug('controll ::: ' + controll);
        List<Schema.PicklistEntry> entryList;
        if(controll.getType() != Schema.DisplayType.BOOLEAN) {
            entryList = controll.getPicklistValues();
        }

        String base64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        Map<String,List<Map<String, String>>> dependencyMap = new Map<String,List<Map<String, String>>>();

        for(Schema.PicklistEntry entry : depend.getPicklistValues()) {
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

    public class ProductWrapper {
        @AuraEnabled public String  prodId          {get; set;}
        @AuraEnabled public String  prodName        {get; set;}
        @AuraEnabled public Integer prodAmount      {get; set;}
        @AuraEnabled public Integer prodCurrency    {get; set;}
        @AuraEnabled public String  prodType1       {get; set;}
        @AuraEnabled public String  prodType2       {get; set;}

        public ProductWrapper() {}
    }

    public class SelectWrapper {
        @AuraEnabled public String label {get; set;}
        @AuraEnabled public String value {get; set;}

        public SelectWrapper(String label, String value) {
            this.label = label;
            this.value = value;
        }
    }
}