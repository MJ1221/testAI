/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 01-09-2025
 * @last modified by  : minju.park@dkbmc.com
**/
public class AnimalLocator {

    public class AnimalWrapper {

		Animal animal;

	}

    Public class Animal{

        public Integer id;

		public String name;

		public String eats;

		public String says;

    }

    public static string getAnimalNameById(integer id){

        string str;

        string URL='https://th-apex-http-callout.herokuapp.com/animals/'+id;

        http http=new http();

        httprequest Req=new httprequest();

        req.setEndpoint(URL);

        req.setMethod('GET');

        httpResponse Response=http.send(req);

        AnimalWrapper anj=(AnimalWrapper) System.JSON.deserialize(response.getBody(), AnimalWrapper.class);

        // System.debug('name is: '+anj.Animal.name );

        str=anj.Animal.name;

        return str;

    }

}