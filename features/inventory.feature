Feature: Product Catalog
  As an authenticated user
  I want to view and manage the products in the catalog
  So I can build my order

  Background:
    Given I am logged into the application

  Scenario: Add product to the cart
    When I add the product "Sauce Labs Backpack" to the cart
    Then the cart count is 1

  Scenario: Add multiple products to the cart
    When I add the product "Sauce Labs Backpack" to the cart
    And I add the product "Sauce Labs Bike Light" to the cart
    Then the cart count is 2

  Scenario: Sort products by price (low to high)
    When I sort the products by "Price (low to high)"
    Then the first product is "Sauce Labs Onesie"