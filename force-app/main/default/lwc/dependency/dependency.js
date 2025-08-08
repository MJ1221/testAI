/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 02-13-2024
 * @last modified by  : minju.park@dkbmc.com
**/
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import { LightningElement, wire, track } from "lwc";
import Zone__c from "@salesforce/schema/Account.Zone__c";
import Region__c from "@salesforce/schema/Account.Region__c";
import Click_here from '@salesforce/label/c.Click_here';


export default class dependency extends LightningElement {
  @track picklistRegionValueData;
  @track picklistZoneValueData;
  @track firstValue = [];
  @track secondsValue;
  @track lastValue = [];
  @track selectedZoneValue =null;
  @track selectedValue;
  @track filterLastValue=[];
  @track datatableValue=[];
  @track selectedIcon;
  @track selectedRegion = null;
  zoneIcon;
  selectedIndex=[];
  elementValue=[];
  lastValueIndex = [];
  totalIndex =[];
  newList = [];
  allIcons;
  isChecked = false;
  label = {
    Click_here,
  };
  connectedCallback(){
    console.log('Click_here Label===>', this.label.Click_here);
  }

  @wire(getPicklistValues, {
    recordTypeId: "0125i0000016JnrAAE",
    fieldApiName: Region__c
  })
  picklistFirstData({ error, data }) {
    if (data) {
      this.picklistRegionValueData = data.values;
      console.log("picklist====>", JSON.stringify(this.picklistRegionValueData));
    } else if (error) {
      this.error = error;
      console.log("error===>", error);
    }
  }

  @wire(getPicklistValues, {
    recordTypeId: "0125i0000016JqWAAU",
    fieldApiName: Zone__c
  })
  picklistSecondsData({ error, data }) {
    if (data) {
      this.picklistZoneValueData = data.values;
      console.log("picklistzone====>",JSON.stringify(this.picklistZoneValueData));
    } else if (error) {
      this.error = error;
      console.log("error===>", error);
    }
  }
    
  handleClick(event) {
    const subMenu = this.template.querySelector('[data-id="sub"]');
    this.secondsValue = [];
    this.selectedValue = event.currentTarget.dataset.value;
    const duplicate = this.firstValue.some(item => item.value === this.selectedValue);
    const selectedRegionIcon = event.currentTarget.querySelector('[data-id="checkRegionIcon"]');
    const allRegionIcons = this.template.querySelectorAll('[data-id="checkRegionIcon"]');
    this.allIcons= event.currentTarget.querySelectorAll(".checkValue");
    console.log('secondsValue ::: ', this.secondsValue);
  
    allRegionIcons.forEach(icon => {
      if (icon !== selectedRegionIcon) {
          icon.style.display = "none";
      }
    });
    selectedRegionIcon.style.display = "block";

    if (!duplicate) {
      this.firstValue.push({ value: this.selectedValue });
      this.totalIndex.push(this.elementValue);
    }
  
    this.picklistZoneValueData.forEach(element => {
      this.selectedIndex = this.picklistRegionValueData.findIndex(item => item.value === this.selectedValue);
      if (this.selectedIndex === element.validFor[0]) {
          this.secondsValue.push({ value: element.value, label: element.label});
      }
      
    });

    if (subMenu.style.display === "none") {
      subMenu.style.display = "block";
      console.log("submenu open");
    } else if (this.firstValue === this.selectedValue) {
      subMenu.style.display = "none";
    }
  }

  handleValueClick(event) {
    console.log('handleValueClick ????? ');
    console.log('event.currentTarget.dataset.label ::: ', event.currentTarget.dataset.label);
    this.selectedZoneValue = event.currentTarget.dataset.label; 
    console.log('this.selectedZoneValue ::: ', this.selectedZoneValue);
    this.selectedIcon = event.currentTarget.querySelector(".checkValue");
    console.log('this.selectedIcon ::: ', this.selectedIcon);
    this.allIcons= event.currentTarget.querySelectorAll(".checkValue");
    this.elementValue = this.picklistZoneValueData.findIndex(item => item.value === this.selectedZoneValue);
    console.log('this.elementValue ::: ', this.elementValue); // 0, 1, 2 형식으로 출력(순서)
    this.lastValue.some(item=> item.value ===this.selectedZoneValue );

    this.lastValue.push({ value: this.selectedZoneValue, isCheck: true});  
    
    console.log("allIcons=====>",JSON.stringify(this.allIcons));
    console.log('lastValue ::: ',JSON.stringify( this.lastValue));
    this.totalIndex.push(this.elementValue);
    console.log('totalIndex ::: ',JSON.stringify( this.totalIndex));

    // if(this.isChecked === false) {
    //   console.log('IF >>>>>');
    //   // this.selectedIcon.style.display = 'block'; 
    //   // console.log('this.selectedIcon ::: ' , this.selectedIcon);
    //   this.isChecked = true;
    // } else if(this.isChecked === true){
    //   console.log("ELSE ===>");
    //   // this.selectedIcon.style.display = "none";
    //   this.lastValue = this.lastValue.filter(item => item.value !== this.selectedZoneValue);
    //   this.totalIndex = this.totalIndex.filter(item => item.value !== this.elementValue);
    //   this.isChecked = false;
    // }
    if(this.selectedIcon.style.display === 'none') {
      console.log('IF >>>>>');
      this.selectedIcon.style.display = 'block'; 
      console.log('this.selectedIcon ::: ' , this.selectedIcon);
      // this.lastValue.push({ value: this.selectedZoneValue });
      console.log('lastValue ::: ',JSON.stringify( this.lastValue));
      this.totalIndex.push(this.elementValue);
      console.log('totalIndex ::: ',JSON.stringify( this.totalIndex));
      this.isChecked = true;
    }
    else{
      console.log("checked===>");
      this.selectedIcon.style.display = "none";
      this.lastValue = this.lastValue.filter(item => item.value !== this.selectedZoneValue);
      this.totalIndex = this.totalIndex.filter(item => item.value !== this.elementValue);
      this.isChecked = false;
    }

    this.picklistZoneValueData.forEach(item => {
      if(item.value === this.selectedZoneValue) {
        console.log('Check same');
        // this.selectedIcon =[...this.totalIndex];
        console.log("test===>",JSON.stringify(this.selectedIcon));
        this.selectedIcon[this.totalIndex].style.display = "block";
      }
    });

    // console.log("lastValue===>", JSON.stringify(this.lastValue));
    // console.log("totalIndex--===>", JSON.stringify(this.totalIndex));
  }

  handleTest() {
    console.log('lastValue ::: ', this.lastValue);
  }

  handleClickCombo(){
    const combo = this.template.querySelector('[data-id="combobox"]');
    const subMenu = this.template.querySelector('[data-id="sub"]');
    
    if(combo.style.display === "none"){
      combo.style.display = "block";
    } else{
      combo.style.display = "none";
      subMenu.style.display = "none";
    }
  }

  clickButton() {
  // const selectedIcon = event.currentTarget.querySelector(".checkValue");
    this.datatableValue = [...this.lastValue]; 
    console.log("lastValue===>",JSON.stringify(this.lastValue));
  // selectedIcon.style.display = "block";
  }

}