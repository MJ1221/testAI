public class PopbillController {
  	/**
     * init - 계산서 발행 전 데이터
    */
    @AuraEnabled
    public static TaxBillRequest init(String recordId) {
        TaxBillRequest req;
        try {
            Order order =[select AccountId,Name__c, Account.Name, Account.Type, 
                          Account.AccountNumber, Account.CEO__c ,Account.JUSO__c, 
                          Account.Stock__c, Account.Industry, Account.Phone, EffectiveDate,
                          Account.Manager__c, Account.ManagerEmail__c, TotalAmount  
                          from Order WHERE Id=:recordId];
            List<Contact> contactList = [SELECT Id, Name, Email,Phone FROM Contact WHERE AccountId=:order.AccountId];
            List<OrderItem> orderItemList = [SELECT Id, OrderId, UnitPrice, Quantity,Product2.Name, Product2.Family, TotalPrice, Description FROM OrderItem WHERE OrderId=:order.Id];
            req = new TaxBillRequest(order,orderItemList,contactList);
            return req;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    /**
     * registIssue - 세금 계산서 즉시 발행
    */
    @AuraEnabled
    public static Map<String,String> registIssue(String recordId) {
        String api ='/registIssue';
        Map<String,String> returnMap = new Map<String,String>();
        String jsonString ='';
        try {
            Order order =[select AccountId,Name__c, Account.Name, Account.Type, 
                          Account.AccountNumber, Account.CEO__c ,Account.JUSO__c, 
                          Account.Stock__c, Account.Industry, Account.Phone, EffectiveDate,
                          Account.Manager__c, Account.ManagerEmail__c, TotalAmount  
                          from Order WHERE Id=:recordId];
            List<Contact> contactList = [SELECT Id, Name, Email,Phone FROM Contact WHERE AccountId=:order.AccountId];
            List<OrderItem> orderItemList = [SELECT Id, OrderId, UnitPrice, Quantity,Product2.Name, Product2.Family, TotalPrice, Description FROM OrderItem WHERE OrderId=:order.Id];
            TaxBillRequest req = new TaxBillRequest(order,orderItemList,contactList);
            jsonString = httpCallout(api,JSON.serialize(req));
            Map<String, Object> responseBodyMap = (Map<String,Object>) json.deserializeUntyped(jsonString);
            if( String.valueOf(responseBodyMap.get('code')) !=null ) {
                if(String.valueOf(responseBodyMap.get('code')) !='1') { 
                    System.debug(String.valueOf(responseBodyMap.get('message')) + ' < ===1111');
                    returnMap.put('res', String.valueOf(responseBodyMap.get('message')));
                    return returnMap;
                }
            }
            String taxbillId = setSFDCData(jsonString, recordId, order.AccountId);
            returnMap.put('recordId', taxbillId);
            returnMap.put('res', 'S');
            return returnMap;
        } catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    /**
     * cancelIssue - 세금 계산서 발행 취소
    */
    @AuraEnabled
    public static String cancelIssue(String recordId) {
        String api ='/cancelIssue';
        Map<String, Object> responseBodyMap = new Map<String, Object>();
        try{
        	Taxbill__c tax = [SELECT Id, Name, MgtKey__c,stateCode__c FROM Taxbill__c WHERE Id=:recordId];
            TaxBillRequest req = new TaxBillRequest(tax);
            responseBodyMap = (Map<String,Object>) json.deserializeUntyped(httpCallout(api,JSON.serialize(req)));
            if(String.valueOf(responseBodyMap.get('code')) =='1') {
				tax.stateCode__c = '600';
            	update tax; 
                return 'S';
            } else {
             	return String.valueOf(responseBodyMap.get('message'));   
            }
        } catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        
    }
    
    /**
     * deleted - 세금 계산서 삭제
    */
    @AuraEnabled
    public static String deleted(String recordId) {
        String api ='/delete';
        Map<String, Object> responseBodyMap = new Map<String, Object>();
        String result = 'S';
        try{
            Taxbill__c tax = [SELECT Id, Name, MgtKey__c FROM Taxbill__c WHERE Id=:recordId];
            TaxBillRequest req = new TaxBillRequest(tax);
            responseBodyMap = (Map<String,Object>) json.deserializeUntyped(httpCallout(api,JSON.serialize(req)));
            System.debug(responseBodyMap.get('message')); //(String) errorMap.get('error.message');
            System.debug(responseBodyMap + ' < ===jsonString');
            if(String.valueOf(responseBodyMap.get('code')) =='1') {
				tax.stateCode__c = '700';
                tax.MgtKey__c = 'Delete_' + tax.MgtKey__c;
                update tax;
                return 'S';
            } else {
             	return String.valueOf(responseBodyMap.get('message'));   
            }
        } catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }        
    }
    

    /**
     * setSFDCData - 세일즈포스 데이터 가공 처리
    */
    public static String setSFDCData(String jsonStr, String recordId, String AccountId) {
        TaxBillResponse response = new TaxBillResponse();
        try{
            response = (TaxBillResponse) JSON.deserialize(jsonStr,TaxBillResponse.class);
            /**
             * Taxbill__c - 세금 계산서 데이터 매핑
            */
            Taxbill__c taxBill = new Taxbill__c();
            taxBill.Account__c 				= AccountId;
            taxBill.Order__c 				= recordId;
            taxBill.stateCode__c 			= String.valueOf(response.getInfo.stateCode).trim();
            taxBill.getInfoJSON__c 			= JSON.serialize(response.getInfo);
            taxBill.getDetailInfo__c 		= JSON.serialize(response.getDetailInfo);
            taxBill.MgtKey__c				= response.getInfo.invoicerMgtKey;
            taxBill.invoiceeCorpName__c		= response.getDetailInfo.invoiceeCorpName;
            taxBill.invoicerMgtKey__c		= response.getDetailInfo.invoicerMgtKey;
            taxbill.invoicerCorpNum__c		= response.getDetailInfo.invoicerCorpNum;
            taxbill.invoicerCorpName__c		= response.getDetailInfo.invoicerCorpName;
            taxbill.chargeDirection__c		= response.getDetailInfo.chargeDirection;
            taxbill.taxType__c				= response.getInfo.taxType;
			taxbill.supplyCostTotal__c		= response.getDetailInfo.supplyCostTotal;
            taxbill.invoiceeCorpNum__c		= response.getDetailInfo.invoiceeCorpNum;
            taxbill.ntsconfirmNum__c		= response.getInfo.ntsconfirmNum;
            taxbill.issueDT__c				= response.getInfo.issueDT;
            taxbill.issueType__c			= response.getDetailInfo.issueType;
            taxbill.taxTotal__c				= response.getDetailInfo.taxTotal;
            taxbill.purposeType__c			= response.getDetailInfo.purposeType;
            taxbill.serialNum__c			= response.getDetailInfo.serialNum;
            taxbill.writeDate__c			= response.getDetailInfo.writeDate;
            taxbill.itemKey__c				= response.getInfo.itemKey;
            insert taxBill;
            /**
             * List<TaxBillDetailInfo__c> - 세금 계산서 제품 정보 매핑
            */
            List<TaxBillDetailInfo__c> taxBillDetailList = new List<TaxBillDetailInfo__c>();
            if(response.GetDetailInfo.detailList.size() > 0) {
                for(TaxBillResponse.DetailList taxs : response.GetDetailInfo.detailList) {        
                    TaxBillDetailInfo__c taxBillDetail = new TaxBillDetailInfo__c();
                    taxBillDetail.Name					= taxs.itemName;
                    taxBillDetail.Taxbill__c			= taxBill.Id;
                    taxBillDetail.serialNum__c 			= String.valueOf(taxs.serialNum);
                    taxBillDetail.purchaseDT__c 		= taxs.purchaseDT;
                    taxBillDetail.itemName__c 			= taxs.itemName;
                    taxBillDetail.spec__c 				= taxs.spec;
                    taxBillDetail.qty__c				= taxs.qty;
                    taxBillDetail.unitCost__c			= taxs.unitCost;
                    taxBillDetail.supplyCost__c			= taxs.supplyCost;
                    taxBillDetail.tax__c				= taxs.tax;
                    taxBillDetail.remark__c				= taxs.remark;
                    taxBillDetailList.add(taxBillDetail);
                }
                insert taxBillDetailList;    
            }
            /**
             * List<TaxBillContact__c> - 세금 계산서 연락처 정보 매핑
            */
            List<TaxBillContact__c> taxBillContactList = new List<TaxBillContact__c>();
            if(response.GetDetailInfo.addContactList.size() > 0) {
                for(TaxBillResponse.AddContactList contact : response.GetDetailInfo.addContactList) {
                    TaxBillContact__c taxBillContact = new TaxBillContact__c();
                    taxBillContact.Name					= contact.contactName;
                    taxBillContact.Taxbill__c			= taxBill.Id;
                    taxBillContact.contactName__c 		= contact.contactName;
                    taxBillContact.email__c 			= contact.email;
                    taxBillContact.serialNum__c 		= String.valueOf(contact.serialNum);
                    taxBillContactList.add(taxBillContact);
                }
                insert taxBillContactList;
            }
        	return taxBill.Id;
        } catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        
    }
    
    /**
     * httpCallout
    */
    public static String httpCallout(String api, String body) {
        String       calloutLog = '';
        HttpRequest  request    = new HttpRequest();
        HttpResponse response   = new HttpResponse();
        Http         http       = new Http();
        String returnJSON = '';
        /**
         * requlest Setting
        */
        request.setMethod('POST');
        String endPoint = 'https://z9korb57n0.execute-api.ap-northeast-2.amazonaws.com/prod'+api;
        request.setEndpoint( EncodingUtil.urlDecode(endPoint,'UTF-8').trim());
        request.setHeader( 'Content-Type', 'application/json');
        if(body !=null) {
            request.setBody(body);    
        }             
        response    = http.send( request);
        returnJSON = response.getBody();
        return returnJSON;
    }
    
    /**
     * jsonString - SampleJSON
    */
    public static String jsonString() {
      	String jsonString = '{"getInfo":"{\n   \"ntsconfirmNum\": \"20231206888888880000000b\",\n   \"invoiceeCorpNum\": \"4561237891\",\n   \"issueType\": \"정발행\",\n   \"invoicerMgtKey\": \"20231205-0001\",\n   \"invoicerCorpNum\": \"1234567890\",\n   \"issueDT\": \"20231206031324\",\n   \"interOPYN\": true,\n   \"itemKey\": \"023120603132400001\",\n   \"stateCode\": 300,\n   \"regDT\": \"20231206031325\",\n   \"lateIssueYN\": false,\n   \"stateDT\": \"20231206031325\",\n   \"writeDate\": \"20231206\",\n   \"openYN\": false,\n   \"taxType\": \"과세\",\n   \"invoicerCorpName\": \"DKBMC\",\n   \"invoicerPrintYN\": false,\n   \"invoiceeMgtKey\": \"20231205-0001SFDC004\",\n   \"invoiceeCorpName\": \"LG 화학\",\n   \"invoiceePrintYN\": false,\n   \"trusteePrintYN\": false,\n   \"taxTotal\": \"200\",\n   \"supplyCostTotal\": \"1800\",\n   \"purposeType\": \"영수\"\n}","getDetailInfo":"{\n   \"writeSpecification\": false,\n   \"writeDate\": \"20231206\",\n   \"chargeDirection\": \"정과금\",\n   \"issueType\": \"정발행\",\n   \"issueTiming\": \"직접발행\",\n   \"taxType\": \"과세\",\n   \"invoicerCorpNum\": \"1234567890\",\n   \"invoicerMgtKey\": \"20231205-0001\",\n   \"invoicerCorpName\": \"DKBMC\",\n   \"invoicerCEOName\": \"배창욱\",\n   \"invoicerAddr\": \"서울 강남구 봉은사로 434 3층\",\n   \"invoicerBizClass\": \"판매\",\n   \"invoicerBizType\": \"IT\",\n   \"invoicerContactName\": \"서일태\",\n   \"invoicerTEL\": \"010-4915-7565\",\n   \"invoicerHP\": \"010-4915-7565\",\n   \"invoicerEmail\": \"iltae.seo@dkbmc.com\",\n   \"invoicerSMSSendYN\": false,\n   \"invoiceeCorpNum\": \"4561237891\",\n   \"invoiceeType\": \"사업자\",\n   \"invoiceeMgtKey\": \"20231205-0001SFDC004\",\n   \"invoiceeCorpName\": \"LG 화학\",\n   \"invoiceeCEOName\": \"홍길동\",\n   \"invoiceeAddr\": \"서울특별시 강남구 개포로 204(개포동)\",\n   \"invoiceeBizType\": \"Sale\",\n   \"invoiceeBizClass\": \"IT\",\n   \"invoiceeContactName1\": \"김담당\",\n   \"invoiceeTEL1\": \"01049157565\",\n   \"invoiceeHP1\": \"01049157565\",\n   \"invoiceeEmail1\": \"sktsch11@naver.com\",\n   \"invoiceeSMSSendYN\": false,\n   \"trusteeSMSSendYN\": false,\n   \"taxTotal\": \"200\",\n   \"supplyCostTotal\": \"1800\",\n   \"totalAmount\": \"2000\",\n   \"purposeType\": \"영수\",\n   \"businessLicenseYN\": false,\n   \"bankBookYN\": false,\n   \"faxsendYN\": false,\n   \"ntsconfirmNum\": \"20231206888888880000000b\",\n   \"detailList\": [\n      {\n         \"serialNum\": 1,\n         \"purchaseDT\": \"20231205\",\n         \"itemName\": \"제품1\",\n         \"spec\": \"None\",\n         \"qty\": \"1\",\n         \"unitCost\": \"1000\",\n         \"supplyCost\": \"900\",\n         \"tax\": \"100\"\n      },\n      {\n         \"serialNum\": 2,\n         \"purchaseDT\": \"20231205\",\n         \"itemName\": \"제품2\",\n         \"qty\": \"1\",\n         \"unitCost\": \"1000\",\n         \"supplyCost\": \"900\",\n         \"tax\": \"100\"\n      }\n   ],\n   \"addContactList\": [\n      {\n         \"serialNum\": 3,\n         \"email\": \"barr_tim@grandhotels.com\",\n         \"contactName\": \"Barr Tim\"\n      }\n   ]\n}"}';
        return jsonString;
    }
    
    
    
    
    
    
    
}