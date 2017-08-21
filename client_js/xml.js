/*
  The main objective of this library is to compile a set of functions that makes reading an XML a bit easier
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
