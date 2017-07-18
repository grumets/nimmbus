# Instructions for the integration of the GUF system (based on the NiMMbus service) in a catalogue

## How to include a button to add feedback for a catalogue entry

For each entry in a catalogue, a button with a text "Add feedback" is expected, at the end of the general description of the resource.

The button will start another window with the NiMMbus interface. To ease the process to the user, the link to NiMMbus can be populated with the target_code and target_codespace of the catalogue entry (a target_title is also recommended).

To create the URL please follow the template: http://www.opengis.uab.cat/nimmbus/index.htm?target_title={target_title}&target_code={target_code}&target_codespace={target_codespace}&page=ADDFEEDBACK

For more details go to [test htm](https://github.com/joanma747/nimmbus/blob/master/client_js/test.htm).

## How to request feedback about a catalogue entry

For each entry in the catalogue, a list of previous user feedback items is expected to be shown. To do that the NiMMbus API allows for an easy retrieval of this information as an ATOM file format.

To create the URL please follow the ENUMERATE template: http://www.opengis.uab.cat/cgi-bin/nimmbus/nimmbus.cgi?SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:ENUMERATE&LANGUAGE=eng&USER={user_name}&PASSWORD={password}&TYPE=FEEDBACK&FORMAT=text/xml&TRG_FLD_1=ID_CODE&TRG_VL_1={catalogue_id}&TRG_OPR_1=EQ&TRG_NXS_1=AND&TRG_FLD_2=ID_NAMESPACE&TRG_VL_2={catalogue_namespace}&TRG_OPR_2=EQ

(Still not available. Availability foreseen 22nd July).

```xml 
<?xml version="1.0" encoding="iso-8859-1"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:georss="http://www.georss.org/georss" xmlns:gml="http://www.opengis.net/gml" xmlns:owc="http://www.opengis.net/owc/1.0" xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/" xml:lang="ca">
    <link rel="profile" href="http://www.opengis.net/spec/owc-atom/1.0/req/core" title="This file is compliant with version 1.0 of OGC Context"/>
    <title>Nimmbus resources response</title>
    <id>http://localhost:80/cgi-bin/server1/nimmbus.cgi?SERVICE=WPS&amp;REQUEST=EXECUTE&amp;IDENTIFIER=NB_RESOURCE:ENUMERATE&amp;LANGUAGE=eng</id>
    <subtitle type="text">Resources [1, 11] of 11 created by Alaitz Zabala (AlaitzZabala) </subtitle>
    <updated>2017-07-18T17:37:18.471Z</updated>
    <author>
        <name>Alaitz Zabala (AlaitzZabala)</name>
    </author>
    <dc:publisher>Nimmbus</dc:publisher>
    <generator uri="https://www.opengis.uab.cat/nimmbus/" version="1.0">
         NiMMbus: MiraMon Cloud Service NB_RESOURCE:ENUMERATE
    </generator>
    <rights>
    </rights>
    <opensearch:totalResults>11</opensearch:totalResults>
    <opensearch:startIndex>1</opensearch:startIndex>
    <opensearch:itemsPerPage>11</opensearch:itemsPerPage>
    <link rel="self" type="application/atom+xml" href="http://localhost:80/cgi-bin/server1/nimmbus.cgi?SERVICE=WPS&amp;REQUEST=EXECUTE&amp;IDENTIFIER=NB_RESOURCE:ENUMERATE&amp;LANGUAGE=eng"/>
    <entry>
        <id>http://localhost:80/cgi-bin/server1/nimmbus.cgi?SERVICE=WPS&amp;REQUEST=EXECUTE&amp;IDENTIFIER=NB_RESOURCE:RETRIEVE&amp;LANGUAGE=cat&amp;RESOURCE=664U89X4ICLG1SZM1268VNI6723QS0D43048IVE6AJ97RCX</id>
        <title>Used to extract forest areas</title>
        <link href="http://localhost:80/cgi-bin/server1/nimmbus.cgi?SERVICE=WPS&amp;REQUEST=EXECUTE&amp;IDENTIFIER=NB_RESOURCE:RETRIEVE&amp;LANGUAGE=cat&amp;RESOURCE=664U89X4ICLG1SZM1268VNI6723QS0D43048IVE6AJ97RCX&amp;USER={user}&amp;PASSWORD={password}"/>
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

To get more information about a specific feedback item you should extract the resource_id from the atom response entry and follow the RETRIEVE template: http://www.opengis.uab.cat/cgi-bin/nimmbus/nimmbus.cgi?SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:RETRIEVE&LANGUAGE=eng&USER={user_name}&PASSWORD={password}&RESOURCE={resource_id}.

(Retrieved format for feedback items not finalised. Expect change in the format by 28nd July).
