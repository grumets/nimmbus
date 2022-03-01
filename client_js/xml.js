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

//Returns all nodes at all levels that has the abbreb_ns and the name
function GetXMLElementByName(root, abbreb_ns, name)
{
var a;
	if (abbreb_ns)
	{
		a = root.getElementsByTagName(abbreb_ns + ":" + name)[0];
		if(a && a != null)
			return a;
	    return root.getElementsByTagName(name)[0];
	}
    return root.getElementsByTagName(name)[0];
}

//Return true if the node that has the abbreb_ns and the name. abbreb_ns can be '*' if we do not expect ns or if it does not matter.
function HasXMLNodeTheRightName(node, abbreb_ns, name)
{
var ns_plus_name=node.nodeName.split(":");
	if ((ns_plus_name[1] && (abbreb_ns==ns_plus_name[0] || abbreb_ns=='*') && ns_plus_name[1]==name) || 
		(!ns_plus_name[1] && abbreb_ns=='*' && ns_plus_name[0]==name))
		return node;
}

//Returns a child node that has the abbreb_ns and the name. abbreb_ns can be '*' if we do not expect ns or if it does not matter.
function GetXMLChildElementByName(parent, abbreb_ns, name)
{
var x, ns_plus_name;
	x = parent.childNodes;
	for (var i = 0; i < x.length; i++) 
	{ 
	        if (x[i].nodeType == 1 /*ELEMENT_NODE*/) 
		{
			if (HasXMLNodeTheRightName(x[i], abbreb_ns, name))
				return x[i];
		}
	}
	return null;
}

function GetValueXMLElementByName(root, abbreb_ns, name)
{
var elem;

	elem=GetXMLElementByName(root, abbreb_ns, name);
	if (elem && elem.childNodes[0] && elem.childNodes[0].nodeValue)
		return elem.childNodes[0].nodeValue;
	return null;
}

function GetXMLAttributeByName(element, abbreb_ns, name)
{
var a;
	if (abbreb_ns)
	{
		a=element.attributes.getNamedItem(abbreb_ns + ":" + name);
		if(a && a != null)
			return a;
		return element.attributes.getNamedItem(name);
	}
	return element.attributes.getNamedItem(name);	
}

function GetValueXMLAttributeByName(root, abbreb_ns, name)
{
var attrib;

	attrib=GetXMLAttributeByName(root, abbreb_ns, name);
	if (attrib && attrib.value)
		return attrib.value;
	return null;
}

function GetXMLElementCollectionByName(root, abbreb_ns, name)
{
var a;
	if (abbreb_ns)
	{
		a = root.getElementsByTagName(abbreb_ns + ":" + name);
		if(a && a != null && a.length)
			return a;
	    	return root.getElementsByTagName(name);
	}
    	return root.getElementsByTagName(name);
}

function IsXMLMimeType(mimetype)
{
	if (typeof mimetype!=="undefined" && (mimetype=="text/xml" || mimetype=="application/xml" || 
		mimetype=="application/vnd.ogc.gml" || mimetype=="application/vnd.ogc.gml/3.1.1" || 
		mimetype=="subtype=gml/3.1.1"))
		return true;
	return false;
}

function ResponseHeaderContentTypeConteMimeType(mimetype, xhr)
{
	//if(typeof mimetype==="undefined" || !mimetype || mimetype=="")
	if (!mimetype)
		return true;

	var content_type=xhr.getResponseHeader('content-type');
	if (mimetype==content_type)
		return true;
	
	var mimetype_only=(mimetype.indexOf(";")>1) ? mimetype.substring(0, mimetype.indexOf(";")) : mimetype;
	var content_type_only=(content_type.indexOf(";")>1) ? content_type.substring(0, content_type.indexOf(";")) : content_type;

	if (mimetype_only==content_type_only ||
		(mimetype_only=="application/xml" && content_type_only=="text/xml") || 
		(mimetype_only=="text/xml" && content_type_only=="application/xml"))
		return true;

	/*if(mimetype.length<content_type.length)
	{
		if(mimetype==content_type.substring(0,mimetype.length))
			return true;
	}*/
	return false;
}

								  
								  
function loadFile(path, mimetype, success, error, extra_param)
{
var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
        if (xhr.readyState === XMLHttpRequest.DONE) 
		{
	       	if (xhr.status === 200) 
			{
				//if (mimetype && mimetype!="" && mimetype!=xhr.getResponseHeader('content-type'))
				if(!ResponseHeaderContentTypeConteMimeType(mimetype, xhr))
				{
		            if (error)
					{
						var s=null;
						if (xhr.response)
						{
							var s=xhr.response;
							if (-1!=s.indexOf("<body>"))
								s=s.substring(s.indexOf("<body>"));
						}
						error("Wrong response content type:"+ xhr.getResponseHeader('content-type') + "\n\nResponse headers:\n"+ ((xhr.getAllResponseHeaders && xhr.getAllResponseHeaders()) ? xhr.getAllResponseHeaders() : "") + ((s) ? "\nResponse Body:\n"+s : ""), extra_param);
					}
				}
				else
				{
	           		if (success)
					{
						if (IsXMLMimeType(mimetype))
							success(xhr.responseXML, extra_param);
						else
							success(xhr.responseText, extra_param);
					}
				}
			} 
			else 
			{
           		if (error)
				{
					var s=null;
					if (xhr.response)
					{
						var s=xhr.response;
						if (-1!=s.indexOf("<body>"))
							s=s.substring(s.indexOf("<body>"));
					}
					error(xhr.status + ": " +xhr.statusText + "\n\nURL: "+ path + ((xhr.getAllResponseHeaders && xhr.getAllResponseHeaders()) ? "\n\nResponse headers:\n"+ xhr.getAllResponseHeaders() : "") + ((s) ? "\nResponse Body:\n"+s : ""), extra_param);
				}
			}
		}
	};
	xhr.open("GET", path, true);
	if(mimetype && mimetype!="")
		xhr.setRequestHeader('Accept', mimetype);
	//xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=ISO-8859-1');
	//xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	xhr.send();
}

/*Per si un dia ho necessito.
function xml2Str(xmlNode) {
   try {
      // Gecko- and Webkit-based browsers (Firefox, Chrome), Opera.
      return (new XMLSerializer()).serializeToString(xmlNode);
  }
  catch (e) {
     try {
        // Internet Explorer.
        return xmlNode.xml;
     }
     catch (e) {  
        //Other browsers without XML Serializer
        alert('Xmlserializer not supported');
     }
   }
   return false;
}*/
