/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 01-19-2024
 * @last modified by  : minju.park@dkbmc.com
**/
import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import uploadFile from '@salesforce/apex/FileUploader.uploadFile';
import fileList from '@salesforce/apex/FileUploader.fileList';

const column = [
    {label : 'Name', fieldName: 'Id', type:'url'},
]

export default class FileUploaderCompLwc extends LightningElement {
    @api recordId;
    fileData
    column = column;
    @api idList;
    data =[];

    openfileUpload(event) {
        const file = event.target.files[0]
        var reader = new FileReader()
        reader.onload = () => {
            var base64 = reader.result.split(',')[1]
            this.fileData = {
                'filename': file.name,
                'base64': base64,
                'recordId': this.recordId
            }
            console.log(this.fileData);
        }
        reader.readAsDataURL(file);
    }
    
    loadData(){
        fileList({'fileIdList': this.idList})
        .then((result)=> {
            console.log('result===>', result);
            this.data = result;
        })
        .catch((error)=> {
            console.log('error===>',error);
        });
    }

    handleClick(){
        const {base64, filename, recordId} = this.fileData
        uploadFile({ base64, filename, recordId }).then(result=>{
            this.fileData = null
            let title = `${filename} uploaded successfully!!`
            this.toast(title);
        })
    }

    toast(title){
        const toastEvent = new ShowToastEvent({
            title, 
            variant:"success"
        })
        this.dispatchEvent(toastEvent);
    }
}