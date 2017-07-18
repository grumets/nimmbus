# Instructions for the integration of the GUF system (based on the NiMMbus service) in a catalogue

## How to include a button to add feedback for a catalogue entry

For each entry in a catalogue, a button with a text "Add feedback" is expected, at the end of the general description of the resource.

The button will start another window with the NiMMbus interface. To ease the process to the user, the link to NiMMbus can be populated with the target_code and target_codespace of the catalogue entry (a target_title is also recommended).

To create the URL please follow the template: http://www.opengis.uab.cat/nimmbus/index.htm?target_title={target_title}&target_code={target_code}&target_codespace={target_codespace}&page=ADDFEEDBACK

For more details go to [test htm](https://github.com/joanma747/nimmbus/blob/master/client_js/test.htm).

## How to request feedback about a catalogue entry

For each entry in the catalogue, a list of previous user feedback items is expected to be shown. To do that the NiMMbus API allows for an easy retrieval of this information as an ATOM file format.

To create the URL please follow the ENUMERATE template: http://www.opengis.uab.cat/cgi-bin/nimmbus/nimmbus.cgi?SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:ENUMERATE&LANGUAGE=eng&USER={user_name}&PASSWORD={password}&TYPE=FEEDBACK&FORMAT=text/xml&TRG_FLD_1=ID_CODE&TRG_VL_1={catalogue_id}&TRG_OPR_1=EQ&TRG_NXS_1=AND&TRG_FLD_2=ID_NAMESPACE&TRG_VL_2={catalogue_namespace}&TRG_OPR_2=EQ

To get more information about a specific feedback item you should extract the resource_id from the atom response entry and follow the RETRIEVE template: http://www.opengis.uab.cat/cgi-bin/nimmbus/nimmbus.cgi?SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:RETRIEVE&LANGUAGE=eng&USER={user_name}&PASSWORD={password}&RESOURCE={resource_id}.
