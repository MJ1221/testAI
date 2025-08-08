import { api } from 'lwc';
import LightningModal from 'lightning/modal';
import getFetch from "@salesforce/apex/ContactDataController.getFetch";
import newContact from "@salesforce/apex/ContactDataController.newContact";

export default class CreateNewContactModal extends LightningModal {
    isNew = false;
    newValue;
    allLabel = [];
    saveList = [];
    firstNameVal = '';
    lastNameVal = '';
    accountIdVal = '';
    titleVal = '';
    emailVal = '';
    phoneVal = '';
    ownerVal = '';
    deleteNew =[];

    accSt = '';
    ownerSt = '';
    ownerId ='';
    @api recordId;

    // @track allLabel = [{
    //     'FirstName': '',
    //     'LastName': '',
    //     'AccountId': '',
    //     'Title': '',
    //     'Email': '',
    //     'Phone': '',
    //     'OwnerId': ''
    // }];

    connectedCallback() {
        getFetch({'recordId' : this.recordId}).then(result => {
            console.log('result ::: ', result);
            this.accSt = result.accName;
            this.ownerSt = result.ownerName;
            this.ownerId = result.ownerId;
        }).then((error) => {
            console.log('error ::: ', error);
        });

        this.allLabel =  [{
            'FirstName': '',
            'LastName': '',
            'AccountId': this.accSt,
            'Title': '',
            'Email': '',
            'Phone': '',
            'OwnerId': this.ownerSt
        }];
    }

    addRow() {
        const newContact = {
            'FirstName': '',
            'LastName': '',
            'AccountId': '',
            'Title': '',
            'Email': '',
            'Phone': '',
            'OwnerId': ''
        };

        this.allLabel = [...this.allLabel, newContact];
    }
    
    deleteRow(event){
        if(this.allLabel.length > 1){
            const indexPos = event.target.dataset.index;
            console.log('indexPos===>', event.target.dataset.index);
            this.allLabel.splice(indexPos,1);
            this.allLabel =[...this.allLabel];
            console.log('allLabel====>',JSON.stringify(this.allLabel));
        }
    }

    handleClose(){
        this.isNew = false;
    }

    changeValue(event){
    
        console.log('detail.value===>',event.detail.value);
        console.log('detail.index===>',event.target.dataset.index);
        console.log('detail.name===>',event.target.label);

        if(event.target.label === 'FirstName'){
            this.firstNameVal = event.detail.value;
        }
        else if(event.target.label === 'LastName'){
            this.lastNameVal = event.detail.value;
        }
        else if(event.target.label === 'AccountId'){
            this.accountIdVal = event.detail.value;
        }
        else if(event.target.label === 'Title'){
            this.titleVal = event.detail.value;
        }
        else if(event.target.label === 'Email'){
            this.emailVal = event.detail.value;
        }
        else if(event.target.label === 'Phone'){
            this.phoneVal = event.detail.value;
        }
        else if(event.target.label === 'OwnerId'){
            this.ownerVal = event.detail.value;
        }

        this.allLabel[event.target.dataset.index] = {
            'FirstName': this.firstNameVal,
            'LastName': this.lastNameVal,
            'AccountId': this.recordId,
            'Title': this.titleVal,
            'Email': this.emailVal,
            'Phone': this.phoneVal,
            'OwnerId': this.ownerId,
        }    
        console.log('allLabel====>',JSON.stringify(this.allLabel));
    }

    saveContact(){
        newContact({'newCon' : this.allLabel}).then(result => {
            console.log('result ::: ', result);
            if(result === 'success') {
                this.close();
            }
        })
    }
}