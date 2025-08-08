/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 10-29-2024
 * @last modified by  : minju.park@dkbmc.com
**/
({
    fetchData: function (cmp, fetchData, numberOfRecords) {
        var latitude;
        var longitude;
    
        function errorCallback(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
            helper.showToast("warning", "위치설정을 해주세요.");
        }
    
        function successCallback(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            console.log('location>>',latitude,longitude);
    
            fetchData.address = {
                type: function () {
                    return {
                        latitude: latitude,
                        longitude: longitude
                    };
                }
            };
        }
    
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    
        fetchData.confidence = {
            type: function () {
                return Math.round(Math.random() * 100) + "%";
            }
        };
    
        // Uncomment this if you have a data fetching library and are mocking data
        // dataPromise = this.mockdataLibrary.lightningMockDataFaker(fetchData, numberOfRecords);
        // dataPromise.then(function(results) {
        //     cmp.set('v.data', results);
        // });
    },
    
    showToast: function(type, message) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type": type,
            "message": message
        });
        toastEvent.fire();
    }
    
})