/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 04-04-2024
 * @last modified by  : minju.park@dkbmc.com
**/
({

    getOrderList: function(cmp,helper) {
        console.log('getOrderList >>>>> ');
        var searchOrderName = cmp.get("v.searchOrderName");
        var searchProductName = cmp.get("v.searchProductName");
        var searchOrderDate = cmp.get("v.searchOrderDate");
        var selectedStatus = cmp.get("v.selectedStatus");
        var isCheck = cmp.get("v.isCheck");

        window.console.log('searchOrderName : ', searchOrderName);
        window.console.log('searchProductName : ', searchProductName);
        window.console.log('searchOrderDate : ', searchOrderDate);
        window.console.log('selectedStatus : ', selectedStatus);
        window.console.log('isCheck : ', isCheck);

        console.log('helepr.Name',searchProductName );

        this._apex(cmp, 'ordList', { searchOrderName: searchOrderName, searchProductName: searchProductName, searchOrderDate: searchOrderDate, isCheck: isCheck, selectedStatus: selectedStatus }).then(result => 
            {
            console.log('result ===> ', result);
            cmp.set("v.data", result);
        }).catch(error => {
            console.log('error ===> ', JSON.stringify(error));
        });

        // cmp.set('v.isEdit', true);
    },

    _apex: function(cmp, apexAction, params) {
        return new Promise($A.getCallback(function(resolve, reject) {
            var action = cmp.get('c.' + apexAction + '');
            action.setParams(params);
            action.setCallback(this, function(callbackResult) {
                if (callbackResult.getState() == 'SUCCESS') {
                    resolve(callbackResult.getReturnValue());
                }
                if (callbackResult.getState() == 'ERROR') {
                    console.log('ERROR', callbackResult.getError());
                    reject(callbackResult.getError());
                }
            });
            $A.enqueueAction(action);
        }));
    },
    
    getPicklistValues: function(cmp) {
        console.log('getPicklistValueshelper-=---->');
        console.log('getPicklistValueshelper-=---->', cmp);
        this._apex(cmp, 'getPicklistValues', {}).then(result => {
            if (Array.isArray(result)) {
                console.log('Picklist values:', result);
                cmp.set("v.statusOptions", result);
                console.log('get statusOptions===>', cmp.get('v.statusOptions'));
            } else {
                console.error('Invalid result format:', result);
            }
        }).catch(error => {
            console.error('getPicklistValues - error:', error);
        });
    },

    updateOrderList: function(cmp, updatedOrder) {
        var ordList = cmp.get('v.data');
        cmp.set('v.data', ordList);
        console.log('updatedOrder...helper===>',updatedOrder);
        this._apex(cmp, 'updateList', { 'orders': [updatedOrder] }).then(result => {
            console.log('updateList---> result', result);
            if (result == 'SUCCESS') {
                console.log('SUCCESS');
            } else {
                console.log('Update failed');
            }
        }).catch(error => {
            console.log('error ::: ', error);
        });
    },
            // var ordList = cmp.get('v.data');
            // console.log('ordList====>', ordList);
            // this._apex(cmp, 'ordList', {updatedOrder: updatedOrder}).then(result => {
            //     console.log('result ::: ', result);
            //     cmp.set("v.data", result);
            // }).catch(error => {
            //     console.log('error ===> ', JSON.stringify(error));
            // });
           
    
    // },
    // getEditList : function(cmp){
    //     console.log("Helper : getEditList==>");

    //     this._apex(cmp,'getEditList',{
            
    //     })
    // },


    // getDelId : function(cmp, event) {
    //     this._apex(cmp, 'getDelId', {'clickId' : cmp.get('v.clickedValues')[0]}).then(result => {
    //         console.log('getDelId - result ::: ', cmp.get('v.clickedValues'));
    //         cmp.set('v.data', result);
    //     }).catch(error => {
    //         console.log('getDelId - error ::: ', error);
    //     });
    // },   
});