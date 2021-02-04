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

    Copyright 2014, 2021 Xavier Pons

    Aquest codi JavaScript ha estat idea de Joan Mas� Pau (joan maso at uab cat) 
    amb l'ajut de l'Alaitz Zabala (alaitz zabala at uab cat)
    dins del grup del MiraMon. MiraMon �s un projecte del 
    CREAF que elabora programari de Sistema d'Informaci� Geogr�fica 
    i de Teledetecci� per a la visualitzaci�, consulta, edici� i an�lisi 
    de mapes r�sters i vectorials. Aquest progamari programari inclou
    aplicacions d'escriptori i tamb� servidors i clients per Internet.
    No tots aquests productes s�n gratu�ts o de codi obert. 
    
    En particular, el client JavaScript del NiMMbus es distribueix sota 
    els termes de la llic�ncia GNU Affero General Public License, 
    mireu https://www.gnu.org/licenses/licenses.html#AGPL.
    
    El client JavaScript del NiMMbus es pot actualitzar des de 
    https://github.com/grumets/NiMMbus.
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

function GUFCreateFeedbackWithReproducibleUsage(targets, reprod_usage, lang, access_token_type)
{
	for (var i=0; i<targets.length; i++)
	{	
		if (targets[i].title)
			targets[i].title = DonaCadenaPerValorDeFormulari(targets[i].title);
		if (targets[i].code)
			targets[i].code = DonaCadenaPerValorDeFormulari(targets[i].code);
		if (targets[i].codespace) 
			targets[i].codespace = DonaCadenaPerValorDeFormulari(targets[i].codespace);
	}
	reprod_usage.abstract = DonaCadenaPerValorDeFormulari(reprod_usage.abstract);
	reprod_usage.ru_code = DonaCadenaPerValorDeFormulari(reprod_usage.ru_code);
	reprod_usage.ru_code_media_type = DonaCadenaPerValorDeFormulari(reprod_usage.ru_code_media_type);
	reprod_usage.ru_platform = encodeURI(reprod_usage.ru_platform);
	reprod_usage.ru_schema = DonaCadenaPerValorDeFormulari(reprod_usage.ru_schema);
	return GUFAfegirFeedbackCapaMultipleTargets(targets, lang, access_token_type, reprod_usage);
}

function GUFShowPreviousFeedbackWithReproducibleUsageInHTMLDiv(elem, seed_div_id, code, codespace, reprod_usage, lang, access_token_type, callback_function, params_function)
{	
	var cdns=[];
	
	cdns.push("<form name=\"FeedbackWithReproducibleUsageResourceForm\" onSubmit=\"return false;\">");
	cdns.push("<div id=\"",seed_div_id,"\" style=\"width:98%\">", "</div></fieldset></div>", "</div></form>");
	elem.innerHTML = cdns.join("")
	
	var url=ServerGUF+"?SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:ENUMERATE&LANGUAGE=" + lang + "&STARTINDEX=1&COUNT=100&FORMAT=text/xml&TYPE=FEEDBACK&TRG_TYPE_1=CITATION&TRG_FLD_1=CODE&TRG_VL_1=" + code + "&TRG_OPR_1=EQ&TRG_NXS_1=AND&TRG_TYPE_2=CITATION&TRG_FLD_2=NAMESPACE&TRG_VL_2=" + codespace + "&TRG_OPR_2=EQ" +
	 				"&RSC_FLD_1=RU_PLATFORM&RSC_VL_1=" + reprod_usage.ru_platform + "&RSC_OPR_1=EQ&RSC_NXS_1=AND&RSC_FLD_2=RU_VERSION&RSC_VL_2=" + reprod_usage.ru_version + "&RSC_OPR_2=EQ&RSC_NXS_2=AND&RSC_FLD_3=RU_SCHEMA&RSC_VL_3=" + reprod_usage.ru_schema + "&RSC_OPR_3=EQ";
	loadFile(url, "text/xml", CarregaFeedbacksAnteriors, function(xhr, extra_param) { alert(extra_param.url + ": " + xhr ); }, {url: url, div_id: seed_div_id, lang: lang, access_token_type: access_token_type, callback_function: callback_function, params_function: params_function, edit_button: false});
}

function GUFShowFeedbackInHTMLDiv(elem, seed_div_id, rsc_type, title, code, codespace, lang, access_token_type)
{
var targets=[{title: title, code: code, codespace: codespace, role: "primary"}];
	return GUFShowFeedbackMultipleTargetsInHTMLDiv(elem, seed_div_id, rsc_type, targets, lang, access_token_type);
}

function GUFShowFeedbackMultipleTargetsInHTMLDiv(elem, seed_div_id, rsc_type, targets, lang, access_token_type)
{
	elem.innerHTML = GUFDonaCadenaFinestraFeedbackResourceMultipleTargets(seed_div_id, rsc_type, targets, lang, access_token_type);
	//demano el fitxer atom de feedbacks previs
	GUFShowPreviousFeedbackMultipleTargetsInHTMLDiv(seed_div_id, rsc_type, targets, lang, access_token_type);
}

function GUFShowPreviousFeedbackInHTMLDiv(div_id, rsc_type, code, codespace, lang, access_token_type)
{
var targets=[{title: title, code: code, codespace: codespace, role: "primary"}];	
	return GUFShowPreviousFeedbackMultipleTargetsInHTMLDiv(div_id, rsc_type, targets, lang, access_token_type);
}

function GUFShowPreviousFeedbackMultipleTargetsInHTMLDiv(div_id, rsc_type, targets, lang, access_token_type)
{
	var tinc_target_secondary=false;
	var url=ServerGUF+"?SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:ENUMERATE&LANGUAGE=" + lang + "&STARTINDEX=1&COUNT=100&FORMAT=text/xml&TYPE=FEEDBACK";
	var url2=url;
	
//ara assumeixo que tinc un primari segur i potser un secndari. Futur-> poden haver N de cada un dels TRES tipus, i per cada un far�e un quadradet, suposo

	//busco el target primari i l'envio a la primera part de la finestra
	for (var i=0; i<targets.length; i++)	
	{
		if (targets[i].title && targets[i].code && targets[i].codespace && (typeof(targets[i].role)== "undefined" || targets[i].role=="primary"))
		{
			url+="&TRG_TYPE_1=CITATION&TRG_FLD_1=CODE&TRG_VL_1=" + targets[i].code + "&TRG_OPR_1=EQ&TRG_NXS_1=AND&TRG_TYPE_2=CITATION&TRG_FLD_2=NAMESPACE&TRG_VL_2=" + targets[i].codespace + "&TRG_OPR_2=EQ";			
			break;
		}
	}
	//l'espai de FB previs sobre el target primari el poso sempre, perqu� sempre en tinc un	
	loadFile(url, "text/xml", CarregaFeedbacksAnteriors, function(xhr, extra_param) { alert(extra_param.url + ": " + xhr ); }, {url: url, div_id: div_id+"Previ", rsc_type:rsc_type, lang: lang, access_token_type: access_token_type});

	//busco el target secundari i l'envio a la segona part de la finestra
	for (var i=0; i<targets.length; i++)	
	{
		if (targets[i].title && targets[i].code && targets[i].codespace && targets[i].role=="secondary")
		{	//la peticio buscar� els que parlin del secondari d'ara, per� nom�s com a PRIMARI, per veure tb en el dataset els comentaris generals de la col�lecci� (i no tornar a veure els secudaris d'questa o altres imatges!)
			url2+="&TRG_TYPE_1=CITATION&TRG_FLD_1=CODE&TRG_VL_1=" + targets[i].code + "&TRG_OPR_1=EQ&TRG_NXS_1=AND&TRG_TYPE_2=CITATION&TRG_FLD_2=NAMESPACE&TRG_VL_2=" + targets[i].codespace + "&TRG_OPR_2=EQ" +
						"&TRG_ROLE=primary";
			tinc_target_secondary=true;
			break;
		}
	}	
	if (tinc_target_secondary)
		loadFile(url2, "text/xml", CarregaFeedbacksAnteriors, function(xhr, extra_param) { alert(extra_param.url + ": " + xhr ); }, {url: url2, div_id: div_id+"Previ_secundari", rsc_type:rsc_type, lang: lang, access_token_type: access_token_type});
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
			default:     //Si no hi ha l'idioma solicitat faig que xerri en angl�s
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
	    alert(GUFDonaCadenaLang({"cat":"Aquest navegador t� les finestres emergents bloquejades. Canvia la configuraci� del teu navegador.\nEn algunes versions d'Internet Explorer, nom�s cal fer un clic sobre la faixa groga superior.", 
							  "spa":"Este navegador tiene las ventanas emergentes bloqueadas. Modifique la configuraci�n de su navegador.\nEn algunas versiones de Internet Explorer, un clic sobre la banda amarilla superior es suficiente.", 
							  "eng":"Sorry, this browser has pop-up windows locked. Please change browser configuration.\nIn some Internet Explorer versions only a click on top yellow band will fix it.",
							  "fre":"Ce navigateur a les fen�tres �mergentes ferm�es. Changez la configuration de votre navigateur.\nDans certaines versions d'Internet Explorer, il suffit de cliquer sur la barre jaune sup�rieure."}, lang));
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
	//Si no trobo text, potser encara trovar� el codi
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

function CridaACallBackFunctionAmbEstructuraGUF(lang, resource_id, callback_function, params_function)
{
	var url=ServerGUF+"?SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:RETRIEVE&LANGUAGE="+lang+"&RESOURCE="+resource_id;		
	loadFile(url, "text/xml", CarregaFeedbackAnterior, function(xhr, extra_param) { alert(url + ": " + xhr ); }, {url: url, lang: lang, callback_function: callback_function, params_function: params_function});
}

function CarregaFeedbacksAnteriors(doc, extra_param)
{
var cdns=[];

	if (!doc || !doc.documentElement)
	{
		alert (extra_param.url + ": " + GUFDonaCadenaLang({"cat":"El retorn no �s xml", "spa":"El retorno no es xml", "eng":"Return is not xml", "fre":"Le retour n'est pas xml"}, extra_param.lang));
		return ;
	}
	var root=doc.documentElement;

	if (GUFAnalitzaExceptionReport(root, extra_param.url))
		return;
		
	var owc=ParseOWSContextAtom(root);
	if (owc.properties.totalResults==0 || !owc.features)
	{
		cdns.push(GUFDonaCadenaLang({"cat":"No hi ha cap valoraci� pr�via", 
					"spa":"No hay ninguna valoraci�n previa", 
					"eng":"There is no previous user feedback", 
					"fre":"Il n'y a pas encore de commentaires des utilisateurs"}, extra_param.lang)); 

		if (extra_param.rsc_type != "")
			cdns.push(GUFDonaCadenaLang({"cat":" sobre la", 
						"spa":" sobre la", 
						"eng":" on the", 
						"fre":" sur la"}, extra_param.lang), 
						" ", extra_param.rsc_type, " ");

		cdns.push(GUFDonaCadenaLang({"cat":"encara", 
					"spa":"todav�a", 
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
				"<div class=\"guf_abstract user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat":"Resum", "spa":"Resumen", "eng":"Abstract", "fre":"R�sum�"}, extra_param.lang), "</span>: ", owc.features[i].properties.title,
				"</div><div id=\"", extra_param.div_id, "_",i , "\"></div>");
								
			if (typeof extra_param.callback_function!=="undefined" && extra_param.callback_function != "")
			{
				var params=JSON.stringify(extra_param.params_function);
				
					params=params.replaceAll("\"","\\\"");
				cdns.push("<div class=\"guf_adopt user\"><input type=\"button\" class=\"guf_button user\" value=\"",
						GUFDonaCadenaLang({"cat":"Adopta", "spa":"Adopta", "eng":"Adopt", "fre":"Adopter"}, extra_param.lang), "\"",
						//" onClick='", extra_param.callback_function, "(\"", str, "\");' /> ");			
						" onClick='CridaACallBackFunctionAmbEstructuraGUF(\"", extra_param.lang, "\",\"", str, "\",\"", extra_param.callback_function, "\",\"", params, "\");'/>");			
			}
			cdns.push("</fieldset>");		
		}
	}
	if (typeof extra_param.edit_button!=="undefined" && extra_param.edit_button==false)
		; //si el param no existeix o diu que no vull bot� no el poso
	else
		cdns.push("<div class=\"guf_edit user\"><input type=\"button\" class=\"guf_button user\" value=\"",
			GUFDonaCadenaLang({"cat":"Edita", "spa":"Edita", "eng":"Edit", "fre":"�diter"}, extra_param.lang), "\"",
			" onClick='GUFOpenNimmbus(\"", extra_param.lang, "\",\"", extra_param.access_token_type, "\");' /> ",
			GUFDonaCadenaLang({"cat":"les teves entrades pr�vies", "spa":"tus entradas previas", "eng":"your previous entries", "fre":"vos entr�es pr�c�dentes"}, extra_param.lang), "</div><!-- guf_edit -->"); 
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
		else if (text_html.indexOf("nimmbus/resourceId") >= 0) //si codeSpace �s http://www.opengis.uab.cat/nimmbus/resourceId �s que �s un recurs NiMMbus, i per tant puc fer la consulta de retrieve
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
				cdns.push("<span class=\"guf_key user\">", GUFDonaCadenaLang({"cat":"Publicaci�", "spa":"Publicaci�n", "eng":"Publication", "fre":"Publication"}, extra_param.lang), ":</span> ");
			else //cas remot perqu� mai em passi una citaci� sense text_titol, per� per si de cas
				cdns.push("<span class=\"guf_key user\">", GUFDonaCadenaLang({"cat":"Citaci�", "spa":"Citaci�n", "eng":"Citation", "fre":"Citation"}, extra_param.lang), ":</span> ");
		}
	}
	cdns.push("<input type=\"checkbox\" id=\""+extra_param.div_id+"_"+prefix_div+"_"+i_cit_o_pub+"\" style=\"display:none;\">");

	if (cit_o_pub.title)
		cdns.push(cit_o_pub.title);
					
	cdns.push(" <div class=\"guf_folded user\">"); //L'espai cal perqu� si no el "Shown ..." queda junt amb lo anterior quan est� plegat
		
	if (cit_o_pub.edition || cit_o_pub.editionDate)
	{
		cdns.push("<div class=\"guf_cit_edition user\"><span class=\"guf_key_2 user\">", GUFDonaCadenaLang({"cat": "Edici�", "spa": "Edici�n", "eng": "Edition", "fre":"�dition"}, extra_param.lang), ":</span> ");
		if (cit_o_pub.edition)
		{
			cdns.push(cit_o_pub.edition);
			if (cit_o_pub.editionDate)
				cdns.push(", ", cit_o_pub.editionDate);
		}
		else //si no tinc edition �s que tinc editionDate, si no no hauria entrat
			cdns.push(cit_o_pub.editionDate);
		cdns.push("</div>");				
	}
	
	if (cit_o_pub.series && cit_o_pub.series.name)
	{
		cdns.push("<div class=\"guf_cit_series user\"><span class=\"guf_key_2 user\">", GUFDonaCadenaLang({"cat":"S�rie", "spa":"Serie", "eng": "Series", "fre":"s�rie"}, extra_param.lang), ":</span> ");
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
			GUFDonaCadenaLang({"cat": "Altres detalls de la citaci�", "spa": "Otros detalles de la cita", "eng": "Other citation details", "fre":"Autres d�tails de la citation"}, extra_param.lang), 
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
		cdns.push("<div class=\"guf_pub_abstract user\"><span class=\"guf_key_2 user\">"+GUFDonaCadenaLang({"cat":"Resum", "spa":"Resumen", "eng":"Abstract", "fre":"R�sum�"},extra_param.lang)+"</span>: ", cit_o_pub.abstract,"</div>");				
		
	cdns.push("</div><a class=\"guf_link user\" href=\"javascript:void(0);\"><label for=\""+extra_param.div_id+"_"+prefix_div+"_"+i_cit_o_pub+"\"><span class=\"guf_show_more user\">"+GUFDonaCadenaLang({"cat":"Mostrar/amagar m�s informaci�", "spa":"Mostrar/ocultar m�s informaci�n", "eng":"Show/hide more information", "fre":"Afficher/masquer plus d'informations"},extra_param.lang)+"</span></label></a></input>");

	return;
}

function HiHaReprodUsage(usage_descr)
{
	if (usage_descr.code || usage_descr.codeLink || usage_descr.codeMediaType ||
			usage_descr.platform || usage_descr.version || usage_descr.schema || usage_descr.diagram ||
			usage_descr.diagramLink || usage_descr.diagramMediaType)
			return true;
	return false; 
}

function CarregaFeedbackAnterior(doc, extra_param)
{
var cdns=[];

	if (!doc || !doc.documentElement)
	{
		alert (extra_param.url + ": " + GUFDonaCadenaLang({"cat":"El retorn no �s xml", "spa":"El retorno no es xml", "eng":"Return is not xml", "fre":"Le retour n'est pas xml"}, extra_param.lang)); 
		return ;
	}
	var root=doc.documentElement;

	if (GUFAnalitzaExceptionReport(root, extra_param.url))
		return;

	var guf=GetRetrieveResourceFeedbackOutputs(root);

	if (!guf)
	{	
		alert (extra_param.url + ": " + GUFDonaCadenaLang({"cat":"El retorn no �s un xml guf", "spa":"El retorno no es xml guf", "eng":"Return is not xml guf", "fre":"Le retour n'est pas xml guf"}, extra_param.lang)); 
		return;
	}
	
	if (extra_param.callback_function && typeof window[extra_param.callback_function]==="function")
	{		
		window[extra_param.callback_function](JSON.parse(extra_param.params_function), guf);
		return;
	}
	
	/* Ara l'he posat a fora perqu� quedi m�s endre�at (Id, titol + resta)
	if (guf.identifier)
		cdns.push(ConstrueixURLDesdeIdentifierSiDOIoNiMMbus(guf.identifier, extra_param.lang, true));*/
	
	/*if (guf.abstract) ja no existeix pq �s el feature.title que JA he posat)
		cdns.push("<div class=\"guf_abstract user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat":"Resum", "spa":"Resumen", "eng":"Abstract", "fre":"Abstrait"}, extra_param.lang), ":</span> ", guf.abstract, "</div>");*/

	if (guf.purpose)
		cdns.push("<div class=\"guf_purpose user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat":"Prop�sit", "spa":"Prop�sito", "eng":"Purpose", "fre":"Raison"}, extra_param.lang), ":</span> ", guf.purpose, "</div>");

	//if (guf.contact)
	
	if (guf.contactRole && GUF_UserRoleCode[guf.contactRole])
		cdns.push("<div class=\"guf_contact_role user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat":"Rol de l'usuari", "spa":"Rol del usuario", "eng":"User role", "fre":"R�le de user"}, extra_param.lang), ":</span> ", GUFDonaCadenaLang(GUF_UserRoleCode[guf.contactRole], extra_param.lang), "</div>");

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
		cdns.push("<div class=\"guf_rating user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat":"Puntuaci�", "spa":"Puntuaci�n", "eng":"Rating", "fre":"�valuation"}, extra_param.lang), ":</span> ", guf.rating, "/5</div>");

	if (guf.user_comment && guf.user_comment.comment)
	{ 
		cdns.push("<div class=\"guf_comment user\"><hr class=\"guf_solid user\">");
		cdns.push("<span class=\"guf_key user\">", GUFDonaCadenaLang({"cat":"Comentari", "spa":"Comentario", "eng":"Comment", "fre":"Commentaire"}, extra_param.lang), ":</span> ", guf.user_comment.comment, "<br/>");
		if (guf.user_comment.motivation && GUF_MotivationCode[guf.user_comment.motivation])
			cdns.push("<span class=\"guf_key user\">", GUFDonaCadenaLang({"cat":"Motivaci� del comentari", "spa":"Motivaci�n del comentario", "eng":"Comment motivation", "fre":"Motivation du commentaire"}, extra_param.lang), ":</span> ", GUFDonaCadenaLang(GUF_MotivationCode[guf.user_comment.motivation], extra_param.lang));			
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
			cdns.push("<div class=\"guf_aspect_reported user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat": "Aspecte reportat", "spa": "Aspecto reportado", "eng": "Aspect reported", "fre":"Aspect rapport�"}, extra_param.lang), ":</span> ", s, "</div>");
		}
		
		if (guf.usage.usage_descr)
		{
			cdns.push("<div class=\"guf_usage_description user\"><hr class=\"guf_dashed user\">");			
			if (guf.usage.usage_descr.specific_usage)
				cdns.push("<div class=\"guf_spec_usage_description user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat": "Descripci� de l'�s espec�fic", "spa": "Descripci�n del uso espec�fico", "eng": "Specific usage description", "fre":"Description d'utilisation sp�cifique"}, extra_param.lang), ":</span> ", guf.usage.usage_descr.specific_usage, "</div>");				
				
			if (guf.usage.usage_descr.usage_dt)
			{
				var s=DonaCadenaDataHoraDesDeElementCompost(guf.usage.usage_descr.usage_dt);
				if (s!="")
					cdns.push("<div class=\"guf_usage_dt user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat": "Data i  hora de l'�s", "spa": "Fecha y hora del uso", "eng": "Usage date and time", "fre": "Date et heure d'utilisation"}, extra_param.lang), ":</span> ", s, "</div>");
			}
			
			if (guf.usage.usage_descr.user_det_lim)
				cdns.push("<div class=\"guf_user_deter_limits user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat": "Limitacions determinades per l'usuari", "spa": "Limitaciones determinadas por el usuario", "eng": "User determined limitations", "fre":"Limites d�termin�es par l'utilisateur"}, extra_param.lang), ":</span> ", guf.usage.usage_descr.user_det_lim, "</div>");				
				
			if (guf.usage.usage_descr.response)
				cdns.push("<div class=\"guf_response user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat": "Resposta", "spa": "Respuesta", "eng": "Response", "fre":"R�ponse"}, extra_param.lang), ":</span> ", guf.usage.usage_descr.response, "</div>");				
				
			if (guf.usage.usage_descr.add_doc)
			{
				cdns.push("<div class=\"guf_add_doc user\">");
				for (var item=0; item<guf.usage.usage_descr.add_doc.length; item++)
				{
					cdns.push("<div>");
					ConstrueixCadenaDesdeCitationOPublication(cdns, guf.usage.usage_descr.add_doc[item], item, 
						GUFDonaCadenaLang({"cat": "Documentaci� addicional", "spa": "Documentaci�n adicional", "eng": "Additional documentation", "fre":"Documentation compl�mentaire"}, extra_param.lang), 
						"add_doc", extra_param, false);
					cdns.push("</div>");
				}
				cdns.push("</div><!-- guf_add_doc -->");
			}
			
			if (HiHaReprodUsage(guf.usage.usage_descr))
			{
				cdns.push("<div class=\"guf_reprodUsage user\">");
				cdns.push("<span class=\"guf_key user\">", GUFDonaCadenaLang({"cat":"�s reprodu�ble", "spa":"Uso reproducible", "eng":"Reproducible usage", "fre":"Utilisation reproductible"}, extra_param.lang), ":</span>");								
				if (guf.usage.usage_descr.code)
					cdns.push("<br><span class=\"guf_key_2 user\">", GUFDonaCadenaLang({"cat":"Codi (text)", "spa":"C�digo (texto)", "eng":"Code (text)", "fre":"Code (texte)"}, extra_param.lang), "</span>: ", guf.usage.usage_descr.code);
				if (guf.usage.usage_descr.codeLinkage)
					cdns.push("<br><span class=\"guf_key_2 user\">", GUFDonaCadenaLang({"cat":"Codi (adre�a URL)", "spa":"C�digo (direcci�n URL)", "eng": "Code (URL link)", "fre":"Code (URL)"}, extra_param.lang), "</span>: ", guf.usage.usage_descr.codeLinkage);												
				if (guf.usage.usage_descr.codeMediaType && guf.usage.usage_descr.codeMediaType.length>0)
				{
					var s="";				
					if (guf.usage.usage_descr.codeMediaType=="application/json")
						s="JSON ("+guf.usage.usage_descr.codeMediaType+")";
					else if (guf.usage.usage_descr.codeMediaType=="text/x-python")
						s="Phyton ("+guf.usage.usage_descr.codeMediaType+")";
					else if (guf.usage.usage_descr.codeMediaType=="text/x-r-source")
						s="R ("+guf.usage.usage_descr.codeMediaType+")";
					else if (guf.usage.usage_descr.codeMediaType=="application/vnd.docker")
						s=GUFDonaCadenaLang({"cat":"Contenidor docker", "spa":"Contenedor docker", "eng":"Docker container", "fre":"Conteneur Docker"}, extra_param.lang)+" ("+guf.usage.usage_descr.codeMediaType+")";
					else
						s=guf.usage.usage_descr.codeMediaType;
					cdns.push("<br><span class=\"guf_key_2 user\">", GUFDonaCadenaLang({"cat":"Format del codi", "spa":"Formato del c�digo", "eng": "Code format", "fre":"Format de code"}, extra_param.lang), "</span>: ", s);								
				}	
				if (guf.usage.usage_descr.platform)
					cdns.push("<br><span class=\"guf_key_2 user\">", GUFDonaCadenaLang({"cat":"Plataforma", "spa":"Plataforma", "eng":"Platform", "fre":"Plateforme"}, extra_param.lang), "</span>: ", guf.usage.usage_descr.platform);							
				if (guf.usage.usage_descr.version)
					cdns.push("<br><span class=\"guf_key_2 user\">", GUFDonaCadenaLang({"cat":"Versi�", "spa":"Versi�n", "eng": "Version", "fre":"Version"}, extra_param.lang), "</span>: ", guf.usage.usage_descr.version);								
				if (guf.usage.usage_descr.schema)
					cdns.push("<br><span class=\"guf_key_2 user\">", GUFDonaCadenaLang({"cat":"Esquema", "spa":"Esquema", "eng": "Schema", "fre":"Sch�me"}, extra_param.lang), "</span>: ", guf.usage.usage_descr.schema);
				if (guf.usage.usage_descr.diagram)
					cdns.push("<br><span class=\"guf_key_2 user\">", GUFDonaCadenaLang({"cat":"Diagrama (text)", "spa":"Diagrama (texto)", "eng": "Diagram (text)", "fre":"Diagramme (texte)"}, extra_param.lang), "</span>: ", guf.usage.usage_descr.diagram);			
				if (guf.usage.usage_descr.diagramLinkage)
					cdns.push("<br><span class=\"guf_key_2 user\">", GUFDonaCadenaLang({"cat":"Diagrama (adre�a URL)", "spa":"Diagrama (direcci�n URL)", "eng": "Diagram (URL link)", "fre":"Diagramme (URL)"}, extra_param.lang), "</span>: ", guf.usage.usage_descr.diagramLinkage);			
				if (guf.usage.usage_descr.diagramMediaType && guf.usage.usage_descr.diagramMediaType.length>0)
				{
					var s="";					
					if (guf.usage.usage_descr.diagramMediaType=="image/jpeg")
						s="JPEG ("+guf.usage.usage_descr.diagramMediaType+")";
					else if (guf.usage.usage_descr.diagramMediaType=="image/png")
						s="PNG ("+guf.usage.usage_descr.diagramMediaType+")";
					else if (guf.usage.usage_descr.diagramMediaType=="text/x-python")
						s="Phyton ("+guf.usage.usage_descr.diagramMediaType+")";
					else if (guf.usage.usage_descr.diagramMediaType=="text/x-yuml")
						s="YUML ("+guf.usage.usage_descr.diagramMediaType+")";
					else if (guf.usage.usage_descr.diagramMediaType=="application/xmi+xml")
						s="XMI ("+guf.usage.usage_descr.diagramMediaType+")";
					else
						s=guf.usage.usage_descr.diagramMediaType;
					cdns.push("<br><span class=\"guf_key_2 user\">", GUFDonaCadenaLang({"cat":"Format del diagrama", "spa":"Formato del diagrama", "eng": "Diagram format", "fre":"Format de diagramme"}, extra_param.lang), "</span>: ", s);
				}
				cdns.push("</div><!-- guf_reprodUsage -->");
			}						
			cdns.push("</div><!-- guf_usage_description -->");						
		}	
		if (guf.usage.discov_issue)
		{			
			cdns.push("<div class=\"guf_discovered_issue user\"><hr class=\"guf_dashed user\">");
			
			if (guf.usage.discov_issue.known_problem)
				cdns.push("<div class=\"guf_known_problem user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat": "Problema conegut", "spa": "Problema conocido", "eng": "Known problem", "fre": "Probl�me connu"}, extra_param.lang), ":</span> ", guf.usage.discov_issue.known_problem, "</div>");
			
			if (guf.usage.discov_issue.problem_dt)
			{
				var s=DonaCadenaDataHoraDesDeElementCompost(guf.usage.discov_issue.problem_dt);
				if (s!="")
					cdns.push("<div class=\"guf_known_problem_dt user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat": "Data i hora del problema conegut", "spa": "Fecha y hora del problema conocido", "eng": "Known problem date and time", "fre": "Probl�me connu date et heure"}, extra_param.lang), ":</span> ", s, "</div>");
			}	
			
			if (guf.usage.discov_issue.work_around)
				cdns.push("<div class=\"guf_work_around user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat": "Soluci�", "spa": "Soluci�n", "eng": "Work around", "fre":"Solution"}, extra_param.lang), ":</span> ", guf.usage.discov_issue.work_around, "</div>");		
				
			if (guf.usage.discov_issue.ref_doc)
			{	
				cdns.push("<div class=\"guf_ref_doc user\">");				
				for (var item=0; item<guf.usage.discov_issue.ref_doc.length; item++)
				{
					cdns.push("<div>");
					ConstrueixCadenaDesdeCitationOPublication(cdns, guf.usage.discov_issue.ref_doc[item], item, 
						GUFDonaCadenaLang({"cat": "Document de referencia", "spa": "Documento de referencia", "eng": "Reference document", "fre":"Document de r�f�rence"}, extra_param.lang), 
						"ref_doc", extra_param, true);
					cdns.push("</div>");
				}
				cdns.push("</div><!-- guf_ref_doc -->");
			}
			
			if (guf.usage.discov_issue.exp_fix_date)
				cdns.push("<div class=\"guf_exp_solution_date user\"><span class=\"guf_key user\">", GUFDonaCadenaLang({"cat": "Data prevista per la distribuci� d'una soluci�", "spa": "Fecha prevista para la distribuci�n de una soluci�n", 
					"eng": "Expected date for a solution to be released", "fre": "Date pr�vue pour la publication d'une solution"}, extra_param.lang), ":</span> ", guf.usage.discov_issue.exp_fix_date, "</div>");;
			
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
			cdns.push("<span class=\"guf_key user\">", GUFDonaCadenaLang({"cat":"Recurs valorat", "spa":"Recurso valorado", "eng":"Target resource", "fre":"Ressource valoris�e"}, extra_param.lang));
			
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
function GUFOpenNimmbus(lang, access_token_type)
{
	if (GUFFeedbackWindow==null || GUFFeedbackWindow.closed)
	{
		GUFFeedbackWindow=window.open(ClientGUF+"?ACCESS_TOKEN_TYPE="+access_token_type, "Feedback",'toolbar=no,status=no,scrollbars=yes,location=no,menubar=no,directories=no,resizable=yes,width=800,height=700');
		GUFShaObertPopUp(GUFFeedbackWindow, lang);
	}
	else
	{
		GUFFeedbackWindow.location.href=ClientGUF;
		GUFFeedbackWindow.focus();
	}
}

function GUFDonaNomFitxerAddFeedback(title, code, codespace, access_token_type, reprod_usage, lang)
{
var targets=[{title: title, code: code, codespace: codespace, role: "primary"}];
//en versions previes no es passava lang, per aix� ho faig aix�:
	return GUFDonaNomFitxerAddFeedbackMutipleTargets(targets, lang ? lang : "eng", access_token_type, reprod_usage);
}

function GUFFragmentKVPSobreReproducibleUsage(reprod_usage)
{
	var url="";

	if (reprod_usage.abstract!="") //t�picament hi va el nom estil, p.ex.
		url+="&ABSTRACT="+reprod_usage.abstract;					
	url+="&REPORT_ASPECT="+"usage";
	if (reprod_usage.specific_usage!="")
		url+="&SPECIFIC_USAGE="+reprod_usage.specific_usage;
	/*date time -> de moment es crear� amb l'actual en el nimmbus al darrer moment
	if ((p=DonaCadenaDataHoraPerValorDeFormulari(document.feedback_resource_form.usage_date.value,document.feedback_resource_form.usage_time.value))!="")
		url+="&USAGE_DATE_TIME="+p;*/
	if (reprod_usage.ru_code!="")
		url+="&RU_CODE="+reprod_usage.ru_code;
	if (reprod_usage.ru_code_media_type!="")
		url+="&RU_CODE_FORMAT="+reprod_usage.ru_code_media_type;		
	if (reprod_usage.ru_platform!="")
		url+="&RU_PLATFORM="+reprod_usage.ru_platform;
	if (reprod_usage.ru_version!="")
		url+="&RU_VERSION="+reprod_usage.ru_version;
	if (reprod_usage.ru_schema!="")
		url+="&RU_SCHEMA="+reprod_usage.ru_schema;
	
	return url;
}

var ReprodUsageForPostMessage="";

function GUFDonaNomFitxerAddFeedbackMutipleTargets(targets, lang, access_token_type, reprod_usage)
{
	var url=ClientGUF;
	var n_targets=0;

	for (var i=0; i<targets.length; i++)	
	{		
		if (targets[i].title && targets[i].title!="" && targets[i].code && targets[i].code!="" && targets[i].codespace && targets[i].codespace!="")
		{	//aquest target �s v�lid
			if (n_targets==0) //i �s el primer
				url+="?target_title=" + targets[i].title + "&target_code=" + targets[i].code + "&target_codespace=" + targets[i].codespace + (targets[i].role ? ("&target_role=" + targets[i].role) : ""); 	
			else
				url+="&target_title_" + (n_targets+1) + "=" + targets[i].title + "&target_code_" + (n_targets+1) + "=" + targets[i].code + 
						"&target_codespace_" + (n_targets+1) + "=" + targets[i].codespace + 
						(targets[i].role ? ("&target_role_" + (n_targets+1) + "=" + targets[i].role) : ""); 	
			n_targets++;
		}		
		
		if (n_targets>2)
		{
	    alert(GUFDonaCadenaLang({"cat":"De moment nom�s s'accepten dos recursos objectius de la valoraci�, la resta seran ignorats.", 
							  "spa":"De momento s�lo se aceptan dos recursos objetivos de la valoraci�n, el resto ser�n ignorados.", 
							  "eng":"At the moment, only two target resources of the feedback item are accepted, the rest will be ignored.",
							  "fre":"Pour le moment, seules deux ressources cibles de l'�l�ment de r�troaction sont accept�es, le reste sera ignor�."}, lang));
			break;
		}
	}
	if (n_targets==0) //cap v�lid
	{
	    alert(GUFDonaCadenaLang({"cat":"No hi ha cap recurs objectiu de la valoraci�.", 
							  "spa":"No hay ning�n recurso objetivo de la valoraci�n.", 
							  "eng":"There is no target resources of the feedback item.",
							  "fre":"Il n'y a pas de ressources cibles de l'�l�ment de r�troaction."}, lang));	
			return "";
	}	
	url+="&ACCESS_TOKEN_TYPE=" + access_token_type + "&page=ADDFEEDBACK&share_borrower_1=Anonymous"; 	

	ReprodUsageForPostMessage="";
	if (reprod_usage!=null)
	{
			url+="&POST_MESSAGE_FROM=" + location.href;	
			ReprodUsageForPostMessage=GUFFragmentKVPSobreReproducibleUsage(reprod_usage);
	}	
	return url;
}

function GUFAfegirFeedbackCapa(title, code, codespace, lang, access_token_type, reprod_usage)
{
var targets=[{title: title, code: code, codespace: codespace, role: "primary"}];
	return GUFAfegirFeedbackCapaMultipleTargets(targets, lang, access_token_type, reprod_usage);
}

var HeAfegitListenerReprodUsage=false;
function GUFAfegirFeedbackCapaMultipleTargets(targets_obj_o_str, lang, access_token_type, reprod_usage)
{
var targets;
	
	if (typeof(targets_obj_o_str) === "string")
		targets = JSON.parse(targets_obj_o_str);
	else if (typeof(targets_obj_o_str) === "object" && Array.isArray(targets_obj_o_str))
		targets = targets_obj_o_str;
	else
	{
		alert("targets_obj_o_str needs and object or an string");	
		return;
	}
	
	if (!HeAfegitListenerReprodUsage)
	{
		window.addEventListener("message", EnviaReprodUsageComAPostMessage);
		HeAfegitListenerReprodUsage=true;
	}
	if (GUFFeedbackWindow==null || GUFFeedbackWindow.closed)
	{
		var url=GUFDonaNomFitxerAddFeedbackMutipleTargets(targets, lang, access_token_type, reprod_usage);
		GUFFeedbackWindow=window.open(url,"Feedback",'toolbar=no,status=no,scrollbars=yes,location=no,menubar=no,directories=no,resizable=yes,width=800,height=700');
		GUFShaObertPopUp(GUFFeedbackWindow, lang);
	}
	else
	{
		GUFFeedbackWindow.location.href=GUFDonaNomFitxerAddFeedbackMutipleTargets(targets, lang, access_token_type, reprod_usage);
		GUFFeedbackWindow.focus();
	}	
}

function GUFDonaCadenaFinestraFeedbackResource(div_id, rsc_type, title, code, codespace, lang, access_token_type)
{
var targets=[{title: title, code: code, codespace: codespace, role: "primary"}];	
	return GUFDonaCadenaFinestraFeedbackResourceMultipleTargets(div_id, rsc_type, targets, lang, access_token_type);
}

function TornaNTargetsSecundaris(targets)
{
	var n_targets_secundaris=0;

	for (var i=0; i<targets.length; i++)	
	{		
		if (targets[i].role=="secondary")
			n_targets_secundaris++;
	}
	return n_targets_secundaris;
}

function GUFDonaCadenaFinestraFeedbackResourceMultipleTargets(div_id, rsc_type, targets, lang, access_token_type)
{
var cdns=[];
var n_targets_secundaris=0;

	cdns.push("<form name=\"FeedbackResourceForm\" onSubmit=\"return false;\">");
	cdns.push("<div id=\"", div_id, "\" class=\"guf_widget user\" style=\"position:relative;left:10px;top:10px;width:95%\">");
	if (rsc_type != "")
		cdns.push("<div class=\"guf_add_fb user\"><fieldset class=\"guf_fieldset user\"><legend class=\"guf_legend user\">", 
			GUFDonaCadenaLang({"cat":"Afegir valoracions a", "spa":"A�adir valoraciones a", "eng":"Add user feedback to", "fre":"Ajouter r�troaction de l'utilisateur de"}, lang), 
			" ", rsc_type,
			"</legend>");
	else
		cdns.push("<div class=\"guf_add_fb user\">");

	cdns.push("<input type=\"button\" class=\"guf_button user\" value=\"",
				  GUFDonaCadenaLang({"cat":"Afegir una valoraci�", "spa":"A�adir una valoraci�n", "eng":"Add a user feedback", "fre":"Ajouter une r�troaction de l'utilisateur"}, lang), "\"",
				  " onClick='GUFAfegirFeedbackCapaMultipleTargets(\"", JSON.stringify(targets).replaceAll("\"","\\\""), "\", \"", lang, "\", \"", access_token_type, "\");' />");

	if (rsc_type != "")
		cdns.push("</fieldset></div>");
	else
		cdns.push("</div><br>");

	cdns.push("<div class=\"guf_report user\"><fieldset class=\"guf_fieldset user\"><legend class=\"guf_legend user\">"); 
	if (rsc_type != "")
		cdns.push(GUFDonaCadenaLang({"cat":"Valoracions pr�vies a", "spa":"Valoraciones previas a", "eng":"Previous user feedback to", "fre":"Pr�c�dent r�troaction de l'utilisateur de"}, lang));
	else
		cdns.push(GUFDonaCadenaLang({"cat":"Valoracions pr�vies", "spa":"Valoraciones previas", "eng":"Previous user feedback", "fre":"Pr�c�dent r�troaction de l'utilisateur"}, lang));
	cdns.push(" ", rsc_type, "</legend>");
	
	cdns.push("<div id=\"",div_id,"Previ\" style=\"width:98%\">", "</div></fieldset>");
	
	n_targets_secundaris=TornaNTargetsSecundaris(targets);
	if (n_targets_secundaris)
	{
		for (var i=0; i<targets.length; i++)	
		{		
			if (targets[i].role=="secondary")
				break;
		}
		//caldria fer un bucle per els N secundaris, ara nom�s uso el primer (pq com ara nom�s permeto dos...)
		cdns.push("<fieldset class=\"guf_fieldset user\"><legend class=\"guf_legend user\">"); 
		cdns.push(GUFDonaCadenaLang({"cat":"Valoracions pr�vies a l'objectiu secundari", "spa":"Valoraciones previas al objectivo secundario", "eng":"Previous user feedback to secondary target", "fre":"Pr�c�dent r�troaction de l'utilisateur sur la cible secondaire"}, lang));
		cdns.push(" ", targets[i].title ? ("\""+targets[i].title +"\""): "", "</legend>");		
		cdns.push("<div id=\"",div_id,"Previ_secundari\" style=\"width:98%\">", "</div></fieldset>");
	}
	cdns.push("</div>", "</div></form>");
	
	return cdns.join("");
}

function EnviaReprodUsageComAPostMessage(event)
{
	if (GUFFeedbackWindow && ReprodUsageForPostMessage!="")
	{
		GUFFeedbackWindow.postMessage(ReprodUsageForPostMessage, ClientGUF);
		ReprodUsageForPostMessage="";
	}
}