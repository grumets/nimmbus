/*
	This is part of the NiMMbus libraries.
	The main objective of this library is to compile a set of functions that makes reading an XML a bit easier.
	It also includes the AJAX function loadFile();
	Developed by Joan Masó.
	License: Attribution 4.0 International (CC BY 4.0) http://creativecommons.org/licenses/by/4.0/
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
	else
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
	else
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
	else
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
				if (mimetype && mimetype!="" && mimetype!=xhr.getResponseHeader('content-type'))
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
