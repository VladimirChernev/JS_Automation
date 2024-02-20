@btc @ui
Feature: Google Finance

  Scenario Outline: Monitor Realtime BTC-USD
    Given I navigate to the "google finance" page
    And I click reject all cookies button
#    And I see title "Bitcoin (BTC) Price, real-time quote and news – Google Finance"  -> should be contains "BTC/USD Google Finance"
    When I monitor BTC to USD exchange rate for <period> minutes every <interval> seconds
    Then I check overall difference is not greater than 1 percent
    And I check difference in interval values is not greater than 2 percent

    Examples:
      | period | interval |
      | 1      | 10       |
#      | 3      | 10       |
#      | 5      | 10       |