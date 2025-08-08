public class TaxBillRequest {
    /**
     * 생성자
    */
    public TaxBillRequest() {}
    
    /**
     * cancelIssue - 발행취소, delete - 발행삭제
     * @param Taxbill__c
    */
    public TaxBillRequest(Taxbill__c  tax) {
        this.corpNum 																	= '1234567890';
		this.keyType																	= 'SELL';
		this.mgtKey																		= tax.MgtKey__c;
    }
    
    /**
     * registIssue - 즉시 발행
     * @param Order
     * @param List<OrderItem>
     * @param List<Contact>
    */
    public TaxBillRequest(Order order, List<OrderItem> orderList, List<Contact> contactList) {
        List<DetailList> detailList = new List<DetailList>();
        List<AddContactList> addContactList = new List<AddContactList>();
        integer Num = 1;
        DateTime dt = order.EffectiveDate;
        System.debug( String.valueOf(order.EffectiveDate).subString(0,10).replace('-', '')+ ' < ===order.EffectiveDate');
        for(OrderItem orderItem : orderList) {
            DetailList detail = new DetailList();
            detail.serialNum 		= Num;               
            detail.purchaseDT 		= String.valueOf(order.EffectiveDate).subString(0,10).replace('-', '');
            detail.itemName 		= orderItem.Product2.Name;
            detail.spec 			= orderItem.Product2.Family;                    
            detail.qty 				= String.valueOf( orderItem.Quantity );                       
            detail.unitCost			= String.valueOf( orderItem.UnitPrice );             
            detail.supplyCost 		= String.valueOf( orderItem.TotalPrice - (orderItem.TotalPrice / 100 * 10) );
            detail.tax 				= String.valueOf( (orderItem.TotalPrice / 100) * 10 );                  
            detail.remark 			= orderItem.Description;
            Num++;
        	detailList.add(detail);
        }
        for(Contact cont : contactList) {
        	AddContactList addContact = new AddContactList();
            addContact.serialNum 		= Num;
            addContact.contactName 		= cont.Name;
            addContact.email 			= cont.Email;
            addContactList.add(addContact);
            Num++;
        }
        /**
         * 문서번호 중복 방지
        */
        List<String> userEmailList = UserInfo.getUserEmail().split('@');
        this.corpNum 																	= '1234567890';
        this.Taxinvoice																	= new Taxinvoice();
        this.Taxinvoice.forceissue					                					= true;
        this.Taxinvoice.writeDate                                                   	= String.valueOf(Date.toDay()).subString(0,10).replace('-', '');
        this.Taxinvoice.chargeDirection                                               	= '정과금';
        this.Taxinvoice.issueType                                                     	= '정발행';
        this.Taxinvoice.purposeType                                                   	= '영수';
        this.Taxinvoice.taxType                                                       	= '과세';
        this.Taxinvoice.invoicerCorpNum                                               	= '1234567890';
      
        this.Taxinvoice.invoicerMgtKey                                                	= order.Name__c + userEmailList[0].replace('.', '');
        this.Taxinvoice.invoicerTaxRegID                                              	= '';
        this.Taxinvoice.invoicerCorpName                                              	= 'DKBMC'; // Custom Setting
        this.Taxinvoice.invoicerCEOName                                               	= '배창욱'; // Custom Setting
        this.Taxinvoice.invoicerAddr                                                  	= '서울 강남구 봉은사로 434 3층'; //Custom Setting
        this.Taxinvoice.invoicerBizClass                                              	= '판매'; //Custom Setting
        this.Taxinvoice.invoicerBizType                                               	= 'IT'; //Custom Setting
        this.Taxinvoice.invoicerContactName                                           	= '서일태'; //Custom Setting
        this.Taxinvoice.invoicerTEL                                                   	= '010-4915-7565'; //Custom Setting
        this.Taxinvoice.invoicerHP                                                    	= '010-4915-7565'; //Custom Setting
        this.Taxinvoice.invoicerEmail                                                 	= 'iltae.seo@dkbmc.com'; //Custom Setting
        this.Taxinvoice.invoicerSMSSendYN                                             	= 'false'; // 문자발송여부
        /**
         * 공급받는 자
        */
        this.Taxinvoice.invoiceeType                                                  	= '사업자'; 
        this.Taxinvoice.invoiceeCorpNum                                               	= order.Account.AccountNumber; 
        //this.Taxinvoice.invoiceeMgtKey                                                	= order.Name__c + String.valueOf(Integer.valueof((math.random() * 10000)));
        this.Taxinvoice.invoiceeTaxRegID                                              	= '';
        this.Taxinvoice.invoiceeCorpName                                              	= order.Account.Name; 
        this.Taxinvoice.invoiceeCEOName                                               	= order.Account.CEO__c; 
        this.Taxinvoice.invoiceeAddr                                                  	= order.Account.JUSO__c;
        this.Taxinvoice.invoiceeBizClass                                              	= order.Account.Stock__c;
        this.Taxinvoice.invoiceeBizType                                               	= order.Account.Industry;
        this.Taxinvoice.invoiceeContactName1                                          	= order.Account.Manager__c; 
        this.Taxinvoice.invoiceeTEL1                                                  	= order.Account.Phone;
        this.Taxinvoice.invoiceeHP1                                                   	= order.Account.Phone;
        this.Taxinvoice.invoiceeEmail1                                                	= order.Account.ManagerEmail__c; 
        this.Taxinvoice.invoiceeSMSSendYN                                             	= false; 
        this.Taxinvoice.supplyCostTotal                                               	= String.valueOf(order.TotalAmount - (order.TotalAmount / 100 * 10) ); 
        this.Taxinvoice.taxTotal                                                      	= String.valueOf( (order.TotalAmount / 100) * 10 ); 
        this.Taxinvoice.totalAmount                                                   	= String.valueOf(order.TotalAmount);
        this.Taxinvoice.serialNum                                                     	= '';	
        this.Taxinvoice.cash                                                          	= ''; 
        this.Taxinvoice.chkBill                                                       	= '';
        this.Taxinvoice.note                                                          	= '';
        this.Taxinvoice.credit                                                        	= '';
        this.Taxinvoice.remark1                                                       	= '';
        this.Taxinvoice.remark2                                                       	= '';
        this.Taxinvoice.remark3                                                       	= '';
        this.Taxinvoice.kwon                                                          	= '';
        this.Taxinvoice.ho                                                            	= '';
        this.Taxinvoice.businessLicenseYN                                             	= false;
        this.Taxinvoice.bankBookYN                                                    	= false;
        this.Taxinvoice.detailList 														= detailList;
        this.Taxinvoice.modifyCode														= '';
        this.Taxinvoice.orgNTSConfirmNum												= '';
        this.Taxinvoice.addContactList													= addContactList;
        this.writespecification															= false;
        this.memo																		= '';
        this.dealInvoiceKey																= '';
        this.emailSubject																= '';
        this.mgtKey																		= order.Name__c + userEmailList[0].replace('.', '');
        this.keyType																	= 'SELL';
    }
    @AuraEnabled
    public String accountId {get;set;}
	@AuraEnabled
    public String opportunityId {get;set;}
	@AuraEnabled
    public String corpNum {get;set;}
	@AuraEnabled
    public Taxinvoice Taxinvoice {get;set;}
	@AuraEnabled
    public Boolean writespecification {get;set;}
	@AuraEnabled
    public String memo {get;set;}
	@AuraEnabled
    public String dealInvoiceKey {get;set;}
	@AuraEnabled
    public String emailSubject {get;set;}
	@AuraEnabled
    public String mgtKey {get;set;}
	@AuraEnabled
    public String keyType {get;set;}

	public class AddContactList {
		@AuraEnabled
        public Integer serialNum {get;set;}
		@AuraEnabled
        public String contactName {get;set;}
		@AuraEnabled
        public String email {get;set;}
	}

	public class DetailList {
		@AuraEnabled
        public Integer serialNum {get;set;}
		@AuraEnabled
        public String purchaseDT {get;set;}
		@AuraEnabled
        public String itemName {get;set;}
		@AuraEnabled
        public String spec {get;set;}
		@AuraEnabled
        public String qty {get;set;}
        @AuraEnabled
		public String unitCost {get;set;}
        @AuraEnabled
		public String supplyCost {get;set;}
        @AuraEnabled
		public String tax {get;set;}
        @AuraEnabled
		public String remark {get;set;}
	}

	public class Taxinvoice {
        @AuraEnabled
		public Boolean forceissue {get;set;}
        @AuraEnabled
		public String writeDate {get;set;}
        @AuraEnabled
		public String chargeDirection {get;set;}
        @AuraEnabled
		public String issueType {get;set;}
		@AuraEnabled
        public String purposeType {get;set;}
		@AuraEnabled
        public String taxType {get;set;}
		@AuraEnabled
        public String invoicerCorpNum {get;set;}
		@AuraEnabled
        public String invoicerMgtKey {get;set;}
		@AuraEnabled
        public String invoicerTaxRegID {get;set;}
		@AuraEnabled
        public String invoicerCorpName {get;set;}
		@AuraEnabled
        public String invoicerCEOName {get;set;}
		@AuraEnabled
        public String invoicerAddr {get;set;}
        @AuraEnabled
		public String invoicerBizClass {get;set;}
        @AuraEnabled
		public String invoicerBizType {get;set;}
        @AuraEnabled
		public String invoicerContactName {get;set;}
        @AuraEnabled
		public String invoicerTEL {get;set;}
        @AuraEnabled
		public String invoicerHP {get;set;}
        @AuraEnabled
		public String invoicerEmail {get;set;}
        @AuraEnabled
		public String invoicerSMSSendYN {get;set;}
        @AuraEnabled
		public String invoiceeType {get;set;}
        @AuraEnabled
		public String invoiceeCorpNum {get;set;}
        @AuraEnabled
		public String invoiceeMgtKey {get;set;}
        @AuraEnabled
		public String invoiceeTaxRegID {get;set;}
        @AuraEnabled
		public String invoiceeCorpName {get;set;}
        @AuraEnabled
		public String invoiceeCEOName {get;set;}
        @AuraEnabled
		public String invoiceeAddr {get;set;}
        @AuraEnabled
		public String invoiceeBizClass {get;set;}
        @AuraEnabled
		public String invoiceeBizType {get;set;}
        @AuraEnabled
		public String invoiceeContactName1 {get;set;}
        @AuraEnabled
		public String invoiceeTEL1 {get;set;}
        @AuraEnabled
		public String invoiceeHP1 {get;set;}
        @AuraEnabled
		public String invoiceeEmail1 {get;set;}
        @AuraEnabled
		public Boolean invoiceeSMSSendYN {get;set;}
        @AuraEnabled
		public String supplyCostTotal {get;set;}
        @AuraEnabled
		public String taxTotal {get;set;}
        @AuraEnabled
		public String totalAmount {get;set;}
        @AuraEnabled
		public String serialNum {get;set;}
        @AuraEnabled
		public String cash {get;set;}
        @AuraEnabled
		public String chkBill {get;set;}
        @AuraEnabled
		public String note {get;set;}
        @AuraEnabled
		public String credit {get;set;}
        @AuraEnabled
		public String remark1 {get;set;}
        @AuraEnabled
		public String remark2 {get;set;}
        @AuraEnabled
		public String remark3 {get;set;}
        @AuraEnabled
		public String kwon {get;set;}
        @AuraEnabled
		public String ho {get;set;}
        @AuraEnabled
		public Boolean businessLicenseYN {get;set;}
        @AuraEnabled
		public Boolean bankBookYN {get;set;}
        @AuraEnabled
		public List<DetailList> detailList {get;set;}
        @AuraEnabled
		public String modifyCode {get;set;}
        @AuraEnabled
		public String orgNTSConfirmNum {get;set;}
        @AuraEnabled
		public List<AddContactList> addContactList {get;set;}
	}
}