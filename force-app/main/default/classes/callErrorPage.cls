/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 05-10-2024
 * @last modified by  : minju.park@dkbmc.com
**/
public with sharing class callErrorPage {
    PageReference callError() {
        PageReference pr = new PageReference('/apex/errorPage');
        
       
      
        return pr;
    }
}