/**
 * @description       : 
 * @author            : hayoon.jung@dkbmc.com
 * @group             : 
 * @last modified on  : 12-11-2023
 * @last modified by  : hayoon.jung@dkbmc.com
**/
({
    saveOrder : function(component) {
        console.log('saveOrder >>>>> ');

        console.log('prodId ::: ', component.get('v.prodId'));
        console.log('resultAmount ::: ', component.get('v.resultAmount'));

        if(component.get('v.resultAmount') == 0 || component.get('v.resultAmount') == '' || component.get('v.resultAmount') == undefined) {
            this._showMyToast('warning', '주문할 상품의 수량을 선택해주십시오.');
        } else {
            this._apex(component, 'insertOrder', {'prodIdSt' : component.get('v.prodId'), 'amountInt' : component.get('v.resultAmount')}).then(result => {
                console.log('insetOrder - result ::: ', result);
                if(result == 'SUCCESS') {
                    this._showMyToast('success', '주문에 성공했습니다.');
                    component.find('overlayLib').notifyClose();
                } else {
                    this._showMyToast('warning', '주문에 실패했습니다.');    
                }
            }).catch(error => {
                console.log('error ::: ', error);
                this._showMyToast('warning', '주문에 실패했습니다.');
            });
        }
    },

    _apex : function(component, apexAction, params){
        return new Promise( $A.getCallback( function( resolve, reject ) {
            var action = component.get('c.'+apexAction+'');
            action.setParams( params );
            action.setCallback( this, function(callbackResult) {
                if(callbackResult.getState()=='SUCCESS') {
                    resolve( callbackResult.getReturnValue() );
                }
                if(callbackResult.getState()=='ERROR') {
                    console.log('ERROR', callbackResult.getError() ); 
                    reject( callbackResult.getError() );
                }
            });
            $A.enqueueAction( action );
        }));
    },

    _showMyToast : function(type, msg) {
        var toastEvent = $A.get('e.force:showToast');
        toastEvent.setParams({
            type : type,
            duration : 3000,
            mode : 'dismissible',
            message : msg
        });
        toastEvent.fire();
    }
})