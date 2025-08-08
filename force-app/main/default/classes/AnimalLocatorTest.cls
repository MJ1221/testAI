/**
 * @description       : 
 * @author            : minju.park@dkbmc.com
 * @group             : 
 * @last modified on  : 12-26-2024
 * @last modified by  : minju.park@dkbmc.com
**/
@isTest
public class AnimalLocatorTest {

    // Test method for AnimalLocator.getAnimalNameById
    @isTest
    static void getAnimalNameByIdTest() {
        // Set the mock response using Test.setMock
        Test.setMock(HttpCalloutMock.class, new AnimalLocatorMock()); 

        // Call the method from AnimalLocator class
        String response = AnimalLocator.getAnimalNameById(1);

        // Verify that the response matches the expected value
        System.assertEquals('chicken', response, 'The animal name should be chicken');
    }

    // Additional test case for invalid ID (should throw an exception)
    @isTest
    static void getAnimalNameByInvalidIdTest() {
        try {
            AnimalLocator.getAnimalNameById(0);  // Invalid ID
            System.assert(false, 'Expected IllegalArgumentException was not thrown');
        } catch (IllegalArgumentException e) {
            System.assertEquals('Invalid ID provided', e.getMessage(), 'Exception message should match');
        }
    }

    // Additional test case for valid ID with mock response
    @isTest
    static void getAnimalNameByValidIdTest() {
        // Set the mock response using Test.setMock
        Test.setMock(HttpCalloutMock.class, new AnimalLocatorMock());

        // Call the method from AnimalLocator class with a valid ID
        String response = AnimalLocator.getAnimalNameById(2);  // Assuming animal ID 2 returns 'dog'

        // Verify that the response matches the expected value
        System.assertEquals('dog', response, 'The animal name should be dog');
    }

    // Test case for ID less than or equal to 0 (throws an exception)
    @isTest
    static void testInvalidAnimalIdZero() {
        try {
            AnimalLocator.getAnimalNameById(0); // Invalid ID
            System.assert(false, 'Expected IllegalArgumentException to be thrown');
        } catch (IllegalArgumentException e) {
            System.assertEquals('Invalid ID provided', e.getMessage(), 'Exception message should be "Invalid ID provided"');
        }
    }

    // Test case for null ID (throws an exception)
    @isTest
    static void testNullAnimalId() {
        try {
            AnimalLocator.getAnimalNameById(null); // Null ID
            System.assert(false, 'Expected IllegalArgumentException to be thrown');
        } catch (IllegalArgumentException e) {
            System.assertEquals('Invalid ID provided', e.getMessage(), 'Exception message should be "Invalid ID provided"');
        }
    }
}