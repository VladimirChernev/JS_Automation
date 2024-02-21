@btc
Feature: Google Finance


  @ui
  Scenario Outline: Monitor Realtime BTC-USD through UI
    Given I navigate to the "google finance" page
    And I click reject all cookies button
    When I monitor BTC to USD exchange rate for <period> minutes every <interval> seconds
    Then I check overall difference is not greater than 1 percent
    And I check difference in interval values is not greater than 2 percent

    Examples:
      | period | interval |
      | 1      | 10       |
#      | 3      | 10       |
#      | 5      | 10       |

  
  @api
  Scenario Outline: Monitor Realtime BTC-USD through API
    When I monitor BTC to USD exchange rate using API for <period> minutes every <interval> seconds
    Then I check overall difference is not greater than 1 percent
    And I check difference in interval values is not greater than 2 percent

    Examples:
      | period | interval |
      | 1      | 10       |
#      | 3      | 10       |
#      | 5      | 10       |
