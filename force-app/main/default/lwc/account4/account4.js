import { LightningElement } from 'lwc';

const columns = [
    {label: 'Account Name', fieldName: 'Name', type: 'text'},
    {label: 'Phone', fieldName: 'Phone', type: 'phone'},
    {label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency'},

];

const data = [
    {
        Id : 'A',
        Name : 'Edge Communications',
        Phone : '2352235235',
        AnnualRevenue : 2000000,

    },
    {
        Id : 'B',
        Name : 'Rockstar Cables',
        Phone : '2352235232',
        AnnualRevenue : 210000,

    },
    {
        Id : 'C',
        Name : 'Space Riders',
        Phone : '1252235232',
        AnnualRevenue : 910000000,

    }
];

export default class LwcDataTable extends LightningElement {

    columns = columns;
    data = data; 

}