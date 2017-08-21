/*
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
     License: Attribution 4.0 International (CC BY 4.0) http://creativecommons.org/licenses/by/4.0/
*/


//Generic functions to access XML fragments.

/*I apply a simplified solution that I fould here:

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
	this.name=GetValueXMLElementByName(author, "atom", "name");
	this.email=GetValueXMLElementByName(author, "atom", "email");
	this.uri=GetValueXMLElementByName(author, "atom", "uri");
}

function ParseOWSContextAtomAuthors(entry)
{
var i_author=0;

	var authors=new Array();
	
	var elems=entry.childNodes;
	if (elems)
	{
		for (var item=0; item<elems.length; item++)
		{
			if (elems[item].nodeName=="author" || elems[item].nodeName=="atom:author")
			{
				authors[i_author]=new ParseOWSContextAtomAuthor(elems.item(item));
				i_author++;
			}
		}
	}
	return authors;
}

function ParseOWSContextAtomLink(link)
{
	this.href=GetValueXMLAttributeByName(link, "atom", "href");
	this.type=GetValueXMLAttributeByName(link, "atom", "type");
        this.hreflang=GetValueXMLAttributeByName(link, "atom", "hreflang");
        this.title=GetValueXMLAttributeByName(link, "atom", "title");
        this.length=GetValueXMLAttributeByName(link, "atom", "length");
}

function ParseOWSContextAtomLinks(entry)
{
var i_link=0;
var rel;

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
					if (!this.alternates)
						this.alternates=new Array();
					this.alternates[this.alternates.length]=new ParseOWSContextAtomLink(elems[item]);
				}
				if (rel=="related")
				{
					if (!this.relateds)
						this.relateds=new Array();
					this.relateds[this.relateds.length]=new ParseOWSContextAtomLink(elems[item]);
				}
				if (rel=="self")
				{
					if (!this.selfs)
						this.selfs=new Array();
					this.selfs[this.selfs.length]=new ParseOWSContextAtomLink(elems[item]);
				}
				if (rel=="enclosure")
				{
					if (!this.enclosures)
						this.enclosures=new Array();
					this.enclosures[this.enclosures.length]=new ParseOWSContextAtomLink(elems[item]);
				}
				if (rel=="icon")
				{
					if (!this.icons)
						this.icons=new Array();
					this.icons[this.icons.length]=new ParseOWSContextAtomLink(elems[item]);
				}
				if (rel=="via")
				{
					if (!this.via)
						this.via=new ParseOWSContextAtomLink(elems[item]);
				}
			}
		}
	}
}

function ParseOWSContextGmlPos(gml_pos)
{
	coords=new Array();
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
	this.type="Point";
	var elems=gml_point.childNodes;
	if (elems)
	{
		for (var item=0; item<elems.length; item++)
		{
			if (elems[item].nodeName=="pos" || elems[item].nodeName=="gml:pos")
				this.coordinates=ParseOWSContextGmlPos(elems.item(item));
		}
	}
}

function ParseOWSContextGeoRSSWhere(georss_where)
{
	var elems=georss_where.childNodes;
	if (elems)
	{
		for (var item=0; item<elems.length; item++)
		{
			if (elems[item].nodeName=="Point" || elems[item].nodeName=="gml:Point")
				return new ParseOWSContextGmlPoint(elems.item(item));
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
  this.term=GetValueXMLAttributeByName(category, "atom", "term");
	this.scheme=GetValueXMLAttributeByName(category, "atom", "scheme");
	this.label=GetValueXMLAttributeByName(category, "atom", "label");
}

function ParseOWSContextAtomCategories(entry)
{
var i_category=0;

	var categories=new Array();
	
	var elems=entry.childNodes;
	if (elems)
	{
		for (var item=0; item<elems.length; item++)
		{
			if (elems[item].nodeName=="category" || elems[item].nodeName=="atom:category")
			{
				categories[i_category]=new ParseOWSContextAtomCategory(elems.item(item));
				i_category++;
			}
		}
	}
	return categories;
}

function ParseOWSContextAtomEntryProperties(entry)
{
	this.title=GetValueXMLElementByName(entry, "atom", "title");
	this.subtitle=GetValueXMLElementByName(entry, "atom", "subtitle");
	this.updated=GetValueXMLElementByName(entry, "atom", "updated");
	this.authors=ParseOWSContextAtomAuthors(entry);
	this.publisher=GetValueXMLElementByName(entry, "atom", "publisher");
	this.rights=GetValueXMLElementByName(entry, "dc", "rights");
	this.elevation=ParseOWSContextAtomEntryGeoRSSElevation(entry);
	this.content=GetValueXMLElementByName(entry, "atom", "content");
	this.links=new ParseOWSContextAtomLinks(entry);
	//this.temporalExtent 
	//preview
	//contentByRef, offering
	//contextMetadata
	//active, minScaleDenominator, maxScaleDenominator, folder
	this.categories=ParseOWSContextAtomCategories(entry);
}

function ParseOWSContextAtomEntry(entry)
{
	this.id=GetValueXMLElementByName(entry, "atom", "id");
	this.properties=new ParseOWSContextAtomEntryProperties(entry);
	this.geometry=ParseOWSContextAtomEntryGeoRSSPosition(entry);
}

function ParseOWSContextAtomMainProperties(root)
{
	this.lang=GetValueXMLAttributeByName(root, "xml", "lang");
	this.title=GetValueXMLElementByName(root, "atom", "title");
	this.subtitle=GetValueXMLElementByName(root, "atom", "subtitle");
	this.updated=GetValueXMLElementByName(root, "atom", "updated");
	this.authors=ParseOWSContextAtomAuthors(root);
	this.publisher=GetValueXMLElementByName(root, "atom", "publisher");
	this.creator=GetValueXMLElementByName(root, "atom", "creator");
	this.rights=GetValueXMLElementByName(root, "dc", "rights");
	this.links=new ParseOWSContextAtomLinks(root);
	//this.areaOfInterest  deduir de georss where.
	//this.timeIntervalOfInterest
	//contextMetadata
	//categories
        /*I also include this 3 tags documented in http://www.opensearch.org/Specifications/OpenSearch/1.1/
          even if they are not included in the OGC 14-055 document.*/
	this.totalResults=GetValueXMLElementByName(root, "opensearch", "totalResults");
        this.startIndex=GetValueXMLElementByName(root, "opensearch", "startIndex");
        this.itemsPerPage=GetValueXMLElementByName(root, "opensearch", "itemsPerPage");
}

function ParseOWSContextAtomEntries(root)
{
var i_entry=0;

	var features=new Array();
	
	var elems=root.childNodes;
	if (elems)
	{
		for (var item=0; item<elems.length; item++)
		{
			if (elems[item].nodeName=="entry" || elems[item].nodeName=="atom:entry")
			{
				features[i_entry]=new ParseOWSContextAtomEntry(elems.item(item));
				i_entry++;
			}
		}
	}
	return features;
}

function ParseOWSContextAtom(root)
{	
	this.type="FeatureCollection";
	this.id=GetValueXMLElementByName(root, "atom", "id");
	this.properties=new ParseOWSContextAtomMainProperties(root);
	this.features=ParseOWSContextAtomEntries(root);
}
