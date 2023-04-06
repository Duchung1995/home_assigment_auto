Feature: Chat integrate Web application and Mobile application

  Scenario Outline: As a user, I use mobile app to send a chat message and web app to reply
    Given "User1_web" and "User2_web" on the Leapxpert login page web
    When "User1_web" logs in the Web Application with <companyName> <userName1> <password> <OTP>
    And "User1_web" requests activation code from the Web Application to allow to log in the Mobile App
    And On the mobile app, "User1_mobile" starts the mobile app then activation code
    And "User1_mobile" types the <password> on Mobile application
    And "User1_mobile" inputs <OTP>
    And "User1_mobile" goes to Contact tab
    And "User1_mobile" searches for <userName2> by "Auto 101 User 101"
    And "User1_mobile" sends <message> & <reply message> to User2
    And "User2_web" logs in the Web Application with <companyName> <userName2> <password> <OTP>
    Then "User2_web" verifies that he has received <message> and <reply message> from "Auto 100 User 100"

    Examples: 
      | companyName | userName1           | password        | OTP    | userName2           | message          | reply message         |
      | auto        | automation_auto_100 | Leaptesting@123 | 111111 | automation_auto_101 | send mess to US2 | replay message to US2 |
