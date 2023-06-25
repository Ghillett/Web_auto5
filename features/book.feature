Feature: Book a seat

    Background:
        Given there is a taken seat in the first available seance
        
    Scenario: Book a common seat
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user selects "common" seat for available seance
        Then book button should be "active"
    Scenario: Book a VIP seat
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user selects "vip" seat for available seance
        Then book button should be "active"
    Scenario: Book an unavailable seat
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user selects "taken" seat for available seance
        Then book button should be "disabled"
