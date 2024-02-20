@btc @api
Feature: Google Finance API

  Scenario Outline: Monitor Realtime BTC-USD API
    Given I GET data
#    When I monitor BTC to USD exchange rate for <period> minutes every <interval> seconds
#    Then I check overall difference is not greater than 1 percent
#    And I check difference in interval values is not greater than 2 percent

    Examples:
      | period | interval |
      | 1      | 10       |
#      | 3      | 10       |
#      | 5      | 10       |
