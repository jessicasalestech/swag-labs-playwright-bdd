Feature: Checkout
  As an authenticated user
  I want to complete the purchase of the products in my cart
  So I can get confirmation of my order

  Background:
    Given I am logged into the application
    And I add the product "Sauce Labs Backpack" to the cart
    And I accessed the shopping cart

  Scenario: Successfully complete a purchase
    When I start the checkout
    And I fill in the customer data
    And I finalize the purchase
    Then I see the order confirmed message