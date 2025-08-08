/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 07-23-2024
 * @last modified by  : minju.park@dkbmc.com
**/
import { LightningElement, track } from 'lwc';
import Id from "@salesforce/user/Id";
export default class LWCCookies extends LightningElement {
    @track cookieName = "techdicerCookie";
    @track cookieVal = [];
    @track isShowModal = true;
    userId = Id;
    connectedCallback() {
        this.getCookie();
    }
 
    handleCookieCreate(){
        var value = this.userId;
        this.createCookie(this.cookieName, value, 1);
    }
 
    createCookie(name, value, days) {
        console.log('days>>>',days);
        var expires;
        if (days) {
            var d = new Date();
            d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            console.log('expires>>>',expires);

        } else {
            expires = "";
        }
 
        document.cookie = name + "=" + value + expires + "; path=/";
        console.log('document.cookie>>>',document.cookie);

    }
 
    getCookie() {
        var tr = this.retriveCookie();
        console.log('getCookie>>>',tr);
        if(tr != ''){
            this.cookieVal = tr;
        } else{
            this.cookieVal = [];
        }
         
        console.log('cookieVal>>>',JSON.stringify(this.cookieVal));
    }
 
    retriveCookie(){
        var cookieString = "; " + document.cookie;
        console.log('cookieString>>>',JSON.stringify(cookieString));
        var parts = cookieString.split("; " + this.cookieName + "=");
        console.log('parts>>>',JSON.stringify(parts));
        var decode = decodeURIComponent(parts.pop().split(";").shift());
        console.log('decode>>>',decode);
        return decode;
    }
 
    deleteCookie() {
       this.createCookie(this.cookieName, '', null);
    }

    setCookie(cookieName, cookieValue, expirationDays) {
        var d = new Date();
        d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    }

    closeCookie(){
        this.isShowModal = false;
    }
}