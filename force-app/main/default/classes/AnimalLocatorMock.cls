/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 12-26-2024
 * @last modified by  : minju.park@dkbmc.com
**/
public class AnimalLocatorMock implements HttpCalloutMock {

    // This method will return a mock response for the test
    public HttpResponse respond(HttpRequest req) {
        // Create a new HttpResponse object
        HttpResponse response = new HttpResponse();

        // Set the status code to 200 (OK)
        response.setStatusCode(200);

        // Create a mock JSON response body
        String mockResponseBody = '{"animal": {"id": 1, "name": "chicken", "eats": "worms", "says": "cluck"}}';

        // Set the response body
        response.setBody(mockResponseBody);

        // Return the mock response
        return response;
    }
}