/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 01-16-2024
 * @last modified by  : minju.park@dkbmc.com
**/
import { LightningElement, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
const fields = [NAME_FIELD];
export default class Selector extends LightningElement {
  selectedProductId;
  handleProductSelected(evt) {
    this.selectedProductId = evt.detail;
  }
  userId = Id;
  @wire(getRecord, { recordId: '$userId', fields })
  user;
  get name() {
    return getFieldValue(this.user.data, NAME_FIELD);
  }
}