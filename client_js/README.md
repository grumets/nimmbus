# NiMMbus Client.

This is the code of the NiMMbus portal: "Earth observation everywhere. Share information and feedback with others." It is composed by a index.htm, a owc_atom.js and some png images.

It dialogs with the NiMMbus.cgi using a OGC WPS RESTful API.

## Entry pages
index.htm is the main pages to enter the application
test.htm is a page to test how a feedback can be created by index.htm providing minimum set of information about the target. It only creates a call to index.htm like this: index.htm?target_title=Corine+Land+Cover+2012&target_code=c90fd0c1-ebdf-4df9-9216-4592ed843644&target_code_space=http://sdi.eea.europa.eu/catalogue&page=ADDFEEDBACK

### index.htm parameters
index.htm can be called direclty without. Parameters are useful to jump into a functionaly directly altering the normal interation flow with the user. Parametres follow the CGI syntax (see test.htm to discover how this sintax can be created from a HTML FORM using the GET method). These are the current parameters.

* USER=, PASSWORD= and PAGE=MAIN allows for calling the page with the username and password avoiding the need to enter them manualy in the entry form
* USER=, PASSWORD=, EMAIL= and PAGE=NEWUSER, allow for automatic creation of a new user
* LANGUAGE= sets the language preference that overwrites the user language setings
* TOKEN= and TOKEN_DESC= are for internal use in password revovery
* TARGET_TITLE=, TARGET_CODE=, TARGET_CODESPACE= and PAGE=ADDFEEDBACK allows for adding new feedback to a target that might or might not exist (if it does not exist, it is created automatically)
* PAGE= selects the pannel that will be initially load. Current allowed values are: NEWPASSWORD, NEWUSER, TOKEN, RESETPASSWORD, MAIN, ADDFEEDBACK
