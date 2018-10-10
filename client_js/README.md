# NiMMbus Client

This is the code of the NiMMbus portal: "Earth observation everywhere. Share information and feedback with others." It is composed by a index.htm, several js files and some png images.

It dialogs with the NiMMbus.cgi using a OGC WPS RESTful API.

## Entry pages
[index.htm](index.htm) is the main page to enter the application.

[help/help.htm](help/help.htm) is the help page (_under development_) and includes an Appendix describing several test pages to show how NiMMbus GUF can be integrated in other community portals.

### index.htm parameters
index.htm can be called directly without any parameters. Nevertheless, parameters are useful to jump into a function directly altering the normal interaction flow with the user. Parameters follow the CGI syntax (see _test pages_ section in help to discover how this syntax can be created from a HTML FORM using the GET method). These are the current parameters.

* USER=, PASSWORD= and PAGE=MAIN allows for calling the page with the username and password avoiding the need to enter them manually in the entry form
* USER=, PASSWORD=, EMAIL= and PAGE=NEWUSER, allow for automatic creation of a new user
* LANGUAGE= sets the language preference that overwrites the user language settings
* TOKEN= and TOKEN_DESC= are for internal use in password recovery
* TARGET_TITLE=, TARGET_CODE=, TARGET_CODESPACE= and PAGE=ADDFEEDBACK allows for adding new feedback to a target that might or might not exist (if it does not exist, it is created automatically)
* PAGE= selects the panel that will be initially load. Current allowed values are: NEWPASSWORD, NEWUSER, TOKEN, RESETPASSWORD, MAIN, ADDFEEDBACK
