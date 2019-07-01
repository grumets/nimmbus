# Instructions for the integration of the GUF system (based on the NiMMbus service) in your resources

This page provides general instructions for the GUF integration with your resources. They can be part of your catalogue or can be individual web pages. A "resource" can be anything that has an identifier in the web. Nevertheless, it is expected that your resources have some spatial component. In this page we explain two ways to integrate the Geospatial User Feedback in your web application:

 * The first one offers a **JavaScript API and a widget** that is very simple to integrate but, in contrast, provides a relative low level of flexibility. People with basic knowledge on JavaScript should select this one first. Basic knowledge on how to call a JavaScript function and include a library is required.

 * The second one offers access to the **Javascript for the Web API** where the programmer retrieves directly the feedback items encoded in XML and should generate a presentation himself/herself. It provides full control on how the content is shown in the screen but it requires considerable more knowledge on JavaScript programming, including XML parsing and AJAX calls.

There is a more complex and flexible possibility based on communicating with the server directly using the *Web API*. That will require to build a GUI for providing feedback that can take many days to build. For more information about the Web API see: [Web API](../API).

Since the first level is build on top of second level, you can investigate how to use the second level by inspecting the JavaScript code provided in the libraries used in the first level. You can create your own intermediate levels by reusing some part of this code in your own application.

## What do you need to know before integrating the GUF

The integration offered in this page assumes that you want to provide feedback about a **single resource**. Provide feedback about several resources in a single page is also possible but you might require to call the widget several times or from several places.

To be able to start working with the integration, you need to have your resources uniquely identified in your system using a "code" (a.k.a. an identifier). Only identified resources can be associated to feedback items. This "code" needs to be unique in a "codespace". The combination of "code" and "codespace" should provide an identifier that can be considered unique and global. If you do not use the concept of "codespace" or "namespace", we recommend that you use the URL of your web service as the "codespace". Generally, the "codespace" is common to all your resources and can be hardcoded in your application.

## Option 1: JavaScript API and widget

You can see this procedure in action in the following working examples:
  * <a href="http://maps.ecopotential-project.eu" target="_blank">integration with the ECOPotential</a>: click on a dataset name and select Feedback. A new window with previous feedback items and a button to add new ones is shown.
  * <a href="http://www.eneon.net/graph-ev-sdg" target="_blank">integration with the ENEON Graph</a>: click on an element on the network and below you will see its characteristics as well as a link to see and add feedback items about it.

The integration is extremely simple.

### Step 1: Include the JavaScript library in your HTML page
The modular library is composed of several JavaScript files and a style sheet that should be included in your Javascript application at the beginning of you web page, commonly in the <head> section. To ease the integration only the main JavaScript file and the CSS need to be directly included pointing to the full URL. Currently, to avoid CORS error, we recommend to get the files from [here](../client_js/) and point them with a relative URL:

```js
<link rel="stylesheet" href="guf.css">
<script language="JavaScript" src="guf.js"></script>
```

Be aware that more than those two files need to be downloaded, as they are indirectly included by guf.js. The list of complete files follow below and you can get them all downloading this [ZIP file](../client_js/widget_files.zip):
  * guf.css
  * guf.js
  * guf_locale.js
  * Nmmblang.js
  * owc_atom.js
  * wps_iso_guf.js
  * xml.js

The inclusion of a style sheet (guf.css) is needed in order to have a special style for the detailed description in citations and publications. This detailed description is initially folded, and can be shown by clicking on a *"Click to show/hide more information"* text in the description. This guf.css style sheet is also used to describe several classes to select how different elements will be displayed. There is a by default style described on the widget, but you can modify how this elements are displayed (e.g. different font family, font color, background color, even which elements are displayed) if including a class ".XXX.user" in your style sheet (where "XXX" is substituted by the class you want to modify). Please check the following examples to see how these styles are used (the three test pages are showing feedback items for the same resource):
   * [test_widget.htm](../client_js/test_widget.htm): default style (grey background) is used for extended description in citations and publications. You can also see the example in the same test page in the official NiMMbus service: https://www.opengis.uab.cat/nimmbus/test_widget.htm
   * [test_widget_custom.htm](../client_js/test_widget_custom.htm): custom style is used as family font and font color is change for all elements, and background color is changed for extended description in citations and publications. You can also see the example in the same test page in the official NiMMbus service: https://www.opengis.uab.cat/nimmbus/test_widget_custom.htm
   * [test_widget_corine.htm](../client_js/test_widget_corine.htm): a different style (blue background) is used for extended description in citations and publications, Moreover, some elements have been hidden (guf_purpose, guf_contact_role, guf_date and guf_usage) to obtain shorter descriptions of feedback items. You can also see the example in the same test page in the official NiMMbus service: https://www.opengis.uab.cat/nimmbus/test_widget_corine.htm

The list of the classes defined in guf.css style sheet, and which part of the feedback item description they refer to, is described in [GUF.css Reference](../GUF_integration/guf_css.md).

### Step 2: Define a division in your HTML page
The GUF widget will be shown in the area of the page you want. You should define a division using relative position. In case of a relative division, the size will be redimensioned automatically when it is populated and what is below the division will be moved down to avoid overlapping with the GUF widget.

```js
<div id="div_guf" style="position: relative; width: 60%"></div>
```

In the example we create a division with the identifier "div_guf". For the moment, the division is small and it is not visible to the user because it has no content.

### Step 3: Fill the division with the GUF widget
This will require that you call a JavaScript function with the name: GUFShowFeedbackInHTMLDiv().

This function has the following parameters in sequence:
  * _elem_: The object that points to the division created in step 2. To get the object you can call a common JavaScript procedure: _document.getElementById("div_guf")_.
  * _seed_div_id_: A prefix for some divisions that are going to be created inside the widget. Having this name will allow you get access to the text created in the division or even to manipulate it.
  * _rsc_type_: A text that is shown as the name of the resource. You can use "resource", "dataset" or a more concrete text for this resource in particular.
  * _title_: If there is no previous feedback about this resource, a citation is created in the GUF system that includes this "title".
  * _code_: A unique identifier of the resource in your system.
  * _codespace_: A "codespace" where the "code" is considered unique. A codespace should be a global identifier (e.g. a URI). If you do not use the concept of "codespace" or "namespace", we recommend that you use the URL of your web service as the "codespace".
  * _lang_: The language used in the HTML page. You can select among "cat", "spa" or "eng" for Catalan, Spanish or English respectively.

For example, a call to this function could be:

```js
	GUFShowFeedbackInHTMLDiv(document.getElementById("div_guf"),
			"div_guf_internal",
			"resource",
			"Corine Land Cover 2012",
			"clc-2012",
			"https://land.copernicus.eu",
			"eng");
```

You can call the function directly or you can provide a button or link to "activate" the widget when the user requests it. This can be done with this code:

```html
<a href="javascript:void();" onClick='GUFShowFeedbackInHTMLDiv(document.getElementById("div_guf"), "div_guf_internal", "resource",
"CORINE map", "clc-2012", "https://land.copernicus.eu", "eng");'>Add user feedback or review previous feedback</a>
```

You can see all elements together in a general example (using a button) [here](../client_js/test_widget.htm) or applied to the Corine Land Cover 2012 metadata page (using a link) [here](../client_js/test_widget_corine.htm).

## Option 2: JavaScript for the Web API

You can see this procedure in action in the following working examples:
  * [integration with the DAB API](http://www.creaf.uab.cat/temp/dab) ([source code](guf_dab_nimmbus.htm)).
  * [integration with the INSPIRE Portal](http://www.creaf.uab.cat/temp/inspire) ([source code](guf_inspire_nimmbus.htm)).

### Step 1: Include a button to add feedback for resource (e.g. a catalogue entry)

For each entry in a catalogue, a button with a text [Add feedback] is expected, at the end of the general description of the resource.

The button will start another window with the NiMMbus interface (href target=_blank). To ease the process to the user, the link to NiMMbus can be populated with the target_code and target_codespace of the catalogue entry (a target_title is also recommended).

To create the URL please follow the template: https://www.opengis.uab.cat/nimmbus?target_title={target_title}&target_code={target_code}&target_codespace={target_codespace}&page=ADDFEEDBACK&share_borrower_1=Anonymous&access_token_type={SSO_system}

At the moment, Single-Sign-On systems available are: NextGEOSS, LandSense, Google or NiMMbus (being "NiMMbus" the default value).

For more details go to this [example](../client_js/test_new_feedback.htm) that allows you to create new feedback items of a certain resource (the citation of the resource is automatically created if needed).

#### How to open the "add feedback" page in a new window
You can use the window.open Javascript function to open the new window. Once the user clicks on save, the window will be closed and the focus will return to the main page.
```js
window.open("https://www.opengis.uab.cat/nimmbus/index.htm?...", "Feedback",'toolbar=no,status=no,scrollbars=yes,location=no,menubar=no,directories=no,resizable=yes,width=800,height=700');
```

The use of the JavaScript function GUFAfegirFeedbackCapa(title, code, codespace, lang) (in guf.js) can simplify this task.

### Step 2: Request feedback about a catalogue entry

For each entry in the catalogue, a list of previous user feedback items is expected to be shown. To do that the NiMMbus API allows for an easy retrieval of this information as an ATOM file format.

To create the URL please follow the ENUMERATE template: https://www.opengis.uab.cat/cgi-bin/nimmbus/nimmbus.cgi?SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:ENUMERATE&LANGUAGE=eng&STARTINDEX=1&COUNT=100&FORMAT=text/xml&TYPE=FEEDBACK&TRG_TYPE_1=CITATION&TRG_FLD_1=CODE&TRG_VL_1={catalogue_id}&TRG_OPR_1=EQ&TRG_NXS_1=AND&TRG_TYPE_2=CITATION&TRG_FLD_2=NAMESPACE&TRG_VL_2={catalogue_namespace}&TRG_OPR_2=EQ

To submit a request to the server with a URL without losing the current page content you can use the loadFile() function (in xml.js) that will retrieve the xml document asynchronously.

<!--For more details go to this [example](../client_js/test_retrieve_feedback.htm) that allows you to retrieve the items of a certain resource.-->

Example of successful response:
```xml
<?xml version="1.0" encoding="iso-8859-1"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:georss="http://www.georss.org/georss" xmlns:gml="http://www.opengis.net/gml" xmlns:owc="http://www.opengis.net/owc/1.0" xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/" xml:lang="ca">
    <link rel="profile" href="http://www.opengis.net/spec/owc-atom/1.0/req/core" title="This file is compliant with version 1.0 of OGC Context"/>
    <title>NiMMbus resources response</title>
    <id>http://www.opengis.uab.cat/cgi-bin/nimmbus/nimmbus.cgi?SERVICE=WPS&amp;REQUEST=EXECUTE&amp;IDENTIFIER=NB_RESOURCE:ENUMERATE&amp;LANGUAGE=eng</id>
    <subtitle type="text">Resources [1, 1] of 1 shared with "Anonymous" user</subtitle>
    <updated>2017-07-18T17:37:18.471Z</updated>
    <dc:publisher>NiMMbus</dc:publisher>
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

Parsing XML in JavaScript is not an easy task. We recommend that you use the following function to convert the ATOM XML encoding to a JavaScript object that follows the OWS Context JSON encoding.
```js
	var owc=ParseOWSContextAtom(doc.documentElement);
	for (var i=0; i<owc.features.length; i++)
	{
		title=owc.features[i].properties.title;
	}
```
See the function CarregaFeedbacksAnteriors() for more details on how to do that.

To get more information about a specific feedback item you have two alternatives:

### Step 3a: Get more information about a specific feedback item all in once
The simpler (but not necessarily appropriate) alternative is to modify the above request to add CONTENT=full. By doing so the full content of the element is inserted in the "content" element of the atom file.

### Step 3b: Get more information about a specific feedback item one by one

The second alternative is to extract the resource_id from the atom response entry and follow the RETRIEVE template: http://www.opengis.uab.cat/cgi-bin/nimmbus/nimmbus.cgi?SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:RETRIEVE&LANGUAGE=eng&USER=Anonymous&RESOURCE={resource_id}.

Please note that this URL is provided directly in each entry of the atom feed in a link element.

Example of a successful feedback retrieval:
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
						</guf:userIdentifier>
						<guf:userDetails>
							<cit:CI_Individual>
								<cit:name>
									<gco:CharacterString>Joan Maso</gco:CharacterString>
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

Parsing XML is not easy in JavaScript is not easy. We recommend that you use the GetRetrieveResourceFeedbackOutputs() function to convert the XML encoding to a JavaScript object that easier to use.

```js
	var guf=GetRetrieveResourceFeedbackOutputs(doc.documentElement);
	if (guf.comment)
		comment_text=guf.comment;
```
