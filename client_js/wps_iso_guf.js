/*
	This is part of the NiMMbus libraries.
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

function DonaTextDesDeGcoCharacterStringOGcxAnchor(item)
{
	var elem=DonaTextDesDeGcoCharacterString(item);
	if (elem)
		return elem;
	
	elem=GetXMLElementByName(item, "gcx", "Anchor");
	if (elem)
	{
		var code_list_value=GetXMLAttributeByName(elem, "xlink", "href");
		if (code_list_value && code_list_value.value)
			return code_list_value.value;
		else
			return "";		
	}
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

function DonaDataDesDeGcoDateTime(item)
{
	var s;

	var elem=GetValueXMLElementByName(item, "gco", "DateTime");
	if (elem)
	{
		s=elem;
		if (s.indexOf("T")!=-1)
			return s.substring(0, s.indexOf("T"));		
		else 
			return elem;
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
var output, identifier, feedback_item, user_comment, output2, target_item, resource_ref, output3, identifier_item;

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
					guf.purpose=OmpleInputDesDeWPSLiteralOutput(output.item(item));
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
	
						guf.public = [];						
						output2=GetXMLElementCollectionByName(feedback_item, "guf", "publication");
						if (output2 && output2.length)
						{								
							for (var item2=0; item2<output2.length; item2++)
							{				
								//suposem qcm:QCM_Publication tot. podria ser cit:CI_Citation però per nimmbus no
								public_item=GetXMLElementByName(output2.item(item2), "qcm", "QCM_Publication");															
								if (public_item)
								{
									guf.public.push({});										
									//en aquest moment el nou element de l'array ja s'ha creat i per tant lenght ja ha augmentat
										
									//category
									var category;
									category=GetXMLElementByName(public_item, "qcm", "category");
									guf.public[guf.public.length-1].category=DonaTextDesDeCodeList(category, "qcm", "QCM_PublicationCategoryCode");
									
									//title
									elem=GetXMLElementByName(public_item, "cit", "title");
									if (elem)
										guf.public[guf.public.length-1].title=DonaTextDesDeGcoCharacterString(elem);										
									else
										guf.public[guf.public.length-1].title="";
										
									//identifier(s)
									guf.public[guf.public.length-1].identifier = [];																														
									output3=GetXMLElementCollectionByName(public_item , "cit", "identifier");								
									if (output3 && output3.length)
									{
										for (var item3=0; item3<output3.length; item3++)
										{
											identifier_item=output3.item(item3);
											if (identifier_item)
											{											
												//code
												elem=GetXMLElementByName(identifier_item, "mcc", "code")
												if (elem)
												{
													guf.public[guf.public.length-1].identifier.push({});
													//en aquest moment el nou element de l'array ja s'ha creat i per tant lenght ja ha augmentat

													//code
													guf.public[guf.public.length-1].identifier[guf.public[guf.public.length-1].identifier.length-1].code=DonaTextDesDeGcoCharacterString(elem);
											
													//code_space: pot ser un CharacterString o un anchor, miro les dues coses
													elem=GetXMLElementByName(identifier_item, "mcc", "codeSpace");
													if (elem)
														guf.public[guf.public.length-1].identifier[guf.public[guf.public.length-1].identifier.length-1].codeSpace=DonaTextDesDeGcoCharacterStringOGcxAnchor(elem);
													else
														guf.public[guf.public.length-1].identifier[guf.public[guf.public.length-1].identifier.length-1].codeSpace="";
												}
											}
										}
									}
									// hi podrien haver més coses com online resources ·$·
								}
							}
						}
	
						elem=GetXMLElementByName(feedback_item, "guf", "rating");
						if (elem)
							guf.rating=DonaTextDesDeCodeList(elem, "guf", "GUF_RatingCode");
						else
							guf.rating="";
				
						user_comment=GetXMLElementByName(feedback_item, "guf", "userComment");
						if (user_comment)
						{
							elem=GetXMLElementByName(feedback_item, "guf", "comment");
							guf.comment=DonaTextDesDeGcoCharacterString(elem);
							elem=GetXMLElementByName(feedback_item, "guf", "motivation");
							if (elem)
								guf.motivation=DonaTextDesDeCodeList(elem, "guf", "GUF_MotivationCode");
						}

						guf.target = [];						
						output2=GetXMLElementCollectionByName(feedback_item, "guf", "target");
						if (output2 && output2.length)
						{								
							for (var item2=0; item2<output2.length; item2++)
							{				
								target_item=GetXMLElementByName(output2.item(item2), "guf", "GUF_FeedbackTarget");															
								if (target_item)
								{
									var role;
									
									role=GetXMLElementByName(target_item, "guf", "role");
									//resourceRef poden ser diversos, em quedo amb el primer, de moment ·$·
									resource_ref=GetXMLElementByName(target_item, "guf", "resourceRef");

									if (role && resource_ref)
									{
										guf.target.push({});										
										//en aquest moment el nou element de l'array ja s'ha creat i per tant lenght ja ha augmentat
										
										//role
										guf.target[guf.target.length-1].role=DonaTextDesDeCodeList(role, "guf", "GUF_TargetRoleCode");
									
										// resource_ref és de tipus CI_Citation o QCM_Publication, però de moment miro les part comunnes dels dos
										// més endavant potser mirarem coses que només estan a QCM_Publication
										//title
										elem=GetXMLElementByName(resource_ref, "cit", "title");
						if (elem)
											guf.target[guf.target.length-1].title=DonaTextDesDeGcoCharacterString(elem);										
										else
											guf.target[guf.target.length-1].title="";
										
										//identifier(s)
										guf.target[guf.target.length-1].identifier = [];																														
										output3=GetXMLElementCollectionByName(resource_ref , "cit", "identifier");								
										if (output3 && output3.length)
										{
											for (var item3=0; item3<output3.length; item3++)
											{
												identifier_item=output3.item(item3);
												if (identifier_item)
												{											
													//code
													elem=GetXMLElementByName(identifier_item, "mcc", "code")
													if (elem)
													{
														guf.target[guf.target.length-1].identifier.push({});
														//en aquest moment el nou element de l'array ja s'ha creat i per tant lenght ja ha augmentat

														//code
														guf.target[guf.target.length-1].identifier[guf.target[guf.target.length-1].identifier.length-1].code=DonaTextDesDeGcoCharacterString(elem);
												
														//code_space: pot ser un CharacterString o un anchor, miro les dues coses
														elem=GetXMLElementByName(identifier_item, "mcc", "codeSpace");
														if (elem)
															guf.target[guf.target.length-1].identifier[guf.target[guf.target.length-1].identifier.length-1].codeSpace=DonaTextDesDeGcoCharacterStringOGcxAnchor(elem);
														else
															guf.target[guf.target.length-1].identifier[guf.target[guf.target.length-1].identifier.length-1].codeSpace="";
					}
				}	
											}
										}
									}
								}
							}
						}
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

function DonaDataISOComAText(d)
{
var s;
	s=d;
	if (s.indexOf("T")!=-1)
		s=s.substring(0, s.indexOf("T"))+" "+s.substring(s.indexOf("T")+1, s.length);
	if (s.indexOf(".")!=-1)
	        s=s.substring(0, s.indexOf("."));
	if (s.indexOf("Z")!=-1)
	        s=s.substring(0, s.indexOf("Z"));
        return s;
}

function GetNimmbusTypeOfAOWCFeature(feature)
{
// type is decided searching for a category with scheme equal no nimmbus. If more than one is present (it should not happen) the first one is used
// initially type is set to "" in case no category properly defines it
	if (!feature || !feature.properties || !feature.properties.categories)
		return "";
	var categories=feature.properties.categories
	for (var j=0; j<categories.length; j++)
	{
		if (categories[j].scheme &&
			categories[j].scheme=="http://www.opengis.uab.cat/nimmbus/resource_type" &&
			categories[j].term)
		{
			if (categories[j].term=="POI")
				return "POI"; 
			else if (categories[j].term=="HREF")
				return "HREF";
			else if (categories[j].term=="FEEDBACK")
				return "FEEDBACK";
			else if (categories[j].term=="CITATION")
				return "CITATION";
			else if (categories[j].term=="PUBLICAT")
				return "PUBLICAT";
		}
	}		
	return "";		
}