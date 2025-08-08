import { LightningElement, api, track,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';
import { CurrentPageReference } from 'lightning/navigation';

// LMC
import PageLMC    from '@salesforce/messageChannel/pageLMC__c';
import {MessageContext, publish} from 'lightning/messageService';
// APEX
import apexRegistIssue from '@salesforce/apex/PopbillController.registIssue';
import apexInit from '@salesforce/apex/PopbillController.init';
export default class TaxBillModalcmp extends LightningElement {
    @api recordId;
  
    @track isSpinner = true;
    @track _initData = null;
    /**
     * 공급받는자 상호
    */
    invoiceeCorpName = '';
    /**
     * 공급받는자 대표자 성명
    */
    invoiceeCEOName='';
    /**
     * 공급받는자 주소
    */
    invoiceeAddr = '';
    /**
     * 공급받는자 업태
    */
    invoiceeBizClass = '';
    /**
     * 공급받는자 종목
    */
    invoiceeBizType = '';
    /**
     * 공급받는자 이메일
    */
    invoiceeEmail1 ='';
    /**
     * 작성일자
    */
    writeDate ='';
    /**
     * 공급가액
    */
    supplyCostTotal ='';
    /**
     * 세액
    */
    taxTotal ='';
    /**
     * 합계 금액
    */
    totalAmount ='';
    /**
     * 제품 목록
    */
    detailList =[];
    /**
     * currentPageReference
    */
    currentPageReference =null

    /**
     * LMC
    */
    @wire(MessageContext)
    messageContext;
    
    /**
     * getStateParameters
    */
    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        if (currentPageReference) {
            this.recordId = currentPageReference.state.recordId; 
        }
    }

    /**
     * spinner publish 
     * 
    */
    publish(recordId) {
        let messagePush = {
            message : 'Refresh',
            recordId : recordId
        }
        publish(this.messageContext, PageLMC, messagePush);
    }

    connectedCallback() {
       this.isSpinner = true;
       this.init();
       this.isSpinner = false;
    }
    
    /**
     * 발행 전 정보
    */
    init() {
        apexInit({recordId : this.recordId })
        .then(result => {
            this._initData = result;
            this.invoiceeCorpName      = result['Taxinvoice'].invoiceeCorpName;
            this.invoiceeCEOName       = result['Taxinvoice'].invoiceeCEOName;
            this.invoiceeAddr          = result['Taxinvoice'].invoiceeAddr;
            this.invoiceeBizClass      = result['Taxinvoice'].invoiceeBizClass;
            this.invoiceeBizType       = result['Taxinvoice'].invoiceeBizType;
            this.invoiceeEmail1        = result['Taxinvoice'].invoiceeEmail1;
            this.writeDate             = result['Taxinvoice'].writeDate;
            this.supplyCostTotal       = result['Taxinvoice'].supplyCostTotal;
            this.taxTotal              = result['Taxinvoice'].taxTotal;
            this.totalAmount           = result['Taxinvoice'].totalAmount;
            this.detailList            = result['Taxinvoice'].detailList;
        })
    }

    /**
     * 발행 Button
    */
    handleSaveClick() {
        this.isSpinner = true;
        apexRegistIssue({recordId : this.recordId })
        .then(result => {
            this.publish(this.recordId);
            if(result.res ==='S') {
                this.showToast('발행 성공', '성공', 'success');
                this.dispatchEvent(new CloseActionScreenEvent());
            } else {
                this.showToast('발행 실패', result.res, 'error');    
            }
        }).catch((error) => {
            this.showToast('실패', error.body.message, 'error');
        });
        this.isSpinner = false;
    }

    /**
     * 취소 Button
    */
    handleCloseClick() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }
    
    /**
     * ShowToast
     * @param {string} title 
     * @param {string} msg 
     * @param {string} variant 
     */
    showToast(title, msg, variant) {
        const event = new ShowToastEvent({
            title : title
            , message : msg
            , variant : variant
        });
        this.dispatchEvent(event);
    } 
}