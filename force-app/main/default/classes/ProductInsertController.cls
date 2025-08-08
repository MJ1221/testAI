// 강요성 사원
public with sharing class ProductInsertController {
    @AuraEnabled
    public static String insertProd(Product2 prod){
        try{
            insert prod;
            return 'Successful';
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}