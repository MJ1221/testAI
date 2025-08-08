/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 01-03-2024
 * @last modified by  : minju.park@dkbmc.com
**/
import { LightningElement, api } from 'lwc';

export default class Numerator extends LightningElement {

    // @api counter = 0;

    _currentCount = 0;
    priorCount = 0;
    @api

    get counter() {
      return this._currentCount;
    }
    
    set counter(value) {
      this.priorCount = this._currentCount;
      this._currentCount = value;
    }

    handleIncrement() {
      this.counter++;
    }

    handleDecrement() {
      this.counter--;
    }

    handleMultiply(event) {
        const factor = event.detail;
        console.log('factor.numerator===>',factor);
        this.counter *= factor;
        console.log('counter.numerator===>',this.counter);
    }

    @api
    maximizeCounter() {
      this.counter += 1000000;
    }
}