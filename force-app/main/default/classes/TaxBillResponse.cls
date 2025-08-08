public class TaxBillResponse {
    public GetInfo getInfo {get;set;}
	public GetDetailInfo getDetailInfo {get;set;}
   
	public class GetInfo {
		public String ntsconfirmNum {get;set;}
		public String invoiceeCorpNum {get;set;}
		public String issueType {get;set;}
		public String invoicerMgtKey {get;set;}
		public String invoicerCorpNum {get;set;}
		public String issueDT {get;set;}
		public Boolean interOPYN {get;set;}
		public String itemKey {get;set;}
		public Integer stateCode {get;set;}
		public String regDT {get;set;}
		public Boolean lateIssueYN {get;set;}
		public String stateDT {get;set;}
		public String writeDate {get;set;}
		public Boolean openYN {get;set;}
		public String taxType {get;set;}
		public String invoicerCorpName {get;set;}
		public Boolean invoicerPrintYN {get;set;}
		public String invoiceeCorpName {get;set;}
		public Boolean invoiceePrintYN {get;set;}
		public Boolean trusteePrintYN {get;set;}
		public String taxTotal {get;set;}
		public String supplyCostTotal {get;set;}
		public String purposeType {get;set;}
	}
    
	public class GetDetailInfo {
        public Boolean writeSpecification {get;set;}
		public String writeDate {get;set;}
		public String chargeDirection {get;set;}
		public String issueType {get;set;}
		public String issueTiming {get;set;}
		public String taxType {get;set;}
		public String invoicerCorpNum {get;set;}
		public String invoicerMgtKey {get;set;}
		public String invoicerCorpName {get;set;}
		public String invoicerCEOName {get;set;}
		public String invoicerAddr {get;set;}
		public String invoicerBizClass {get;set;}
		public String invoicerBizType {get;set;}
		public String invoicerContactName {get;set;}
		public String invoicerTEL {get;set;}
		public String invoicerHP {get;set;}
		public String invoicerEmail {get;set;}
		public Boolean invoicerSMSSendYN {get;set;}
		public String invoiceeCorpNum {get;set;}
		public String invoiceeType {get;set;}
		public String invoiceeCorpName {get;set;}
		public String invoiceeCEOName {get;set;}
		public String invoiceeAddr {get;set;}
		public String invoiceeBizType {get;set;}
		public String invoiceeBizClass {get;set;}
		public String invoiceeContactName1 {get;set;}
		public String invoiceeTEL1 {get;set;}
		public String invoiceeHP1 {get;set;}
		public String invoiceeEmail1 {get;set;}
		public Boolean invoiceeSMSSendYN {get;set;}
		public Boolean trusteeSMSSendYN {get;set;}
		public String taxTotal {get;set;}
		public String supplyCostTotal {get;set;}
		public String totalAmount {get;set;}
		public String purposeType {get;set;}
		public String serialNum {get;set;}
		public String remark1 {get;set;}
		public String remark2 {get;set;}
		public String remark3 {get;set;}
		public Boolean businessLicenseYN {get;set;}
		public Boolean bankBookYN {get;set;}
		public Boolean faxsendYN {get;set;}
		public String ntsconfirmNum {get;set;}
		public List<DetailList> detailList {get;set;}
		public List<AddContactList> addContactList {get;set;}
	}
    
	public class AddContactList {
		public Integer serialNum {get;set;}
		public String email {get;set;}
		public String contactName {get;set;}
	}
    
	public class DetailList {
		public Integer serialNum {get;set;}
		public String purchaseDT {get;set;}
		public String itemName {get;set;}
		public String spec {get;set;}
		public String qty {get;set;}
		public String unitCost {get;set;}
		public String supplyCost {get;set;}
		public String tax {get;set;}
		public String remark {get;set;}
	}

}