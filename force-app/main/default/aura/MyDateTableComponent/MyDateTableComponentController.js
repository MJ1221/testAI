({
    doInit : function(component, event, helper) {
        component.set("v.columns", [
            {label:"First Name", fieldName: "FirstName" , type:"text", sortable:true},
            {label:"Last Name", fieldName: "LastName" , type:"text", sortable:true},
            {label:"Email", fieldName: "Email" , type:"email", sortable:true}
        ]);

        component.set("v.data", [
            {"id":1, "FirstName":"Tony", "LastName":"Stark", "Email":"TonyStark@gmail.com"},
            {"id":2, "FirstName":"Bruce", "LastName":"Banner", "Email":"BruceBanner@gmail.com"},
            {"id":3, "FirstName":"Steve", "LastName":"Rogers", "Email":"SteveRogers@gmail.com"}
        ]);
    },
    handleSort: function (cmp, event, helper) {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        // assign the latest attribute with the sorted column fieldName and sorted direction
        cmp.set("v.sortedBy", fieldName);
        cmp.set("v.sortedDirection", sortDirection);
        helper.sortData(cmp, fieldName, sortDirection);
    }
})