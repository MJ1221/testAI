/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 01-03-2024
 * @last modified by  : minju.park@dkbmc.com
**/
import { LightningElement } from 'lwc';
export default class BikeCard extends LightningElement {
  name = 'Electra X4';
  description = 'A sweet bike built for comfort.';
  category = 'Mountain';
  material = 'Steel';
  price = '$2,700';
  pictureUrl = 'https://s3-us-west-1.amazonaws.com/sfdc-demo/ebikes/electrax4.jpg';
}