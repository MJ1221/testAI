/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 01-10-2024
 * @last modified by  : minju.park@dkbmc.com
**/
import { LightningElement, api } from 'lwc';

export default class BsnsHome extends LightningElement {

@api recordId; 

connectedCallback() {
    this.setCustomStyle();
}
setCustomStyle() {
    const style = document.createElement('style');
    style.setAttribute('id', 'homePage');
    style.innerText = 
        `
        article.slds-card {
            height: 100%
        }
          }
        `;
    document.body.appendChild(style);
}

disconnectedCallback() {
const target = document.body.querySelector("style[id='homePage']");
target.remove();
}
}