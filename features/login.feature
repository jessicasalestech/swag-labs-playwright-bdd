Feature: Login
  As a system user
  I want to authenticate to the application
  So I can access the product catalog

  Background:
    Given I am on the login page

  Scenario: Login with a valid user
    When I fill in the valid credentials
    Then I am redirected to the products page

  Scenario: Login of a blocked user fails
    When I fill in the blocked user
    Then I see the locked out error message

  Scenario: Login with invalid credentials fails
    When I fill in an invalid user
    Then I see the invalid credentials error message