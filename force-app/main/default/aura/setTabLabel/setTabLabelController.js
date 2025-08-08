({
  fnCancel : function(component, event, helper) {
      // Increase the count of button clicks
      var clickCount = component.get("v.clickCount") || 0;
      clickCount++;
      component.set("v.clickCount", clickCount);
      
      // Dynamically create a new Lightning button component
      $A.createComponent(
          "lightning:button",
          {
              "label": "New Button " + clickCount,
              "class": "slds-button naviBack btn_naviClose",
              "onclick": component.getReference("c.fnCancel")
          },
          function(newButton, status, errorMessage){
              // Add the new button to the component's body
              if (status === "SUCCESS") {
                  var buttonContainer = component.find("buttonContainer");
                  var body = buttonContainer.get("v.body") || [];
                  body.push(newButton);
                  buttonContainer.set("v.body", body);
              }
              else if (status === "INCOMPLETE") {
                  console.log("No response from server or client is offline.")
              }
              else if (status === "ERROR") {
                  console.log("Error: " + errorMessage);
              }
          }
      );
  }
})