import { LightningElement, api, track,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';
import { CurrentPageReference } from 'lightning/navigation';

// LMC
import PageLMC    from '@salesforce/messageChannel/pageLMC__c';
import {MessageContext, publish} from 'lightning/messageService';
// APEX
import apexDeleted from '@salesforce/apex/PopbillController.deleted';
export default class TaxBillDeletedModalcmp extends LightningElement {
    @api recordId;
    @track isSpinner = false;

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        if (currentPageReference) {
            this.recordId = currentPageReference.state.recordId; 
        }
    }

    /**
     * LMC
    */
    @wire(MessageContext)
    messageContext;

    /**
     * 발행 삭제 Button
    */
    handleDelete() {
        this.isSpinner = true;
        apexDeleted({recordId : this.recordId })
        .then(result => {
            if(result ==='S') {
                this.publish(this.recordId);
                this.dispatchEvent(new CloseActionScreenEvent());
                this.showToast('발행 삭제', '성공', 'success');
            } else {
                this.showToast('발행 삭제', result, 'error');
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