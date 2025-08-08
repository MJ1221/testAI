/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 01-03-2024
 * @last modified by  : minju.park@dkbmc.com
**/
import { LightningElement, api } from 'lwc';

export default class Button extends LightningElement {
    @api label;
    @api icon;

    handleButton(event) {
      this.dispatchEvent(new CustomEvent('buttonclick',{
        // bubbles: true
      }));
    }
}