# NiMMbus API

The NiMMbus service is an OGC Geospatial User Feedback (GUF) implementation developed by the MiraMon team of the Grumets research group in the Universitat Autònoma de Barcelona and the CREAF, based on the previous NiMMbus system and evolved as a contribution to the H2020 NextGEOSS project. The NextGEOSS project has received funding from the European Union Horizon 2020 research and innovation programme under grant agreement No 730329.

The Nimmbus API is based on the CRUD (create, retrieve, update, and delete) 4 basic functions for persistent storage/management of objects (https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). The API defines a set of object classes and provide mainly the 4 CRUD operations plus some additions when considered necessary. In this way, it mimics some of the RESTful design principles too.

The Nimmbus API uses the OGC WPS 1.0 standard but with 2 significant modifications:
* The WPS execute request uses the WPS 1.0 abstract model but is implemented as GET requests (not present in the WPS 1.0 standard.
* The CREATE, MODIFY (update) and DELETE operations are implicitly asynchronous and respond a synchronization ID (more or less equivalent to the job id introduced in WPS 2.0 standard). An extra operation allows for requesting NB_SYNC:GETRETURN the status of the asynchronous process or the actual result if the process has ended.

## General request parameters
* All request are in KVP and have these 3 parameters:
  * SERVICE=WPS
  * REQUEST=EXECUTE
  * IDENTIFIER=NB_{class_type}:{operation}
* In the following descriptions a parameter ending by _# means that the parameters can be used n times substituting the # by sequential numbers starting by 1.

## General response
All responses follow the WPS 1.0 specified XML syntax except the NB_RESOURCE:ENUMERATE request that follows ATOM syntax.

## General exceptions
All responses follow the WPS 1.0 specified XML syntax for exceptions.

## NB_USER class request operations
* User Creation
  * IDENTIFIER=NB_USER:CREATE
  * LANGUAGE=cat,spa,eng
  * USER=
  * PASSWORD=
  * TOKEN= (optional)
  * EMAIL=
  * NAME=

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
  * SHARE_BORROWER_#= (optional, user_name, user email or "Anonymous")
  * SHARE_RIGHTS_#= (optional, a combination of the following letters R: Read, W: Write, S: Share. if Borrower is Anonymous this parameter does not apply and R is assumed)

* Resource HREF creation particularities
  * IDENTIFIER=NB_RESOURCE:CREATE&TYPE=HREF
  * HREF=
  * MIMETYPE=

* Resource PoI creation particularities
  * IDENTIFIER=NB_RESOURCE:CREATE&TYPE=POI
  * POSITION=  (template: <georss:where><gml:Point><gml:pos>lat long</gml:pos></gml:Point></georss:where>)
  * ELEVATION=  (template: <georss:elev>elevation</georss:elev>)

* Resource Feedback creation particularities
  * IDENTIFIER=NB_RESOURCE:CREATE&TYPE=FEEDBACK
  * CONTACT_ROLE=
  * COMMENT=
  * MOTIVATION=
  * RATING=
  * TARGET_#=
  * TARGET_ROLE_#=
  * PUB_#=
  * REPORT_ASPECT=	//comma-separated selected values among: usage, fitnessForPurpose, limitation, alternative and problem. E.g. "usage,limitation"
  * SPECIFIC_USAGE=
  * USAGE_DATE_TIME=	//Format YYYY-MM-DDTHH:MM:SSZ is required
  * USER_DETERMINED_LIMITATIONS=
  * RESPONSE=
  * ADD_DOC_#=
  * RU_CODE=
  * RU_CODE_LINK=
  * RU_CODE_FORMAT=
  * RU_PLATFORM=
  * RU_VERSION=
  * RU_SCHEMA=
  * RU_DIAGRAM=
  * RU_DIAGRAM_LINK=
  * RU_DIAGRAM_FORMAT=   
  * KNOWN_PROBLEM=
  * PROBLEM_DATE_TIME=	//Format YYYY-MM-DDTHH:MM:SSZ is required
  * WORK_AROUND=
  * REF_DOC_#=
  * EXPECTED_FIX_DATE=	//Format YYYY-MM-DD is required
  * ALT_RSRC_#=
  * FIX_RSRC_#=

* Resource Citation creation particularities
  * IDENTIFIER=NB_RESOURCE:CREATE&TYPE=CITATION
  * ID_CODE=
  * ID_NAMESPACE=
  * URL_LINK=
  * URL_DESCRIP=
  * URL_FUNCTION=
  * EDITION=
  * EDITION_DATE=	//Format YYYY-MM-DD is required
  * SERIES_NAME=
  * SERIES_ISSUE_ID=
  * SERIES_PAGE=
  * OTHER_CIT_DETAILS=
  * RESPONSIBLE_#=
  * RESPONSIBLE_ROLE_#=

* Resource Publication creation particularities
  * IDENTIFIER=NB_RESOURCE:CREATE&TYPE=PUBLICAT
  * ID_CODE=
  * ID_NAMESPACE=
  * URL_LINK=
  * URL_DESCRIP=
  * URL_FUNCTION=
  * EDITION=
  * EDITION_DATE=	//Format YYYY-MM-DD is required
  * SERIES_NAME=
  * SERIES_ISSUE_ID=
  * SERIES_PAGE=
  * OTHER_CIT_DETAILS=
  * RESPONSIBLE_#=
  * RESPONSIBLE_ROLE_#=
  * CATEGORY=
  * ABSTRACT=

* Resource INDIVIDU creation particularities
  * IDENTIFIER=NB_RESOURCE:CREATE&TYPE=INDIVIDU
  * EMAIL=
  * URL_LINK=
  * ID_CODE_1=
  * ID_NAMESPACE_1=
  * ID_CODE_2=
  * ID_NAMESPACE_2=

* Resource ORGANISM creation particularities
  * IDENTIFIER=NB_RESOURCE:CREATE&TYPE=ORGANISM
  * TITLE=
  * DELIVERY_POINT=
  * CITY=
  * ADM_AREA=
  * POSTAL_CODE=
  * COUNTRY=

* Resource enumeration
  * IDENTIFIER=NB_RESOURCE:ENUMERATE
  * LANGUAGE=cat,spa,eng
  * USER=  (Optional. If not provided, "Anonymous" is assumed)
  * PASSWORD= (Optional. Do not use if USER=Anonymous)
  * STARTINDEX= (Starting by 1. Optional. Default is 1)
  * COUNT= (Optional, default is 10)
  * TYPE= (Optional, default is ALL)
  * FORMAT= (Optional, default is text/xml, returning an ATOM file)
  * CONTENT= (Optional, default is empty. If CONTENT=full the content element (of each entry) contains the complex content for TYPE=FEEDBACK, TYPE=CITATION and TYPE=PUBLICAT)
  * XSL= (full url or "mm32". Optional)
  * CRS=  (for the moment only for application/x-mmzx output and for TYPE=POINT)
  * OWNER= (Optional, default is empty or ALL that means "ME,OTHERS"). If OWNER=ME, only resources owned by USER are listed. If OWNER=OTHERS, only resources directly shared with USER are listed.
	Default value (empty or ALL) means that resources owned by USER as well as resources directly shared with him/her are shown. If OWNER=OPEN, only publicly available resources (also the ones by
	the indicated user) are shown.
	ALL is assumed if any other no-predefined option is used)
  * TARGET= (resource_id. Optional filter applicable if TYPE=FEEDBACK)
  * TRG_ROLE= (Optional filter applicable if TYPE=FEEDBACK. Currently can only be "primary", "secondary" or "supplementary")
  * TRG_TYPE_#= (Optional filter applicable if TYPE=FEEDBACK. Currently can only be CITATION)
  * TRG_FLD_#= (Optional filter applicable if TYPE=FEEDBACK. Currently can only be CODE or NAMESPACE)
  * TRG_VL_#= (Optional filter applicable if TYPE=FEEDBACK)
  * TRG_OPR_#=EQ (Optional filter applicable if TYPE=FEEDBACK)
  * TRG_NXS_#=AND (Optional filter applicable if TYPE=FEEDBACK)
  * TRG_PRTY_#= (Optional. Starts with 1)  
  * RSC_FLD_#= (Optional filter applicable if TYPE=FEEDBACK. Currently can only be ABSTRACT, REASON, ROLE, COMMENT, MOTIVATION, RATING, REP_ASPECT, SPCF_USAGE, USAGE_DT, US_DET_LIM, RESPONSE, 
	RU_CODE, RU_CODE_LINK, RU_CODE_FORMAT, RU_PLATFORM, RU_VERSION, RU_SCHEMA, RU_DIAGRAM, RU_DIAGRAM_LINK, RU_DIAGRAM_FORMAT, KWN_PRBLM, PRBLM_DT, WORK_ARND, EXP_FIX_D  
  * RSC_VL_#= (Optional filter applicable if TYPE=FEEDBACK)
  * RSC_OPR_#=EQ (Optional filter applicable if TYPE=FEEDBACK)
  * RSC_NXS_#=AND (Optional filter applicable if TYPE=FEEDBACK)
  * RSC_PRTY_#= (Optional. Starts with 1)
  * Examples:
    * SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:ENUMERATE&LANGUAGE=cat&USER=JoanMaso&PASSWORD=****&STARTINDEX=1&COUNT=10&FORMAT=application/x-mmzx
    * SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:ENUMERATE&LANGUAGE=cat&USER=JoanMaso&PASSWORD=****&STARTINDEX=1&COUNT=10&FORMAT=text/html&XSL=mm32
    * SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:ENUMERATE&LANGUAGE=eng&USER=Anonymous&TYPE=FEEDBACK
		&TRG_TYPE_1=CITATION&TRG_FLD_1=CODE&TRG_VL_1=c90fd0c1-ebdf-4df9-9216-4592ed843644&TRG_OPR_1=EQ&TRG_NXS_1=AND
		&TRG_TYPE_2=CITATION&TRG_FLD_2=NAMESPACE&TRG_VL_2=http://sdi.eea.europa.eu/catalogue&TRG_OPR_2=EQ"
			* This request retrieves all the FB items targeting the Sentinel2Level2aCollection (in http://sdi.eea.europa.eu/catalogue&TRG_OPR_2=EQ) (with any target role)
    * SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:ENUMERATE&LANGUAGE=eng&STARTINDEX=1&COUNT=100&FORMAT=text/xml&TYPE=FEEDBACK
		&TRG_TYPE_1=CITATION&TRG_FLD_1=CODE&TRG_VL_1=Sentinel2Level2aCollection&TRG_OPR_1=EQ&TRG_NXS_1=AND
		&TRG_TYPE_2=CITATION&TRG_FLD_2=NAMESPACE&TRG_VL_2=http://datacube.uab.cat/cgi-bin/ecopotential/miramon.cgi&TRG_OPR_2=EQ
		&TRG_ROLE=primary
			* This request retrieves all the FB items primary targeting the Sentinel2Level2aCollection (in http://datacube.uab.cat/cgi-bin/ecopotential/miramon.cgi)
    * SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:ENUMERATE&LANGUAGE=eng&STARTINDEX=1&COUNT=100&FORMAT=text/xml&TYPE=FEEDBACK
		&TRG_TYPE_1=CITATION&TRG_FLD_1=CODE&TRG_VL_1=DonanaSentinel2Level2a&TRG_OPR_1=EQ&TRG_NXS_1=AND
		&TRG_TYPE_2=CITATION&TRG_FLD_2=NAMESPACE&TRG_VL_2=http://datacube.uab.cat/cgi-bin/ecopotential/miramon.cgi&TRG_OPR_2=EQ
		&RSC_FLD_1=RU_PLATFORM&RSC_VL_1=https://github.com/joanma747/MiraMonMapBrowser&RSC_OPR_1=EQ&RSC_NXS_1=AND
		&RSC_FLD_2=RU_VERSION&RSC_VL_2=6.0&RSC_OPR_2=EQ&RSC_NXS_2=AND
		&RSC_FLD_3=RU_SCHEMA&RSC_VL_3=config-schema.json%23%2Fdefinitions%2Festil&RSC_OPR_3=EQ
			* This request retrives all the FB items targeting DonanaSentinel2Level2a in http://datacube.uab.cat/cgi-bin/ecopotential/miramon.cgi which has the 
			reproducible usage section defined with a certain platform (https://github.com/joanma747/MiraMonMapBrowser), a certain version (6.0) and a certain
			schema (config-schema.json%23%2Fdefinitions%2Festil). It is interesting to retrive a certain "type" of reproducible usage that can applied under
			certain circumstances. Typically these feedback items type are created and retrieved using the widget functions for reproducible usage.

			
			&&& el widget d'aquest darrer ha de dir PRIMARY en fer la petició, tb, que no sigui un secundari d'aquest però no s'hi pugui aplicar?
			
			&&& si no diu role porta torna els primary o tots? jo diria que tots, oi? confirmar en una petició "normal" sobre la coleccio
		
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
  * RESOURCE=
  * PASSWORD=
  * TITLE=
  * REASON=
  * TYPE=
If a parameter is not indicated the value is not modified. If the parameter is indicated but is blank the value is erased.

* Resource HREF modification particularities
  * IDENTIFIER=NB_RESOURCE:MODIFY&TYPE=HREF
  * HREF=
  * MIMETYPE=

* Resource PoI modification particularities
  * IDENTIFIER=NB_RESOURCE:MODIFY&TYPE=POI
  * POSITION=  (example: <georss:where><gml:Point><gml:pos>lat long</gml:pos></gml:Point></georss:where>)
  * ELEVATION=  (example: <georss:elev>elevation</georss:elev>)

* Resource Feedback modification particularities
  * IDENTIFIER=NB_RESOURCE:MODIFY&TYPE=FEEDBACK
  * CONTACT_ROLE=
  * COMMENT=
  * MOTIVATION=
  * RATING=
  * TARGET_#=
  * TARGET_ROLE_#=
	To manage targets of a feedback, there are three strategies available at the moment:
	 1. Neither TARGET_# nor TARGET_ROLE_# are described on the NB_RESOURCE:MODIFY, then the targets of this feedback are not changed
	 2. If one or more TARGET_# and TARGET_ROLE_# couples are defined, then ALL the previous targets of this feedback are deleted and the new list is described
	 3. There is also the possibility of giving only one TARGET_1= empty, and this mean that the current targets are deleted on no one is added (so the feedback has no targets after this modification (that should not happen, in fact))
  * PUB_#=
	To manage publications within a feedback item, there are three strategies available at the moment:
	 1. PUB_# is not described on the NB_RESOURCE:MODIFY, then the publications of this feedback are not changed
	 2. If one or more PUB_# are defined, then ALL the previous publications of this feedback are deleted and the new list is described
	 3. There is also the possibility of giving only one PUB_1= empty, and this mean that the current publications are deleted on no one is added
  * REPORT_ASPECT=	//comma-separated selected values among: usage, fitnessForPurpose, limitation, alternative and problem. E.g. "usage,limitation"
  * SPECIFIC_USAGE=
  * USAGE_DATE_TIME=	//Format YYYY-MM-DDTHH:MM:SSZ is required
  * USER_DETERMINED_LIMITATIONS=
  * RESPONSE=
  * ADD_DOC_#=	//Same strategy than for PUB_#= (above in this section) is applied    
  * RU_CODE=
  * RU_CODE_LINK=
  * RU_CODE_FORMAT=
  * RU_PLATFORM=
  * RU_VERSION=
  * RU_SCHEMA=
  * RU_DIAGRAM=
  * RU_DIAGRAM_LINK=
  * RU_DIAGRAM_FORMAT=  
  * KNOWN_PROBLEM=
  * PROBLEM_DATE_TIME=	//Format YYYY-MM-DDTHH:MM:SSZ is required
  * WORK_AROUND=
  * REF_DOC_#=	//Same strategy than for PUB_#= (above in this section) is applied
  * EXPECTED_FIX_DATE=	//Format YYYY-MM-DD is required
  * ALT_RSRC_#=	//Same strategy than for PUB_#= (above in this section) is applied
  * FIX_RSRC_#=	//Same strategy than for PUB_#= (above in this section) is applied

* Resource Citation modification particularities
  * IDENTIFIER=NB_RESOURCE:MODIFY&TYPE=CITATION
  * ID_CODE=
  * ID_NAMESPACE=
  * URL_LINK=
  * URL_DESCRIP=
  * URL_FUNCTION=
  * EDITION=
  * EDITION_DATE=	//Format YYYY-MM-DD is required
  * SERIES_NAME=
  * SERIES_ISSUE_ID=
  * SERIES_PAGE=
  * OTHER_CIT_DETAILS=
  * RESPONSIBLE_#=
  * RESPONSIBLE_ROLE_#=
	To manage responsible parties of a citation, there are three strategies available at the moment:
	 1. Neither RESPONSIBLE_# nor RESPONSIBLE_ROLE_# are described on the NB_RESOURCE:MODIFY, then the responsible parties of this citation are not changed
	 2. If one or more RESPONSIBLE_# and RESPONSIBLE_ROLE_# couples are defined, then ALL the previous responsible parties of this citation are deleted and the new list is described
	 3. There is also the possibility of giving only one RESPONSIBLE_1= empty, and this mean that the current responsible parties are deleted on no one is added (so the citation has no responsible parties after this modification)

* Resource Publication modification particularities
  * IDENTIFIER=NB_RESOURCE:MODIFY&TYPE=PUBLICAT
  * ID_CODE=
  * ID_NAMESPACE=
  * URL_LINK=
  * URL_DESCRIP=
  * URL_FUNCTION=
  * EDITION=
  * EDITION_DATE=	//Format YYYY-MM-DD is required
  * SERIES_NAME=
  * SERIES_ISSUE_ID=
  * SERIES_PAGE=
  * OTHER_CIT_DETAILS=
  * RESPONSIBLE_#=
  * RESPONSIBLE_ROLE_#=
	To manage responsible parties of a publication, there are three strategies available at the moment:
	 1. Neither RESPONSIBLE_# nor RESPONSIBLE_ROLE_# are described on the NB_RESOURCE:MODIFY, then the responsible parties of this publication are not changed
	 2. If one or more RESPONSIBLE_# and RESPONSIBLE_ROLE_# couples are defined, then ALL the previous responsible parties of this publication are deleted and the new list is described
	 3. There is also the possibility of giving only one RESPONSIBLE_1= empty, and this mean that the current responsible parties are deleted on no one is added (so the publication has no responsible parties after this modification)
  * CATEGORY=
  * ABSTRACT=

* Resource INDIVIDU modification particularities
  * IDENTIFIER=NB_RESOURCE:MODIFICATION&TYPE=INDIVIDU
  * EMAIL=
  * URL_LINK=
  * ID_CODE_1=
  * ID_NAMESPACE_1=
  * ID_CODE_2=
  * ID_NAMESPACE_2=

* Resource ORGANISM modification particularities
  * IDENTIFIER=NB_RESOURCE:MODIFICATION&TYPE=ORGANISM
  * TITLE=
  * DELIVERY_POINT=
  * CITY=
  * ADM_AREA=
  * POSTAL_CODE=
  * COUNTRY=

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
  * BORROWER_TYPE= (optional. Needed if BORROWER= is provided and should be validated y external user system)
  * RIGHTS= (A combination of the following letters R: Read, W: Write, S: Share)

* Delete a share target (borrower) to a resource
  * IDENTIFIER=NB_SHARE:DELETE
  * LANGUAGE=cat,spa,eng
  * USER=
  * PASSWORD=
  * RESOURCE=
  * BORROWER=
  * BORROWER_TYPE= (optional. Needed if BORROWER= is provided and should be validated y external user system)

* Resource share enumeration (Enumerates users (borrowers) that have access to a resource)
  * IDENTIFIER=NB_SHARE:ENUMERATE
  * LANGUAGE=cat,spa,eng
  * USER=
  * PASSWORD=
  * RESOURCE=

* Share deny. A borrower denies a user to share resources (for all types) to a borrower.
  * IDENTIFIER=NB_SHARE:DENY
  * LANGUAGE=cat,spa,eng
  * USER=
  * PASSWORD=
  * SHARER=  (user SHARER= or BORROWER= but not both. If SHARER= is used, the USER= is the borrower and do not want to accept shares from SHARER=)
  * SHARER_TYPE= (optional. Needed if SHARER= is provided and should be validated y external user system)
  * BORROWER= (if the USER= is the sharer and want to auto-deny sharing with the borrower. Used internally with tokens)
  * BORROWER_TYPE= (optional. Needed if BORROWER= is provided and should be validated y external user system)

* Share authorized (Enumerates users (borrowers) that have authorized to have access to a resource type from this user)
  * IDENTIFIER=NB_SHARE:AUTORIZED
  * LANGUAGE=cat,spa,eng
  * USER=
  * PASSWORD=
  * TYPE=  (Optional)

## NB_SYNC class request operations

* Request status of a previous create, edit or delete process.
  * IDENTIFIER=NB_SYNC:GETRETURN
  * LANGUAGE=cat,spa,eng
  * SYNC_ID=

## NB_TOKEN class request operations

* Token execution.
  * IDENTIFIER=NB_TOKEN:EXECUTE
  * LANGUAGE=cat,spa,eng
  * TOKEN=
  * PASSWORD=  (only for NB_USER:RESETPASSWORD, NB_SHARE:ADD and NB_SHARE:DENY tokens)
