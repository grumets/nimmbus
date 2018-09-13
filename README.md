# NiMMbus
The OGC Geospatial User Feedback (GUF) implementation of the H2020 NextGEOSS project is developed by the MiraMon team of the Grumets research group in the Universistat Aut�noma de Barcelona and the CREAF.

NiMMbus (http://www.opengis.uab.cat/nimmbus) is a solution for storing geospatial resources on the MiraMon cloud. The system implements the Geospatial User Feedback standard (http://www.opengeospatial.org/standards/guf) originated in the EU FP7 GeoViQua project. It allows to provide comments, ratings, questions, etc that can be associated with geospatial assets on a catalogue using a data/metadata identifier. The contribution of the H2020 NextGEOSS project is to extend the initial implemention of NiMMbus to support GUF resources. The system allows for creating a citation of an external resource (pointing to a external catalogue or repository) and associate feedback items to it. 

Materials:
  * the open source [code of the client](client_js)
  * the [API documentation](API) to interact with the server
  * some intructions on [how to integrate](GUF_integration) this system in existing metadata catalogues.
  
Several integrations have been illustrated in [www.eneon.org](ENEON graph), the INSPIRE catalogue, GEO-DAB API test instance, [maps.ecopotential-project.eu](ECOPotential maps browser), etc. 

```
This project has received funding from the European Union’s Horizon 2020 research and innovation programme  under grant agreement No 730329. 
This documentation and implementation reflects only the author's view wand the Agency is not responsible for any use that may be made of the information it contains. 
```

## Other geospatial user feedback initiatives
  * [This is the Geospatial User Feedback (GUF) schema plugin for GeoNetwork 3.2.x or greater version](https://github.com//metadata101/guf10).
