/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 01-03-2024
 * @last modified by  : minju.park@dkbmc.com
**/
import { LightningElement } from 'lwc';

export default class Augmentor extends LightningElement {

    startCounter = 0;

    handleStartChange(event) {
      this.startCounter = parseInt(event.target.value, 10);
    }

    handleMaximizeCounter() {
        this.template.querySelector('c-numerator').maximizeCounter();
      }
}