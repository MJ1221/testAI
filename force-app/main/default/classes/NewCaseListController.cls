/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 12-03-2024
 * @last modified by  : minju.park@dkbmc.com
**/
public with sharing class NewCaseListController {

    public List<Case> newCases { get; set; }

    public NewCaseListController() {
        
       newCases = [SELECT CaseNumber  FROM Case WHERE Status = 'New'];
    }

    public List<Case> getNewCases() {
        return newCases;
    }
}