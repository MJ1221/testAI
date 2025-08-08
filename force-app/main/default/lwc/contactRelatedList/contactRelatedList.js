/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 12-14-2023
 * @last modified by  : minju.park@dkbmc.com
**/
import { LightningElement, api} from 'lwc';
import contactDataList from "@salesforce/apex/ContactDataController.contactDataList";
import checkContact from "@salesforce/apex/ContactDataController.checkContact";
import CreateNewContactModal from 'c/createNewContactModal';
import updateContact from '@salesforce/apex/ContactDataController.updateContact';
import delOneRow from '@salesforce/apex/ContactDataController.delOneRow';

const actions = [ 
    { label: 'Edit', name: 'Edit' },
    { label: 'Delete', name: 'Delete' },
];

const columns = [
    {
      label: 'Name',
      fieldName: "Name",
      sortable: "true"
    },
    {
      label: 'Title',
      fieldName: "Title",
      sortable: "true"
    },
    {
      label: 'Email',
      fieldName: "Email",
      sortable: "true"
    },
    {
      label: 'Phone',
      fieldName: "Phone",
      sortable: "true"
    },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
  ];

export default class ContactRelatedList extends LightningElement {

    columns = columns;
    data = [];
    @api recordId;  
    @api records; 
    allValue= [];
    record = {};
    conId;
    onValue;
    editRows;
    check;
    checkList=[];
    firstNameVal = '';
    lastNameVal = '';
    titleVal = '';
    emailVal = '';
    phoneVal = '';
    editList = [];
    deleteOne;

    isEdit = false;
    isDelete = false;
    isDeleteCheck = false;

    handleNewModal(){
        CreateNewContactModal.open({
            'recordId' : this.recordId
        }).then((result)=> {
            console.log('result : ', result);
        });
    }

    get inputVariables(){
        return [];
    }

    connectedCallback(){
        this.loadContact();
    }

    loadContact(){
        window.console.log('loadContact !!!');
        contactDataList({'recordId': this.recordId})
            .then((result)=> {
                console.log('result===>', result);
                this.data = result;
            })
            .catch((error)=> {
                console.log('error===>',error);
            });
    }
    
    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        this.editRows = row;
        switch (actionName) {
            case 'Edit':
                this.conId = row.Id;
                this.firstNameVal = row.FirstName;
                this.lastNameVal = row.LastName;
                this.titleVal = row.Title;
                this.emailVal = row.Email;
                this.phoneVal = row.Phone;
                console.log("conId===>",this.conId);
                this.editRow(row);
                break;
            case 'Delete':
                this.deleteOne = event.detail.row;
                console.log('this.delete===>',this.deleteOne);
                this.deleteRow();
                break;
            default:
        }
    }

    deleteRow(){
        this.isDelete = true;    
    }

    delRow(){
        this.isDeleteCheck= true;
    }

   
    editRow(){ //edit modal open
        this.isEdit = true;
    }

    handleEditCancel(){ //edit modal cancel
        this.isEdit = false;
    }


    changeValue(event){ // onchange 값 넣기
        console.log('fieldName==>', event.target.fieldName);
        
        console.log('Before editRows==>', JSON.stringify(this.editRows));
        this.editRows = event.detail.value;
        console.log('value==>', this.editRows);
        this.onValue = event.target.fieldName;
        if(event.target.fieldName === 'FirstName') {
            this.firstNameVal = this.editRows;
            console.log('this.firstName===>',this.firstNameVal);
        }
        else if(event.target.fieldName === 'LastName') {
            this.lastNameVal = this.editRows;
        }
        else if(event.target.fieldName === 'Title') {
            this.titleVal = this.editRows;
        }
        else if(event.target.fieldName === 'Email') {
            this.emailVal = this.editRows;
        }
        else if(event.target.fieldName === 'Phone') {
            this.phoneVal = this.editRows;
        }

        
      this.allValue ={
        'Id': this.conId,
        'FirstName': this.firstNameVal,
        'LastName': this.lastNameVal,
        'Title': this.titleVal,
        'Email': this.emailVal,
        'Phone': this.phoneVal,
      }
      console.log('this.allValue===>',JSON.stringify(this.allValue));
    }
    
    handleEditUpdate(){ // 최종 edit update
        console.log('data===>',JSON.stringify(this.allValue));
        this.editList.push(this.allValue);

        window.console.log('this.editList : ', JSON.stringify(this.editList));
        updateContact({'editRowSt' : this.editList}).then(result => {
			console.log('result===>',result);
				if(result === 'SUCCESS') {
					window.console.log('result : ', result);
					this.isEdit = false;
					this.loadContact();
				}
		});
    //    refreshApex(this.data);
       
    }

    handleDelCancel(){ // 삭제 취소(delete button)
        this.isDeleteCheck = false;
        this.isDelete = false;
    }

    checkDelete(){ //check delete button
        this.isDelete = false;
         this.isDeleteCheck = true;
    }

    handleCheck(event){ //check된 값
        this.check = event.detail.selectedRows;
        console.log("this.check===>",  this.check);
    
    }
    
    handleDelRow(){ //하나씩 삭제
        console.log('this.deleteOne.Id ::: ', this.deleteOne.Id);
        delOneRow({'delOne' : this.deleteOne.Id}).then(result => {
            console.log('result===>',result);
            if(result === 'success'){
                this.isDelete = false;
            }
        });
    }

    handleDelete(){ //check 값 delete
        checkContact({'check' : this.check}).then(result =>{
            console.log('result===>',result);
            if(result === 'success'){
                this.isDeleteCheck = false;
            }
        });
    }

    
}