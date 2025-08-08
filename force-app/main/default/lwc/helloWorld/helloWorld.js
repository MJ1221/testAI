/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 01-03-2024
 * @last modified by  : minju.park@dkbmc.com
**/
import { LightningElement } from 'lwc';
export default class HelloWorld extends LightningElement {
  greeting = 'World';
  changeHandler(event) {
    this.greeting = event.target.value;
  }
}