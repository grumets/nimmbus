# NiMMbus API
The Nimmbus API is based on the CRUD (create, retrieve, update, and delete) 4 basic functions for persistent storage/management of objects (https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). The API defines a set of object classes and provide mainly the 4 CRUD operations plus some additions when considered necessary. In this way, it mimics some of the RESTful design principles too.
The Nimmbus API uses the OGC WPS 1.0 standard but with 2 significant modifications:
* The the WPS execute request uses the WPS 1.0 abstract model but is implemted as GET requests (not present in the WPS 1.0 standard. 
* The CREATE, MODIFY (update) and DELETE operations are implicitelly assyncronous and repond a syncronization ID (more or less equivament to the job id introduced in WPS 2.0 standard). An extra operation allows for requesting NB_SYNC:GETRETURN the status of the assyncronous process or the actual result if the process has ended.

## General request parameters
* All request are in KVP and have these 3 parameters:
  * SERVICE=WPS
  * REQUEST=EXECUTE
  * IDENTIFIER=NB_{class_type}:{operation}
* In the folling descriptions a parameter ending by _# means that the paramters can be used n times substuting the # by sequential numbers starting by 1.

## General response
All responses follow the WPS 1.0 specified XML syntax except the NB_RESOURCE:RETRIEVE request that follows ATOM syntax.

## General exceptions
All responses follow the WPS 1.0 specified XML syntax for exceptions.

## NB_USER class request operations
* User Creation
  * IDENTIFIER=NB_USER:CREATE
  * LANGUAGE=cat,spa,eng
  * USER=
  * PASSWORD=
  * TOKEN= (optional)

* User Modification
  * IDENTIFIER=NB_USER:MODIFY
  * LANGUAGE=cat,spa,eng
  * USER=
  * PASSWORD=
  * NEW_USER=
  * NEW_PASSWORD=
  * EMAIL=
  * NAME=

* User Validation
  * IDENTIFIER=NB_USER:VALIDATE
  * LANGUAGE=cat,spa,eng
  * USER=
  * PASSWORD=

* User Availability
  * IDENTIFIER=NB_USER:AVAILABLE
  * LANGUAGE=cat,spa,eng
  * USER=
  * NEW_USER=
  
* User good password
  * IDENTIFIER=NB_USER:GOODPASSWORD
  * LANGUAGE=cat,spa,eng
  * USER=
  * PASSWORD=

* User reset password request
  * IDENTIFIER=NB_USER:RESETPASSWORD
  * LANGUAGE=cat,spa,eng
  * USER=

* User retrieve details
  * IDENTIFIER=NB_USER:RETRIEVE
  * LANGUAGE=cat,spa,eng
  * USER=
  * PASSWORD=

## NB_RESOURCE class request operations

* Resource creation (and simultaneous optional share creation)
  * IDENTIFIER=NB_RESOURCE:CREATE
  * LANGUAGE=cat,spa,eng
  * USER=
  * PASSWORD=
  * TITLE=
  * REASON=
  * TYPE=
  * SHARE_BORROWER_#= (optional, user_id, user email or "Anonymous")
  * SHARE_RIGHTS_#= (optional, a combination of the following letters R: Read, W: Write, S: Share. if Borrower is Anonymous this parameter does not apply and R is assumed)

* Resource HREF creation particulatities
  * IDENTIFIER=NB_RESOURCE:CREATE&TYPE=HREF
  * HREF=
  * MIMETYPE=

* Resource PoI creation particulatities
  * IDENTIFIER=NB_RESOURCE:CREATE&TYPE=POI
  * POSITION=  (template: <georss:where><gml:Point><gml:pos>lat long</gml:pos></gml:Point></georss:where>)
  * ELEVATION=  (template: <georss:elev>elevation</georss:elev>)

* Resource Feedback creation particulatities
  * IDENTIFIER=NB_RESOURCE:CREATE&TYPE=FEEDBACK
  * ABSTRACT=
  * CONTACT_ROLE=
  * COMMENT=
  * MOTIVATION=
  * RATING= 
  * TARGET_#=
  * TARGET_ROLE_#=

* Resource Citation creation particulatities
  * IDENTIFIER=NB_RESOURCE:CREATE&TYPE=CITATION
  * ID_CODE=
  * ID_NAMESPACE=
  * URL_LINK=
  * URL_DESCRIP=
  * URL_FUNCTION=

* Resource enumeration
  * IDENTIFIER=NB_RESOURCE:ENUMERATE
  * LANGUAGE=cat,spa,eng
  * USER=  (Optional. If not provided, "Anonymous" is assumed)
  * PASSWORD= (Optional. Do not use if USER=Anonymous)
  * STARTINDEX= (Starting by 1. Optional. default is 1. )
  * COUNT= (Optional, default is 10)
  * TYPE= (Optional, default is ALL).
  * FORMAT= (Optional, default is text/xml, returning an ATOM file).
  * XSL= (full url or "mm32". Optional)
  * CRS=  (for the moment only for application/x-mmzx output and for TYPE=POINT)
  * TARGET= (resource_id. Optional, indicate only if TYPE=FEEDBACK)
  * TRG_FLD_#= (Optional filter. Currently can only be ID_CODE or ID_NAMESPACE)
  * TRG_VL_#= (Optional filter)
  * TRG_OPR_#=EQ (Optional filter)
  * TRG_NXS_#=AND (Optional filter)
  * TRG_PRTY_#= (Optional filter)
  * Examples
    * SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:ENUMERATE&LANGUAGE=cat&USER=JoanMaso&PASSWORD=****&STARTINDEX=1&COUNT=10&FORMAT=application/x-mmzx
    * SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:ENUMERATE&LANGUAGE=cat&USER=JoanMaso&PASSWORD=****&STARTINDEX=1&COUNT=10&FORMAT=text/html&XSL=mm32

* Resource details retrieval
  * IDENTIFIER=NB_RESOURCE:RETRIEVE
  * LANGUAGE=cat,spa,eng
  * USER=  (Optional. If not provided, "Anonymous" is assumed)
  * PASSWORD= (Optional. Do not use if USER=Anonymous)
  * RESOURCE=

* Resource modification
  * IDENTIFIER=NB_RESOURCE:MODIFY
  * LANGUAGE=cat,spa,eng
  * USER=
  * PASSWORD=
  * TITLE=
  * REASON=
  * TYPE=
If a paremeter is not indicated the value is not modified. If the paremeter is indicated but is black the value is erased.

* Resource HREF modification particulatities
  * IDENTIFIER=NB_RESOURCE:MODIFY&TYPE=HREF
  * HREF=
  * MIMETYPE=

* Resource PoI modification particulatities
  * IDENTIFIER=NB_RESOURCE:MODIFY&TYPE=POI
  * POSITION=  (example: <georss:where><gml:Point><gml:pos>lat long</gml:pos></gml:Point></georss:where>)
  * ELEVATION=  (example: <georss:elev>elevation</georss:elev>)

* Resource Feedback modification particulatities
  * IDENTIFIER=NB_RESOURCE:MODIFY&TYPE=FEEDBACK
  * ABSTRACT=
  * CONTACT_ROLE=
  * COMMENT=
  * MOTIVATION=
  * RATING= 
  * TARGET_#=
  * TARGET_ROLE_#=

To manage targets of a feedback, only two strategies are available at the moment:
 1. Neither target_# nor targer_role_# are described on the NB_RESOURCE:MODIFY, then ther targets of this feedback are not changed
 2. If one or more target_# and target_role_# couples are defined, then ALL the previous targets of this feedback are deleted and the new list is described. 
 3. There is also the possiblity of giving only one TARGET_1= empty, and this mean that the current targets are deleted on no one is added (so the feedback is at this moment without targets (that should not happen, in fact).

* Resource Citation modification particulatities
  * IDENTIFIER=NB_RESOURCE:MODIFY&TYPE=CITATION
  * ID_CODE=
  * ID_NAMESPACE=
  * URL_LINK=
  * URL_DESCRIP=
  * URL_FUNCTION=

* Resource deletion
  * IDENTIFIER=NB_RESOURCE:DELETE
  * RESOURCE=

## NB_SHARE class request operations

* Add a share target (borrower) to a resource
  * IDENTIFIER=NB_SHARE:ADD
  * LANGUAGE=cat,spa,eng
  * USER=
  * PASSWORD=
  * RESOURCE=
  * BORROWER=
  * RIGHTS= (A combination of the following letters R: Read, W: Write, S: Share)

* Delete a share target (borrower) to a resource
  * IDENTIFIER=NB_SHARE:DELETE
  * LANGUAGE=cat,spa,eng
  * USER=
  * PASSWORD=
  * RESOURCE=
  * BORROWER=

* Resource share enumeration (Enumerates users (borrowers) that have access to a resource)
  * IDENTIFIER=NB_SHARE:ENUMERATE
  * LANGUAGE=cat,spa,eng
  * USER=
  * PASSWORD=
  * RESOURCE=

* Share deny. A borrewer denies a user to share resources (for all types) to a borrower.
  * IDENTIFIER=NB_SHARE:DENY
  * LANGUAGE=cat,spa,eng
  * USER=
  * PASSWORD= 
  * SHARER=  (user SHARER= or BORROWER= but not both. If SHARER= is used, the USER= is the borrower and do not want to accept shares from SHARER=)
  * BORROWER= (if the USER= is the sharer and want to auto-deny sharing with the borrower. Used internaly with tokens)

* Share authorized (Enumerates users (borrowers) that have authorized to have access to a resource type from this user)
  * IDENTIFIER=NB_SHARE:AUTORIZED
  * LANGUAGE=cat,spa,eng
  * USER=
  * PASSWORD=
  * TYPE=  (Optional)

## NB_SYNC class request operations

* Write request status request.
  * IDENTIFIER=NB_SYNC:GETRETURN
  * LANGUAGE=cat,spa,eng
  * SYNC_ID=

## NB_TOKEN class request operations

* Token execution. 
  * IDENTIFIER=NB_TOKEN:EXECUTE
  * LANGUAGE=cat,spa,eng
  * TOKEN=
  * PASSWORD=  (only for NB_USER:RESETPASSWORD, NB_SHARE:ADD and NB_SHARE:DENY tokens)
