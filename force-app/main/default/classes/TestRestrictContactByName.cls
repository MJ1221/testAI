@isTest
public class TestRestrictContactByName {
    @isTest 
    public static void testContact(){
        Contact cnt = new Contact();
        cnt.LastName = 'INVALIDNAME';
        Database.SaveResult res = Database.insert(cnt,false);
        System.assertEquals('The Last Name "INVALIDNAME" is not allowed for DML',res.getErrors()[0].getMessage());
    }

}