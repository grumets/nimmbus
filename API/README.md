# NiMMbus API

## General request parameters
* All request are in KVP and have these 3 parameters:
SERVICE=WPS
REQUEST=EXECUTE
IDENTIFIER=NB_{class_type}:{operation}

## General response
All responses follow the WPS 1.0 syntax except the NB_RESOURCE:RETRIEVE request that follows ATOM syntax.

## User class request operations
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

## Resource class request operations

* Resource creation
  * IDENTIFIER=NB_RESOURCE:CREATE
  * LANGUAGE=cat,spa,eng
  * USER=
  * PASSWORD=
  * TITLE=
  * REASON=
  * TYPE=
  * SHARE_BORROWER_#= (User_id, user email or "Anonymous")
  * SHARE_RIGHTS_#= (A combination of the following letters R: Read, W: Write, S: Share. if Borrower is Anonymous this parameter does not apply and R is assumed)

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
  * USER=
  * PASSWORD=
  * STARTINDEX= (Starting by 1)
  * COUNT=
  * TYPE=
  * FORMAT=
  * XSL= (full url or "mm32")
  * CRS=  (for the moment only for application/x-mmzx output and for TYPE=POINT)
  * TARGET= (only for TYPE=FEEDBACK, resource_id)
  * TRG_FLD_#= (ID_CODE or ID_NAMESPACE)
  * TRG_VL_#=
  * TRG_OPR_#=EQ
  * TRG_NXS_#=AND
  * Examples
    * SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:ENUMERATE&LANGUAGE=cat&USER=JoanMaso&PASSWORD=****&STARTINDEX=1&COUNT=10&FORMAT=application/x-mmzx
    * SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:ENUMERATE&LANGUAGE=cat&USER=JoanMaso&PASSWORD=****&STARTINDEX=1&COUNT=10&FORMAT=text/html&XSL=mm32

* Resource details retrieval
  * IDENTIFIER=NB_RESOURCE:RETRIEVE
  * LANGUAGE=cat,spa,eng
  * USER=
  * PASSWORD=
  * RESOURCE=

* Resource modification
  * IDENTIFIER=NB_RESOURCE:MODIFY
  * LANGUAGE=cat,spa,eng
  * USER=
  * PASSWORD=
  * TITLE=
  * REASON=
  * TYPE=

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

## Share class request operations

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
  * TYPE=  (opcional)

## Sync class request operations

* Write request status request.
  * IDENTIFIER=NB_SYNC:GETRETURN
  * LANGUAGE=cat,spa,eng
  * SYNC_ID=

## Token class request operations

* Token execution. 
  * IDENTIFIER=NB_TOKEN:EXECUTE
  * LANGUAGE=cat,spa,eng
  * TOKEN=
  * PASSWORD=  (only for NB_USER:RESETPASSWORD, NB_SHARE:ADD and NB_SHARE:DENY tokens)
