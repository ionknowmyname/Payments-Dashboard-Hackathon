
PAYMENTS DASHBOARD HACKATHON - EXPRESSJS - MONGODB - TEAM 219


PROBLEM STATEMENT: https://www.kluster.africa/problem-statements/simplifying-small-business-payments


SETUP:

-   Install dependencies using npm or yarn,
-   Setup your MongoDB locally or use Atlas
-   Check package.json for start or dev commands


OBJECTIVE:

-   In line with the problem statement, our team decided on some core functionalities that are listed below:
    -   Users should be able to create an account and verify account
    -   Users should be able to get OTP in email
    -   Users should be able to add Customers to their profile and get Email Notification on Success
    -   Users should be able to create Invoice for their Customers and track the status of the Invoice
    -   Dashboard   


NOTES:

-   All implementations are optimized for quickness and not efficiency
-   Actual payments with 3rd party integrations e.g Paystack/Flutterwave is out of scope
-   Mobile app is out of scope, so is push notification and any real time notification. 
-   The nearest to real-time notification for web app was either to: 
    -   use a cron job to send email reminders to all customers across board with pending invoice payments, or 
    -   use a fixed period after each invoice is created to send email reminders for invoices pending payments.




EXTRA:

-   Postman Collection included