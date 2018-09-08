/*
	This is part of the NiMMbus libraries.
	The main objective of this library is to expose provide functions that are useful for HTML based GUF applications such us the MiraMon Map Browser and NextGEOSS community portals
	Developed by Joan Masó and Alaitz Zabala.
	License: Attribution 4.0 International (CC BY 4.0) http://creativecommons.org/licenses/by/4.0/
*/

function GUFShowFeedbackInHTMLDiv(elem, seed_div_id, rsc_type, title, code, codespace, lang)
{
	elem.innerHTML = GUFDonaCadenaFinestraFeedbackResource(seed_div_id, rsc_type, title, code, codespace, lang);
	//demano el fitxer atom de feedbacks previs
	GUFShowPreviousFeedbackInHTMLDiv(seed_div_id+"Previ", rsc_type, code, codespace, lang);
}

function GUFShowPreviousFeedbackInHTMLDiv(div_id, rsc_type, code, codespace, lang)
{
	var url="https://www.opengis.uab.cat/cgi-bin/nimmbus/nimmbus.cgi?SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:ENUMERATE&LANGUAGE=" + lang + "&STARTINDEX=1&COUNT=100&FORMAT=text/xml&TYPE=FEEDBACK&TRG_TYPE_1=CITATION&TRG_FLD_1=CODE&TRG_VL_1=" + code + "&TRG_OPR_1=EQ&TRG_NXS_1=AND&TRG_TYPE_2=CITATION&TRG_FLD_2=NAMESPACE&TRG_VL_2=" + codespace + "&TRG_OPR_2=EQ";
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
	return "";
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


function CarregaFeedbacksAnteriors(doc, extra_param)
{
var cdns=[];

	if (!doc || !doc.documentElement)
	{
		alert (extra_param.url + ": " + GUFDonaCadenaLang({"cat":"El retorn no és xml", "spa":"El retorno no es xml", "eng":"Return is not xml", "fre":"Le retour n'est pas xml"}, extra_param.lang));
		return ;
	}
	root=doc.documentElement;

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
	for (var i=0; i<owc.features.length; i++)
	{
		type=GetNimmbusTypeOfAOWCFeature(owc.features[i]);
		if (type=="FEEDBACK")
		{
			cdns.push("<fieldset><legend>", 
				"<b>", owc.features[i].properties.authors[0].name, "</b> ", DonaDataISOComAText(owc.features[i].properties.updated), 
				"</legend>", 
				"<b>", GUFDonaCadenaLang({"cat":"Títol", "spa":"Título", "eng":"Title", "fre":"Titre"}, extra_param.lang), ":</b> ", owc.features[i].properties.title,
				"<div id=\"", extra_param.div_id, "_",i , "\"></div>",
				"</fieldset>");
		}
	}
	cdns.push("<input type=\"button\" class=\"Verdana11px\" value=\"",
		GUFDonaCadenaLang({"cat":"edita", "spa":"edita", "eng":"edit", "fre":"éditer"}, extra_param.lang), "\"",
		" onClick='GUFOpenNimmbus(\"", extra_param.lang, "\");' /> ",
		GUFDonaCadenaLang({"cat":"les teves entrades prèvies", "spa":"tus entradas previas", "eng":"your previous entries", "fre":"vos entrées précédentes"}, extra_param.lang));
	document.getElementById(extra_param.div_id).innerHTML=cdns.join("");
	for (var i=0; i<owc.features.length; i++)
	{
		type=GetNimmbusTypeOfAOWCFeature(owc.features[i]);
		if (type=="FEEDBACK" && owc.features[i].properties && owc.features[i].properties.links && owc.features[i].properties.links.alternates && owc.features[i].properties.links.alternates.length && owc.features[i].properties.links.alternates[0].href)
			loadFile(owc.features[i].properties.links.alternates[0].href, "text/xml", CarregaFeedbackAnterior, function(xhr, extra_param) { alert(extra_param.url + ": " + xhr ); }, {url: owc.features[i].properties.links.alternates[0].href, div_id: extra_param.div_id + "_" + i, lang: extra_param.lang});
	}
}


function CarregaFeedbackAnterior(doc, extra_param)
{
var cdns=[];

	if (!doc || !doc.documentElement)
	{
		alert (extra_param.url + ": " + GUFDonaCadenaLang({"cat":"El retorn no és xml", "spa":"El retorno no es xml", "eng":"Return is not xml", "fre":"Le retour n'est pas xml"}, extra_param.lang)); 
		return ;
	}
	root=doc.documentElement;

	if (GUFAnalitzaExceptionReport(root, extra_param.url))
		return;

	var guf=GetRetrieveResourceFeedbackOutputs(root);

	if (!guf)
	{	
		alert (extra_param.url + ": " + GUFDonaCadenaLang({"cat":"El retorn no és un xml guf", "spa":"El retorno no es xml guf", "eng":"Return is not xml guf", "fre":"Le retour n'est pas xml guf"}, extra_param.lang)); 
		return;
	}
	
	if (guf.purpose)
		cdns.push("<b>", GUFDonaCadenaLang({"cat":"Propòsit", "spa":"Proposito", "eng":"Purpose", "fre":"Raison"}, extra_param.lang), ":</b> ", guf.purpose, "<br/>");

	if (guf.abstract)
		cdns.push("<b>", GUFDonaCadenaLang({"cat":"Resum", "spa":"Resumen", "eng":"Abstract", "fre":"Abstrait"}, extra_param.lang), ":</b> ", guf.abstract, "<br/>");

	if (guf.contactRole && GUFContactRoleDescription[guf.contactRole])
		cdns.push("<b>", GUFDonaCadenaLang({"cat":"Rol del contacte", "spa":"Rol del contacto", "eng":"Contact role", "fre":"Rôle de contact"}, extra_param.lang), ":</b> ", GUFDonaCadenaLang(GUFContactRoleDescription[guf.contactRole], extra_param.lang), "<br/>");

	if (guf.comment)
		cdns.push("<b>", GUFDonaCadenaLang({"cat":"Comentari", "spa":"Comentari", "eng":"Comment", "fre":"Commentaire"}, extra_param.lang), ":</b> ", guf.comment, "<br/>");

	if (guf.motivation && GUFMotivationDescription[guf.motivation])
		cdns.push("<b>", GUFDonaCadenaLang({"cat":"Motivació del comentari", "spa":"Motivación del comentario", "eng":"Comment motivation", "fre":"Motivation du commentaire"}, extra_param.lang), ":</b> ", GUFDonaCadenaLang(GUFMotivationDescription[guf.motivation], extra_param.lang), "<br/>");

	if (guf.rating)	
		cdns.push("<b>", GUFDonaCadenaLang({"cat":"Puntuació", "spa":"Puntuación", "eng":"Rating", "fre":"Évaluation"}, extra_param.lang), ":</b> ", guf.rating, "/5<br/>");

	/*if (guf.public)
	{	
		for (var i_publi=0; i_publi<guf.public.length; i_publi++)
		{	
			if (guf.public[i_publi].identifier)
			{
	  			for (var i_id=0; i_id<guf.public[i_publi].identifier.length; i_id++)
  				{
  					if (guf.public[i_publi].identifier[i_id].codeSpace=="http://www.opengis.uab.cat/nimmbus/resourceId")
  					{
						cdns.push("<b>", GUFDonaCadenaLang({"cat":"Publicació", "spa":"Publicación", "eng":"Publication", "fre":"Publication"}, extra_param.lang), ":</b> ", <div id=\"", extra_param.div_id, "_publi_", i_publi , "\"></div>");
  						break;
	  				}
  				}
			} 			
		}
	}*/
	document.getElementById(extra_param.div_id).innerHTML=cdns.join("");
	/*if (guf.public)
	{	
		for (var i_publi=0; i_publi<guf.public.length; i_publi++)
		{	
			if (guf.public[i_publi].identifier)
			{
	  			for (var i_id=0; i_id<guf.public[i_publi].identifier.length; i_id++)
  				{
  					if (guf.public[i_publi].identifier[i_id].codeSpace=="http://www.opengis.uab.cat/nimmbus/resourceId")
  					{
						var url="https://www.opengis.uab.cat/cgi-bin/nimmbus/nimmbus.cgi?SERVICE=WPS&REQUEST=EXECUTE&IDENTIFIER=NB_RESOURCE:RETRIEVE&LANGUAGE="+extra_param.lang+"&RESOURCE=??&USER=Anonymous
						guf.public[i_publi].identifier[i_id].code;
						cdns.push("<b>", GUFDonaCadenaLang({"cat":"Publicació", "spa":"Publicación", "eng":"Publication", "fre":"Publication"}, extra_param.lang), ":</b> ", <div id=\"", extra_param.div_id, "_publi_", i_publi , "\"></div>");
						loadFile(owc.features[i].properties.links.alternates[0].href, "text/xml", CarregaFeedbackAnterior, function(xhr, extra_param) { alert(extra_param.url + ": " + xhr ); }, {url: owc.features[i].properties.links.alternates[0].href, div_id: extra_param.div_id + "_" + i, lang: extra_param.lang});
  						break;
	  				}
  				}
			} 			
		}
	}*/
}

var GUFFeedbackWindow=null;
function GUFOpenNimmbus(lang)
{
	if (GUFFeedbackWindow==null || GUFFeedbackWindow.closed)
	{
		GUFFeedbackWindow=window.open("https://www.opengis.uab.cat/nimmbus/index.htm", "Feedback",'toolbar=no,status=no,scrollbars=yes,location=no,menubar=no,directories=no,resizable=yes,width=800,height=700');
		GUFShaObertPopUp(GUFFeedbackWindow, lang);
	}
	else
	{
		GUFFeedbackWindow.location.href="https://www.opengis.uab.cat/nimmbus/index.htm";
		GUFFeedbackWindow.focus();
	}
}

function GUFDonaNomFitxerAddFeedback(title, code, codespace)
{
	return "https://www.opengis.uab.cat/nimmbus/index.htm?target_title=" + title + "&target_code=" + code + "&target_codespace=" + codespace + "&page=ADDFEEDBACK&share_borrower_1=Anonymous";
}

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
}

function GUFDonaCadenaFinestraFeedbackResource(div_id, rsc_type, title, code, codespace, lang)
{
var cdns=[];

	cdns.push("<form name=\"FeedbackResourceForm\" onSubmit=\"return false;\">");
	cdns.push("<div id=\"", div_id, "\" class=\"Verdana11px\" style=\"position:relative;left:10px;top:10px;width:95%\">");
	cdns.push("<fieldset><legend>", 
		GUFDonaCadenaLang({"cat":"Afegir valoracions a", "spa":"Añadir valoraciones a", "eng":"Add user feedback to", "fre":"Ajouter rétroaction de l'utilisateur de"}, lang), 
		": ", rsc_type,
		":</legend>");

	cdns.push("<input type=\"button\" class=\"Verdana11px\" value=\"",
				  GUFDonaCadenaLang({"cat":"Afegir una valoració", "spa":"Añadir una valoración", "eng":"Add a user feedback", "fre":"Ajouter une rétroaction de l'utilisateur"}), "\"",
				  " onClick='GUFAfegirFeedbackCapa(\"", title, "\", \"", code, "\", \"", codespace, "\", \"", lang, "\");' />",
				  "</fieldset>");
	cdns.push("<fieldset><legend>", 
			GUFDonaCadenaLang({"cat":"Valoracions prèvies a", "spa":"Valoraciones previas a", "eng":"Previous user feedback to", "fre":"Précédent rétroaction de l'utilisateur de"}, lang), 
			": ", rsc_type,
			":</legend>");
	cdns.push("<div id=\"",div_id,"Previ\" class=\"Verdana11px\" style=\"width:98%\">",
		"</div></fieldset>",
		"</div></form>");

	return cdns.join("");
}
