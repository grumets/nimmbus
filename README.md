# NiMMbus
The OGC Geospatial User Feedback (GUF) implementation is developed by the MiraMon team of the Grumets research group in the Universitat Autònoma de Barcelona and in CREAF.

NiMMbus (https://www.nimmbus.cat/) is a solution for storing geospatial resources on the MiraMon cloud. The system implements the Geospatial User Feedback standard (http://www.opengeospatial.org/standards/guf) originated in the EU FP7 GeoViQua project. It allows to provide comments, ratings, questions, etc that can be associated with geospatial assets on a catalogue using a data/metadata identifier. The contribution of the H2020 NextGEOSS project was to extend the initial implementation of NiMMbus to support Geospatial User Feedback (GUF) resources. The system allows for creating a citation of an external resource (pointing to an external catalogue or repository) and associate feedback items to it. Currently GUF is being extended through the H2020 Eiffel project which contribution is to extend quality elements to capture quality metadata in climate change scenarios, as well as to extend GUF features to store and share knowledge elements.

Materials:
  * the open source [code of the client](client_js)
  * the [API documentation](API) to interact with the server
  * instructions on [how to integrate](GUF_integration) this system in existing metadata catalogues

Several integrations have been illustrated in [www.eneon.org](ENEON graph), the INSPIRE catalogue, GEO-DAB API test instance, [maps.ecopotential-project.eu](ECOPotential maps browser), [https://geoessential.unepgrid.ch/portal/sdg15_3_1.html](GeoEssential dashboard for SDG15.3.1 indicator Land Degradation), etc.

```
The NextGEOSS project has received funding from the European Union Horizon 2020 research and innovation programme
under grant agreements No 730329 - NextGEOSS and No 101003518 - EIFFEL.
This documentation and implementation reflects only the author's view and the Agency is not
responsible for any use that may be made of the information it contains.
```

## Other geospatial user feedback initiatives
  * [This is the Geospatial User Feedback (GUF) schema plugin for GeoNetwork 3.2.x or greater version](https://github.com//metadata101/guf10).
