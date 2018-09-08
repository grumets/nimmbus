/*
	This is part of the NiMMbus libraries.
	The main objective of this library is to compile a set of functions that makes reading an XML a bit easier.
	It also includes the AJAX function loadFile();
	Developed by Joan Masó.
	License: Attribution 4.0 International (CC BY 4.0) http://creativecommons.org/licenses/by/4.0/
*/


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
