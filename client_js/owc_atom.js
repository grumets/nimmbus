﻿/* 
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

    Copyright 2014, 2024 Xavier Pons

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

	  The main objective of this library is to read an XML Atom encoding for OGC OWS Context
  	and return the same object structure that is specified in GeoJSON encoding for OWS Context

  	This way implementors will be able to deal with both encodings in the same way.
  	This is an example of how to use it:

	  ...
	  if (format=="text/xml)
	     owc=ParseOWSContextAtom(doc.documentElement);
	  else if (format=="application/json")
	     owc=JSON.parse(doc);
	  else
	  {
	     alert("unknown format");
	     return
	  }
	
	  alert("title: " + owc.properties.title);
	  ...
	
     Developed by Joan Masó.
*/

"use strict"

//Generic functions to access XML fragments.

/*I apply a simplified solution that I found here:

http://stackoverflow.com/questions/2207941/getelementsbytagname-problem-in-chrome-and-safari

Final solution working in IE6,7,8, FF, Opera, Chrome and Safari
point_coords = item.getElementsByTagName('georss:point')[0];
if(!point_coords || point_coords == null){
    point_coords = item.getElementsByTagName('point')[0];
}
if(!point_coords || point_coords == null){
    point_coords = item.getElementsByTagNameNS('http://www.georss.org/georss', 'point')[0];
}
return point_coords
*/


//OWS Context Atom reader

function ParseOWSContextAtomAuthor(author)
{
	return {
		name: GetValueXMLElementByName(author, "atom", "name"),
		email: GetValueXMLElementByName(author, "atom", "email"),
		uri: GetValueXMLElementByName(author, "atom", "uri")
	}
}

function ParseOWSContextAtomAuthors(entry)
{
var i_author=0;

	var authors=[];
	
	var elems=entry.childNodes;
	if (elems)
	{
		for (var item=0; item<elems.length; item++)
		{
			if (elems[item].nodeName=="author" || elems[item].nodeName=="atom:author")
			{
				authors[i_author]=ParseOWSContextAtomAuthor(elems.item(item));
				i_author++;
			}
		}
	}
	return authors;
}

function ParseOWSContextAtomLink(link)
{
	return {
			href: GetValueXMLAttributeByName(link, "atom", "href"),
			type: GetValueXMLAttributeByName(link, "atom", "type"),
			hreflang: GetValueXMLAttributeByName(link, "atom", "hreflang"),
			title: GetValueXMLAttributeByName(link, "atom", "title"),
			length: GetValueXMLAttributeByName(link, "atom", "length")
		};
}

function ParseOWSContextAtomLinks(entry)
{
var i_link=0;
var rel, links={};

	var elems=entry.childNodes;
	if (elems)
	{
		for (var item=0; item<elems.length; item++)
		{
			if (elems[item].nodeName=="link" || elems[item].nodeName=="atom:link")
			{
				rel=GetValueXMLAttributeByName(elems[item], "atom", "rel");
				if (rel=="alternate" || rel==null)
				{
					if (!links.alternates)
						links.alternates=[];
					links.alternates[links.alternates.length]=ParseOWSContextAtomLink(elems[item]);
				}
				if (rel=="related")
				{
					if (!links.relateds)
						links.relateds=[];
					links.relateds[links.relateds.length]=ParseOWSContextAtomLink(elems[item]);
				}
				if (rel=="self")
				{
					if (!links.selfs)
						links.selfs=[];
					links.selfs[links.selfs.length]=ParseOWSContextAtomLink(elems[item]);
				}
				if (rel=="enclosure")
				{
					if (!links.enclosures)
						links.enclosures=[];
					links.enclosures[links.enclosures.length]=ParseOWSContextAtomLink(elems[item]);
				}
				if (rel=="icon")
				{
					if (!links.icons)
						links.icons=[];
					links.icons[links.icons.length]=ParseOWSContextAtomLink(elems[item]);
				}
				if (rel=="via")
				{
					if (!links.via)
						links.via=ParseOWSContextAtomLink(elems[item]);
				}
			}
		}
	}
	return links;
}

function ParseOWSContextGmlPos(gml_pos)
{
var coords=[];
	if (gml_pos && gml_pos.childNodes[0] && gml_pos.childNodes[0].nodeValue)
	{
		var s=gml_pos.childNodes[0].nodeValue;
		coords[1]=parseFloat(s.substring(0, s.indexOf(" ")));
		coords[0]=parseFloat(s.substring(s.indexOf(" ")+1, s.length));
		return coords;
	}
	else
		return null;
}

function ParseOWSContextGmlPoint(gml_point)
{
var point={};
	point.type="Point";
	var elems=gml_point.childNodes;
	if (elems)
	{
		for (var item=0; item<elems.length; item++)
		{
			if (elems[item].nodeName=="pos" || elems[item].nodeName=="gml:pos")
				point.coordinates=ParseOWSContextGmlPos(elems.item(item));
		}
	}
	return point;
}

function ParseOWSContextGeoRSSWhere(georss_where)
{
	var elems=georss_where.childNodes;
	if (elems)
	{
		for (var item=0; item<elems.length; item++)
		{
			if (elems[item].nodeName=="Point" || elems[item].nodeName=="gml:Point")
				return ParseOWSContextGmlPoint(elems.item(item));
		}
	}
	return null;
}

function ParseOWSContextAtomEntryGeoRSSPosition(entry)
{
	var elems=entry.childNodes;
	if (elems)
	{
		for (var item=0; item<elems.length; item++)
		{
			if (elems[item].nodeName=="where" || elems[item].nodeName=="georss:where")
				return ParseOWSContextGeoRSSWhere(elems.item(item));
		}
	}
	return null;
}

function ParseOWSContextAtomEntryGeoRSSElevation(entry)
{
	var elems=entry.childNodes;
	if (elems)
	{
		for (var item=0; item<elems.length; item++)
		{
			if (elems[item].nodeName=="elev" || elems[item].nodeName=="georss:elev")
			{
				if (elems[item].childNodes[0] && elems[item].childNodes[0].nodeValue)
					return elems[item].childNodes[0].nodeValue;
			}
		}
	}
	return null;
}

function ParseOWSContextAtomCategory(category)
{
  	return {
		term: GetValueXMLAttributeByName(category, "atom", "term"),
		scheme: GetValueXMLAttributeByName(category, "atom", "scheme"),
		label: GetValueXMLAttributeByName(category, "atom", "label")
	}
}

function ParseOWSContextAtomCategories(entry)
{
var i_category=0;

	var categories=[];
	
	var elems=entry.childNodes;
	if (elems)
	{
		for (var item=0; item<elems.length; item++)
		{
			if (elems[item].nodeName=="category" || elems[item].nodeName=="atom:category")
			{
				categories[i_category]=ParseOWSContextAtomCategory(elems.item(item));
				i_category++;
			}
		}
	}
	return categories;
}

function ParseOWSContextAtomEntryProperties(entry)
{
	return {
		title: GetValueXMLElementByName(entry, "atom", "title"),
		subtitle: GetValueXMLElementByName(entry, "atom", "subtitle"),
		updated: GetValueXMLElementByName(entry, "atom", "updated"),
		authors: ParseOWSContextAtomAuthors(entry),
		publisher: GetValueXMLElementByName(entry, "atom", "publisher"),
		rights: GetValueXMLElementByName(entry, "dc", "rights"),
		elevation: ParseOWSContextAtomEntryGeoRSSElevation(entry),
		content: GetValueXMLElementByName(entry, "atom", "content"),
		links: ParseOWSContextAtomLinks(entry),
	//temporalExtent 
	//preview
	//contentByRef, offering
	//contextMetadata
	//active, minScaleDenominator, maxScaleDenominator, folder
		categories: ParseOWSContextAtomCategories(entry),		
		openData: GetValueXMLElementByName(entry, "nmmb", "openData")
	}
}

function ParseOWSContextAtomEntry(entry)
{
	return {
		id: GetValueXMLElementByName(entry, "atom", "id"),
		properties: ParseOWSContextAtomEntryProperties(entry),
		geometry: ParseOWSContextAtomEntryGeoRSSPosition(entry)
	}
}

function ParseOWSContextAtomMainProperties(root)
{
	return {
		lang: GetValueXMLAttributeByName(root, "xml", "lang"),
		title: GetValueXMLElementByName(root, "atom", "title"),
		subtitle: GetValueXMLElementByName(root, "atom", "subtitle"),
		updated: GetValueXMLElementByName(root, "atom", "updated"),
		authors: ParseOWSContextAtomAuthors(root),
		publisher: GetValueXMLElementByName(root, "atom", "publisher"),
		creator: GetValueXMLElementByName(root, "atom", "creator"),
		rights: GetValueXMLElementByName(root, "dc", "rights"),
		links: ParseOWSContextAtomLinks(root),
	//areaOfInterest  deduir de georss where.
	//timeIntervalOfInterest
	//contextMetadata
	//categories
        /*I also include this 3 tags documented in http://www.opensearch.org/Specifications/OpenSearch/1.1/
          even if they are not included in the OGC 14-055 document.*/
		totalResults: GetValueXMLElementByName(root, "opensearch", "totalResults"),
		startIndex: GetValueXMLElementByName(root, "opensearch", "startIndex"),
		itemsPerPage: GetValueXMLElementByName(root, "opensearch", "itemsPerPage")
	}
}

function ParseOWSContextAtomEntries(root)
{
var i_entry=0;

	var features=[];
	
	var elems=root.childNodes;
	if (elems)
	{
		for (var item=0; item<elems.length; item++)
		{
			if (elems[item].nodeName=="entry" || elems[item].nodeName=="atom:entry")
			{
				features[i_entry]=ParseOWSContextAtomEntry(elems.item(item));
				i_entry++;
			}
		}
	}
	return features;
}

function ParseOWSContextAtom(root)
{	
	return {
		type: "FeatureCollection", 
		id: GetValueXMLElementByName(root, "atom", "id"),
		properties: ParseOWSContextAtomMainProperties(root),
		features: ParseOWSContextAtomEntries(root)
	}
}
