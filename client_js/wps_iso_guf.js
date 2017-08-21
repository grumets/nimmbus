/*
  The main objective of this library is to compile a set of functions that makes reading an WPS responses, ISO metadata and GUF a bit easier
     Developed by Joan Masó.
     License: Attribution 4.0 International (CC BY 4.0) http://creativecommons.org/licenses/by/4.0/
*/


function DonaTextDesDeGcoCharacterString(item)
{
	var elem=GetValueXMLElementByName(item, "gco", "CharacterString");
	if (elem)
		return elem;
	else
		return "";
}

function DonaTextDesDeCodeList(item, namespace, code_list)
{
	var elem=GetXMLElementByName(item, namespace, code_list);
	if (elem)
	{
		var code_list_value=GetXMLAttributeByName(elem, null, "codeListValue");
		if (code_list_value && code_list_value.value)
			return code_list_value.value;
		else
			return "";
	}
	else
		return "";
}


function OmpleInputDesDeWPSLiteralOutput(item)
{
	var literal_data=GetXMLElementByName(item, "wps", "LiteralData");
	if (literal_data && literal_data.childNodes[0] && literal_data.childNodes[0].nodeValue)
		return literal_data.childNodes[0].nodeValue;
	else
		return "";
}

function OmpleInputDesDeWPSComplexOutput(item)
{
	return GetXMLElementByName(item, "wps", "ComplexData");
}

function GetRetrieveResourceFeedbackOutputs(root)
{
var output, identifier, feedback_item, user_comment;

	output=GetXMLElementCollectionByName(root, "wps", "Output");

	if (output && output.length)
	{
		var guf={};
		for (var item=0; item<output.length; item++)
		{
			identifier=GetXMLElementByName(output.item(item), "ows", "Identifier");
			if (identifier)
			{
				if (identifier.childNodes[0].nodeValue=="title")
					guf.title=OmpleInputDesDeWPSLiteralOutput(output.item(item));
				else if (identifier.childNodes[0].nodeValue=="reason")
					guf.reason=OmpleInputDesDeWPSLiteralOutput(output.item(item));
				else if (identifier.childNodes[0].nodeValue=="feedback")
				{					
					feedback_item=OmpleInputDesDeWPSComplexOutput(output.item(item));
					if (feedback_item)
					{
						elem=GetXMLElementByName(feedback_item, "guf", "abstract");
						if (elem)
							guf.abstract=DonaTextDesDeGcoCharacterString(elem);
						
						elem=GetXMLElementByName(feedback_item, "guf", "contactRole");
						if (elem)
							guf.contactRole=DonaTextDesDeCodeList(elem, "guf", "GUF_UserRoleCode");
	
						user_comment=GetXMLElementByName(feedback_item, "guf", "userComment");
						if (user_comment)
						{
							elem=GetXMLElementByName(feedback_item, "guf", "comment");
							guf.comment=DonaTextDesDeGcoCharacterString(elem);
							elem=GetXMLElementByName(feedback_item, "guf", "motivation");
							if (elem)
								guf.motivation=DonaTextDesDeCodeList(elem, "guf", "GUF_MotivationCode");
						}

						elem=GetXMLElementByName(feedback_item, "guf", "rating");
						if (elem)
							guf.rating=DonaTextDesDeCodeList(elem, "guf", "GUF_RatingCode");
					}
				}	
				else if (identifier.childNodes[0].nodeValue=="rights")
					guf.rights=OmpleInputDesDeWPSLiteralOutput(output.item(item));
			}
		}
		return guf;
	}
	return null;
}
