/*
	This is part of the NiMMbus libraries.
	The main objective of this library is to expose provide functions that are useful for HTML based GUF applications such us the MiraMon Map Browser and NextGEOSS community portals
	Developed by Joan Masó and Alaitz Zabala.
	License: Attribution 4.0 International (CC BY 4.0) http://creativecommons.org/licenses/by/4.0/
*/

"use strict"

//var ServerGUF="http://localhost/cgi-bin/server1/nimmbus.cgi";
//var ClientGUF="http://localhost/nimmbus/index.htm";
var ServerGUF="https://www.opengis.uab.cat/cgi-bin/nimmbus/nimmbus.cgi";
var ClientGUF="https://www.opengis.uab.cat/nimmbus/index.htm";

function GUFIncludeScript(url, late)   //https://stackoverflow.com/questions/950087/how-do-i-include-a-javascript-file-in-another-javascript-file
{
	var script = document.createElement("script");  // create a script DOM node

	if (late)
	{
	script.setAttributeNode(document.createAttribute("async"));
	script.setAttributeNode(document.createAttribute("defer"));
	}
	script.src = url;  // set its src to the provided URL
	document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead). Ja ho he fet.
}

GUFIncludeScript("Nmmblang.js");
GUFIncludeScript("xml.js");
GUFIncludeScript("owc_atom.js");
GUFIncludeScript("wps_iso_guf.js");
GUFIncludeScript("guf_locale.js");
	
function GUFShowFeedbackInHTMLDiv(elem, seed_div_id, rsc_type, title, code, codespace, lang)
{
	elem.innerHTML = GUFDonaCadenaFinestraFeedbackResource(seed_div_id, rsc_type, title, code, codespace, lang);
	//demano el fitxer atom de feedbacks previs
	GUFShowPreviousFeedbackInHTMLDiv(seed_div_id+"Previ", rsc_type, code, codespace, lang);
}

function GUFShowPreviousFeedbackInHTMLDiv(div_id, rsc_type, code, codespace, lang)
{
	var url=ServerGUF+"?SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:ENUMERATE&LANGUAGE=" + lang + "&STARTINDEX=1&COUNT=100&FORMAT=text/xml&TYPE=FEEDBACK&TRG_TYPE_1=CITATION&TRG_FLD_1=CODE&TRG_VL_1=" + code + "&TRG_OPR_1=EQ&TRG_NXS_1=AND&TRG_TYPE_2=CITATION&TRG_FLD_2=NAMESPACE&TRG_VL_2=" + codespace + "&TRG_OPR_2=EQ";
	loadFile(url, "text/xml", CarregaFeedbacksAnteriors, function(xhr, extra_param) { alert(extra_param.url + ": " + xhr ); }, {url: url, div_id: div_id, rsc_type:rsc_type, lang: lang});
}

function GUFDonaCadenaLang(cadena_lang, lang)
{
	if(cadena_lang)
	{
		switch(lang)
		{	
			case "cat":
				return cadena_lang.cat;
			case "spa":
				return cadena_lang.spa;
			default:     //Si no hi ha l'idioma solicitat faig que xerri en anglès
			case "eng":
				return cadena_lang.eng;
			case "fre":
				return cadena_lang.fre;
		}
	}
	return cadena_lang.eng;
}

//Duplicated from the MiraMon Map Browser
function GUFShaObertPopUp(wnd, lang)
{
	if (wnd==null)
	{
	    alert(GUFDonaCadenaLang({"cat":"Aquest navegador té les finestres emergents bloquejades. Canvia la configuració del teu navegador.\nEn algunes versions d'Internet Explorer, només cal fer un clic sobre la faixa groga superior.", 
							  "spa":"Este navegador tiene las ventanas emergentes bloqueadas. Modifique la configuración de su navegador.\nEn algunas versiones de Internet Explorer, un clic sobre la banda amarilla superior es suficiente.", 
							  "eng":"Sorry, this browser has pop-up windows locked. Please change browser configuration.\nIn some Internet Explorer versions only a click on top yellow band will fix it.",
							  "fre":"Ce navigateur a les fenêtres émergentes fermées. Changez la configuration de votre navigateur.\nDans certaines versions d'Internet Explorer, il suffit de cliquer sur la barre jaune supérieure."}, lang));
	    return false;
	}
	return true;
}


function GUFAnalitzaExceptionReport(root, url)
{
var exception_error;

	exception_error=GetXMLElementByName(root, "ows", "ExceptionText");
	if (exception_error)
	{
		alert(url + ": "+ exception_error.childNodes[0].nodeValue);
		return true;
	}
	//Si no trobo text, potser encara trovaré el codi
	exception_error=GetXMLElementByName(root, "ows", "Exception");
	if (exception_error)
	{
		exception_error=GetXMLAttributeByName(exception_error, null, "exceptionCode");
		if (exception_error && exception_error.value)
		{
			alert(url + ": "+ exception_error.value);
			return true;
		}
	}
	return false;
}


function DonaCadenaDataHoraDesDeElementCompost(elem)
{
	var s="";
	
	if (elem)
	{
		if (elem.date)
		{
			s+=elem.date;
			if (elem.time)
				s+="T"+elem.time+":00Z";
		}
	}
	return s;
}

function CarregaFeedbacksAnteriors(doc, extra_param)
{
var cdns=[];

	if (!doc || !doc.documentElement)
	{
		alert (extra_param.url + ": " + GUFDonaCadenaLang({"cat":"El retorn no és xml", "spa":"El retorno no es xml", "eng":"Return is not xml", "fre":"Le retour n'est pas xml"}, extra_param.lang));
		return ;
	}
	var root=doc.documentElement;

	if (GUFAnalitzaExceptionReport(root, extra_param.url))
		return;
	var owc=ParseOWSContextAtom(root);
	if (owc.properties.totalResults==0 || !owc.features)
	{
		cdns.push(GUFDonaCadenaLang({"cat":"No hi ha cap valoració prèvia sobre la", 
					"spa":"No hay ninguna valoración previa sobre la", 
					"eng":"There is no previous user feedback on the", 
					"fre":"Il n'y a pas encore de commentaires des utilisateurs sur la"}, extra_param.lang), 
			" ", extra_param.rsc_type, " ",
			GUFDonaCadenaLang({"cat":"encara", 
					"spa":"todavía", 
					"eng":"yet", 
					"fre":"encore"}, extra_param.lang));
		document.getElementById(extra_param.div_id).innerHTML=cdns.join("");
		return;
	}
	var type;
	//cdns.push("<div class=\"guf_report user\">");
	for (var i=0; i<owc.features.length; i++)
	{
		type=GetNimmbusTypeOfAOWCFeature(owc.features[i]);
		if (type=="FEEDBACK")
		{
			var str = owc.features[i].properties.links.alternates[0].href; 
			var n = str.search("&RESOURCE=");
			var str2 = str.substring(n+10);
			var n2 = str2.search("&");  
			str = str2.substring(0, n2);
 		  
			cdns.push("<fieldset class=\"guf_fieldset user\"><legend class=\"guf_legend user\">", owc.features[i].properties.authors[0].name, ", ", DonaDataISOComAText(owc.features[i].properties.updated), 
				"</legend>", 							
				"<div class=\"guf_fb_id user\"><span class=\"guf_key user\">NiMMbus Id.</span>: <a class=\"guf_link user\" href=\""+ServerGUF+"?SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:RETRIEVE&LANGUAGE="+extra_param.lang+"&RESOURCE="+str+"\" target=\"_blank\">"+str+"</a></div>",				
				"<div class=\"guf_abstract user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat":"Resum", "spa":"Resumen", "eng":"Abstract", "fre":"Résumé"}, extra_param.lang), "</span>: ", owc.features[i].properties.title,
				"</div><div id=\"", extra_param.div_id, "_",i , "\"></div>",
				"</fieldset>");
		}
	}
	cdns.push("<div class=\"guf_edit user\"><input type=\"button\" class=\"guf_button user\" value=\"",
		GUFDonaCadenaLang({"cat":"Edita", "spa":"Edita", "eng":"Edit", "fre":"Éditer"}, extra_param.lang), "\"",
		" onClick='GUFOpenNimmbus(\"", extra_param.lang, "\");' /> ",
		GUFDonaCadenaLang({"cat":"les teves entrades prèvies", "spa":"tus entradas previas", "eng":"your previous entries", "fre":"vos entrées précédentes"}, extra_param.lang), "</div><!-- guf_edit -->"); 
	//fi de  "</div><!-- guf_report -->");
	document.getElementById(extra_param.div_id).innerHTML=cdns.join("");
	for (var i=0; i<owc.features.length; i++)
	{
		type=GetNimmbusTypeOfAOWCFeature(owc.features[i]);
		if (type=="FEEDBACK" && owc.features[i].properties && owc.features[i].properties.links && owc.features[i].properties.links.alternates && owc.features[i].properties.links.alternates.length && owc.features[i].properties.links.alternates[0].href)
			loadFile(owc.features[i].properties.links.alternates[0].href, "text/xml", CarregaFeedbackAnterior, function(xhr, extra_param) { alert(extra_param.url + ": " + xhr ); }, {url: owc.features[i].properties.links.alternates[0].href, div_id: extra_param.div_id + "_" + i, lang: extra_param.lang});
	}
}

function ConstrueixURLDesdeIdentifierSiDOIoNiMMbus(identifier, lang, es_id_fb_item)
{
	var link_html="";
	
	if (identifier)
	{
		var text_html="";
		if (identifier.codeSpace)
		{
			if (identifier.codeSpace.endsWith("/"))
				text_html=identifier.codeSpace;
			else
				text_html=identifier.codeSpace+"/";
		}
		
		if (identifier.code)
			text_html=text_html+identifier.code;
			
		//text_html=text_html+". ";
			
		if (text_html.indexOf("www.doi.org") >= 0 || text_html.indexOf("/doi.org") >= 0)
			link_html="<span class=\"guf_key_2 user\">DOI</span>: <a class=\"guf_link user\" href=\""+text_html+"\" target=\"_blank\">"+identifier.code+"</a>. <br/>";
		else if (text_html.indexOf("nimmbus/resourceId") >= 0) //si codeSpace és http://www.opengis.uab.cat/nimmbus/resourceId és que és un recurs NiMMbus, i per tant puc fer la consulta de retrieve
		{
			if (es_id_fb_item)
				link_html="<span class=\"guf_key user\">NiMMbus Id.</span>: <a class=\"guf_link user\" href=\""+ServerGUF+"?SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:RETRIEVE&LANGUAGE="+lang+"&RESOURCE="+identifier.code+"\" target=\"_blank\">"+identifier.code+"</a><br/>";
			else
				link_html="<span class=\"guf_key_2 user\">NiMMbus Id.</span>: <a class=\"guf_link user\" href=\""+ServerGUF+"?SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:RETRIEVE&LANGUAGE="+lang+"&RESOURCE="+identifier.code+"\" target=\"_blank\">"+identifier.code+"</a><br/>";
		}
		else			
			link_html="<span class=\"guf_key_2 user\">"+GUFDonaCadenaLang({"cat":"Identificador", "spa":"Identificador", "eng":"Identifier", "fre":"Identifiant"}, lang)+"</span>: "+text_html+"<br/>";	
	}
	return link_html;
}

function ConstrueixCadenaDesdeCitationOPublication(cdns, cit_o_pub, i_cit_o_pub, text_titol, prefix_div, extra_param, es_public)
{
	if (text_titol)
	{
		if (es_public && cit_o_pub.category)
			cdns.push("<span class=\"guf_key user\">", text_titol, " (", GUFDonaCadenaLang(QCM_PublicationCategoryCode[cit_o_pub.category], extra_param.lang),"):</span> ");
		else
			cdns.push("<span class=\"guf_key user\">", text_titol,":</span> ");
	}
	else
	{
		if (es_public && cit_o_pub.category)
			cdns.push("<span class=\"guf_key user\">", GUFDonaCadenaLang(QCM_PublicationCategoryCode[cit_o_pub.category], extra_param.lang),":</span> ");
		else
		{
			if (es_public)
				cdns.push("<span class=\"guf_key user\">", GUFDonaCadenaLang({"cat":"Publicació", "spa":"Publicación", "eng":"Publication", "fre":"Publication"}, extra_param.lang), ":</span> ");
			else //cas remot perquè mai em passi una citació sense text_titol, però per si de cas
				cdns.push("<span class=\"guf_key user\">", GUFDonaCadenaLang({"cat":"Citació", "spa":"Citación", "eng":"Citation", "fre":"Citation"}, extra_param.lang), ":</span> ");
		}
	}
	cdns.push("<input type=\"checkbox\" id=\""+extra_param.div_id+"_"+prefix_div+"_"+i_cit_o_pub+"\" style=\"display:none;\">");

	if (cit_o_pub.title)
		cdns.push(cit_o_pub.title);
					
	cdns.push(" <div class=\"guf_folded user\">"); //L'espai cal perquè si no el "Shown ..." queda junt amb lo anterior quan està plegat
		
	if (cit_o_pub.edition || cit_o_pub.editionDate)
	{
		cdns.push("<div class=\"guf_cit_edition user\"><span class=\"guf_key_2 user\">", GUFDonaCadenaLang({"cat": "Edició", "spa": "Edición", "eng": "Edition", "fre":"Édition"}, extra_param.lang), ":</span> ");
		if (cit_o_pub.edition)
		{
			cdns.push(cit_o_pub.edition);
			if (cit_o_pub.editionDate)
				cdns.push(", ", cit_o_pub.editionDate);
		}
		else //si no tinc edition és que tinc editionDate, si no no hauria entrat
			cdns.push(cit_o_pub.editionDate);
		cdns.push("</div>");				
	}
	
	if (cit_o_pub.series && cit_o_pub.series.name)
	{
		cdns.push("<div class=\"guf_cit_series user\"><span class=\"guf_key_2 user\">", GUFDonaCadenaLang({"cat":"Sèrie", "spa":"Serie", "eng": "Series", "fre":"série"}, extra_param.lang), ":</span> ");
		cdns.push("<i>", cit_o_pub.series.name, "</i>");
		if (cit_o_pub.series.issueIdentification)
		{
			cdns.push(", ", cit_o_pub.series.issueIdentification);
			if (cit_o_pub.series.page)
				cdns.push(", pp.", cit_o_pub.series.page);
		}
		cdns.push("</div>");
	}
	
	if (cit_o_pub.otherCitationDetails)
		cdns.push("<div class=\"guf_cit_other_citation user\"><span class=\"guf_key_2 user\">", 
			GUFDonaCadenaLang({"cat": "Altres detalls de la citació", "spa": "Otros detalles de la cita", "eng": "Other citation details", "fre":"Autres détails de la citation"}, extra_param.lang), 
			":</span> ", cit_o_pub.otherCitationDetails, "</div>");				
	
	//citedResponsibleParty
	if (cit_o_pub.resp_party)
	{	
		cdns.push("<div class=\"guf_cit_responsibles user\">");
		for (var i_resp_party=0; i_resp_party<cit_o_pub.resp_party.length; i_resp_party++)
		{
			if (cit_o_pub.resp_party[i_resp_party].party_name)
			{
				var party_name_txt="";
				//construeixo la cadena dels N parties amb igual rol
				for (var i_party_name=0, i_afegit=0; i_party_name<cit_o_pub.resp_party[i_resp_party].party_name.length; i_party_name++)
				{
					if (cit_o_pub.resp_party[i_resp_party].party_name[i_party_name].name!="")
							cdns.push("<span class=\"guf_key_2 user\">",GUFDonaCadenaLang(CI_RoleCode[cit_o_pub.resp_party[i_resp_party].role],extra_param.lang)+":</span> "+cit_o_pub.resp_party[i_resp_party].party_name[i_party_name].name+"<br/>");	
				}
			}
		}
		cdns.push("</div>");
	}			

	if (cit_o_pub.onlineResource && cit_o_pub.onlineResource.linkage)
	{				
		var text_html="<div class=\"guf_cit_online_resource user\"><span class=\"guf_key_2 user\">"+GUFDonaCadenaLang({"cat":"Recurs online", "spa":"Recurso online", "eng":"Online resource", "fre":"Ressource en ligne"},extra_param.lang)+"</span>: <a class=\"guf_link user\" href=\""+cit_o_pub.onlineResource.linkage+"\" target=\"_blank\">";
		if (cit_o_pub.onlineResource.description)
			text_html=text_html+cit_o_pub.onlineResource.description;
		else
			text_html=text_html+cit_o_pub.onlineResource.linkage;
		text_html=text_html+"</a>";
		
		if (cit_o_pub.onlineResource.function)
			text_html=text_html+" ("+GUFDonaCadenaLang(CI_OnLineFunctionCode[cit_o_pub.onlineResource.function],extra_param.lang)+")";
		text_html=text_html+"</div>";
		cdns.push(text_html);	
	}			
	
	if (cit_o_pub.identifier)
	{
		cdns.push("<div class=\"guf_cit_identifier user\">");
		for (var i_id=0; i_id<cit_o_pub.identifier.length; i_id++)
			cdns.push(ConstrueixURLDesdeIdentifierSiDOIoNiMMbus(cit_o_pub.identifier[i_id], extra_param.lang, false));
		cdns.push("</div>");
	}

	if (es_public && cit_o_pub.abstract)
		cdns.push("<div class=\"guf_pub_abstract user\"><span class=\"guf_key_2 user\">"+GUFDonaCadenaLang({"cat":"Resum", "spa":"Resumen", "eng":"Abstract", "fre":"Résumé"},extra_param.lang)+"</span>: ", cit_o_pub.abstract,"</div>");				
		
	cdns.push("</div><a class=\"guf_link user\" href=\"javascript:void(0);\"><label for=\""+extra_param.div_id+"_"+prefix_div+"_"+i_cit_o_pub+"\"><span class=\"guf_show_more user\">"+GUFDonaCadenaLang({"cat":"Mostrar/amagar més informació", "spa":"Mostrar/ocultar más información", "eng":"Show/hide more information", "fre":"Afficher/masquer plus d'informations"},extra_param.lang)+"</span></label></a></input>");

	return;
}

function CarregaFeedbackAnterior(doc, extra_param)
{
var cdns=[];

	if (!doc || !doc.documentElement)
	{
		alert (extra_param.url + ": " + GUFDonaCadenaLang({"cat":"El retorn no és xml", "spa":"El retorno no es xml", "eng":"Return is not xml", "fre":"Le retour n'est pas xml"}, extra_param.lang)); 
		return ;
	}
	var root=doc.documentElement;

	if (GUFAnalitzaExceptionReport(root, extra_param.url))
		return;

	var guf=GetRetrieveResourceFeedbackOutputs(root);

	if (!guf)
	{	
		alert (extra_param.url + ": " + GUFDonaCadenaLang({"cat":"El retorn no és un xml guf", "spa":"El retorno no es xml guf", "eng":"Return is not xml guf", "fre":"Le retour n'est pas xml guf"}, extra_param.lang)); 
		return;
	}
	
	/* Ara l'he posat a fora perquè quedi més endreçat (Id, titol + resta)
	if (guf.identifier)
		cdns.push(ConstrueixURLDesdeIdentifierSiDOIoNiMMbus(guf.identifier, extra_param.lang, true));*/
	
	/*if (guf.abstract) ja no existeix pq és el feature.title que JA he posat)
		cdns.push("<div class=\"guf_abstract user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat":"Resum", "spa":"Resumen", "eng":"Abstract", "fre":"Abstrait"}, extra_param.lang), ":</span> ", guf.abstract, "</div>");*/

	if (guf.purpose)
		cdns.push("<div class=\"guf_purpose user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat":"Propòsit", "spa":"Propósito", "eng":"Purpose", "fre":"Raison"}, extra_param.lang), ":</span> ", guf.purpose, "</div>");

	//if (guf.contact)
	
	if (guf.contactRole && GUF_UserRoleCode[guf.contactRole])
		cdns.push("<div class=\"guf_contact_role user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat":"Rol de l'usuari", "spa":"Rol del usuario", "eng":"User role", "fre":"Rôle de user"}, extra_param.lang), ":</span> ", GUFDonaCadenaLang(GUF_UserRoleCode[guf.contactRole], extra_param.lang), "</div>");

	if (guf.dateInfo)
	{
		for (var i_date=0; i_date<guf.dateInfo.length; i_date++)
		{
			if (guf.dateInfo[i_date].dateType)
				cdns.push("<div class=\"guf_date user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat":"Data", "spa":"Fecha", "eng":"Date", "fre":"Date"},extra_param.lang)+" ("+GUFDonaCadenaLang(CI_DateTypeCode[guf.dateInfo[i_date].dateType],extra_param.lang)+"):</span> "+guf.dateInfo[i_date].date+"</div>");
			else
				cdns.push("<div class=\"guf_date user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat":"Data", "spa":"Fecha", "eng":"Date", "fre":"Date"},extra_param.lang)+":</span> "+guf.dateInfo[i_date].date+"</div>");
		}
	}	
	
	if (guf.rating)	
		cdns.push("<div class=\"guf_rating user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat":"Puntuació", "spa":"Puntuación", "eng":"Rating", "fre":"Évaluation"}, extra_param.lang), ":</span> ", guf.rating, "/5</div>");

	if (guf.user_comment && guf.user_comment.comment)
	{ 
		cdns.push("<div class=\"guf_comment user\"><hr class=\"guf_solid user\">");
		cdns.push("<span class=\"guf_key user\">", GUFDonaCadenaLang({"cat":"Comentari", "spa":"Comentario", "eng":"Comment", "fre":"Commentaire"}, extra_param.lang), ":</span> ", guf.user_comment.comment, "<br/>");
		if (guf.user_comment.motivation && GUF_MotivationCode[guf.user_comment.motivation])
			cdns.push("<span class=\"guf_key user\">", GUFDonaCadenaLang({"cat":"Motivació del comentari", "spa":"Motivación del comentario", "eng":"Comment motivation", "fre":"Motivation du commentaire"}, extra_param.lang), ":</span> ", GUFDonaCadenaLang(GUF_MotivationCode[guf.user_comment.motivation], extra_param.lang));			
		cdns.push("</div><!-- guf_comment -->");
	}

	if (guf.usage)
	{
		cdns.push("<div class=\"guf_usage user\"><hr class=\"guf_solid user\">");
		if (guf.usage.reportAspect && guf.usage.reportAspect.length>0)
		{
			var s="";
			for (var item=0; item<guf.usage.reportAspect.length; item++)
			{
				if (item!=0)
					s+=", ";
				s+=GUFDonaCadenaLang(GUF_ReportAspectCode[guf.usage.reportAspect[item]], extra_param.lang);
			}
			cdns.push("<div class=\"guf_aspect_reported user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat": "Aspecte reportat", "spa": "Aspecto reportado", "eng": "Aspect reported", "fre":"Aspect rapporté"}, extra_param.lang), ":</span> ", s, "</div>");
		}
		
		if (guf.usage.usage_descr)
		{
			cdns.push("<div class=\"guf_usage_description user\"><hr class=\"guf_dashed user\">");			
			if (guf.usage.usage_descr.specific_usage)
				cdns.push("<div class=\"guf_spec_usage_description user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat": "Descripció de l'ús específic", "spa": "Descripción del uso específico", "eng": "Specific usage description", "fre":"Description d'utilisation spécifique"}, extra_param.lang), ":</span> ", guf.usage.usage_descr.specific_usage, "</div>");				
				
			if (guf.usage.usage_descr.usage_dt)
			{
				var s=DonaCadenaDataHoraDesDeElementCompost(guf.usage.usage_descr.usage_dt);
				if (s!="")
					cdns.push("<div class=\"guf_usage_dt user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat": "Data i  hora de l'ús", "spa": "Fecha y hora del uso", "eng": "Usage date and time", "fre": "Date et heure d'utilisation"}, extra_param.lang), ":</span> ", s, "</div>");
			}
			
			if (guf.usage.usage_descr.user_det_lim)
				cdns.push("<div class=\"guf_user_deter_limits user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat": "Limitacions determinades per l'usuari", "spa": "Limitaciones determinadas por el usuario", "eng": "User determined limitations", "fre":"Limites déterminées par l'utilisateur"}, extra_param.lang), ":</span> ", guf.usage.usage_descr.user_det_lim, "</div>");				
				
			if (guf.usage.usage_descr.response)
				cdns.push("<div class=\"guf_response user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat": "Resposta", "spa": "Respuesta", "eng": "Response", "fre":"Réponse"}, extra_param.lang), ":</span> ", guf.usage.usage_descr.response, "</div>");				
				
			if (guf.usage.usage_descr.add_doc)
			{
				cdns.push("<div class=\"guf_add_doc user\">");
				for (var item=0; item<guf.usage.usage_descr.add_doc.length; item++)
				{
					cdns.push("<div>");
					ConstrueixCadenaDesdeCitationOPublication(cdns, guf.usage.usage_descr.add_doc[item], item, 
						GUFDonaCadenaLang({"cat": "Documentació addicional", "spa": "Documentación adicional", "eng": "Additional documentation", "fre":"Documentation complémentaire"}, extra_param.lang), 
						"add_doc", extra_param, false);
					cdns.push("</div>");
				}
				cdns.push("</div><!-- guf_add_doc -->");
			}
			cdns.push("</div><!-- guf_usage_description -->");						
		}	
		if (guf.usage.discov_issue)
		{			
			cdns.push("<div class=\"guf_discovered_issue user\"><hr class=\"guf_dashed user\">");
			
			if (guf.usage.discov_issue.known_problem)
				cdns.push("<div class=\"guf_known_problem user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat": "Problema conegut", "spa": "Problema conocido", "eng": "Known problem", "fre": "Problème connu"}, extra_param.lang), ":</span> ", guf.usage.discov_issue.known_problem, "</div>");
			
			if (guf.usage.discov_issue.problem_dt)
			{
				var s=DonaCadenaDataHoraDesDeElementCompost(guf.usage.discov_issue.problem_dt);
				if (s!="")
					cdns.push("<div class=\"guf_known_problem_dt user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat": "Data i hora del problema conegut", "spa": "Fecha y hora del problema conocido", "eng": "Known problem date and time", "fre": "Problème connu date et heure"}, extra_param.lang), ":</span> ", s, "</div>");
			}	
			
			if (guf.usage.discov_issue.work_around)
				cdns.push("<div class=\"guf_work_around user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat": "Solució", "spa": "Solución", "eng": "Work around", "fre":"Solution"}, extra_param.lang), ":</span> ", guf.usage.discov_issue.work_around, "</div>");		
				
			if (guf.usage.discov_issue.ref_doc)
			{	
				cdns.push("<div class=\"guf_ref_doc user\">");				
				for (var item=0; item<guf.usage.discov_issue.ref_doc.length; item++)
				{
					cdns.push("<div>");
					ConstrueixCadenaDesdeCitationOPublication(cdns, guf.usage.discov_issue.ref_doc[item], item, 
						GUFDonaCadenaLang({"cat": "Document de referencia", "spa": "Documento de referencia", "eng": "Reference document", "fre":"Document de référence"}, extra_param.lang), 
						"ref_doc", extra_param, true);
					cdns.push("</div>");
				}
				cdns.push("</div><!-- guf_ref_doc -->");
			}
			
			if (guf.usage.discov_issue.exp_fix_date)
				cdns.push("<div class=\"guf_exp_solution_date user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat": "Data prevista per la distribució d'una solució", "spa": "Fecha prevista para la distribución de una solución", 
					"eng": "Expected date for a solution to be released", "fre": "Date prévue pour la publication d'une solution"}, extra_param.lang), ":</span> ", guf.usage.discov_issue.exp_fix_date, "</div>");;
			
			if (guf.usage.discov_issue.fix_rsrc)
			{					
				cdns.push("<div class=\"guf_fix_rsrc user\">");				
				for (var item=0; item<guf.usage.discov_issue.fix_rsrc.length; item++)
				{
					cdns.push("<div>");
					ConstrueixCadenaDesdeCitationOPublication(cdns, guf.usage.discov_issue.fix_rsrc[item], item, 
						GUFDonaCadenaLang({"cat": "Recurs arreglat", "spa": "Recurso arreglado", "eng": "Fixed resource", "fre": "Ressource fixe"}, extra_param.lang), 
						"fix_rsrc", extra_param, false);
					cdns.push("</div>");
				}
				cdns.push("</div><!-- guf_fix_rsrc -->");
			}			
			cdns.push("</div><!-- guf_discovered_issue -->");
			
			if (guf.usage.discov_issue.alt_rsrc)
			{					
				cdns.push("<div class=\"guf_alt_rsrc user\">");				
				for (var item=0; item<guf.usage.discov_issue.alt_rsrc.length; item++)
				{
					cdns.push("<div>");
					ConstrueixCadenaDesdeCitationOPublication(cdns, guf.usage.discov_issue.alt_rsrc[item], item, 
						GUFDonaCadenaLang({"cat": "Recurs alternatiu", "spa": "Recurso alternativo", "eng": "Alternative resource", "fre": "Ressource alternative"}, extra_param.lang), 
						"alt_rsrc", extra_param, false);
					cdns.push("</div>");
				}
				cdns.push("</div><!-- guf_alt_rsrc -->");
			}			
			cdns.push("</div><!-- guf_discovered_issue -->");
		}	
		cdns.push("</div><!-- guf_usage user -->");
	}

	if (guf.public)
	{			
		cdns.push("<div class=\"guf_public user\"><hr class=\"guf_solid user\">");
		for (var i_publi=0; i_publi<guf.public.length; i_publi++)
		{
			cdns.push("<div>");
			ConstrueixCadenaDesdeCitationOPublication(cdns, guf.public[i_publi], i_publi, null, "pub", extra_param, true);		
			cdns.push("</div>");
		}
		cdns.push("</div><!-- guf_public -->");
	}
	
	if (guf.target)
	{			
		cdns.push("<div class=\"guf_target user\"><hr class=\"guf_solid user\">");	
		for (var i_target=0; i_target<guf.target.length; i_target++)
		{	
			cdns.push("<span class=\"guf_key user\">", GUFDonaCadenaLang({"cat":"Recurs valorat", "spa":"Recurso valorado", "eng":"Target resource", "fre":"Ressource valorisée"}, extra_param.lang));
			
			if (guf.target[i_target].role)
				cdns.push(" (", GUFDonaCadenaLang(GUF_TargetRoleCode[guf.target[i_target].role],extra_param.lang),"):</span> ");
			else
				cdns.push(":</span> ");
			//cdns.push("<input type=\"checkbox\" id=\""+extra_param.div_id+"_"+i_target+"\" style=\"display:none;\">");

			if (guf.target[i_target].title)
				cdns.push(guf.target[i_target].title, "<br/>");
			//cdns.push(" <div class=\"guf_folded user\">");
			
			if (guf.target[i_target].identifier)
			{
	  			for (var i_id=0; i_id<guf.target[i_target].identifier.length; i_id++)
	  				cdns.push(ConstrueixURLDesdeIdentifierSiDOIoNiMMbus(guf.target[i_target].identifier[i_id], extra_param.lang, false));
			}
			//cdns.push("</div><label for=\""+extra_param.div_id+"_"+i_target+"\"><i>Click to show/hide more information</i></label></input>");
			//cdns.push("<br/>");
		}
		cdns.push("</div><!-- guf_target -->");
	}
	document.getElementById(extra_param.div_id).innerHTML=cdns.join("");
}

var GUFFeedbackWindow=null;
function GUFOpenNimmbus(lang)
{
	if (GUFFeedbackWindow==null || GUFFeedbackWindow.closed)
	{
		GUFFeedbackWindow=window.open(ClientGUF, "Feedback",'toolbar=no,status=no,scrollbars=yes,location=no,menubar=no,directories=no,resizable=yes,width=800,height=700');
		GUFShaObertPopUp(GUFFeedbackWindow, lang);
	}
	else
	{
		GUFFeedbackWindow.location.href=ClientGUF;
		GUFFeedbackWindow.focus();
	}
}

function GUFDonaNomFitxerAddFeedback(title, code, codespace)
{
	return ClientGUF+"?target_title=" + title + "&target_code=" + code + "&target_codespace=" + codespace + "&page=ADDFEEDBACK&share_borrower_1=Anonymous";
}

//function GUFAfegirFeedbackCapa(div_id, rsc_type, title, code, codespace, lang)
function GUFAfegirFeedbackCapa(title, code, codespace, lang)
{
	if (GUFFeedbackWindow==null || GUFFeedbackWindow.closed)
	{
		var url=GUFDonaNomFitxerAddFeedback(title, code, codespace);
		GUFFeedbackWindow=window.open(url,"Feedback",'toolbar=no,status=no,scrollbars=yes,location=no,menubar=no,directories=no,resizable=yes,width=800,height=700');
		GUFShaObertPopUp(GUFFeedbackWindow, lang);
	}
	else
	{
		GUFFeedbackWindow.location.href=GUFDonaNomFitxerAddFeedback(title, code, codespace);
		GUFFeedbackWindow.focus();
	}	

	//GUFShowPreviousFeedbackInHTMLDiv(div_id+"Previ", rsc_type, code, codespace, lang);
}

function GUFDonaCadenaFinestraFeedbackResource(div_id, rsc_type, title, code, codespace, lang)
{
var cdns=[];

	cdns.push("<form name=\"FeedbackResourceForm\" onSubmit=\"return false;\">");
	cdns.push("<div id=\"", div_id, "\" class=\"guf_widget user\" style=\"position:relative;left:10px;top:10px;width:95%\">");
	cdns.push("<div class=\"guf_add_fb user\"><fieldset class=\"guf_fieldset user\"><legend class=\"guf_legend user\">", 
		GUFDonaCadenaLang({"cat":"Afegir valoracions a", "spa":"Añadir valoraciones a", "eng":"Add user feedback to", "fre":"Ajouter rétroaction de l'utilisateur de"}, lang), 
		": ", rsc_type,
		"</legend>");

	cdns.push("<input type=\"button\" class=\"guf_button user\" value=\"",
				  GUFDonaCadenaLang({"cat":"Afegir una valoració", "spa":"Añadir una valoración", "eng":"Add a user feedback", "fre":"Ajouter une rétroaction de l'utilisateur"}, lang), "\"",
				  //" onClick='GUFAfegirFeedbackCapa(\"", div_id, "\", \"", rsc_type, "\", \"", title, "\", \"", code, "\", \"", codespace, "\", \"", lang, "\");' />",
				  " onClick='GUFAfegirFeedbackCapa(\"", title, "\", \"", code, "\", \"", codespace, "\", \"", lang, "\");' />",
				  "</fieldset></div>");
	cdns.push("<div class=\"guf_report user\"><fieldset class=\"guf_fieldset user\"><legend class=\"guf_legend user\">", 
			GUFDonaCadenaLang({"cat":"Valoracions prèvies a", "spa":"Valoraciones previas a", "eng":"Previous user feedback to", "fre":"Précédent rétroaction de l'utilisateur de"}, lang), 
			": ", rsc_type,
			"</legend>");
	cdns.push("<div id=\"",div_id,"Previ\" class=\"Verdana11px\" style=\"width:98%\">",
		"</div></fieldset></div>",
		"</div></form>");

	return cdns.join("");
}
