# Instructions for the integration of the GUF system (based on the NiMMbus service) in a catalogue

This page provides general instructions for integration. You can see an working examples of this procedure here:
  * [integration with the DAB API](http://www.creaf.uab.cat/temp/dab) ([source code](guf_dab_nimmbus.htm)).
  * [integration with the INSPIRE Portal](http://www.creaf.uab.cat/temp/inspire) ([source code](guf_inspire_nimmbus.htm)).

## How to include a button to add feedback for a catalogue entry

For each entry in a catalogue, a button with a text [Add feedback] is expected, at the end of the general description of the resource.

The button will start another window with the NiMMbus interface (href target=_blank). To ease the process to the user, the link to NiMMbus can be populated with the target_code and target_codespace of the catalogue entry (a target_title is also recommended).

To create the URL please follow the template: https://www.opengis.uab.cat/nimmbus/index.htm?target_title={target_title}&target_code={target_code}&target_codespace={target_codespace}&page=ADDFEEDBACK&share_borrower_1=Anonymous

For more details go to [test htm](../client_js/test.htm).

## How to request feedback about a catalogue entry

For each entry in the catalogue, a list of previous user feedback items is expected to be shown. To do that the NiMMbus API allows for an easy retrieval of this information as an ATOM file format.

To create the URL please follow the ENUMERATE template: https://www.opengis.uab.cat/cgi-bin/nimmbus/nimmbus.cgi?SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:ENUMERATE&LANGUAGE=eng&STARTINDEX=1&COUNT=100&FORMAT=text/xml&TYPE=FEEDBACK&TRG_TYPE_1=CITATION&TRG_FLD_1=CODE&TRG_VL_1={catalogue_id}&TRG_OPR_1=EQ&TRG_NXS_1=AND&TRG_TYPE_2=CITATION&TRG_FLD_2=NAMESPACE&TRG_VL_2={catalogue_namespace}&TRG_OPR_2=EQ

Example of sucessful response:
```xml 
<?xml version="1.0" encoding="iso-8859-1"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:georss="http://www.georss.org/georss" xmlns:gml="http://www.opengis.net/gml" xmlns:owc="http://www.opengis.net/owc/1.0" xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/" xml:lang="ca">
    <link rel="profile" href="http://www.opengis.net/spec/owc-atom/1.0/req/core" title="This file is compliant with version 1.0 of OGC Context"/>
    <title>Nimmbus resources response</title>
    <id>http://www.opengis.uab.cat/cgi-bin/nimmbus/nimmbus.cgi?SERVICE=WPS&amp;REQUEST=EXECUTE&amp;IDENTIFIER=NB_RESOURCE:ENUMERATE&amp;LANGUAGE=eng</id>
    <subtitle type="text">Resources [1, 1] of 1 shared with "Anonymous" user</subtitle>
    <updated>2017-07-18T17:37:18.471Z</updated>
    <dc:publisher>Nimmbus</dc:publisher>
    <generator uri="https://www.opengis.uab.cat/nimmbus/" version="1.0">
         NiMMbus: MiraMon Cloud Service NB_RESOURCE:ENUMERATE
    </generator>
    <rights>
    </rights>
    <opensearch:totalResults>1</opensearch:totalResults>
    <opensearch:startIndex>1</opensearch:startIndex>
    <opensearch:itemsPerPage>1</opensearch:itemsPerPage>
    <link rel="self" type="application/atom+xml" href="https://www.opengis.uab.cat/cgi-bin/nimmbus/nimmbus.cgi?SERVICE=WPS&amp;REQUEST=EXECUTE&amp;IDENTIFIER=NB_RESOURCE:ENUMERATE&amp;LANGUAGE=eng"/>
    <entry>
        <id>https://www.opengis.uab.cat/cgi-bin/nimmbus/nimmbus.cgi?SERVICE=WPS&amp;REQUEST=EXECUTE&amp;IDENTIFIER=NB_RESOURCE:RETRIEVE&amp;LANGUAGE=cat&amp;RESOURCE=664U89X4ICLG1SZM1268VNI6723QS0D43048IVE6AJ97RCX</id>
        <title>Used to extract forest areas</title>
        <link href="https://www.opengis.uab.cat/cgi-bin/nimmbus/nimmbus.cgi?SERVICE=WPS&amp;REQUEST=EXECUTE&amp;IDENTIFIER=NB_RESOURCE:RETRIEVE&amp;LANGUAGE=cat&amp;RESOURCE=664U89X4ICLG1SZM1268VNI6723QS0D43048IVE6AJ97RCX&amp;USER=Anonymous"/>
        <author>
            <name>Alaitz Zabala (AlaitzZabala)</name>
        </author>
        <dc:publisher>NiMMbus</dc:publisher>
        <updated>2017-07-18T17:37:18.471Z</updated>
        <dc:rights>RWSO</dc:rights>
        <category scheme="http://www.opengis.uab.cat/nimmbus/resource_type" term="FEEDBACK" label="a user feedback item" />
        <content type="text">We are reporting this for other to be able to generalise the methodology around the world.</content>
    </entry>
</feed>
```

To get more information about a specific feedback item you have two alternatives:

The simpler (but not necessarily appropiate) alternative is to modify the above request to add CONTENT=full. By doing so the full content of the element is inserted in the "content" element of the atom file.

The second alternative is to extract the resource_id from the atom response entry and follow the RETRIEVE template: http://www.opengis.uab.cat/cgi-bin/nimmbus/nimmbus.cgi?SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:RETRIEVE&LANGUAGE=eng&USER=Anonymous&RESOURCE={resource_id}.

Please note that this URL is provided directly in each entry of the atom feed in the link element.

Example of a succesful feedback retrieval:
```xml
<?xml version="1.0" encoding="iso-8859-1"?>
<wps:ExecuteResponse xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" 
          xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
          xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsExecute_response.xsd" 
          service="WPS" version="1.0.0" 
          serviceInstance="https://www.opengis.uab.cat:443/cgi-bin/nimmbus/nimmbus.cgi?SERVICE=WPS&amp;REQUEST=GetCapabilities" xml:lang="en-US">
  <wps:Process wps:processVersion="1">
    <ows:Identifier>NB_RESOURCE:RETRIEVE</ows:Identifier>
    <ows:Title></ows:Title>
  </wps:Process>
  <wps:Status creationTime="2017-08-07T07:19:01.625Z">
    <wps:ProcessSucceeded />
  </wps:Status>
  <wps:ProcessOutputs>
    <wps:Output>
      <ows:Identifier>obj_id</ows:Identifier>
      <ows:Title>Resource internal Identifier</ows:Title>
      <wps:Data>
            <wps:LiteralData>7QPC81L0Q0RP26E71RAQJ87CBMX1GQ54N1Y444FPDT21E09</wps:LiteralData>
      </wps:Data>
    </wps:Output>
    <wps:Output>
      <ows:Identifier>obj_time</ows:Identifier>
      <ows:Title>Resource creation time</ows:Title>
      <wps:Data>
            <wps:LiteralData>2017-07-04T12:47:26.803Z</wps:LiteralData>
      </wps:Data>
    </wps:Output>
    <wps:Output>
      <ows:Identifier>language</ows:Identifier>
      <ows:Title>Language</ows:Title>
      <wps:Data>
            <wps:LiteralData>eng</wps:LiteralData>
      </wps:Data>
    </wps:Output>
    <wps:Output>
      <ows:Identifier>last_modif_time</ows:Identifier>
      <ows:Title>Resource last modification time</ows:Title>
      <wps:Data>
            <wps:LiteralData>2017-07-04T12:47:26.803Z</wps:LiteralData>
      </wps:Data>
    </wps:Output>
    <wps:Output>
      <ows:Identifier>type</ows:Identifier>
      <ows:Title>Resource type</ows:Title>
      <wps:Data>
            <wps:LiteralData>FEEDBACK</wps:LiteralData>
      </wps:Data>
    </wps:Output>
    <wps:Output>
      <ows:Identifier>rights</ows:Identifier>
      <ows:Title>User Rights</ows:Title>
      <wps:Data>
            <wps:LiteralData>R</wps:LiteralData>
      </wps:Data>
    </wps:Output>
    <wps:Output>
      <ows:Identifier>owner_user</ows:Identifier>
      <ows:Title>Owner user</ows:Title>
      <wps:Data>
            <wps:LiteralData>JoanMaso</wps:LiteralData>
      </wps:Data>
    </wps:Output>
    <wps:Output>
      <ows:Identifier>title</ows:Identifier>
      <ows:Title>Resource title</ows:Title>
      <wps:Data>
            <wps:LiteralData>Good map server</wps:LiteralData>
      </wps:Data>
    </wps:Output>
    <wps:Output>
      <ows:Identifier>reason</ows:Identifier>
      <ows:Title>Motivation for this entry</ows:Title>
      <wps:Data>
            <wps:LiteralData>Inform about a comparison problem</wps:LiteralData>
      </wps:Data>
    </wps:Output>
    <wps:Output>
      <ows:Identifier>feedback</ows:Identifier>
      <ows:Title>Feedback item</ows:Title>
      <wps:Data>
          <wps:ComplexData xmlns:mcc="http://standards.iso.org/iso/19115/-3/mcc/1.0" xmlns:mdq="http://standards.iso.org/iso/19157/-2/mdq/1.0" xmlns:mri="http://standards.iso.org/iso/19115/-3/mri/1.0" xmlns:cit="http://standards.iso.org/iso/19115/-3/cit/1.0" xmlns:gco="http://standards.iso.org/iso/19115/-3/gco/1.0" xmlns:qcm="http://www.opengis.net/guf/1.0/common" xmlns:gcx="http://standards.iso.org/iso/19115/-3/gcx/1.0" xmlns:guf="http://www.opengis.net/guf/1.1/core" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlink="http://www.w3.org/1999/xlink">
              <guf:GUF_FeedbackItem>
				<guf:itemIdentifier>
					<mcc:MD_Identifier>
						<mcc:code>
							<gco:CharacterString>7QPC81L0Q0RP26E71RAQJ87CBMX1GQ54N1Y444FPDT21E09</gco:CharacterString>
						</mcc:code>
						<mcc:codeSpace>
							<gcx:Anchor xlink:href="http://www.opengis.uab.cat/nimmbus/resourceId">ResourceID</gcx:Anchor>
						</mcc:codeSpace>
						<mcc:description>
							<gco:CharacterString>Good map server</gco:CharacterString>
						</mcc:description>
					</mcc:MD_Identifier>
				</guf:itemIdentifier>
				<guf:abstract>
					<gco:CharacterString>Corine is difficult to compare with my product</gco:CharacterString>
				</guf:abstract>
				<guf:contactRole>
					<guf:GUF_UserRoleCode codeListValue="researchEndUser" codeList="http://www.opengis.net/guf/1.0/resources/codeList.xml#GUF_UserRoleCode"/>
				</guf:contactRole>
				<guf:dateInfo>
					<cit:CI_Date>
						<cit:date>
							<gco:DateTime>2017-07-04T12:47:26.803Z</gco:DateTime>
						</cit:date>
						<cit:dateType>
							<cit:CI_DateTypeCode codeList="http://www.isotc211.org/2005/resources/Codelist/ML_gmxCodelists.xml#CI_DateTypeCode" codeListValue="creation"/>
						</cit:dateType>
					</cit:CI_Date>
				</guf:dateInfo>
				<guf:rating>
					<guf:GUF_Rating>
						<guf:rating>
							<guf:GUF_RatingCode codeListValue="4" codeList="http://www.opengis.net/guf/1.0/resources/codeList.xml#GUF_RatingCode"/>
						</guf:rating>
					</guf:GUF_Rating>
				</guf:rating>
				<guf:contact>
					<guf:GUF_UserInformation>
						<guf:userIdentifier>
							<mcc:MD_Identifier>
								<mcc:code>
									<gco:CharacterString>Y1626Y5LFDTPW237H496487433D61T879E135J208878G05</gco:CharacterString>
								</mcc:code>
								<mcc:codeSpace>
									<gcx:Anchor xlink:href="http://www.opengis.uab.cat/nimmbus/userId">UserID</gcx:Anchor>
								</mcc:codeSpace>
								<mcc:description>
									<gco:CharacterString>JoanMaso</gco:CharacterString>
								</mcc:description>
							</mcc:MD_Identifier>
						</guf:userIdentifier>						<guf:userDetails>
							<cit:CI_Individual>
								<cit:name>
									<gco:CharacterString>Joan Masó</gco:CharacterString>
								</cit:name>
								<cit:contactInfo>
									<cit:CI_Contact>
										<cit:address>
											<cit:CI_Address>
												<cit:electronicMailAddress>
													<gco:CharacterString>joan.maso@uab.cat</gco:CharacterString>
												</cit:electronicMailAddress>
											</cit:CI_Address>
										</cit:address>
									</cit:CI_Contact>
								</cit:contactInfo>
							</cit:CI_Individual>
						</guf:userDetails>
						<guf:description>
							<gco:CharacterString>I'm NextGEOSS full time.</gco:CharacterString>
						</guf:description>
						<guf:applicationDomain>
							<guf:GUF_ApplicationDomain>
								<guf:domain/>
								<guf:expertiseLevel/>
							</guf:GUF_ApplicationDomain>
						</guf:applicationDomain>
					</guf:GUF_UserInformation>
				</guf:contact>
				<guf:userComment>
					<guf:GUF_UserComment>
						<guf:comment>
							<gco:CharacterString>Corine is difficult to compare with my product because it has low resolution</gco:CharacterString>
						</guf:comment>
						<guf:motivation>
							<guf:GUF_MotivationCode codeListValue="comment" codeList="http://www.opengis.net/guf/1.0/resources/codeList.xml#GUF_MotivationCode"/>
						</guf:motivation>
					</guf:GUF_UserComment>
				</guf:userComment>
				<guf:target>
					<guf:GUF_FeedbackTarget>
						<guf:resourceRef>
              <cit:CI_Citation>
                   <cit:title>
                   	<gco:CharacterString>Corine Land Cover 2012</gco:CharacterString>
                   </cit:title>
                   <cit:identifier>
                   	<mcc:MD_Identifier>
                   		<mcc:code>
            	       		<gco:CharacterString>c90fd0c1-ebdf-4df9-9216-4592ed843644</gco:CharacterString>
                   		</mcc:code>
                   		<mcc:codeSpace>
                   			<gco:CharacterString>http://sdi.eea.europa.eu/catalogue</gco:CharacterString>
                   		</mcc:codeSpace>
                   	</mcc:MD_Identifier>
                   </cit:identifier>
                   <cit:identifier>
                   	<mcc:MD_Identifier>
                   		<mcc:code>
            	       		<gco:CharacterString>7M3F4F8MVMWTKRU025155WX151V5Q7936226D54T8HDQ0U4</gco:CharacterString>
                   		</mcc:code>
                   		<mcc:codeSpace>
							<gcx:Anchor xlink:href="http://www.opengis.uab.cat/nimmbus/resourceId">ResourceID</gcx:Anchor>
                   		</mcc:codeSpace>
                   	</mcc:MD_Identifier>
                   </cit:identifier>
                   <cit:onlineResource>
                   	<cit:CI_OnlineResource>
                   		<cit:linkage>
            	       		<gco:CharacterString>http://land.copernicus.eu/pan-european/corine-land-cover/clc-2012/view</gco:CharacterString>
                   		</cit:linkage>
                   		<cit:description>
            	       		<gco:CharacterString>View the data on a web browser</gco:CharacterString>
                   		</cit:description>
                   	</cit:CI_OnlineResource>
                   </cit:onlineResource>
              </cit:CI_Citation>
						</guf:resourceRef>
						<guf:role>
							<guf:GUF_TargetRoleCode codeListValue="primary" codeList="http://www.opengis.net/guf/1.0/resources/codeList.xml#GUF_TargetRoleCode"/>
						</guf:role>
					</guf:GUF_FeedbackTarget>
				</guf:target>
				</guf:GUF_FeedbackItem>
			</wps:ComplexData>
		</wps:Data>
	</wps:Output>
  </wps:ProcessOutputs>
</wps:ExecuteResponse>
```

Normally the application will extract the needed values to show to the user. This are the xPath of the most common values to extract.
title: 
wps:ExecuteResponse/wps:ProcessOutputs/wps:Output[ows:Identifier="feedback"]/wps:Data/wps:ComplexData/guf:GUF_FeedbackItem/guf:itemIdentifier/mcc:MD_Identifier/mcc:description/gco:CharacterString

abstract: 
wps:ExecuteResponse/wps:ProcessOutputs/wps:Output[ows:Identifier="feedback"]/wps:Data/wps:ComplexData/guf:GUF_FeedbackItem/guf:abstract/gco:CharacterString

Rating: 
wps:ExecuteResponse/wps:ProcessOutputs/wps:Output[ows:Identifier="feedback"]/wps:Data/wps:ComplexData/guf:GUF_FeedbackItem/guf:rating/guf:GUF_Rating/guf:rating/guf:GUF_RatingCode/@codeListValue

Comment: 
wps:ExecuteResponse/wps:ProcessOutputs/wps:Output[ows:Identifier="feedback"]/wps:Data/wps:ComplexData/guf:GUF_FeedbackItem/guf:userComment/guf:GUF_UserComment/guf:comment/gco:CharacterString

Comment motivation:
wps:ExecuteResponse/wps:ProcessOutputs/wps:Output[ows:Identifier="feedback"]/wps:Data/wps:ComplexData/guf:GUF_FeedbackItem/guf:userComment/guf:GUF_UserComment/guf:motivation/guf:GUF_MotivationCode/@codeListValue
