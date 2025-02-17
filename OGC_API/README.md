# NiMMbus GUF OGC API

The NiMMbus service is an OGC Geospatial User Feedback (GUF) implementation developed by the MiraMon team from the Grumets research group at the Universitat Autònoma de Barcelona and CREAF.

This GUF OGC API implementation allows users to interact with the server using the OGC API standard syntax for feedback elements stored in NiMMbus. For interactions with other NiMMbus elements, please refer to an alternative API based on WPS [here](../API).

## Accepted Requests

The GUF OGC API is still under development. The requests listed below only cover the GET method. This page will be updated with new features in the near future.

## Landing Page
https://www.nimmbus.cat/devs/cgi-bin/nimmbus.cgi
* Returns the landing page.
* Default format: HTML
* Accepted query parameters:
  * `f`= (json, html)

## GUF OGC API
https://www.nimmbus.cat/devs/cgi-bin/nimmbus.cgi/api
* Detailed specifications of the GUF OGC API currently developed.
* Default format: HTML (Swagger)
* Accepted query parameters:
  * `f`= (json, html)

## Conformance
https://www.nimmbus.cat/devs/cgi-bin/nimmbus.cgi/conformance
* List of conformance requirement classes supported by this service.
* Default format: HTML
* Accepted query parameters:
  * `f`= (json, html)

## Collections
https://www.nimmbus.cat/devs/cgi-bin/nimmbus.cgi/collections
* HTML list of collections. The GUF OGC API has only one collection: Feedback.
* Default format: HTML
* Accepted query parameters:
  * `f`= (json, html)

## Feedback Collection Description
https://www.nimmbus.cat/devs/cgi-bin/nimmbus.cgi/collections/feedback
* Description of the Feedback collection.
* Default format: HTML
* Accepted query parameters:
  * `f`= (json, html)

## Feedback Items Description
https://www.nimmbus.cat/devs/cgi-bin/nimmbus.cgi/collections/feedback/items
* Description of items in the Feedback collection.
* Default format: HTML
* Accepted query parameters (all can be combined):
  * `f`= (html, json, xml)
  * `q`= 
    * A comma-separated list of search terms. If a record contains one or more of the terms, it will appear in the response set.
    * Example: `q=climate change, acceleration, Spain`
  * `bbox`= 
    * Selects features with geometries intersecting the bounding box. Features without spatial geometry are also included.
    * Coordinate reference system: WGS84 longitude/latitude (http://www.opengis.net/def/crs/OGC/1.3/CRS84).
    * Bounding box format: four or six numbers, depending on whether it includes vertical coordinates:
        * Lower left corner, axis 1
        * Lower left corner, axis 2
        * Lower left corner, axis 3 (optional)
        * Upper right corner, axis 1
        * Upper right corner, axis 2
        * Upper right corner, axis 3 (optional)
    * Example: `bbox=-6.6, -6.5, 37.00, 37.40`
  * `excludeItemsWithoutBbox`= (true, false)
    * Filters items when a bounding box is specified. If `excludeItemsWithoutBbox` is TRUE, only features with a defined geometry are selected.
  * `datetime`=
    * Selects items with temporal properties that intersect the specified date or interval. Follows RFC 3339 for date-time formats. Open intervals use double-dots.
    * Examples:
      * A date-time: `"2018-02-12T23:20:50Z"`
      * A closed interval: `"2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"`
      * Open intervals: `"2018-02-12T00:00:00Z/.."` or `"../2018-03-18T12:31:12Z"`
  * `limit`=
    * Maximum number of items to display in the response. Default is 10.
  * `offset`=
    * Index of the first item to display in the response. Items are ordered from 0 to n. Default is 0.
  * `ids`=
    * A comma-separated list of record identifiers. Only records with specified identifiers appear in the response.
    * Must be expressed as a 47-character NiMMbus internal resource identifier.
    * Example: `ids=014Z45Y0102805DA7T3M1CB438HC89UZFZ6797J1I28A999,0Z02AK7R331V9KOJGE8S9J6M0604T7J71O84L121ICO2647,L710EH5TH1SU0PCVN86841EVZLFTU5N90W5SNV3FZW7YPB7`
  * `externalIds`=
    * A comma-separated list of external resource identifiers. Only Feedback items with specified external identifiers appear in the response.
    * External IDs can be 47-character NiMMbus internal identifiers or JSON with `code` and `codeSpace` attributes.
    * Examples:
      * `externalIds=0Y750T3K6H9NYK40Z762235DA9AJ9034102HM2E85B0R8QE`
      * `externalIds={"code":"DonanaDTM","codeSpace":"http://maps.ecopotential-project.eu/cgi-bin/MiraMon.cgi"}`

## Feedback Element Description
https://www.nimmbus.cat/devs/cgi-bin/nimmbus.cgi/collections/feedback/items/{itemsId}
* `{itemsId}` is the 47-character NiMMbus internal resource identifier.
* Returns the details of a specified feedback item.
* Default format: HTML
* Accepted query parameters:
  * `f`= (html, json, xml)

## Feedback Summary
https://www.nimmbus.cat/devs/cgi-bin/nimmbus.cgi/collections/feedback/stats
* Returns a summary of feedback items related to a resource (`externalIds`) or a general summary if no parameters are specified.
* Default format: HTML
* Accepted query parameters (all can be combined):
  * `f`= (html, json, xml)
  * `externalIds`=
    * A delimited list of external resource identifiers. Only Feedback items with specified external identifiers appear in the response.
    * External IDs can be 47-character NiMMbus internal identifiers or JSON with `code` and `codeSpace` attributes.
    * 3 different delimiters can be applied to the list:
      * `,` returns n feedback summaries, one for each externalIds indicated on the list.
      * `|` returns a single summary of those feedback items pointing to each one of the externalIds indicated on the list.
      * `^` returns a single summary of those feedback items pointing at the same time to all the externalIds indicated on the list (feedback with multiple target).
    * Examples:
      * `externalIds=0Y750T3K6H9NYK40Z762235DA9AJ9034102HM2E85B0R8QE|4Z5ZMFM3T8O2VDJ60CY5B7BI8J0616T9L684163T7SDO9WY`
      * `externalIds={"code":"DonanaDTM","codeSpace":"http://maps.ecopotential-project.eu/cgi-bin/MiraMon.cgi"},{"code":"BayerischerWaldSnowCoverDuration","codeSpace":"http://maps.ecopotential-project.eu/cgi-bin/MiraMon.cgi"}`
  * `bbox`= 
    * Selects features with geometries intersecting the bounding box. Features without spatial geometry are also included.
    * Coordinate reference system: WGS84 longitude/latitude (http://www.opengis.net/def/crs/OGC/1.3/CRS84).
    * Bounding box format: four or six numbers, depending on whether it includes vertical coordinates.
    * Example: `bbox=-6.6, -6.5, 37.00, 37.40`
  * `excludeItemsWithoutBbox`= (true, false)
    * Filters items when a bounding box is specified. If `excludeItemsWithoutBbox` is TRUE, only features with a defined geometry are selected.
  * `datetime`=
    * Selects items with temporal properties that intersect the specified date or interval. Follows RFC 3339 for date-time formats.
    * Examples:
      * A date-time: `"2018-02-12T23:20:50Z"`
      * A closed interval: `"2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"`
      * Open intervals: `"2018-02-12T00:00:00Z/.."` or `"../2018-03-18T12:31:12Z"`







