import { LightningElement, api } from "lwc";
import getAccountData from "@salesforce/apex/DataController.getAccountData";
import getSearchData from "@salesforce/apex/DataController.getSearchData";
import Name from "@salesforce/label/c.Name";
import Phone from "@salesforce/label/c.Phone";
import Industry from "@salesforce/label/c.industry";
import Type from "@salesforce/label/c.Type";
import Website from "@salesforce/label/c.Website";

const columns = [
  {
    label: Name,
    fieldName: "Name",
    sortable: "true"
  },
  {
    label: Phone,
    fieldName: "Phone",
    sortable: "true"
  },
  {
    label: Industry,
    fieldName: "Industry",
    type: "Picklist",
    sortable: "true"
  },
  {
    label: Type,
    fieldName: "Type",
    type: "Picklist",
    sortable: "true"
  },
  {
    label: Website,
    fieldName: "Website",
    type: "URL",
    sortable: "true",
    typeAttributes: { tooltip: { fieldName: "Website" } }
  }
];

export default class datatable extends LightningElement {
  initialRecords;
  data;
  columns = columns;
  sortBy;
  sortDirection;
  searchString;
  error;
  loadMoreStatus;
  time;
  offSetCount = 0;
  @api totalNumberOfRows;

  connectedCallback() {
    this.loadAccountData();
    this.searchAccountData();
 
  }
  

  loadAccountData() {
    console.log("offset===>", this.offSetCount);
    getAccountData({ offSetCount: this.offSetCount })
      .then((result) => {
        console.log("result ::: ", result);
        this.data = result;
        this.initialRecords = result;
      })

      .catch((error) => {
        console.log("error ::: ", JSON.parse(JSON.stringify(error)));
      });
  }
  

  loadMoreData() {
    console.log("loadmore!!!!");

    if (this.loadMoreStatus === "Loading") {
      return; // 이미 로딩 중인 경우 중복 호출 방지
    }

    this.loadMoreStatus = "Loading";

    this.offSetCount += 10;
   

    getAccountData({ offSetCount: this.offSetCount })
      .then((result) => {
        if (result.length >= this.totalNumberOfRows) {
          this.isInfiniteLoadingEnabled = false;
        } else {
          this.data = this.data.concat(result);
        
        }
        this.loadMoreStatus = "Not Loading";
      })
      
      .catch((error) => {
        console.log("error ::: ", JSON.parse(JSON.stringify(error)));
      });
      
  }

  searchAccountData() {
    getSearchData({ })
      .then((result) => {
        console.log("result ::: ", result);
        
        this.initialRecords = result;
      })

      .catch((error) => {
        console.log("error ::: ", JSON.parse(JSON.stringify(error)));
      });
  }

  getSearchData(event) {
    const searchKey = event.target.value.toLowerCase();
    let searchRecords = [];

    if (searchKey) {
      // 필터링된 검색 결과를 searchRecords에 저장
      searchRecords = this.initialRecords.filter((result) => {
        const valuesArray = Object.values(result);
        for (const val of valuesArray) {
          let strVal = val.toString().toLowerCase();
          if (strVal.includes(searchKey)) {
            console.log("strVal==>",JSON.parse(JSON.stringify(strVal)));
            return true; // 검색어를 포함한 경우 결과를 유지
            
          }
        }
        return false; // 검색어를 포함하지 않은 경우 결과를 제외
      });
    } else {
      // 검색어가 없는 경우 초기 데이터를 표시
      searchRecords = this.initialRecords;
      this.loadMoreData();
      console.log(
        "searchRecords==>",
        JSON.parse(JSON.stringify(searchRecords))
      );
    }
  

    if (this.time) {
      //이 전 타임을 초기화
      clearTimeout(this.time);
    }

    this.time = setTimeout(() => {
      //검색을 할 때 마지막 반응이 0.5초가 지나면 검색
      this.data = searchRecords;
    }, 500);
    
  }

  handleSortAccountData(event) {
    this.sortBy = event.detail.fieldName; // field이름
    this.sortDirection = event.detail.sortDirection; // asc, desc 정렬 방향
    this.sortAccountData(event.detail.fieldName, event.detail.sortDirection); // sortAccountData 로 연결
  }

  sortAccountData(fieldname, direction) {
    let parseData = JSON.parse(JSON.stringify(this.data));

    let keyValue = (a) => {
      return a[fieldname];
    };

    let isReverse = direction === "asc" ? 1 : -1;

    parseData.sort((x, y) => {
      x = keyValue(x) ? keyValue(x) : "";
      y = keyValue(y) ? keyValue(y) : "";

      return isReverse * ((x > y) - (y > x));
    });

    this.data = parseData;
  }
}