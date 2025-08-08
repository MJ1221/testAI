/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 01-08-2024
 * @last modified by  : minju.park@dkbmc.com
**/
public class addPrimaryContact implements Queueable {
    private Contact c;
    private String state;
    public AddPrimaryContact(Contact c, String state){
        this.c = c;
        this.state = state;
    }

    public void execute(QueueableContext context){
        List<Account> ListAccount = [SELECT Id,Name,(SELECT Id, FirstName, LastName FROM Contacts) FROM Account WHERE BillingState =: state LIMIT 200];
        List<Contact> firstContact = new List<Contact>();
        for(Account acc:ListAccount){
            Contact cont = c.clone(false, false, false, false);
            cont.AccountId = acc.Id;
            firstContact.add(cont);
        }
        if(firstContact.size()>0){
            insert firstContact;
        }
    }

    
}