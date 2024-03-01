/* 
    This file is part of NiMMbus system. NiMMbus is a solution for 
    storing geospatial resources on the MiraMon private cloud. 
    MiraMon is a family of GIS&RS products developed since 1994 
    and includes a desktop GIS, a desktop Metadata Manager, a 
    Web Map Browser and the NiMMbus system. 
    
    The NiMMbus JavaScript client is free software: you can redistribute 
    it and/or modify it under the terms of the GNU Affero General 
    Public License as published by the Free Software Foundation, 
    either version 3 of the License, or (at your option) any later version.

    The NiMMbus JavaScript client is distributed in the hope that 
    it will be useful, but WITHOUT ANY WARRANTY; without even the 
    implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
    See the GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General 
    Public License along with the NiMMbus JavaScript Client.
    If not, see https://www.gnu.org/licenses/licenses.html#AGPL.
    
    The NiMMbus JavaScript Client can be updated from
    https://github.com/grumets/NiMMbus.

    Copyright 2014, 2022 Xavier Pons

    Aquest codi JavaScript ha estat idea de Joan Masó Pau (joan maso at uab cat) 
    amb l'ajut de l'Alaitz Zabala (alaitz zabala at uab cat)
    dins del grup del MiraMon. MiraMon és un projecte del 
    CREAF que elabora programari de Sistema d'Informació Geogràfica 
    i de Teledetecció per a la visualització, consulta, edició i anàlisi 
    de mapes ràsters i vectorials. Aquest programari inclou
    aplicacions d'escriptori i també servidors i clients per Internet.
    No tots aquests productes són gratuïts o de codi obert. 
    
    En particular, el client JavaScript del NiMMbus es distribueix sota 
    els termes de la llicència GNU Affero General Public License, 
    mireu https://www.gnu.org/licenses/licenses.html#AGPL.
    
    El client JavaScript del NiMMbus es pot actualitzar des de 
    https://github.com/grumets/NiMMbus.
*/

"use strict"

/*Aquesta funció fa un subconjunt del que fa encodeURIComponent(), que hem 
  observat que remplaça les lletres accentuades per caràcters unicode i això no va bé.*/
  function DonaCadenaPerValorDeFormulari(s)
  {
	  //("\\?", "%3F" > http://stackoverflow.com/questions/889957/escaping-question-mark-in-regex-javascript
	  //return s.replaceAll("#", "%23").replaceAll("+", "%2B").replaceAll("&", "%26").replaceAll("=", "%3D").replaceAll("?", "%3F"); 
	  // es canvia d'estrategia per donar sortida a caràcters com "<" i ">" 
	  return encodeURIComponent(s);
  }

function DonaTextDesDeNmsElement(item, namespace, element)
{
	var elem=GetValueXMLElementByName(item, namespace, element);
	if (elem)
		return elem;
	else
		return "";
}

function DonaTextDesDeGcoCharacterString(item)
{
	var elem=GetValueXMLElementByName(item, "gco", "CharacterString");
	if (elem)
		return elem;
	else
		return "";
}

function DonaTextDesDeGexPolygon(item)
{
	var elem=GetValueXMLElementByName(item, "gex", "polygon");
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

function OmpleEstructuraOnlineResource(item)
{
	var element_to_fill={};		

	if (item)
	{
		var i_elem_onlineResource=0;	
		var elem=GetXMLElementByName(item, "cit", "linkage");		
		if (elem)
		{
			i_elem_onlineResource++;
			element_to_fill.linkage=DonaTextDesDeGcoCharacterString(elem);
		}
		else
			element_to_fill.linkage="";
			
		elem=GetXMLElementByName(item, "cit", "description");
		if (elem)
		{
			i_elem_onlineResource++;
			element_to_fill.description=DonaTextDesDeGcoCharacterString(elem);
		}
		else
			element_to_fill.description="";
	
		elem=GetXMLElementByName(item, "cit", "function");
		element_to_fill.function=DonaTextDesDeCodeList(elem, "cit", "CI_OnLineFunctionCode");										
	
		/*·$· L'estructura és més complexa però nosaltres ara no tenim més elements
		ni pels onlineResources de les citations/publications, ni pels onlineResources 
		del codeLinkage i el de diagramLinkage dins de ReproducibleUsage */
		
		if (i_elem_onlineResource==0)
			element_to_fill="";											
	}
	else 
		element_to_fill="";
		
	return element_to_fill;
}

function OmpleEstructuraDesdeCitationOPublication(item_cit_o_pub, cit_o_public, es_public)
{
var elem, output, item, output2, item2;

	//title
	elem=GetXMLElementByName(item_cit_o_pub, "cit", "title");
	if (elem)
		cit_o_public.title=DonaTextDesDeGcoCharacterString(elem);										
	else
		cit_o_public.title="";

	//edition
	elem=GetXMLElementByName(item_cit_o_pub, "cit", "edition");
	if (elem)
		cit_o_public.edition=DonaTextDesDeGcoCharacterString(elem);										
	else
		cit_o_public.edition="";
		
	//editionDate
	elem=GetXMLElementByName(item_cit_o_pub, "cit", "editionDate");
	if (elem)
		cit_o_public.editionDate=DonaDataDesDeGcoDateTime(elem);										
	else
		cit_o_public.editionDate="";
		
	//identifier(s)
	output=GetXMLElementCollectionByName(item_cit_o_pub , "cit", "identifier");								
	if (output && output.length)
	{
		cit_o_public.identifier = [];																														
		for (item=0; item<output.length; item++)
		{
			var identifier_item=output.item(item);
			if (identifier_item)
			{											
				//code
				elem=GetXMLElementByName(identifier_item, "mcc", "code")
				if (elem)
				{
					cit_o_public.identifier.push({});
					//en aquest moment el nou element de l'array ja s'ha creat i per tant lenght ja ha augmentat

					//code
					cit_o_public.identifier[cit_o_public.identifier.length-1].code=DonaTextDesDeGcoCharacterString(elem);
			
					//code_space: pot ser un CharacterString o un anchor, miro les dues coses
					elem=GetXMLElementByName(identifier_item, "mcc", "codeSpace");
					if (elem)
						cit_o_public.identifier[cit_o_public.identifier.length-1].codeSpace=DonaTextDesDeGcoCharacterStringOGcxAnchor(elem);
					else
						cit_o_public.identifier[cit_o_public.identifier.length-1].codeSpace="";
				}
			}
		}
	}
	
	//Responsible party(ies)	
	output=GetXMLElementCollectionByName(item_cit_o_pub , "cit", "citedResponsibleParty");								
	if (output && output.length)
	{
		cit_o_public.resp_party = [];
		for (item=0; item<output.length; item++)
		{
			var responsibility=output.item(item);											
			if (responsibility)
			{											
				//role
				elem=GetXMLElementByName(responsibility, "cit", "role")
				if (elem)
				{																							
					var role=DonaTextDesDeCodeList(elem, "cit", "CI_RoleCode");
					if (role && role!="")
					{	//si el codi de rol no és buit
						cit_o_public.resp_party.push({});
						//en aquest moment el nou element de l'array ja s'ha creat i per tant lenght ja ha augmentat
						cit_o_public.resp_party[cit_o_public.resp_party.length-1].role=role;													
						cit_o_public.resp_party[cit_o_public.resp_party.length-1].party_name = [];																														
							
						//de moment només recupero tots els "name" de dintre, que podrien ser individuals o organizations, però ara per ara com no recupero res més amb això ja m'apanyo
						output2=GetXMLElementCollectionByName(responsibility , "cit", "name");								
						if (output2 && output2.length)
						{
							for (item2=0; item2<output2.length; item2++)
							{
								var party_name=output2.item(item2);																
								if (party_name)
								{
									var text_party=DonaTextDesDeGcoCharacterString(party_name);
									if (text_party && text_party!="")
									{
										cit_o_public.resp_party[cit_o_public.resp_party.length-1].party_name.push({});
										cit_o_public.resp_party[cit_o_public.resp_party.length-1].party_name[cit_o_public.resp_party[cit_o_public.resp_party.length-1].party_name.length-1].name=text_party;
									}
								}
							}															
						}
						
						//Comprovo si no he recuperat cap name -> esborro aquesta resp_party
						if (cit_o_public.resp_party[cit_o_public.resp_party.length-1].party_name.length==0)
							cit_o_public.resp_party.pop();
					}
				}
			}
		}
	}									
						
	//series
	var series=GetXMLElementByName(item_cit_o_pub, "cit", "series");
	if (series)
	{
		cit_o_public.series={};
		
		var i_elem_series=0;
		elem=GetXMLElementByName(series, "cit", "name");
		if (elem)
		{
			i_elem_series++;
			cit_o_public.series.name=DonaTextDesDeGcoCharacterString(elem);
		}
		else
			cit_o_public.series.name="";
			
		elem=GetXMLElementByName(series, "cit", "issueIdentification");
		if (elem)
		{
			i_elem_series++;
			cit_o_public.series.issueIdentification=DonaTextDesDeGcoCharacterString(elem);
		}
		else
			cit_o_public.series.issueIdentification="";

		elem=GetXMLElementByName(series, "cit", "page");
		if (elem)
		{
			i_elem_series++;
			cit_o_public.series.page=DonaTextDesDeGcoCharacterString(elem);
		}
		else
			cit_o_public.series.page="";

		if (i_elem_series==0)
			cit_o_public.series="";											
	}
	else
		cit_o_public.series="";								
										
	//otherCitationDetails
	elem=GetXMLElementByName(item_cit_o_pub, "cit", "otherCitationDetails");
	if (elem)
		cit_o_public.otherCitationDetails=DonaTextDesDeGcoCharacterString(elem);										
	else
		cit_o_public.otherCitationDetails="";

	//onlineResource (a NiMMbus només un)
	elem=GetXMLElementByName(item_cit_o_pub, "cit", "onlineResource");
	cit_o_public.onlineResource=OmpleEstructuraOnlineResource(elem); //if (elem) protegit dins
	
	if (es_public==true)
	{
		//category
		var category;
		category=GetXMLElementByName(item_cit_o_pub, "qcm", "category");
		cit_o_public.category=DonaTextDesDeCodeList(category, "qcm", "QCM_PublicationCategoryCode");
								
		//abstract																		
		elem=GetXMLElementByName(item_cit_o_pub, "qcm", "abstract");
		if (elem)
			cit_o_public.abstract=DonaTextDesDeGcoCharacterString(elem);										
		else
			cit_o_public.abstract="";
	}	
	return;	
}

function DonaTextDesDeCodeList(item, namespace, code_list)
{
	if (item)
	{
		var elem=GetXMLElementByName(item, namespace, code_list);
		if (elem)
		{
			var code_list_value=GetXMLAttributeByName(elem, null, "codeListValue");
			if (code_list_value && code_list_value.value)
				return code_list_value.value;
		}
	}
	return "";
}

function DonaDataDesDeGcoDate(item)
{
	var s;
	
	var elem=GetValueXMLElementByName(item, "gco", "Date");
	if (elem)
		return elem;

	return "";
}

function DonaDataOTimeDesDeCadenaDateTime(item, tipus)
{
	var s, s2;
	s=item;	
	if (tipus=="date")
	{
		if (s.indexOf("T")!=-1)
			return s.substring(0, s.indexOf("T"));		
		else 
			return s;	
	}
	else //time
	{
		if (s.indexOf("T")!=-1)
		{ //T11:23:32.975Z -> la cadena que vull és 11:23:32.975, que no tingui ni la T ni la Z
			s2=s.substring(s.indexOf("T")+1);
			if (s2.indexOf(":00Z")!=-1)
				return s2.substring(0,s2.indexOf(":00Z"));		
			if (s2.indexOf("Z")!=-1)
				return s2.substring(0,s2.indexOf("Z"));		
			return s2;
		}
		else 
			return "";			
	}
}

function DonaCoordenadaDesDeGcoDecimal(item)
{
	var elem=GetValueXMLElementByName(item, "gco", "Decimal");
	//<gco:Decimal>1.462500</gco:Decimal>
	if (elem)
		return elem;
	else
		return "";
}

function DonaDataDesDeGcoDateTime(item)
{
	var elem=GetValueXMLElementByName(item, "gco", "DateTime");
	//<gco:DateTime>2017-07-20T11:23:32.975Z</gco:DateTime>
	if (elem)
		return DonaDataOTimeDesDeCadenaDateTime(elem, "date");
	else
		return "";
}

function DonaTimeDesDeGcoDateTime(item)
{
	var elem=GetValueXMLElementByName(item, "gco", "DateTime");
	//<gco:DateTime>2017-07-20T11:23:32.975Z</gco:DateTime>
	if (elem)
		return DonaDataOTimeDesDeCadenaDateTime(elem, "time");
	else
		return "";
}

function DonaDataDesDeTimeInstant(item)
{
	var s;
	
	var elem=GetValueXMLElementByName(item, "gml", "timePosition");
	//<gml:timePosition>2016-02-21T19:10:06.425678Z</gml:timePosition>
	if (elem)
		return DonaDataOTimeDesDeCadenaDateTime(elem, "date");
	else
		return "";
}

function DonaTimeDesDeTimeInstant(item)
{	
	//hi ha un pis TimeInstant que el "salto" (no el demano) però ok
	var elem=GetValueXMLElementByName(item, "gml", "timePosition");
	//<gml:timePosition>2016-02-21T19:10:06.425678Z</gml:timePosition>
	if (elem)
		return DonaDataOTimeDesDeCadenaDateTime(elem, "time");
	else
		return "";
}

function TornaBooleaDesDeWPSLiteralOutput(item) //si diu "true" torno true, si no torno false en qualsevol cas
{
	var literal_data=GetXMLElementByName(item, "wps", "LiteralData");
	if (literal_data && literal_data.childNodes[0] && literal_data.childNodes[0].nodeValue)
	{
		if (literal_data.childNodes[0].nodeValue=="true")
			return true;
	}
	return false;
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
var output, identifier, feedback_item, item_identifier, elem, user_comment, output2, target_item, resource_ref, output3, identifier_item;
var usage, usage_descr, discov_issue;

	output=GetXMLElementCollectionByName(root, "wps", "Output");

	if (output && output.length)
	{
		var guf={};
		for (var item=0; item<output.length; item++)
		{
			identifier=GetXMLElementByName(output.item(item), "ows", "Identifier");
			if (identifier)
			{
				/*if (identifier.childNodes[0].nodeValue=="title")
					guf.title=OmpleInputDesDeWPSLiteralOutput(output.item(item));*/
				if (identifier.childNodes[0].nodeValue=="reason")
					guf.purpose=OmpleInputDesDeWPSLiteralOutput(output.item(item));
				else if (identifier.childNodes[0].nodeValue=="feedback")
				{					
					feedback_item=OmpleInputDesDeWPSComplexOutput(output.item(item));
					if (feedback_item)
					{
						item_identifier=GetXMLElementByName(feedback_item, "guf", "itemIdentifier");
						if (item_identifier)
						{
							guf.identifier={};
							
							//code
							elem=GetXMLElementByName(item_identifier, "mcc", "code")
							if (elem)
							{
								//code								
								guf.identifier.code=DonaTextDesDeGcoCharacterString(elem);
						
								//code_space: pot ser un CharacterString o un anchor, miro les dues coses
								elem=GetXMLElementByName(item_identifier, "mcc", "codeSpace");
								if (elem)
									guf.identifier.codeSpace=DonaTextDesDeGcoCharacterStringOGcxAnchor(elem);
								else
									guf.identifier.codeSpace="";
							}
						}
						else
							guf.identifier=null;
							
						//guf.abstract
						elem=GetXMLElementByName(feedback_item, "guf", "abstract");
						if (elem)
							guf.abstract=DonaTextDesDeGcoCharacterString(elem);

						//guf.purpose -> l'he tret de wps:Output/reason. Ja està a GUF!
						
						elem=GetXMLElementByName(feedback_item, "guf", "contactRole");
						if (elem)
							guf.contactRole=DonaTextDesDeCodeList(elem, "guf", "GUF_UserRoleCode");
															
						output2=GetXMLElementCollectionByName(feedback_item, "guf", "citation");							
						if (output2 && output2.length)
						{	
							guf.public = [];						
							for (var item2=0; item2<output2.length; item2++)
							{				
								//suposem qcm:QCM_Publication tot. podria ser cit:CI_Citation però per nimmbus no
								var public_item=GetXMLElementByName(output2.item(item2), "qcm", "QCM_Publication");
								if (public_item)
								{
									guf.public.push({});										
									//en aquest moment el nou element de l'array ja s'ha creat i per tant length ja ha augmentat														
									OmpleEstructuraDesdeCitationOPublication(public_item, guf.public[guf.public.length-1], true);
								}
							}
						}					
								
						output2=GetXMLElementCollectionByName(feedback_item, "guf", "dateInfo");
						if (output2 && output2.length)
						{								
							guf.dateInfo = [];
							for (var item2=0; item2<output2.length; item2++)
							{				
								elem=GetXMLElementByName(output2.item(item2), "cit", "CI_Date");															
								if (elem)
								{								
									var date=GetXMLElementByName(elem, "cit", "date");									
								
									if (date)
									{
										guf.dateInfo.push({});
										//podria ser una Date enlloc de un DateTime però a nimmbus sempre és datetime
										guf.dateInfo[guf.dateInfo.length-1].date=DonaDataDesDeGcoDateTime(date);
																		
										var date_type=GetXMLElementByName(elem, "cit", "dateType");
										if (date_type)
											guf.dateInfo[guf.dateInfo.length-1].dateType=DonaTextDesDeCodeList(date_type, "cit", "cit:CI_DateTypeCode");
										else
											guf.dateInfo[guf.dateInfo.length-1].dateType="";									
									}
								}
							}
						}
						
						elem=GetXMLElementByName(feedback_item, "guf", "rating");
						if (elem)
							guf.rating=DonaTextDesDeCodeList(elem, "guf", "GUF_RatingCode");
				
						user_comment=GetXMLElementByName(feedback_item, "guf", "userComment");
						if (user_comment)
						{
							elem=GetXMLElementByName(feedback_item, "guf", "comment");
							
							guf.user_comment={};
							guf.user_comment.comment=DonaTextDesDeGcoCharacterString(elem);
							elem=GetXMLElementByName(feedback_item, "guf", "motivation");
							if (elem)
								guf.user_comment.motivation=DonaTextDesDeCodeList(elem, "guf", "GUF_MotivationCode");
						}
						
						output2=GetXMLElementCollectionByName(feedback_item, "guf", "target");
						if (output2 && output2.length)
						{
							guf.target = [];								
							for (var item2=0; item2<output2.length; item2++)
							{				
								target_item=GetXMLElementByName(output2.item(item2), "guf", "GUF_FeedbackTarget");															
								if (target_item)
								{
									var role;
									
									role=GetXMLElementByName(target_item, "guf", "role");
									//resourceRef poden ser diversos, em quedo amb el primer, de moment
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
									//OGscope
									var scope;

									scope=GetXMLElementByName(target_item, "guf", "scope");
									if (scope && resource_ref)
									{
										var bbox=GetXMLElementByName(target_item, "gex", "EX_GeographicBoundingBox");
										if (bbox)
										{
											guf.target[guf.target.length-1].minlong=DonaCoordenadaDesDeGcoDecimal(GetXMLElementByName(target_item, "gex", "westBoundLongitude"));
											guf.target[guf.target.length-1].maxlong=DonaCoordenadaDesDeGcoDecimal(GetXMLElementByName(target_item, "gex", "eastBoundLongitude"));
											guf.target[guf.target.length-1].minlat=DonaCoordenadaDesDeGcoDecimal(GetXMLElementByName(target_item, "gex", "southBoundLatitude"));
											guf.target[guf.target.length-1].maxlat=DonaCoordenadaDesDeGcoDecimal(GetXMLElementByName(target_item, "gex", "northBoundLatitude"));
										}
										var gmlpol=GetXMLElementByName(target_item, "gex", "EX_BoundingPolygon");
										if (gmlpol){
											guf.target[guf.target.length-1].gmlpol=DonaTextDesDeGexPolygon(gmlpol);
										}
										guf.target[guf.target.length-1].scope=true;
									}
								
									// hi podrien haver més coses com online resources

									}
								}
							}
						}
						
						//guf.usage -> nosaltres n'acceptem de moment només un, i dins només un 
						usage=GetXMLElementByName(feedback_item, "guf", "usage");
						if (usage)
						{
							guf.usage={};							
							output2=GetXMLElementCollectionByName(usage, "guf", "reportAspect");
							if (output2 && output2.length)
							{							
								guf.usage.reportAspect = [];
								for (var item2=0; item2<output2.length; item2++)
								{
									elem=DonaTextDesDeCodeList(output2.item(item2), "guf", "GUF_ReportAspectCode")
									if (elem)
										guf.usage.reportAspect.push(elem);									
								}
							}
							
							usage_descr=GetXMLElementByName(usage, "guf", "usageDescription");
							if (usage_descr)
							{
								guf.usage.usage_descr={};
								elem=GetXMLElementByName(usage_descr, "mri", "specificUsage");
								if (elem)
									guf.usage.usage_descr.specific_usage=DonaTextDesDeGcoCharacterString(elem);
									
								elem=GetXMLElementByName(usage_descr, "mri", "usageDateTime");
								if (elem)
									guf.usage.usage_descr.usage_dt={date: DonaDataDesDeTimeInstant(elem),
																								  time: DonaTimeDesDeTimeInstant(elem)};
								
								elem=GetXMLElementByName(usage_descr, "mri", "userDeterminedLimitations");
								if (elem)
									guf.usage.usage_descr.user_det_lim=DonaTextDesDeGcoCharacterString(elem);
								
								elem=GetXMLElementByName(usage_descr, "mri", "response");
								if (elem)
									guf.usage.usage_descr.response=DonaTextDesDeGcoCharacterString(elem);
	
								output2=GetXMLElementCollectionByName(usage_descr, "mri", "additionalDocumentation");							
								if (output2 && output2.length)
								{								
									guf.usage.usage_descr.add_doc = [];
									for (var item2=0; item2<output2.length; item2++)
									{				
										var citation_item=GetXMLElementByName(output2.item(item2), "cit", "CI_Citation");
										if (citation_item)
										{
											guf.usage.usage_descr.add_doc.push({});										
											//en aquest moment el nou element de l'array ja s'ha creat i per tant length ja ha augmentat														
											OmpleEstructuraDesdeCitationOPublication(citation_item, guf.usage.usage_descr.add_doc[guf.usage.usage_descr.add_doc.length-1], false);
										}
									}
								}
					 
								elem=GetXMLElementByName(usage_descr, "qcm", "code");
								if (elem)
									//guf.usage.usage_descr.code=decodeURI(DonaTextDesDeGcoCharacterString(elem));
									guf.usage.usage_descr.code=(DonaTextDesDeGcoCharacterString(elem));
	
								elem=GetXMLElementByName(usage_descr, "qcm", "codeLinkage");
								guf.usage.usage_descr.codeLink=OmpleEstructuraOnlineResource(elem);	//if (elem) protegit dins
							
								elem=GetXMLElementByName(usage_descr, "qcm", "codeMediaType");
								if (elem)
									guf.usage.usage_descr.codeMediaType=DonaTextDesDeNmsElement(elem, "gcx", "MimeFileType");

								elem=GetXMLElementByName(usage_descr, "qcm", "platform");
								if (elem)
									guf.usage.usage_descr.platform=DonaTextDesDeGcoCharacterString(elem);

								elem=GetXMLElementByName(usage_descr, "qcm", "version");
								if (elem)
									guf.usage.usage_descr.version=DonaTextDesDeGcoCharacterString(elem);
																
								elem=GetXMLElementByName(usage_descr, "qcm", "schema");
								if (elem)
									//guf.usage.usage_descr.schema=decodeURI(DonaTextDesDeGcoCharacterString(elem));
									guf.usage.usage_descr.schema=(DonaTextDesDeGcoCharacterString(elem));

								elem=GetXMLElementByName(usage_descr, "qcm", "suggestedApplication");
								if (elem)
									guf.usage.usage_descr.suggestedApplication=DonaTextDesDeGcoCharacterString(elem);

								elem=GetXMLElementByName(usage_descr, "qcm", "diagram");
								if (elem)
									guf.usage.usage_descr.diagram=DonaTextDesDeGcoCharacterString(elem);

								elem=GetXMLElementByName(usage_descr, "qcm", "diagramLinkage");
								guf.usage.usage_descr.diagramLink=OmpleEstructuraOnlineResource(elem); //if (elem) protegit dins

								elem=GetXMLElementByName(usage_descr, "qcm", "diagramMediaType");
								if (elem)
									guf.usage.usage_descr.diagramMediaType=DonaTextDesDeNmsElement(elem, "gcx", "MimeFileType");
							}
							
							discov_issue=GetXMLElementByName(usage, "guf", "discoveredIssue");
							if (discov_issue)
							{
								guf.usage.discov_issue={};
								elem=GetXMLElementByName(discov_issue, "qcm", "knownProblem");
								if (elem)
									guf.usage.discov_issue.known_problem=DonaTextDesDeGcoCharacterString(elem);

								elem=GetXMLElementByName(discov_issue, "qcm", "problemDateTime");
								if (elem)
									guf.usage.discov_issue.problem_dt={date: DonaDataDesDeGcoDateTime(elem),
																										 time: DonaTimeDesDeGcoDateTime(elem)};
									
								elem=GetXMLElementByName(discov_issue, "qcm", "workAround");
								if (elem)
									guf.usage.discov_issue.work_around=DonaTextDesDeGcoCharacterString(elem);
	
								output2=GetXMLElementCollectionByName(discov_issue, "qcm", "referenceDoc");							
								if (output2 && output2.length)
								{		
									guf.usage.discov_issue.ref_doc = [];												
									for (var item2=0; item2<output2.length; item2++)
									{				
										var public_item=GetXMLElementByName(output2.item(item2), "qcm", "QCM_Publication");
										if (public_item)
										{
											guf.usage.discov_issue.ref_doc.push({});										
											//en aquest moment el nou element de l'array ja s'ha creat i per tant length ja ha augmentat														
											OmpleEstructuraDesdeCitationOPublication(public_item, guf.usage.discov_issue.ref_doc[guf.usage.discov_issue.ref_doc.length-1], true);
										}
									}
								}
								
								elem=GetXMLElementByName(discov_issue, "qcm", "expectedFixDate");
								if (elem)
									guf.usage.discov_issue.exp_fix_date=DonaDataDesDeGcoDate(elem);
														
								/* Decidim N fixed resources*/				
								output2=GetXMLElementCollectionByName(discov_issue, "qcm", "fixedResource");							
								if (output2 && output2.length)
								{								
									guf.usage.discov_issue.fix_rsrc = [];						
									for (var item2=0; item2<output2.length; item2++)
									{				
										var citation_item=GetXMLElementByName(output2.item(item2), "cit", "CI_Citation");
										if (citation_item)
										{
											guf.usage.discov_issue.fix_rsrc.push({});										
											//en aquest moment el nou element de l'array ja s'ha creat i per tant length ja ha augmentat														
											OmpleEstructuraDesdeCitationOPublication(citation_item, guf.usage.discov_issue.fix_rsrc[guf.usage.discov_issue.fix_rsrc.length-1], false);
										}
									}
								}
								
								output2=GetXMLElementCollectionByName(discov_issue, "qcm", "alternativeResource");							
								if (output2 && output2.length)
								{								
									guf.usage.discov_issue.alt_rsrc = [];						
									for (var item2=0; item2<output2.length; item2++)
									{				
										var citation_item=GetXMLElementByName(output2.item(item2), "cit", "CI_Citation");
										if (citation_item)
										{
											guf.usage.discov_issue.alt_rsrc.push({});										
											//en aquest moment el nou element de l'array ja s'ha creat i per tant length ja ha augmentat														
											OmpleEstructuraDesdeCitationOPublication(citation_item, guf.usage.discov_issue.alt_rsrc[guf.usage.discov_issue.alt_rsrc.length-1], false);
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
			categories[j].scheme=="https://www.nimmbus.cat/resource_type" &&
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
			else if (categories[j].term=="INDIVIDU")
				return "INDIVIDU";
			else if (categories[j].term=="ORGANISM")
				return "ORGANISM";
		}
	}		
	return "";		
}