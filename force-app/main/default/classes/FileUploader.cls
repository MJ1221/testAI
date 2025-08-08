/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 01-19-2024
 * @last modified by  : minju.park@dkbmc.com
**/
public with sharing class FileUploader {
   
    @AuraEnabled
    public static String uploadFile(String base64, String filename, String recordId) {
        ContentVersion cv = createContentVersion(base64, filename);
        ContentDocumentLink cdl = createContentLink(cv.Id, recordId);
        if (cv == null || cdl == null) { return null; }
        System.debug('updloadFile====>' + cdl.Id);
        return cdl.Id;
    }
  
    public static ContentVersion createContentVersion(String base64, String filename) {
        ContentVersion cv = new ContentVersion();
        cv.VersionData = EncodingUtil.base64Decode(base64);
        cv.Title = filename;
        cv.PathOnClient = filename;

        System.debug('createcontentVersion===>' + cv);
        try {
            insert cv;
            return cv;
        } catch(DMLException e) {
            System.debug(e);
            return null;
        }
    }

    

  
    private static ContentDocumentLink createContentLink(String contentVersionId, String recordId) {
        if (contentVersionId == null || recordId == null) { return null; }
        ContentDocumentLink cdl = new ContentDocumentLink();
        cdl.ContentDocumentId = [SELECT ContentDocumentId,ContentDocument.OwnerId FROM ContentVersion WHERE Id =: contentVersionId].ContentDocumentId;
        cdl.LinkedEntityId = recordId;
        cdl.ShareType = 'V';
        System.debug('createContentLink===>' + cdl);
        try {
            insert cdl;
            return cdl;
        } catch(DMLException e) {
            System.debug(e);
            return null;
        }
    }

    @AuraEnabled
    public static ContentDocumentLink fileList(String contentVersionId, String recordId) {
        if (contentVersionId == null || recordId == null) { return null; }
        ContentDocumentLink fileIdList = new ContentDocumentLink();
        fileIdList.ContentDocumentId = [SELECT ContentDocumentId, Id  FROM ContentVersion ].ContentDocumentId;
     
        System.debug('fileList===>' + fileIdList);
        try {
            insert fileIdList;
            return fileIdList;
        } catch(DMLException e) {
            System.debug(e);
            return null;
        }
    }
}