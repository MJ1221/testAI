/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 04-04-2024
 * @last modified by  : minju.park@dkbmc.com
**/
({
    
    init: function (cmp, helper) {
        helper.getOrderList(cmp,helper);
        helper.getPicklistValues(cmp,helper);
    },

    handleClose : function(cmp){
        cmp.set('v.isModal', false);
    },

    handleRowClick : function(cmp, event) {
        console.log('handleRowClick >>>>> ');

        console.log('event.target.dataset ::: ', event.target.dataset);
        console.log('event.target.dataset.index ::: ', event.target.dataset.index);
        console.log('event.target.dataset.prodid ::: ', event.target.dataset.prodid);
        console.log('evnet.target.dataset.prodid.Status__c=====>', event.target.dataset.value);
    
        cmp.set('v.orderId', event.target.dataset.prodid);
        cmp.set('v.isModal', true);
        // var editAmount = event.target.dataset.amount;
        // cmp.set('v.editAfterAmount',editAmount);
        // console.log('rowclick====>', cmp.get('v.editAfterAmount'));
        
        if(event.target.dataset.value === '주문 완료'){
            cmp.set('v.editAmount',true);
            // console.log('get true===>',cmp.get('v.editAmount'));
        } else{
            cmp.set('v.editAmount',false);
            // console.log('get false===>',cmp.get('v.editAmount'));
        }
 
    },

    handleSearch: function(cmp, event, helper) {
        
        helper.getOrderList(cmp);
    },


    handleCheckboxChange: function(cmp, event, helper) {
        var isCheck = event.getSource().get('v.checked');
        console.log(isCheck);
    
        helper.getOrderList(cmp);
    },
    

    handleStatus: function (cmp, event){

        cmp.set('v.selectedStatus',event.getParam('value'));
        console.log('v.selectedStatus===>',cmp.get('v.selectedStatus'));
    },

    handleModalSave: function(cmp,  helper) {
        console.log('modalSave===>');
        cmp.set('v.isModal', false);
    
        var orderId = cmp.get('v.orderId');
        console.log('orderId===>',orderId);
        var updatedAmount = cmp.find('amountEdit').get('v.value');
        console.log('updatedAmount===>',updatedAmount);
        var updatedIsActive = cmp.get('v.boolChange');
        console.log('updatedIsActive===>',updatedIsActive);
    
        var updatedOrder = {
            Id: orderId,
            Amount__c: updatedAmount,
            isActive__c: updatedIsActive
        };
        console.log('updateOrder===>',JSON.stringify(updatedOrder));
    
        helper.updateOrderList(cmp, updatedOrder);
    },

    changeAmount: function(cmp, event){
        // console.log('event.getSource====>',event.getSource().get('v.value'));
        var editAmountValue = event.getSource().get('v.value');
        console.log('editAmountValue==>',editAmountValue);
        cmp.set('v.editAfterAmount',editAmountValue);
        console.log('v.editAmountValue===>',cmp.get('v.editAfterAmount'));
    
    },

    changeActive: function(cmp){
        // console.log('get id.value===>',event.getSource().get('v.checked'));
        // console.log('cmp.get.value', cmp.get('v.checked'));
        // console.log('vent.target.value===>', event.target.checked );
        console.log('find===>',cmp.find('activeCheck').get('v.value'));
        
        var editisAcvieBool = cmp.find('activeCheck').get('v.value');
        console.log('find===>',editisAcvieBool);
        cmp.set('v.boolChange',editisAcvieBool);
        console.log('v.boolChange===>',cmp.get('v.boolChange'));
    },

    handleReset : function(cmp, helper){
        cmp.set('v.searchOrderName', '');
        cmp.set('v.searchProductName', '');
        cmp.set('v.searchOrderDate', '');
        cmp.set('v.selectedStatus', '');
        cmp.set('v.isCheck');

        helper.getOrderList(cmp);
    }

    // fnLocation : function(component, event, helper) {
    //     component.set('v.mapSpinner', true);
    //     if ($A.util.isEmpty(component.get('v.mapSrc'))) {
    //         //component.set('v.mapLoading', true);
    //         component.set('v.toggleYN', false);
    //         $A.enqueueAction(component.get('c.fnToggle'));
    //     } else {

    //         if(!component.get("v.toggleYN")){
    //             var vfFrameContainer = component.find('vfFrameContainer');
    //             $A.util.removeClass(vfFrameContainer, "unBlock");
    //             $A.util.addClass(vfFrameContainer, "block");
    //             component.set("v.toggleYN", true);
    //         }

    //         helper.getLocation(component, event, helper);
    //     }
    // },

//     <!--
//     @description       : 
//     @author            : jonggil.kim@dkbmc.com
//     @group             : 
//     @last modified on  : 03-11-2024
//     @last modified by  : minju.park@dkbmc.com
//   -->
//   <apex:page showHeader="false" sidebar="false" standardStylesheets="false" docType="html-5.0" applyHtmlTag="false" applyBodyTag="false" lightningStylesheets="true"
//              >
//       <apex:slds />
//       <apex:form >
//           <style>
//               /* .location_pin {width: 20px; height: 20px; border-radius: 50%; background: #E0205C; position: relative; font-size: 14px; text-align: center;color: #fff;}
//               .location_pin::after {content: ''; position: absolute; bottom: -10px; left: 2px; transform: rotate(180deg); border-bottom: calc( 8px * 1.732 ) solid #E0205C; border-left: 8px solid transparent; border-right: 8px solid transparent;} */
//               .location_pin {width: 20px; height: 20px; border-radius: 50%; background: #E0205C; position: relative; font-size: 14px; text-align: center; color: #fff; border: 1px solid #fff; box-sizing: border-box;}
//               .location_pin::before {content: ''; position: absolute; bottom: -10px; left: 1px; transform: rotate(180deg); border-bottom: calc( 8px * 1.666 ) solid #fff; border-left: 8px solid transparent; border-right: 8px solid transparent; z-index: -1;}
//               .location_pin::after {content: ''; position: absolute; bottom: -9px; left: 2px; transform: rotate(180deg);  border-bottom: calc(7px * 1.732 ) solid #E0205C; border-left: 7px solid transparent; border-right: 7px solid transparent;}
//               .tit {background-color: rgba(0, 0, 0, 0.7); color: #ffffff; font-size: 16px; padding: 3px 10px; border-radius: 90px;}
//               .current_location {width: 30px; height: 30px; position: relative; }
//               .current_location::before {content: ''; width: 30px; height:30px; background: rgba(224, 32, 92, 0.3); border-radius: 90px; position: absolute; top: 15px; left: 0;}
//               .current_location::after {content: ''; width: 12px; height:12px; border: 2px solid #fff; background: rgba(224, 32, 92, 1); border-radius: 90px; position: absolute; bottom:-8px; left:7px;}
//               .slds-scope .slds-checkbox_toggle [type=checkbox]:checked+.slds-checkbox_faux_container .slds-checkbox_faux:after {display: none;}
//               #map_div div {padding: 0px !important;}
//           </style>
//           <script	src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
//           <script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=l7xxecd0658e857f4e81aae8dd3f643f5483"></script>
          
//           <script type="text/javascript">			
//               function initialize() {
//                   // 1. 지도 띄우기
//                   map = new Tmapv2.Map("map_div", {
//                       center: new Tmapv2.LatLng(37.5642135, 127.0016985),
//                       width: "100%",
//                       height: "300px",
//                       zIndexInfoWindow :9999,
//                       zoomControl:false,
//                   });
  
                  
//                   // var message = {
//                   // 	mapInit: 'mapInit' 
                      
//                   // };
                  
//                   // parent.postMessage(message, "*");
//               }
//               window.onload = function() {
//                   initialize();
//               }
//               var result = {};
  
//               var marker_s;
  
  
//               var totalDistance = [];
//               var totalTime = [];
//               var tDistance;
  
//               var new_polyLine = [];
//               var new_Click_polyLine = [];
//               var markerList = [];
//               var pointArray = [];
              
//               var markers = [];
//               var selfMarkers = [];
//               var infoWindows = [];
//               var selfLat;
//               var selfLon;
  
//               var startX;
//               var startY;
//               var endX;
//               var endY;
//               var passList;
              
//               var prtcl;
//               var headers = {};
//               headers["appKey"]="l7xxecd0658e857f4e81aae8dd3f643f5483";
              
//               window.addEventListener("message", function(event) {
//                   if (event.data.result) {
  
//                       console.log('지도 Start');
//                       result = event.data.result;
  
//                       console.log('result Start' , result);
//                       document.getElementById("lineYN").value = 'off';
//                       document.getElementById("chkBox").style.backgroundColor="rgba(174, 174, 174, 1)";
//                       document.getElementById("chkBox").style.borderColor="rgba(174, 174, 174, 1)";
//                       if(event.data.selfLat && event.data.selfLon) {
//                           selfLat = event.data.selfLat;
//                           selfLon = event.data.selfLon;
//                       }
//                       setMap();
  
//                   }
//                   // if((event.data.index).toString()) {
//                   if((event.data.index)) {
//                       if(event.data.lineYNValue) {
//                           document.getElementById("lineYN").value = event.data.lineYNValue;
//                           document.getElementById("chkBox").style.backgroundColor="rgba(224, 32, 92, 1)";
//                           document.getElementById("chkBox").style.borderColor="rgba(224, 32, 92, 1)";
//                       }
//                       var idx = parseInt(event.data.index);
//                       var selfLatitude = event.data.selfLatitude;
//                       var selfLongitude = event.data.selfLongitude;
//                       PTbounds = new Tmapv2.LatLngBounds();
//                       console.log('PTbounds===>',PTbounds);
  
//                       if(markers.length > 0) {
//                           for(i = 0; i < markers.length; i++) {
//                               markers[i].setMap(null);
//                           }
//                           markers = [];
//                       }
//                       if(infoWindows.length > 0) {
//                           for(let b = 0; b < infoWindows.length; b++) {
//                               infoWindows[b].setMap(null);
//                           }
//                           infoWindows = [];
//                       }
  
//                       for(var i = 0; i < new_polyLine.length; i++) {
//                           new_polyLine[i].setMap(null);
//                       }
//                       new_polyLine = [];
//                       addMarker(
//                           "self"
//                           , selfLongitude
//                           , selfLatitude
//                           , idx
//                       );
//                       addMarker(
//                           "llPass"
//                           , result[idx - 1].WorkOrder__r.Longitude
//                           , result[idx - 1].WorkOrder__r.Latitude
//                           , idx
//                       );
  
//                       console.log('result[idx-1]',result[idx - 1]);
//                       let addrNew = result[idx - 1].WorkOrder__r.ADDRESS_NEW__c != undefined ? result[idx - 1].WorkOrder__r.ADDRESS_NEW__c : '' ;
//                       let addrDt = result[idx - 1].WorkOrder__r.ADDRESS_DETAIL__c != undefined ? result[idx - 1].WorkOrder__r.ADDRESS_DETAIL__c : '';
//                       console.log('addrNew,addrDt===>',addrNew, addrDt);
//                       var markerInfo = document.getElementById(idx);
//                       console.log('markerInfo idx===>',markerInfo);
//                       markerInfo.style.display = 'none';
//                           //url => https://apis.openapi.sk.com/tmap/geo/fullAddrGeo?addressFlag=F02&amp;coordType=KATECH&amp;로 변경
//                           //https://apis.openapi.sk.com/tmap/routes?version=1&format=json
//                           //https://apis.openapi.sk.com/tmap/geo/fullAddrGeo?version=1&format=json&callback=result
//                           $.ajax({
//                               method:"POST", 
//                               headers : headers, 
//                               url:"https://apis.openapi.sk.com/tmap/geo/fullAddrGeo?version=1&format=json&callback=result",//
//                               async:true,
//                               // data:{ 
//                               // 	startX : selfLongitude,
//                               // 	startY : selfLatitude,
//                               // 	endX : result[idx - 1].WorkOrder__r.Longitude,
//                               // 	endY : result[idx - 1].WorkOrder__r.Latitude,
//                               // 	// passList : passList,
//                               // 	reqCoordType : "WGS84GEO",
//                               // 	resCoordType : "WGS84GEO",
//                               // 	angle : "172",
//                               // 	searchOption : "0",
//                               // 	trafficInfo : "Y"
//                               // },
//                               data:{
//                                   "coordType" : "WGS84GEO",
//                                   "addressFlag" : 'F02',
//                                   "fullAddr" : addrNew + ' ' + addrDt,
//                               },
//                               success:function(response){
//                                   console.log('response===>',response);
//                                   console.log('lati====>',response.newLat);
//                                   let newLati = response.coordinateInfo.coordinate[0].newLat;
//                                   let newLong = response.coordinateInfo.coordinate[0].newLon;
//                                   console.log('response===>',response.coordinateInfo.coordinate[0].newLat);
//                                   console.log('response===>',response.coordinateInfo.coordinate[0].newLon);
//                                   let coordiList = response.coordinateInfo.coordinate;
//                                   let geoInfo = coordiList.filter(item => item.newMatchFlag == 'N51');
//                                   console.log('geoInfo====>',geoInfo);
//                                   prtcl = response;
//                                   console.log('prtcl-===>',prtcl);
  
//                                   // addMarker(
//                                   // 	"llPass"
//                                   // 	, response.coordinateInfo.coordinate[0].newLat
//                                   // 	, response.coordinateInfo.coordinate[0].newLon
//                                   // 	,idx
//                                   // );
  
                                  
//                                   // 5. 경로탐색 결과 Line 그리기 
  
  
//                                   var trafficColors = {
//                                       extractStyles:true,
//                                       /* 실제 교통정보가 표출되면 아래와 같은 Color로 Line이 생성됩니다. */
//                                       trafficDefaultColor:"#636f63", //Default
//                                       trafficType1Color:"#19b95f", //원할
//                                       trafficType2Color:"#f15426", //지체
//                                       trafficType3Color:"#ff970e"  //정체		
//                                   };    			
//                                   var style_red = {
//                                       fillColor:"#FF0000",
//                                       fillOpacity:0.2,
//                                       strokeColor: "#FF0000",
//                                       strokeWidth: 3,
//                                       strokeDashstyle: "solid",
//                                       pointRadius: 2,
//                                       title: "this is a red line"
//                                   };										
                                  
//                                   drawData(prtcl);
                                  
//                                   // 6. 경로탐색 결과 반경만큼 지도 레벨 조정
//                                   // var newData = geoData[0];
//                                   // for (var i = 0; i < newData.length; i++) {
//                                   // 		var mData = newData[i];
//                                   // 		var type = mData.geometry.type;
//                                   // 		var pointType = mData.properties.pointType;
//                                   // 		if(type == "Point"){
//                                   // 			var linePt = new Tmapv2.LatLng(mData.geometry.coordinates[1],mData.geometry.coordinates[0]);
//                                   // 			PTbounds.extend(linePt);
//                                   // 		}
//                                   // 		else{
//                                   // 			var startPt,endPt;
//                                   // 			for (var j = 0; j < mData.geometry.coordinates.length; j++) {
//                                   // 				var linePt = new Tmapv2.LatLng(mData.geometry.coordinates[j][1],mData.geometry.coordinates[j][0]);
//                                   // 				PTbounds.extend(linePt);
//                                   // 		}
//                                   // 	}
//                                   // }
//                                   // map.fitBounds(PTbounds);
  
//                                   var resultData = response.properties;
//                                   var resultFeatures = response.features;
  
//                                   // 결과 출력
//                                   tDistance = (resultFeatures[0].properties.totalDistance / 1000).toFixed(1) + "km / " 
//                                               + (resultFeatures[0].properties.totalTime / 60).toFixed(0) + "분";
  
                                  
//                                       var markerInfo = document.getElementById(idx);
//                                       markerInfo.innerHTML += tDistance;
//                                       markerInfo.style.display = 'unset';
                          
//                               },
//                               error:function(request,status,error){
//                                   console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
//                               }
                              
//                           });						
//                       var message = {
//                           mapFocus: 'focusOn' 
                          
//                       };
//                       parent.postMessage(message, "*");
//                   }
  
//                   // 내 위치 토글에 따른 On Off
//                   // if(event.data.selfLoc == "selfLoc") {
//                   // 	var selfLat = event.data.selfLat;
//                   // 	var selfLon = event.data.selfLon;
//                   // 	if(document.getElementById("selfLocationYN").value == 'on') {
//                   // 		document.getElementById("selfLocationYN").value = 'off';
//                   // 		document.getElementById("chkBox2").style.backgroundColor="rgba(174, 174, 174, 1)";
//                   // 		document.getElementById("chkBox2").style.borderColor="rgba(174, 174, 174, 1)";
//                   // 		if(selfMarkers.length > 0) {
//                   // 			for(i = 0; i < selfMarkers.length; i++) {
//                   // 				selfMarkers[i].setMap(null);
//                   // 			}
//                   // 			selfMarkers = [];
//                   // 		}
//                   // 	} else {
//                   // 		document.getElementById("selfLocationYN").value = 'on';
//                   // 		document.getElementById("chkBox2").style.backgroundColor="rgba(224, 32, 92, 1)";
//                   // 		document.getElementById("chkBox2").style.borderColor="rgba(224, 32, 92, 1)";
//                   // 		addSelfMarker(selfLon, selfLat);
//                   // 		map.setCenter(new Tmapv2.LatLng(selfLat, selfLon));
//                   // 	}
//                   // }
//               });
//               function toggleClick() {
  
//                   if(document.getElementById("lineYN").value == 'on') {
//                       document.getElementById("lineYN").value = 'off';
//                       document.getElementById("chkBox").style.backgroundColor="rgba(174, 174, 174, 1)";
//                       document.getElementById("chkBox").style.borderColor="rgba(174, 174, 174, 1)";
//                   } else {
//                       document.getElementById("lineYN").value = 'on';
//                       document.getElementById("chkBox").style.backgroundColor="rgba(224, 32, 92, 1)";
//                       document.getElementById("chkBox").style.borderColor="rgba(224, 32, 92, 1)";
//                   }
  
//                   setMap();
//               }
//               function setMap() {
  
                  
//                   document.getElementById("lineYN").disabled = true;
  
//                   if(markers.length > 0) {
//                       for(i = 0; i < markers.length; i++) {
//                           markers[i].setMap(null);
//                       }
//                       markers = [];
//                   }
//                   if(infoWindows.length > 0) {
//                       for(let b = 0; b < infoWindows.length; b++) {
//                           infoWindows[b].setMap(null);
//                       }
//                       infoWindows = [];
//                   }
  
//                   fnSEReloadMap();
//               }
//               function fnSEReloadMap() {
//                   console.log('result >>> ', result);
//                   var todayResult = [];
//                   var todayResultSend = [];
//                   var todayResultTemp = {};
//                   var todayResultTemp2 = {};
//                   var date = new Date();
//                   var today = ( (date.getMonth()+1) < 10 ? "0" + (date.getMonth()+1) : (date.getMonth()+1) ) + '/' + ( (date.getDate()) < 10 ? "0" + (date.getDate()) : (date.getDate()) );
                  
//                   PTbounds = new Tmapv2.LatLngBounds();
//                   if(markers.length > 0) {
//                       for(i = 0; i < markers.length; i++) {
//                           markers[i].setMap(null);
//                       }
//                       markers = [];
//                   }
//                   if(infoWindows.length > 0) {
//                       for(let b = 0; b < infoWindows.length; b++) {
//                           infoWindows[b].setMap(null);
//                       }
//                       infoWindows = [];
//                   }
  
//                   for(var i = 0; i < new_polyLine.length; i++) {
//                       new_polyLine[i].setMap(null);
//                   }
//                   new_polyLine = [];
  
//                   // 2. 시작, 도착 심볼찍기
//                   // 시작
//                   // 2024.01.03 남소연 result size 체크 추가
//                   if (result.length > 0) {
//                       console.log('marker longi.lati===>',result);
//                       if (result[0].WorkOrder__r.Longitude != undefined && result[0].WorkOrder__r.Latitude != undefined) {
//                           addMarker(
//                               "llStart"
//                               , result[0].WorkOrder__r.Longitude
//                               , result[0].WorkOrder__r.Latitude
//                               , result[0].Number
//                           );
//                       }
                  
//                       // 3. 경유지 심볼 찍기
//                       // var passListTemp = ""; // 경유지 리스트 변환
                      
//                       // for(var i = 1; i < result.length - 1 ; i++) {
//                       // 	if (result[i].WorkOrder__r.Longitude != undefined && result[i].WorkOrder__r.Latitude != undefined) {
//                       // 		addMarker(
//                       // 			"llPass"
//                       // 			, result[0].WorkOrder__r.Longitude
//                       // 			, result[0].WorkOrder__r.Latitude
//                       // 			, result[i].Number
//                       // 		);
//                       // 		if(i == result.length - 2) {
//                       // 			passListTemp += result[i].WorkOrder__r.Longitude + "," + result[i].WorkOrder__r.Latitude
//                       // 		} else {
//                       // 			passListTemp += result[i].WorkOrder__r.Longitude + "," + result[i].WorkOrder__r.Latitude + "_"
//                       // 		}
//                       // 	}
//                       // }
  
//                       // 도착 
//                       if (result[result.length - 1].WorkOrder__r.Longitude != undefined && result[result.length - 1].WorkOrder__r.Latitude != undefined) {
//                           addMarker(
//                               "llEnd"
//                               , result[result.length - 1].WorkOrder__r.Longitude
//                               , result[result.length - 1].WorkOrder__r.Latitude
//                               , result[result.length - 1].Number
//                           );
//                       }
  
//                       // if (newLong != undefined && newLati != undefined) {
//                       // 	addMarker(
//                       // 		"llEnd"
//                       // 		,newLong
//                       // 		,newLati
//                       // 		, result[result.length - 1].Number
//                       // 	);
//                       // }
//                   }
                  
  
//                   setInfoWindow();
//                   console.log('seInfoWindow123');
//                   result = result.sort((a, b) => {
//                       // console.log('seInfoWindow',result);
//                       console.log('getElementById',document.getElementById("lineYN").value);
//                       if(a.Number > b.Number) return 1;
//                       if(a.Number < b.Number) return -1;
//                       return 0;
//                   });
//                   if(document.getElementById("lineYN").value == 'on'){
//                       console.log('seInfoWindow start1');
//                       for(var l = 0; l < result.length; l++) {
//                           console.log('seInfoWindow start2');
//                           var markerInfo = document.getElementById(result[l].Number);
//                           console.log('markerInfo===>',markerInfo);
//                           if(markerInfo != null) {
//                               markerInfo.style.display = 'none';
//                           }
//                           todayResultTemp = {};
//                           todayResultTemp2 = {};
//                           if(result[l].Number == 1 && result[l].SchedStartDate == today) {
//                               todayResultTemp.viaPointId         = 'viPoint' + l.toString();
//                               todayResultTemp.viaPointName       = 'viPointName' + l.toString();
//                               todayResultTemp.viaX               = result[l].WorkOrder__r.Longitude;
//                               todayResultTemp.viaY               = result[l].WorkOrder__r.Latitude;
//                               todayResultTemp.SchedStartTmapTime = result[l].SchedStartTmapTime;
//                               todayResult.push(todayResultTemp);
//                           } else {
//                               if(result[l].SchedStartDate == today) {
//                                   todayResultTemp2.viaPointId   = 'viPoint' + l.toString();
//                                   todayResultTemp2.viaPointName = 'viPointName' + l.toString();
//                                   todayResultTemp2.viaX         = result[l].WorkOrder__r.Longitude;
//                                   todayResultTemp2.viaY         = result[l].WorkOrder__r.Latitude;
//                                   todayResultSend.push(todayResultTemp2);
//                               }
//                           }
//                           if(result[l].SchedStartDate == today) {
//                               if(todayResult.length == 0) {
//                                   todayResultTemp.viaPointId         = 'viPoint' + l.toString();
//                                   todayResultTemp.viaPointName       = 'viPointName' + l.toString();
//                                   todayResultTemp.viaX               = result[l].Longitude;
//                                   todayResultTemp.viaY               = result[l].Latitude;
//                                   todayResultTemp.SchedStartTmapTime = result[l].SchedStartTmapTime;
//                                   todayResult.push(todayResultTemp);
//                               } else {
//                                   todayResultTemp2.viaPointId   = 'viPoint' + l.toString();
//                                   todayResultTemp2.viaPointName = 'viPointName' + l.toString();
//                                   todayResultTemp2.viaX         = result[l].Longitude;
//                                   todayResultTemp2.viaY         = result[l].Latitude;
//                                   todayResultSend.push(todayResultTemp2);
//                               }
//                           }
//                       }
//                       if(todayResult.length > 0) {
//                           console.log('api call===>');
//                           $.ajax({
//                               method:"POST", 
//                               headers : headers, 
//                               url:"https://apis.openapi.sk.com/tmap/routes/routeSequential30?version=1",
//                               async:true,
//                               contentType: "application/json",
//                               data:JSON.stringify({ 
//                                   reqCoordType : "WGS84GEO",
//                                   resCoordType : "WGS84GEO",
//                                   startName : "출발",
//                                   startX : todayResult[0].viaX,
//                                   startY : todayResult[0].viaY,
//                                   startTime : todayResult[0].SchedStartTmapTime,
//                                   endName : "도착",
//                                   endX : todayResultSend[todayResultSend.length-1].viaX,
//                                   endY : todayResultSend[todayResultSend.length-1].viaY,
//                                   searchOption : "0",
//                                   viaPoints : todayResultSend,
//                                   features : features
//                               }),
  
                              
//                               success:function(response){
//                                   consol.log('경로 response===>',response);
//                                   prtcl = response;
//                                   // 5. 경로탐색 결과 Line 그리기 
//                                   var trafficColors = {
//                                       extractStyles:true,
//                                       /* 실제 교통정보가 표출되면 아래와 같은 Color로 Line이 생성됩니다. */
//                                       trafficDefaultColor:"#636f63", //Default
//                                       trafficType1Color:"#19b95f", //원할
//                                       trafficType2Color:"#f15426", //지체
//                                       trafficType3Color:"#ff970e"  //정체		
//                                   };    			
//                                   var style_red = {
//                                       fillColor:"#FF0000",
//                                       fillOpacity:0.2,
//                                       strokeColor: "#FF0000",
//                                       strokeWidth: 3,
//                                       strokeDashstyle: "solid",
//                                       pointRadius: 2,
//                                       title: "this is a red line"
//                                   };										
                                  
//                                   drawData(prtcl);
//                                   // 6. 경로탐색 결과 반경만큼 지도 레벨 조정
//                                   var newData = response.features;
//                                   for (var i = 0; i < newData.length; i++) {
//                                           var mData = newData[i];
//                                           var type = mData.geometry.type;
//                                           var pointType = mData.properties.pointType;
//                                           if(type == "Point"){
//                                               var linePt = new Tmapv2.LatLng(mData.geometry.coordinates[1], mData.geometry.coordinates[0]);
//                                               PTbounds.extend(linePt);
//                                           }
//                                           else{
//                                               var startPt,endPt;
//                                               for (var j = 0; j < mData.geometry.coordinates.length; j++) {
//                                                   var linePt = new Tmapv2.LatLng(mData.geometry.coordinates[j][1], mData.geometry.coordinates[j][0]);
//                                                   PTbounds.extend(linePt);
//                                           }
//                                       }
//                                   }
//                                   map.fitBounds(PTbounds);
  
//                                   var resultData = response.properties;
//                                   var resultFeatures = response.features;
//                                   var idx = 1;
//                                   for(var l = 0; l < resultFeatures.length - 1; l++) {
//                                       tDistance = "";
//                                       markerInfo = "";
//                                       if(resultFeatures[l].geometry.type == 'Point') {
//                                           if(resultFeatures[l].properties.distance == "0") {
//                                               tDistance = 0 + "km / " + 0 + "분";
//                                               if(l > 0 && l < resultFeatures.length - 2){
//                                                   var markerInfo = document.getElementById(idx);
//                                                   if(markerInfo != null) {
//                                                       markerInfo.innerHTML += tDistance;
//                                                       markerInfo.style.display = 'unset';
//                                                   }
//                                                   idx ++;
//                                               }
//                                           } else {
//                                               // 결과 출력
//                                               tDistance = (resultFeatures[l+1].properties.distance / 1000).toFixed(1) + "km / " 
//                                                           + (resultFeatures[l+1].properties.time / 60).toFixed(0) + "분";
                                              
//                                               if(l > 0 && l < resultFeatures.length - 2){
//                                                   var markerInfo = document.getElementById(idx);
//                                                   if(markerInfo != null) {
//                                                       markerInfo.innerHTML += tDistance;
//                                                       markerInfo.style.display = 'unset';
//                                                   }
//                                                   idx ++;
//                                               }
                                              
//                                           }
                                      
//                                       } else {
  
//                                       }
//                                       document.getElementById("lineYN").disabled = false;
//                                   }
                          
//                               },
//                               error:function(request,status,error){
//                                   console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
//                               }
                              
//                           });
//                       } else {
//                           document.getElementById("lineYN").disabled = false;
//                       }
//                   } else {
//                       for(var i = 0; i < result.length; i++) {
//                           if (result[i].WorkOrder__r.Longitude != undefined && result[i].WorkOrder__r.Latitude != undefined) {
//                               var linePt = new Tmapv2.LatLng(result[i].WorkOrder__r.Latitude, result[i].WorkOrder__r.Longitude);
//                               PTbounds.extend(linePt);
//                           }
//                       }
//                       if(selfLat && selfLon) {
//                           PTbounds.extend(new Tmapv2.LatLng(selfLat, selfLon));
//                           map.fitBounds(PTbounds);
//                       }
//                       document.getElementById("lineYN").disabled = false;
//                   }
//                   if(selfLat && selfLon) {
//                       if(selfMarkers.length > 0) {
//                           for(i = 0; i < selfMarkers.length; i++) {
//                               selfMarkers[i].setMap(null);
//                           }
//                           selfMarkers = [];
//                       }
//                       addSelfMarker(selfLon, selfLat);
//                   }
//               };
  
//               function drawData(data){
//                   // 지도위에 선은 다 지우기
//                   routeData = data;
//                   console.log('routeData===>',data);
//                   var resultStr = "";
//                   var distance = 0;
//                   var idx = 1;
//                   var newData = [];
//                   var equalData = [];
//                   var pointId1 = "-1234567";
//                   var ar_line = [];
//                   var lineYN = document.getElementById("lineYN").value;
  
//                   // for (var i = 0; i < data.features.length; i++) { 
//                   // 	var feature     = data.features[i];
//                   // 	var featurePrev = data.features[i-1];
                      
//                       //배열에 경로 좌표 저장
//                       if(lineYN == 'on' ){
//                           console.log('linYN start===>');
//                           if(routeData.geometry.type == "LineString"){
//                               console.log('geometry===>');
//                               ar_line = [];
//                               for (var j = 0; j < routeData.geometry.coordinates.length; j++) {
//                                   var startPt = new Tmapv2.LatLng(routeData.geometry.coordinates[j][1],routeData.geometry.coordinates[j][0]);
//                                   ar_line.push(startPt);
//                                   pointArray.push(routeData.geometry.coordinates[j]);
//                               }
//                               var polyline = new Tmapv2.Polyline({
//                                   path: ar_line,
//                                   strokeColor: "#ff0000", 
//                                   strokeWeight: 2,
//                                   map: map
//                               });
//                               new_polyLine.push(polyline);
                              
//                           }
//                       }
//                       var pointId2 = feature.properties.viaPointId;
//                       if (pointId1 != pointId2) {
//                           equalData = [];
//                           equalData.push(feature);
//                           newData.push(equalData);
//                           pointId1 = pointId2;
//                       }
//                       else {
//                           equalData.push(feature);
//                       }
//                   }
//                   console.log('newData====>',newData);
//                   geoData = newData;
//                   var markerCnt = 1;
//                   for (var i = 0; i < newData.length; i++) {
//                       var mData = newData[i];
//                       var type = mData[0].geometry.type;
//                       var pointType = mData[0].properties.pointType;
//                       var pointTypeCheck = false; // 경유지 일때만 true
//                       if (mData[0].properties.pointType == "S") {
//                           var img = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png';
//                           var lon = mData[0].geometry.coordinates[0];
//                           var lat = mData[0].geometry.coordinates[1];
//                       }
//                       else if (mData[0].properties.pointType == "E") {
//                           var img = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png';
//                           var lon = mData[0].geometry.coordinates[0];
//                           var lat = mData[0].geometry.coordinates[1];
//                       }
//                       else {
//                           markerCnt=i;
//                           var lon = mData[0].geometry.coordinates[0];
//                           var lat = mData[0].geometry.coordinates[1];
//                       }	
//                   }
              
//               function addMarker(status, lon, lat, index) {
//                   //출도착경유구분
//                   //이미지 파일 변경.
//                   var markerLayer;
                  
//                   imgURL = "<div id='Drag" + index + "' class='location_pin'>" + index + "</div>";
                  
//                   var content = "<div ontouchend='onSearch()' onclick='onSearch()' style='background: #4F4F4F;color: #fff;width: 70px;height: 20px;text-align: center;border-radius: 4px;line-height: 19px;'>주변검색</div>";
//                   if(status == "llEnd") {
//                       var marker = new Tmapv2.Marker({
//                           position: new Tmapv2.LatLng(lat,lon),
//                           iconHTML : imgURL,
//                           iconSize : new Tmapv2.Size(20, 30),
//                           map: map,
//                           // title : contents,
//                           // animation : Tmapv2.MarkerOptions.ANIMATE_FLICKER,
//                           // animationLength: 200, //애니메이션 길이.
//                           // title: content,
//                           // label: "<p>"+"<span id='"+ index +"' class='tit'> </span>"+
//                           // 	"</p>"
//                       });
//                       infoWindow = new Tmapv2.InfoWindow({
//                           position: new Tmapv2.LatLng(lat, lon),
//                           content: content,
//                           border :'0px solid #FF0000',
//                           type: 2,
//                           map: map,
//                           align : 11,
//                           visible : false
//                       });
//                   } else if(status == "llStart") {
//                       if(document.getElementById("lineYN").value == 'on'){
//                           var marker = new Tmapv2.Marker({
//                               position: new Tmapv2.LatLng(lat,lon),
//                               iconHTML : imgURL,
//                               iconSize : new Tmapv2.Size(20, 30),
//                               map: map,
//                               label: "<p>"+"<span id='"+ index +"' class='tit'> </span>"+
//                                   "</p>"
//                           });
//                       } else {
//                           var marker = new Tmapv2.Marker({
//                               position: new Tmapv2.LatLng(lat,lon),
//                               iconHTML : imgURL,
//                               iconSize : new Tmapv2.Size(20, 30),
//                               map: map,
//                           });
//                       }
//                       infoWindow = new Tmapv2.InfoWindow({
//                           position: new Tmapv2.LatLng(lat, lon),
//                           content: content,
//                           border :'0px solid #FF0000',
//                           type: 2,
//                           map: map,
//                           align : 11,
//                           visible : false
//                       });
//                    } else if(status == "self"){
//                       imgURL = "<div class='current_location'></div>";
//                       var marker = new Tmapv2.Marker({
//                           position: new Tmapv2.LatLng(lat,lon),
//                           iconHTML : imgURL,
//                           iconSize : new Tmapv2.Size(30, 30),
//                           map: map,
//                       });
//                       infoWindow = new Tmapv2.InfoWindow({
//                           position: new Tmapv2.LatLng(lat, lon),
//                           content: content,
//                           border :'0px solid #FF0000',
//                           type: 2,
//                           map: map,
//                           align : 11,
//                           visible : false
//                       });
//                    } else {
//                       if(document.getElementById("lineYN").value == 'on'){
//                           var marker = new Tmapv2.Marker({
//                               position: new Tmapv2.LatLng(lat,lon),
//                               iconHTML : imgURL,
//                               iconSize : new Tmapv2.Size(20, 30),
//                               map: map,
//                               label: "<p>"+"<span id='"+ index +"' class='tit'> </span>"+
//                                   "</p>"
//                           });
//                       } else {
//                           var marker = new Tmapv2.Marker({
//                               position: new Tmapv2.LatLng(lat,lon),
//                               iconHTML : imgURL,
//                               iconSize : new Tmapv2.Size(20, 30),
//                               map: map,
//                           });
//                       }
//                       infoWindow = new Tmapv2.InfoWindow({
//                           position: new Tmapv2.LatLng(lat, lon),
//                           content: content,
//                           border :'0px solid #FF0000',
//                           type: 2,
//                           map: map,
//                           align : 11,
//                           visible : false
//                       });
  
//                   }
//                   markers.push(marker);
//                   infoWindow._visible = false;
//                   infoWindows.push(infoWindow);
//               }
  
//               function addSelfMarker(lon, lat) {
//                   imgURL = "<div class='current_location'></div>";
//                   var marker = new Tmapv2.Marker({
//                       position: new Tmapv2.LatLng(lat,lon),
//                       iconHTML : imgURL,
//                       iconSize : new Tmapv2.Size(30, 30),
//                       map: map,
//                   });
                  
//                   selfMarkers.push(marker);
//               }
  
//               // 내 위치 토글에 따른 On Off
//               // function selfLoc() {
//               // 	var message = {
//               // 		selfLoc : "selfLoc"
                      
//               // 	};
//               // 	parent.postMessage(message, "*");				
//               // }
  
//               function setInfoWindow() {
//                   for(let a = 0; a < markers.length; a++) {
//                       markers[a].addListener("click", function(evt) {
//                           if(infoWindows[a]._visible) {
//                               infoWindows[a].setVisible(false);
//                               infoWindows[a]._visible = false;
                              
//                           } else {
//                               infoWindows[a].setVisible(true);
//                               infoWindows[a]._visible = true;
//                           }
//                       });
//                       markers[a].addListener("touchend", function(evt) {
//                           if(infoWindows[a]._visible) {
//                               infoWindows[a].setVisible(false);
//                               infoWindows[a]._visible = false;
                              
//                           } else {
//                               infoWindows[a].setVisible(true);
//                               infoWindows[a]._visible = true;
//                           }
//                       });
                      
//                   }
//               }
  
//               function onSearch() {
//                   var message = {
//                       svc : "svcSearch"
                      
//                   };
//                   parent.postMessage(message, "*");
  
//               }
//               function onDown(){
//                   map.ctrl_nav.dragPan.deactivate();//드래그 액션 비활성화
//               }
//               // 마우스 버튼을 떼었을때 발생하는 이벤트 함수입니다. 이벤트 활성화가 되면 지도의 드래그 이동을 활성화 합니다.
//               function onUp(){
//                   map.ctrl_nav.dragPan.activate();//드래그 액션 활성화
//               }
//           </script>
//           <body>
//               <div class="slds-scope">
//                   <div class="slds-form-element">
//                       <label class="slds-checkbox_toggle slds-grid"  style="width: 50px; position: absolute; z-index: 1; top: 8px; left: 8px;">
//                           <input type="checkbox" id="lineYN" name="line" value="off" onchange="toggleClick()"/>
//                           <span id="checkbox-toggle-16" class="slds-checkbox_faux_container" aria-live="assertive">
//                           <span id="chkBox" class="slds-checkbox_faux"></span>
//                           <span class="slds-checkbox_on">경로표시</span>
//                           <span class="slds-checkbox_off">경로표시</span>
//                           </span>
//                       </label>
//                       <!-- <label class="slds-checkbox_toggle slds-grid"  style="width: 50px; position: absolute; z-index: 1; bottom: -300px; left: 8px;">
//                           <input type="checkbox" id="selfLocationYN" name="selfLocation" value="off" onchange="selfLoc()"/>
//                           <span class="slds-checkbox_faux_container" aria-live="assertive">
//                           <span id="chkBox2" class="slds-checkbox_faux"></span>
//                           <span class="slds-checkbox_on">내위치</span>
//                           <span class="slds-checkbox_off">내위치</span>
//                           </span>
//                       </label> -->
//                   </div>
//               </div>
//               <div id="map_wrap" class="map_wrap">
//                   <div id="map_div"></div>
//               </div>
              
//           </body>
          
//       </apex:form>
//   </apex:page>
    

})