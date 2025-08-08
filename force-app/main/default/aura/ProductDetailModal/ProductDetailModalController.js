/**
 * @description       : 
 * @author            : hayoon.jung@dkbmc.com
 * @group             : 
 * @last modified on  : 12-11-2023
 * @last modified by  : hayoon.jung@dkbmc.com
**/
({
    doInit : function(component, event, helper) {
        console.log('ProductDetailModal - doInit >>>>> ');
        console.log('prodId ::: ', component.get('v.prodId'));
        console.log('prodAmount ::: ', component.get('v.prodAmount'));
        console.log('prodCurrency ::: ', component.get('v.prodCurrency'));
    },
    
    handleLoad : function(component, event, helper) {
        console.log('handleLoad >>>>> ');
        component.set('v.isLoading', false);
    },

    handleOrderChange : function(component, event, helper) {
        console.log('handleOrderChange >>>>> ');
        console.log('event value ::: ', event.getParam('value'));

        if(component.get('v.prodAmount') >= event.getParam('value')) {
            component.set('v.resultAmount', event.getParam('value'));
            component.set('v.resultCurrency', component.get('v.resultAmount') * component.get('v.prodCurrency'));
        } else {
            helper._showMyToast('warning', '보유 수량 이상은 주문할 수 없습니다.');
            component.set('v.resultAmount', '');
            component.set('v.resultCurrency', 0);
        }
        console.log('resultAmount ::: ', component.get('v.resultAmount'));
        console.log('resultCurrency ::: ', component.get('v.resultCurrency'));
    },

    handleAdd: function(component, event, helper) {
        console.log('handleAdd >>>>> ');
        console.log('resultAmount ::: ', component.get('v.resultAmount'));

        if(component.get('v.resultAmount') == '' || component.get('v.resultAmount') == undefined) { component.set('v.resultAmount', 0); }
        if(component.get('v.resultAmount') < component.get('v.prodAmount')) {
            component.set('v.resultAmount', component.get('v.resultAmount') + 1);
            component.set('v.resultCurrency', component.get('v.resultAmount') * component.get('v.prodCurrency'));
        } else {
            helper._showMyToast('warning', '보유 수량 이상은 주문할 수 없습니다.');
            component.set('v.resultAmount', '');
            component.set('v.resultCurrency', 0);
        }
        console.log('resultAmount ::: ', component.get('v.resultAmount'));
        console.log('resultCurrency ::: ', component.get('v.resultCurrency'));
    },

    handleMinus: function(component, event, helper) {
        console.log('handleMinus >>>>> ');
        if(component.get('v.resultAmount') > 1) {
            component.set('v.resultAmount', component.get('v.resultAmount') - 1);
            component.set('v.resultCurrency', component.get('v.resultAmount') * component.get('v.prodCurrency'));
        } else {
            helper._showMyToast('warning', '0개는 주문할 수 없습니다.');
            component.set('v.resultAmount', '');
            component.set('v.resultCurrency', 0);
        }
        console.log('resultAmount ::: ', component.get('v.resultAmount'));
        console.log('resultCurrency ::: ', component.get('v.resultCurrency'));
    },

    handleClose: function(component, event, helper) {
        console.log('handleClose >>>>> ');

        component.set('v.resultAmount', '');
        component.set('v.resultCurrency', 0);
        component.find('overlayLib').notifyClose();
    },

    handleOrder: function(component, event, helper) {
        console.log('handleOrder >>>>> ');

        console.log('resultAmount ::: ', component.get('v.resultAmount'));
        helper.saveOrder(component);
    },
})