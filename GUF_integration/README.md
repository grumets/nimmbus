# Instructions for the integration of the GUF system (based on the NiMMbus service) in a catalogue

## How to include a button to add feedback for a catalogue entry

For each entry in a catalogue, a button with a text "Add feedback" is expected, at the end of the general description of the resource.

The button will start another window with the NiMMbus interface. To ease the process to the user, the link to NiMMbus can be populated with the target_code and target_codespace of the catalogue entry (a target_title is also recommended).

To create the URL please follow the template: http://www.opengis.uab.cat/nimmbus/index.htm?target_title={target_title}&target_code={target_code}&target_codespace={target_codespace}&page=ADDFEEDBACK

For more details go to [test htm](https://github.com/joanma747/nimmbus/blob/master/client_js/test.htm).

## How to request feedback about a catalogue entry

For each entry in the catalogue, a list of previous user feedback items is expected to be shown. To do that the NiMMbus API allows for an easy retrieval of this information as an ATOM file format.

To create the URL please follow the ENUMERATE template: http://www.opengis.uab.cat/cgi-bin/nimmbus/nimmbus.cgi?SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:ENUMERATE&LANGUAGE=eng&USER=Anonymous&TYPE=FEEDBACK&FORMAT=text/xml&TRG_FLD_1=CODE&TRG_VL_1={catalogue_id}&TRG_OPR_1=EQ&TRG_NXS_1=AND&TRG_FLD_2=NAMESPACE&TRG_VL_2={catalogue_namespace}&TRG_OPR_2=EQ

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
    <link rel="self" type="application/atom+xml" href="http://www.opengis.uab.cat/cgi-bin/nimmbus/nimmbus.cgi?SERVICE=WPS&amp;REQUEST=EXECUTE&amp;IDENTIFIER=NB_RESOURCE:ENUMERATE&amp;LANGUAGE=eng"/>
    <entry>
        <id>http://www.opengis.uab.cat/cgi-bin/nimmbus/nimmbus.cgi?SERVICE=WPS&amp;REQUEST=EXECUTE&amp;IDENTIFIER=NB_RESOURCE:RETRIEVE&amp;LANGUAGE=cat&amp;RESOURCE=664U89X4ICLG1SZM1268VNI6723QS0D43048IVE6AJ97RCX</id>
        <title>Used to extract forest areas</title>
        <link href="http://www.opengis.uab.cat/cgi-bin/nimmbus/nimmbus.cgi?SERVICE=WPS&amp;REQUEST=EXECUTE&amp;IDENTIFIER=NB_RESOURCE:RETRIEVE&amp;LANGUAGE=cat&amp;RESOURCE=664U89X4ICLG1SZM1268VNI6723QS0D43048IVE6AJ97RCX&amp;USER=Anonymous"/>
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

To get more information about a specific feedback item you should extract the resource_id from the atom response entry and follow the RETRIEVE template: http://www.opengis.uab.cat/cgi-bin/nimmbus/nimmbus.cgi?SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:RETRIEVE&LANGUAGE=eng&USER=Anonymous&RESOURCE={resource_id}.

(Retrieved format for feedback items not finalised. Expect change in the format by 28nd July).

Example of a succesful citation retrieval:
```xml
<?xml version="1.0" encoding="iso-8859-1"?>
<wps:ExecuteResponse xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" 
          xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
          xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsExecute_response.xsd" 
          service="WPS" version="1.0.0" 
          serviceInstance="http://www.opengis.uab.cat/cgi-bin/nimmbus/nimmbus.cgi?SERVICE=WPS&amp;REQUEST=GetCapabilities" xml:lang="en-US">
  <wps:Process wps:processVersion="1">
    <ows:Identifier>NB_RESOURCE:RETRIEVE</ows:Identifier>
    <ows:Title></ows:Title>
  </wps:Process>
  <wps:Status creationTime="2017-07-18T17:46:45.183Z">
    <wps:ProcessSucceeded />
  </wps:Status>
  <wps:ProcessOutputs>
    <wps:Output>
      <ows:Identifier>obj_id</ows:Identifier>
      <ows:Title>Resource internal Identifier</ows:Title>
      <wps:Data>
            <wps:LiteralData>66Z1BK7VL3E15L6XX047Z091UJHT710798T3C4B69A3BQZ2</wps:LiteralData>
      </wps:Data>
    </wps:Output>
    <wps:Output>
      <ows:Identifier>obj_time</ows:Identifier>
      <ows:Title>Resource creation time</ows:Title>
      <wps:Data>
            <wps:LiteralData>2017-06-12T14:33:40.516Z</wps:LiteralData>
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
            <wps:LiteralData>2017-06-12T14:33:40.516Z</wps:LiteralData>
      </wps:Data>
    </wps:Output>
    <wps:Output>
      <ows:Identifier>type</ows:Identifier>
      <ows:Title>Resource type</ows:Title>
      <wps:Data>
            <wps:LiteralData>CITATION</wps:LiteralData>
      </wps:Data>
    </wps:Output>
    <wps:Output>
      <ows:Identifier>rights</ows:Identifier>
      <ows:Title>User Rights</ows:Title>
      <wps:Data>
            <wps:LiteralData>RWSO</wps:LiteralData>
      </wps:Data>
    </wps:Output>
    <wps:Output>
      <ows:Identifier>owner_user</ows:Identifier>
      <ows:Title>Owner user</ows:Title>
      <wps:Data>
            <wps:LiteralData>AlaitzZabala</wps:LiteralData>
      </wps:Data>
    </wps:Output>
    <wps:Output>
      <ows:Identifier>title</ows:Identifier>
      <ows:Title>Resource title</ows:Title>
      <wps:Data>
            <wps:LiteralData>Corine Land Cover 2012</wps:LiteralData>
      </wps:Data>
    </wps:Output>
    <wps:Output>
      <ows:Identifier>citation</ows:Identifier>
      <ows:Title>Citation</ows:Title>
      <wps:Data>
          <wps:ComplexData xmlns:gco="http://standards.iso.org/iso/19115/-3/gco/1.0"  xmlns:cit="http://standards.iso.org/iso/19115/-3/cit/1.0"
 xmlns:mcc="http://standards.iso.org/iso/19115/-3/mcc/1.0">
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
          </wps:ComplexData>
      </wps:Data>
    </wps:Output>
  </wps:ProcessOutputs>
</wps:ExecuteResponse>
```
