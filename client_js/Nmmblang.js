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

var LanguagesNB=["cat","spa","eng"];
var ActiveLanguage=2;
var Terms_and_Privacy_Last_Updated="15-03-2021";

//Global message variables start by "Msg_" 
var Msg_NiMMbus={cat: "NiMMbus", spa: "NiMMbus", eng: "NiMMbus"};
var Msg_Welcome_NiMMbus={cat: "Benvinguts al NiMMbus", spa: "Bienvenidos al NiMMbus", eng: "Welcome to NiMMbus"};
var Msg_EO_everywhere_Share={cat: "La observació de la terra a tot arreu. Comparteix informació i valoracions amb altres.", spa: "La observación de la tierra en todas partes. Comparte información y valoraciones con los demás.", eng: "Earth observation everywhere. Share information and feedback with others."};
var Msg_Exit_NiMMbus_Question={cat: "Realment vols sortir del NiMMbus? (Les accions no guardades es perdran)", spa: "¿Realmente desea salir de NiMMbus? (La acciones no guardadas se perderán)", eng: "Do you really want to exit NiMMbus? (The unsaved actions will be lost)"};
var Msg_cannot_be_blank={cat: "no pot ser buit.", spa: "no puede estar vacio.", eng: "cannot be blank."};
var Msg_Revalidating_authentication={cat: "Revalidant l'autentificació en", spa: "Revalidando la autentificación en", eng: "Revalidating authentication in"};
var Msg_seconds={cat: "segons", spa: "segundos", eng: "seconds"};
var Msg_Unsupported_language={cat: "Idioma no suportat", spa: "Idioma no soportado", eng: "Unsupported language"};
var Msg_Language_changed_preferences={cat: "Idioma canviat a preferències de l'usuari.", spa: "Idioma cambiado según preferencias del usuario.", eng: "Language changed according to user preferences."}
var Msg_Unidentified_key={cat: "Clau no identificada", spa: "Clave no identificada", eng: "Unidentified key"};
var Msg_Unidentified_page={cat: "Plana no identificada", spa: "Página no identificada", eng: "Unidentified page name"};
var Msg_Valid_token_required={cat: "És necessari tenir un passi vàlid.", spa: "Es necesario tener un pase válido.", eng: "Valid token required."};
var Msg_TARGET_TILE_and_CODE_needed={cat: "És necessari indicar TARGET_TITLE= i TARGET_CODE=.", spa: "Es necesario indicar TARGET_TITLE= i TARGET_CODE=.", eng: "TARGET_TITLE= and TARGET_CODE= should be provided."};
var Msg_Server_answer_cannot_be_shown={cat: "El servidor ha respost però no és possible mostrar el resultat en aquest navegador.", spa: "El servidor ha respondido pero no es posible mostrar el resultado en este navegador.", eng: "The server responded but it is not possible to show the result on this browser."};
var Msg_Server_answer_cannot_be_identified={cat: "El servidor ha respost però no puc identificar la seva resposta.", spa: "El servidor ha respondido pero no puedo identificar su respuesta.", eng: "The server responded but it cannot be identified correctly."};
var Msg_Ok={cat: "Tot bé", spa: "Todo correcto", eng: "Ok!"};
var Msg_Available_={cat: "Disponible!", spa: "¡Disponible!", eng: "Available!"};
var Msg_Done={cat: "Fet", spa: "Hecho", eng: "Done"};
var Msg_Error_without_description={cat: "Error sense descripció. Codi", spa: "Error sin descripción. Código", eng: "Error without description. Code"};
var Msg_Failure_loading_Google_libraries={cat: "Error en carregar les llibreries de les comptes de Google", spa: "Error al cargar las librerías de las cuentas de Google", eng: "Failure loading Google account libraries"};
var Msg_LandSense_login_failed={cat: "Error o cancel·lació de la identificació amb el compte de LandSense", spa: "Error o cancelación de la identificación en la cuenta de LandSense", eng: "Login in your LandSense account failed or cancelled"};
var Msg_NextGEOSS_login_failed={cat: "Error o cancel·lació de la identificació amb el compte de NextGEOSS", spa: "Error o cancelación de la identificación en la cuenta de NextGEOSS", eng: "Login in your NextGEOSS account failed or cancelled"};
var Msg_Google_login_failed={cat: "Error o cancel·lació de la identificació amb el compte de Google", spa: "Error o cancelación de la identificación en la cuenta de Google", eng: "Login in your Google account failed or cancelled"};
var Msg_Google_Account_info_not_retrieved={cat: "No puc obtenir la informació sobre l'usuari del compte de Google", spa: "No puedo obtener la información sobre el usuario la cuenta de Google", eng: "The user information of the Google Account cannot be retrieved"};
var Msg_Requesting_data_={cat: "Demanant dades...", spa: "Pidiendo datos...", eng: "Requesting data..."};
var Msg_Requesting_resource_list_={cat: "Demanant llista de recursos...", spa: "Pidiendo lista de recursos...", eng: "Requesting resource list..."};
var Msg_Message_sent={cat: "Missatge enviat", spa: "Mensaje enviado", eng: "Message sent"};
var Msg_Resource_sent={cat: "Recurs enviat", spa: "Recurso enviado", eng: "Resource sent"};
var Msg_Modifications_sent={cat: "Modificacions enviades", spa: "Modificaciones enviadas", eng: "Modifications sent"};
var Msg_Request_sent={cat: "Petició enviada", spa: "Petición enviada", eng: "Request sent"};
var Msg_Changes_sent={cat: "Canvis enviats", spa: "Cambios enviados", eng: "Changes sent"};
var Msg_Role={cat: "Rol", spa: "Rol", eng: "Role"};
var Msg_of={cat: "de", spa: "de", eng: "of"};
var Msg_Create={cat: "Crear", spa: "Crear", eng: "Create"};
//var Msg_Add={cat: "Afegir", spa: "Añadir", eng: "Add"}; --> l_msg_Add
var Msg_Adding_={cat: "Afegint...", spa: "Añadiendo...", eng: "Adding..."};
var Msg_Added={cat: "Afegit", spa: "Añadido", eng: "Added"};
var Msg_Delete={cat: "Eliminar", spa: "Eliminar", eng: "Delete"};
var Msg_Deleting_={cat: "Eliminant...", spa: "Eliminando...", eng: "Deleting..."};
var Msg_Deleted={cat: "Eliminat", spa: "Eliminado", eng: "Deleted"};
var Msg_Cancel={cat: "Cancel·lar", spa: "Cancelar", eng: "Cancel"};
var Msg_Edit={cat: "Editar", spa: "Editar", eng: "Edit"};
var Msg_Requesting_={cat: "Sol·licitant...", spa: "Solicitando...", eng: "Requesting..."};
var Msg_Searching_={cat: "Cercant...", spa: "Buscando...", eng: "Searching..."};
var Msg_Changing_={cat: "Canviant...", spa: "Cambiando...", eng: "Changing..."};
var Msg_Read={cat: "Llegir", spa: "Leer", eng: "Read"};
var Msg_Write={cat: "Escriure", spa: "Escribir", eng: "Write"};
var Msg_Checking={cat: "Comprovant...", spa: "Comprobando...", eng: "Checking..."};
var Msg_Share={cat: "Compartir", spa: "Compartir", eng: "Share"};
var Msg_Tag={cat: "Etiquetar", spa: "Etiquetar", eng: "Tag"};
var Msg_Save_changes={cat: "Guardar canvis", spa: "Guardar cambios", eng: "Save changes"};
var Msg_Exit_without_saving_changes={cat: "Vol sortir sense guardar?", spa: "¿Desea salir sin guardar?", eng: "Do you want to exit without saving changes?"};
var Msg_Owner={cat: "Propietari", spa: "Propietario", eng: "Owner"};
var Msg_Today={cat: "Avui", spa: "Hoy", eng: "Today"};

var Msg_Sure_completely_delete_={cat: "Estàs segur que vols eliminar del tot ", spa: "¿Está seguro que desea eliminar completamente ", eng: "Are you sure that you want to completely delete "};
var Msg_this_Hyperlink={cat: "aquest hiperenllaç", spa: "este hiperenlace", eng: "this hyperlink"};
var Msg_this_PoI={cat: "aquest punt d'interès", spa: "este punto de interés", eng: "this point of interest"};
var Msg_this_feedback_item={cat: "aquesta valoració", spa: "esta valoración", eng: "this feedback item"};
var Msg_this_citation={cat: "aquesta citació", spa: "esta citación", eng: "this citation"};
var Msg_this_publication={cat: "aquesta publicació", spa: "esta publicación", eng: "this publication"};
var Msg_this_individual={cat: "aquest individu", spa: "este individuo", eng: "this individual"};
var Msg_this_organism={cat: "aquest organisme", spa: "este organismo", eng: "this organism"};
var Msg_Hyperlink_deleted={cat: "Hiperenllaç esborrat", spa: "Hiperenlace eliminado", eng: "Hyperlink deleted"};
var Msg_PoI_deleted={cat: "Punt d'interès esborrat", spa: "Punto de interés eliminado", eng: "Point of interest deleted"};
var Msg_Feedback_deleted={cat: "Valoració esborrada", spa: "Valoración eliminada", eng: "Feedback deleted"};
var Msg_Citation_deteled={cat: "Citació esborrada", spa: "Citación eliminada", eng: "Citation deleted"};
var Msg_Publication_deteled={cat: "Publicació esborrada", spa: "Publicación eliminada", eng: "Publication deleted"};
var Msg_Individual_deteled={cat: "Individu esborrat", spa: "Individuo eliminado", eng: "Individual deleted"};
var Msg_Organism_deteled={cat: "Organisme esborrat", spa: "Organismo eliminado", eng: "Organism deleted"};

var Msg_Use_New_button_to_create_resources={cat: "Useu els botons sota \"Crear recursos\" per crear-ne", spa: "Use los botones debajo de \"Crear recursos\" para crearlos", eng: "Use the buttons below \"Create resources\" to create them"};
var Msg_Cannot_found_resource_identifier={cat: "Identificador de recurs no trobat.", spa: "Identificador de recurso no encontrado.", eng: "Cannot found resource identifier."};
//var Msg_Resource_type_={cat: "Tipus de recurs_", spa: "Tipo de recurso:", eng: "Resource type:"};
var Msg_Unsupported_resource_type={cat: "Tipus de recurs no suportat", spa: "Tipo de recurso no soportado.", eng: "Unsupported resource type"};
var Msg_Unidentified_resource_type={cat: "Tipus de recurs no identificat", spa: "Tipo de recurso no identificado", eng: "Unidentified resource type"};

var Msg_Hyperlink={cat: "Hiperenllaç", spa: "Hiperenlace", eng: "Hyperlink"};
var Msg_Modify_hyperlink_characteristics={cat: "Modifica les característiques d'aquest hiperenllaç", spa: "Modifica las características de este hiperenlace", eng: "Modify the characteristics of this Hyperlink"};
var Msg_New_Hyperlink={cat: "Nou hiperenllaç", spa: "Nuevo hiperenlace", eng: "New Hyperlink"};
var Msg_Define_hyperlink_characteristics={cat: "Introdueix les característiques d'aquest hiperenllaç", spa: "Introduce las características de este hiperenlace", eng: "Define the characteristics of this Hyperlink"};
var Msg_Hyperlink_detailed_description_no_modification={cat: "Descripció detallada d'aquest hiperenllaç (no tens drets de modificació)", spa: "Descripción detallada de este hiperenlace (no tiene derechos de modificación)", eng: "Detailed description of this Hyperlink (you do not have modification rights)"};

var Msg_PoI={cat: "Punt d'interès", spa: "Punto de interés", eng: "Point of interest"};
var Msg_Modify_PoI_characteristics={cat: "Modifica les característiques d'aquest punt", spa: "Modifica las características de este punto", eng: "Modify the characteristics of this point"};
var Msg_New_PoI={cat: "Nou punt d'interès", spa: "Nuevo punto de interés", eng: "New point of interest"};
var Msg_Define_PoI_characteristics={cat: "Introdueix les característiques d'aquest punt", spa: "Introduce las características de este punto", eng: "Define the characteristics of this point"};
var Msg_PoI_detailed_description_no_modification={cat: "Descripció detallada d'aquest punt d'interès (no tens drets de modificació)", spa: "Descripción detallada de este punto de interés (no tiene derechos de modificación)", eng: "Detailed description of this point of interest (you do not have modification rights)"};

var Msg_Feedback={cat: "Valoració", spa: "Valoración", eng: "Feedback"};
var Msg_Modify_feedback_characteristics={cat: "Modifica les característiques d'aquesta valoració", spa: "Modifica las características de esta valoración", eng: "Modify the characteristics of this feedback"};
var Msg_New_feedback={cat: "Nova valoració", spa: "Nueva valoración", eng: "New feedback"};
var Msg_Define_feedback_characteristics={cat: "Introdueix les característiques d'aquesta valoració", spa: "Introduce las características de esta valoración", eng: "Define the characteristics of this feedback"};
var Msg_FB_item_detailed_description_no_modification={cat: "Descripció detallada d'aquesta valoració (no tens drets de modificació)", spa: "Descripción detallada de esta valoración (no tiene derechos de modificación)", eng: "Detailed description of this feedback (you do not have modification rights)"};

var Msg_Targeted_resources={cat: "Recursos valorats", spa: "Recursos valorados", eng: "Targeted resources"};
var Msg_List_available_resources_as_targets={cat: "Llista de recursos disponibles com a objecte de la valoració", spa: "Lista de recursos disponibles como objeto de la valoración", eng: "List of available resources as feedback target"};
var Msg_Resource_already_targeted={cat: "Recurs actualment ja valorat en aquesta valoració.", spa: "Recurso actualmente ya valorado en esta valoración.", eng: "Resource already targeted in this feedback item."};
var Msg_Resource_is_a_target={cat: "Recurs valorat en aquesta valoració.", spa: "Recurso valorado en esta valoración.", eng: "Resource targeted in this feedback item."};
var Msg_Cant_be_selected={cat: "No pot ser seleccionat", spa: "No puede ser seleccionado", eng: "Cannot be selected"};
var Msg_Feedback_item_selecting_targets_for={cat: "Aquesta és la pròpia valoració per la que estàs escollint recursos a valorar.", spa: "Esta es la propia valoración para la que estás escogiendo recursos a valorar.", eng: "This is the feedback item you are selecting targets for."};

var Msg_List_available_publications={cat: "Llista de publicacions disponibles", spa: "Lista de publicacions disponibles", eng: "List of available publications"};
var Msg_Publication_already_related={cat: "Publicació actualment ja relacionada amb aquesta valoració.", spa: "Publicación actualmente ya relacionada con esta valoración.", eng: "Publication already related with this feedback item."};
var Msg_Related_Publications={cat: "Publicació(ns) relacionades amb el recurs valorat", spa: "Publicación(es) relacionadas con el recurso valorado", eng: "Publication(s) related to the evaluated resource"};
var Msg_Reference_documents={cat: "Document(s) de referencia que exposa el problema", spa: "Documento(s) de referencia que expone el problema", eng: "Reference document(s) that exposes the issue"};

var Msg_List_available_citations={cat: "Llista de citacions disponibles", spa: "Lista de citations disponibles", eng: "List of available citations"};
var Msg_Citation_already_related={cat: "Citació actualment ja relacionada amb aquesta valoració.", spa: "Citación actualmente ya relacionada con esta valoración.", eng: "Citation already related with this feedback item."};
var Msg_Fixed_Resource={cat: "Nova versió del recurs(os) valorat(s) amb el problema descobert solucionat", spa: "Nueva versión del recurso(s) valorado(s) con el problema descubierto solucionado", eng: "New version of the target resource(s) with the known problem fixed"};
var Msg_Alternative_Resource={cat: "Recurs(os) alternatiu(s) que es poden usar enlloc del recurs(os) valorat(s) i que no presenten el problema descobert", spa: "Recurso(s) alternativos que se pueden usar en lugar del recurso(s) valorado(s) y que no presentan el problema descubierto", eng: "Alternative resource(s) thath can be used instead of the target resource(s) and does not present the known problem"};
var Msg_Additional_documentation={cat: "Documentació addicional que descriu l'ús del(s) recurs(os) valorats", spa: "Documentación adicional que describe el uso del recurso(s) valorado(s)", eng: "Additional documentation describing the usage of the target resource(s)"};

var Msg_Target_without_NiMMbus_id={cat: "Un dels recursos valorats no té identificador de recurs de NiMMbus.", spa: "Uno de los recursos valorador no tiene identificador de recurso de NiMMbus.", eng: "One of target resources in this feedback does not have NiMMbus resource identifier."};
var Msg_Public_without_NiMMbus_id={cat: "Una de les publicacions no té identificador de recurs de NiMMbus.", spa: "Una de las publicaciones no tiene identificador de recurso de NiMMbus.", eng: "One of the publications does not have NiMMbus resource identifier."};
var Msg_RefDoc_without_NiMMbus_id={cat: "Un del documents de referència no té identificador de recurs de NiMMbus.", spa: "Uno de los documentos de referencia no tiene identificador de recurso de NiMMbus.", eng: "One of the reference documents does not have NiMMbus resource identifier."};
var Msg_AddDoc_without_NiMMbus_id={cat: "Un del documents addicionals no té identificador de recurs de NiMMbus.", spa: "Uno de los documentos addicionales no tiene identificador de recurso de NiMMbus.", eng: "One of the additional documents does not have NiMMbus resource identifier."};
var Msg_FixRsrc_without_NiMMbus_id={cat: "Un del recursos solucionats no té identificador de recurs de NiMMbus.", spa: "Uno de los recursos solucionados no tiene identificador de recurso de NiMMbus.", eng: "One of the fixed resources does not have NiMMbus resource identifier."};
var Msg_AltRsrc_without_NiMMbus_id={cat: "Un del recursos alternatius no té identificador de recurs de NiMMbus.", spa: "Uno de los recursos alternativos no tiene identificador de recurso de NiMMbus.", eng: "One of the alternative resources does not have NiMMbus resource identifier."};

var Msg_report_aspect_info={cat: "Depenent de quin siguin els <b>aspectes reportats</b>, caldrà documentar uns o altres elements a sota:."+
	"<br><u>Ús</u>: Descripció de l'ús del recurs objectiu de la valoració. Com a mínim cal definir algun element de la 'Descripció de l'ús'."+
	"<br><u>Adequació a un propòsit</u>: Descripció de l'ús del recurs objectiu de la valoració que era apropiat per a un propòsit previst. Com a mínim cal definir algun element de la 'Descripció de l'ús'."+
	"<br><u>Limitació</u>: Descripció d'una limitació del recurs objectiu de la valoració. Com a mínim cal definir alguna 'Limitacions determinades per l'usuari' dins la 'Descripció de l'ús'."+
	"<br><u>Alternativa</u>: Ruta alternativa que ajuda a evitar un problema o una limitació. Com a mínim cal definir una 'Solució' o un 'Recurs alternatiu' dins el 'Problema descobert'."+
	"<br><u>Problema</u>: Informe d'un problema. Com a mínim cal definir algun element del 'Problema descobert'.",
	spa: "Dependiendo de cuales sean los <b>aspectos reportados</b>, se deberán documentar unos u otros elementos debajo:"+
	"<br><u>Uso</u>: Descripción del uso del recurso objetivo de la valoración. Como mínimo se debe definir algún elemento de la 'Descripción del uso'."+
	"<br><u>Adecuación a un propósito</u>: Descripción del uso del recurso objetivo de la valoración que es apropiado para un propósito previsto. Como mínimo se debe definir algún elemento de la 'Descripción del uso'."+
	"<br><u>Limitación</u>: Descripción de una limitación del recurso objetivo de la valoración. Como mínimo se debe definir alguna 'Limitaciones determinadas por el usuario' dentro de la 'Descripción del uso'."+
	"<br><u>Alternativa</u>: Ruta alternativa que ayuda a evitar un problema o una limitación. Como mínimo se debe definir una 'Solución' o un 'Recurso alternativo' dentro del 'Problema descubierto'." +
	"<br><u>Problema</u>: Informe de un problema. Como mínimo se debe definir algún elemento del 'Problema descubierto'.",
	eng: "Depending on which <b>report aspects</b> have been selected, some elements below or others should be described:"+	
	"<br><u>Usage</u>: Description of a usage of the target resource. At least one element on 'Usage description' should be defined."+
	"<br><u>Fitness for purpose</u>: Description of a usage of the target resource that was appropriated for the intended purpose. At least one element on 'Usage description' should be defined."+
	"<br><u>Limitation</u>: Description of a limitation of the target resource. At least one 'User determined limitations' in 'Usage description' should be defined."+
	"<br><u>Alternative</u>: Alternative route that helps to avoid a problem or a limitation. At least one 'Work around' or one 'Alternative resource' should be defined."+
	"<br><u>Problem</u>: A report of a problem or an issue. At least one 'Discovered issue' should be described."};

var Msg_Citation={cat: "Citació", spa: "Citación", eng: "Citation"};
var Msg_Modify_citation_characteristics={cat: "Modifica les característiques d'aquesta citació", spa: "Modifica las características de esta citación", eng: "Modify the characteristics of this citation"};
var Msg_New_citation={cat: "Nova citació", spa: "Nueva citación", eng: "New citation"};
var Msg_Define_citation_characteristics={cat: "Introdueix les característiques d'aquesta citació", spa: "Introduce las características de esta citación", eng: "Define the characteristics of this citation"};
var Msg_Related_responsibles={cat: "Responsables relacionats", spa: "Responsables relacionados", eng: "Related responsible parties"};
var Msg_List_available_responsibles={cat: "Llista de responsables disponibles", spa: "Lista de reponsables disponibles", eng: "List of available responsible parties"};
var Msg_Responsible_already_related={cat: "Responsable actualment ja seleccionat.", spa: "Responsable actualmente ya seleccionado.", eng: "Responsible party already selected."};
var Msg_Responsible_without_NiMMbus_id={cat: "Un del responsables no té identificador de recurs de NiMMbus.", spa: "Uno de los responsables no tiene identificador de recurso de NiMMbus.", eng: "One of the responsible parties does not have NiMMbus resource identifier."};

var Msg_Citation_sent={cat: "Citació enviada", spa: "Citación enviada", eng: "Citation sent"};
var Msg_Citation_created={cat: "Citació creada", spa: "Citación creada", eng: "Citation created"};
var Msg_Citation_detailed_description_no_modification={cat: "Descripció detallada d'aquesta citació (no tens drets de modificació)", spa: "Descripción detallada de esta citación (no tiene derechos de modificación)", eng: "Detailed description of this citation (you do not have modification rights)"};

var Msg_Publication={cat: "Publicació", spa: "Publicación", eng: "Publication"};
var Msg_Modify_publication_characteristics={cat: "Modifica les característiques d'aquesta publicació", spa: "Modifica las características de esta publicación", eng: "Modify the characteristics of this publication"};
var Msg_New_publication={cat: "Nova publicació", spa: "Nueva publicación", eng: "New publication"};
var Msg_Define_publication_characteristics={cat: "Introdueix les característiques d'aquesta publicació", spa: "Introduce las características de esta publicación", eng: "Define the characteristics of this publication"};
var Msg_Publication_detailed_description_no_modification={cat: "Descripció detallada d'aquesta publicació (no tens drets de modificació)", spa: "Descripción detallada de esta publicación (no tiene derechos de modificación)", eng: "Detailed description of this publication (you do not have modification rights)"};

var Msg_Individual={cat: "Individu", spa: "Individuo", eng: "Individual"};
var Msg_Modify_individual_characteristics={cat: "Modifica les característiques d'aquest individu", spa: "Modifica las características de este individuo", eng: "Modify the characteristics of this individual"};
var Msg_New_individual={cat: "Nou individu", spa: "Nuevo individuo", eng: "New individual"};
var Msg_Define_individual_characteristics={cat: "Introdueix les característiques d'aquest individu", spa: "Introduce las características de este individuo", eng: "Define the characteristics of this individual"};
var Msg_Individual_detailed_description_no_modification={cat: "Descripció detallada d'aquest individu (no tens drets de modificació)", spa: "Descripción detallada de este individuo (no tiene derechos de modificación)", eng: "Detailed description of this individual (you do not have modification rights)"};

var Msg_Organism={cat: "Organisme", spa: "Organismo", eng: "Organism"};
var Msg_Modify_organism_characteristics={cat: "Modifica les característiques d'aquest organisme", spa: "Modifica las características de este organismo", eng: "Modify the characteristics of this organism"};
var Msg_New_organism={cat: "Nou organisme", spa: "Nuevo organismo", eng: "New organism"};
var Msg_Define_organism_characteristics={cat: "Introdueix les característiques d'aquest organisme", spa: "Introduce las características de este organismo", eng: "Define the characteristics of this organism"};
var Msg_Organism_detailed_description_no_modification={cat: "Descripció detallada d'aquest organisme (no tens drets de modificació)", spa: "Descripción detallada de este organismo (no tiene derechos de modificación)", eng: "Detailed description of this organism (you do not have modification rights)"};

var Msg_Accuracy={cat: "Exactitud", spa: "Exactitud", eng: "Accuracy"};
var Msg_Got_it_at={cat: "Obtinguda a les", spa: "Obtenida a las", eng: "Got it at"};
var Msg_Speed={cat: "Velocitat", spa: "Velocidad", eng: "Speed"};
var Msg_Heading={cat: "Direcció", spa: "Dirección", eng: "Heading"};
var Msg_Geolocation_denied={cat: "L'usuari ha denegat la petició de geolocalització.", spa: "El usuario ha denegado la petición de geolocalización.", eng: "User denied the request for Geolocation."};
var Msg_Geolocation_unavailable={cat: "La informació de geolocalització no està disponible.", spa: "La información de geolocalización no está disponible", eng: "Location information is unavailable."};
var Msg_Geolocation_timed_out={cat: "La petició per obtenir la geolocalització ha caducat.", spa: "La petición para obtener la geolocalización ha caducado.", eng: "The request to get user location timed out."};
var Msg_Geolocation_unkown_error={cat: "Error desconegut en la geolocalització.", spa: "Error desconocido en la geolocalización.", eng: "Unknown error occurred in geolocation."};
var Msg_Geolocation_trying={cat: "Intentant obtenint la informació de geolocalització", spa: "Intentando obtener la información de geolocalización", eng: "Trying to get the geolocation information"};
var Msg_Trying_get_more_accuracy={cat: "Intentant obtenint més exactitud", spa: "Intentando obtener más exactitud", eng: "Trying to get more accuracy"};
var Msg_Geolocation_not_supported={cat: "La geolocalització des del dispositiu no està suportada en aquest navegador d'Internet", spa: "La geolocalización desde el dispositivo no está suportada en este navegador de Internet", eng: "Geolocation is not supported by this Internet browser"};

var Msg_Myself={cat: "Jo mateix", spa: "Yo mismo", eng: "Myself"};
//var Msg_Pwd={cat: "Contrasenya", spa: "Contraseña", eng: "Password"}; --> l_msg_Pwd
//var Msg_New_Pwd={cat: "Contrasenya nova", spa: "Contraseña nueva", eng: "New password"}; --> l_msg_New_Pwd
var Msg_Current_pwd_not_match_provided={cat: "La teva contrasenya actual no coincideix amb la que has indicat.", spa: "Su contraseña actual no coincide con la que ha indicado.", eng: "Your current password does not match with the one provided."};
var Msg_New_pwd_not_match_validation={cat: "La nova contrasenya no coincideix amb la de validació.", spa: "Su nueva contraseña no coincide con la de validación.", eng: "Your new password does not match with the validation one."};
var Msg_Strong={cat: "Robusta", spa: "Robusta", eng: "Strong"};
var Msg_Medium={cat: "Robustesa mitjana", spa: "Robustez media", eng: "Medium"};
var Msg_Weak={cat: "Fràgil", spa: "Frágil", eng: "Weak"};
var Msg_Cannot_contain_username={cat: "No pot contenir el nom d'usuari", spa: "No puede contener el nombre de usuario", eng: "Cannot contain the user name"};
var Msg_Pwd_verification_error={cat: "Error de verificació de contrasenya", spa: "Error de verificación de contraseña", eng: "Password verification error"};
var Msg_Wrong_pwd={cat: "Contrasenya incorrecta", spa: "Contraseña incorrecta!", eng: "Wrong password"};
var Msg_Too_short={cat: "Massa curta", spa: "Demasiado corta", eng: "Too short"};
var Msg_Username_cannot_be_blank={cat: "El nom d'usuari no pot ser buit", spa: "El nombre de usuario no puede ser blanco", eng: "Username cannot be blank"};
var Msg_Username_is_what_you_have={cat: "El nom d'usuari és el que ja tens", spa: "El nombre de usuario es el que ya tiene", eng: "Username is what you already have"};
var Msg_Username_already_taken={cat: "El nom d'usuari ha estat reservat per altres", spa: "El nombre de usuario ha sido reservado por otros", eng: "Username has already been taken"};
//var Msg_Email={cat: "Correu electrònic", spa: "Correo electrónico", eng: "Email"}; --> l_msg_Email

var Msg_NiMMbus_login={cat: "Identificació al NiMMbus", spa: "Identificación en NiMMbus", eng: "NiMMbus login"};
var Msg_NiMMbus_reset_pwd={cat: "Reestabliment de contrasenya de NiMMbus", spa: "Reestablecimiento de contraseña de NiMMbus", eng: "NiMMbus reset password"}; 
var Msg_SignUp_NiMMbus={cat: "Registra't al NiMMbus", spa: "Regístrese en NiMMbus", eng: "Sign up for NiMMbus"};
var Msg_NiMMbus_account={cat: "Compte de NiMMbus", spa: "Cuenta de NiMMbus", eng: "NiMMbus account"};
var Msg_NiMMbus_Href={cat: "NiMMbus: Hiperenllaç", spa: "NiMMbus: Hiperenlace", eng: "NiMMbus: Hyperlink"};
var Msg_NiMMbus_PoI={cat: "NiMMbus: Punt d'interès", spa: "NiMMbus: Punto de Interés", eng: "NiMMbus: Point of Interest"};
var Msg_NiMMbus_Feedback={cat: "NiMMbus: Valoració", spa: "NiMMbus: Valoración", eng: "NiMMbus: Feedback"};
var Msg_NiMMbus_Citation={cat: "NiMMbus: Citació", spa: "NiMMbus: Citación", eng: "NiMMbus: Citation"};
var Msg_NiMMbus_Publication={cat: "NiMMbus: Publicació", spa: "NiMMbus: Publicación", eng: "NiMMbus: Publication"};
var Msg_NiMMbus_Individual={cat: "NiMMbus: Individu", spa: "NiMMbus: Individuo", eng: "NiMMbus: Individual"};
var Msg_NiMMbus_Organism={cat: "NiMMbus: Organisme", spa: "NiMMbus: Organismo", eng: "NiMMbus: Organism"};
var Msg_NiMMbus_Resources={cat: "NiMMbus: Recursos", spa: "NiMMbus: Recursos", eng: "NiMMbus: Resources"};
var Msg_NiMMbus_ResourcesSelector={cat: "NiMMbus: Selector de recursos", spa: "NiMMbus: Selector de recursos", eng: "NiMMbus: Resource selector"};
var Msg_NiMMbus_Feedbacks={cat: "NiMMbus: Valoracions", spa: "NiMMbus: Valoraciones", eng: "NiMMbus: Feedbacks"};
var Msg_NiMMbus_Share={cat: "NiMMbus: Compartir", spa: "NiMMbus: Compartir", eng: "NiMMbus: Share"};
var Msg_Not_implemented_yet={cat: "Ho sentim, no implementat encara", spa: "Lo sentimos, no implementado aún", eng: "Sorry, not implemented yet"};


//Needed for Test_*.html
var Msg_NiMMbus_Test_Pages={cat: "Tests de NiMMbus", spa: "Tests de NiMMbus", eng: "NiMMbus test pages"};
var Msg_small_Lang={cat: "<small>Idioma:</small> Català", spa: "<small>Idioma:</small> Español", eng: "<small>Language:</small> English"};
var Msg_Title={cat: "Títol", spa: "Título", eng: "Title"};
var Msg_Identifier={cat: "Identificador", spa: "Identificador", eng: "Identifier"};
var Msg_Namespace={cat: "Espai de noms", spa: "Espacio de nombres", eng: "Namespace"};
var Msg_Terms_use={cat: "Condicions d'Ús", spa: "Condiciones de Uso", eng: "Terms of Use"};
var Msg_Privacy_Statement={cat: "Declaració de Privacitat", spa: "Declaración de Privacidad", eng: "Privacy Statement"};
var Msg_Access_Policy={cat: "Política d'accés", spa: "Política de acceso", eng: "Access Policy"};
var Msg_Last_Update={cat: "Darrera actualització", spa: "Última actualización", eng: "Last updated"};
var Msg_Mail_contacte={cat: "Contacte", spa: "Contacto", eng: "Contact"};

function DonaCadenaJSON(s)
{
	if (ActiveLanguage==0)
		return s.cat;
	else if (ActiveLanguage==1)
		return s.spa;
	else //if (ActiveLanguage==2)
		return s.eng;		
}

function GetActiveLanguageIndex(language)
{
	for (var i=0; i<LanguagesNB.length; i++)
	{
		if (LanguagesNB[i]==language)
			return i;
	}
	return -1;
}

function ChangeLanguage(lang, resources_per_page)
{
//Local message variables start by "l_msg_"
var l_msg_Username_or_email={cat: "Usuari o email", spa: "Usuario o email", eng: "Username or email"};
var l_msg_Pwd={cat: "Contrasenya", spa: "Contraseña", eng: "Password"};
var l_msg_New_to_NiMMbus_SignUp={cat: "Nou al NiMMbus? Registra't", spa: "Nuevo en NiMMbus? Regístrese", eng: "New to NiMMbus? Sign up"};
var l_msg_Username={cat: "Usuari", spa: "Usuario", eng: "Username"};
var l_msg_For_Email_Notificactions={cat: "Per a validacions i notificacions per email", spa: "Para validaciones y notificaciones por email", eng: "For email notifications and verifications"};
var l_msg_SignUp_for_NiMMbus={cat: "Registrar-se al NiMMbus", spa: "Registrarse en NiMMBus", eng: "Sign up for NiMMbus"};
var l_msg_Close_Sortir={cat: "Sortir", spa: "Salir", eng: "Close"};
var l_msg_Close_Tancar={cat: "Tancar", spa: "Cerrar", eng: "Close"};
var l_msg_Close_SignOut={cat: "Sortir", spa: "Salir", eng: "Sign out"};
var l_msg_All={cat: "Tots", spa: "Todos", eng: "All"};
var l_msg_Other={cat: "Altres", spa: "Otros", eng: "Other"};

var l_msg_Resources={cat: "Recursos:", spa: "Recursos:", eng: "Resources:"};
var l_msg_Owned_and_shared_with_me={cat: "Propis i compartits amb mi", spa: "Propios i compartidos conmigo", eng: "Owned and shared with me"};
var l_msg_Only_Owned={cat: "Només els propis", spa: "Sólo los propios", eng: "Only if owned"};
var l_msg_Only_Shared_me={cat: "Només els compartits amb mi", spa: "Sólo los compartidos conmigo", eng: "Only if shared with me"};
var l_msg_Only_Shared_everyone={cat: "Només els compartits amb tothom", spa: "Sólo los compartidos con todos", eng: "Only if shared with everyone"};
var l_msg_Share_to_everyone_for_reading={cat: "Compartir amb tothom per llegir", spa: "Compartir con todos para lectura", eng: "Share with everybody for reading"}

//var l_msg_Filter_by_type_={cat: "Filtrar per tipus:", spa: "Filtrar por tipo:", eng: "Filter by type:"};
//var l_msg_Filter_by_owner_={cat: "Filtrar per propietari:", spa: "Filtrar por propietario:", eng: "Filter by owner:"};
var l_msg_see_newer_resources={cat: "Veure recursos més nous", spa: "Ver recursos más nuevos", eng: "See newer resources"};
var l_msg_see_older_resources={cat: "Veure recursos més antics", spa: "Ver recursos más antiguos", eng: "See older resources"};
var l_msg_For_example_={cat: "Per exemple:", spa: "Por ejemplo:", eng: "For example:"};
var l_msg_Motivation={cat: "Motivació", spa: "Motivación", eng: "Motivation"};
var l_msg_Reason_why={cat: "Motiu pel qual el recurs resulta rellevant", spa: "Motivo por el cual el recurso resulta relevante", eng: "Reason why the resource is relevant"};
var l_msg_Discard={cat: "Descartar", spa: "Descartar", eng: "Discard"};
var l_msg_Add={cat: "Afegir", spa: "Añadir", eng: "Add"};
var l_msg_Select={cat: "Seleccionar", spa: "Seleccionar", eng: "Select"};
var l_msg_Abstract={cat: "Resum", spa: "Resumen", eng: "Abstract"};
var l_msg_Resource_Edition={cat: "Edició del recurs", spa: "Edición del recurso", eng: "Resource edition"};
var l_msg_Edition={cat: "Edició", spa: "Edición", eng: "Edition"};
var l_msg_Version_of_the_resource={cat: "Versió del recurs citat", spa: "Versión del recurso citado", eng: "Version of the cited resource"};
var l_msg_Edition_date={cat: "Data d'edició", spa: "Fecha de edición", eng: "Edition date"};
var l_msg_Date_of_edition={cat: "Data de l'edició", spa: "Fecha de la edición", eng: "Date of the edition"};
var l_msg_Code={cat: "Codi", spa: "Código", eng: "Code"};
var l_msg_resource_id_eg={cat: "Identificador del recurs. P. ex.:", spa: "Identificador del recurso. P. ej.:", eng: "Resource identifier. E.g.:"};
var l_msg_Namespace_where_id_unique_eg_={cat: "Espai de noms on l'identificador és únic. P. ex.:", spa: "Espacio de nombres donde el identificador es único. P. ej.:", eng: "Namespace where the identifier is unique. E.g.:"};
var l_msg_Series_which_resource_is_part_of={cat: "Sèrie de la que el recurs forma part", spa: "Serie de la cual el recurso forma parte", eng: "Series which the resource is part of"};
var l_msg_Responsible={cat: "Responsable(s)", spa: "Responsable(s)", eng: "Responsible party(s)"};
var l_msg_Select_responsible={cat: "Prem [Seleccionar] per a escollir un nou responsable.", spa: "Presione [Seleccionar] para escoger un nuevo responsable.", eng: "Press [Select] to choose a responsible party."};
var l_msg_responsible_not_open_data={cat: "indica que el responsable no està compartit amb tothom.", spa: "indica que el responsable no está compartido con todos.", eng: "indicates that the responsible party is not shared to everyone."};
var l_msg_Series_name={cat: "Nom de la sèrie", spa: "Nombre de la serie", eng: "Series name"};
var l_msg_Series_name_of_which_this_resource={cat: "Nom de la sèrie o del recurs agregat del qual aquest recurs forma part", spa: "Nombre de la serie o del recurso agregado del cual este recurso forma parte.", eng: "Name of the series, or aggregate resource, of which the resource is a part"};
var l_msg_Series_issue_id={cat: "Identificador de l'element de la sèrie", spa: "Identificador del elemento de la serie", eng: "Series issue identification"};
var l_msg_Id_of_the_issue_within_series={cat: "Identificador de l'element concret de la sèrie del qual aquest recurs forma part", spa: "Identificador del elemento concreto de la serie del cual este recurso forma parte", eng: "Identifier of the issue within the series of which the resource is part"};
var l_msg_Id_of_the_issue_within_series_eg_={cat: "Identificador de l'element concret de la sèrie del qual aquest recurs forma part. P. ex.:", spa: "Identificador del elemento concreto de la serie del cual este recurso forma parte. P. ej.:", eng: "Identifier of the issue within the series of which the resource is part. E.g.:"};
var l_msg_Pages_in_the_issue={cat: "Pàgines dins l'element de la sèrie", spa: "Páginas dentro del elemento de la serie", eng: "Pages in the series issue"};
var l_msg_Pages_resource_fills_in={cat: "Pàgines que ocupa el recurs en aquest element de la sèrie. P. ex.: 358-368", spa: "Páginas que ocupa el recurso en este elemento de la serie. P. ej.: 358-368", eng: "Pages that this resource fills in this series issue. E.g.: 358-368"};
var l_msg_Other_citation_details={cat: "Altres detalls de la citació", spa: "Otros detalles de la cita", eng: "Other citation details"};
var l_msg_Other_info_requiered_citation={cat: "Altra informació necessària per complementar la citació", spa: "Otra información necesaria para complementar la citación", eng: "Other information required to complete the citation"};
var l_msg_OnlineResource={cat: "Recurs en línia", spa: "Recurso en línea", eng: "Online resource"};
var l_msg_URL_link={cat: "Adreça URL", spa: "Dirección URL", eng: "URL Link"};
var l_msg_Online_resource_related_eg_={cat: "Recurs en línia relacionat amb l'element. P. ex.:", spa: "Recurso en línea relacionado con el elemento. P. ej.:", eng: "Online resource related to the element. E.g.:"};
var l_msg_URL_description={cat: "Descripció URL", spa: "Descripción URL", eng: "URL description"};
var l_msg_Detailed_description_onlineresource_eg_={cat: "Descripció detallada de què és o què fa el recurs en línia. P. ex.:", spa: "Descripción detallada de qué es o qué hace el recurso en línea. P. ej.", eng: "Detailed description of what the online resource is/does. E.g."};
var l_msg_URL_function={cat: "Funció URL", spa: "Función URL", eng: "URL Function"};  
var l_msg_URL_function_eg_={cat: "Funció del recurs en línia. P. ex.:", spa: "Función del recurso en línea. P. ex.:", eng: "Function of the link. E.g.:"};

var l_msg_Press_select_choose_citation={cat: "Prem [Seleccionar] per a escollir una nova cita.", spa: "Presione [Seleccionar] para escoger una nueva cita.", eng: "Press [Select] to choose a new citation."};
var l_msg_indicates_citation_not_shared={cat: "indica que la cita no està compartida amb tothom.", spa: "indica que la cita no está compartida con todos.", eng: "indicates that the citation is not shared to everyone."};
var l_msg_Press_select_choose_publication={cat: "Prem [Seleccionar] per a escollir una nova publicació.", spa: "Presione [Seleccionar] para escoger una nueva publicació.", eng: "Press [Select] to choose a new publication."};
var l_msg_indicates_publication_not_shared={cat: "indica que la publicació no està compartida amb tothom.", spa: "indica que la publicació no está compartida con todos.", eng: "indicates that the publication is not shared to everyone."};

var l_msg_Verify_pwd={cat: "Validació de contrasenya", spa: "Validación de contraseña", eng: "Verify password"};
var l_msg_Repeat_password={cat: "Cal que tornis a escriure la teva contrasenya nova.", spa: "Debes repetir la nueva contraseña.", eng: "You need to repeat your new password."};
var l_msg_New_Pwd={cat: "Contrasenya nova", spa: "Contraseña nueva", eng: "New password"};
var l_msg_Email={cat: "Correu electrònic", spa: "Correo electrónico", eng: "Email"};
	
		
	ActiveLanguage=lang;

	document.getElementById("head_title").innerHTML=DonaCadenaJSON(Msg_NiMMbus_login);
	document.getElementById("front-welcome-text-title").innerHTML=DonaCadenaJSON(Msg_Welcome_NiMMbus);
	document.getElementById("front-welcome-text-subtitle").innerHTML=DonaCadenaJSON(Msg_EO_everywhere_Share);
	document.getElementById("welcome-terms_of_use").innerHTML=DonaCadenaJSON(Msg_Terms_use);
	document.getElementById("welcome-privacy_statement").innerHTML=DonaCadenaJSON(Msg_Privacy_Statement);
	document.getElementById("welcome-last_updated").innerHTML="<i>"+DonaCadenaJSON(Msg_Last_Update)+": "+Terms_and_Privacy_Last_Updated+"</i>";	
	document.getElementById("welcome-access_policy").innerHTML=DonaCadenaJSON(Msg_Access_Policy);
	document.getElementById("welcome-mail-contact").innerHTML=DonaCadenaJSON(Msg_Mail_contacte)+": ";
	document.getElementById("front-language-lang").innerHTML=DonaCadenaJSON(Msg_small_Lang);
	
	document.getElementById("front-signin-nimmbus-lang").innerHTML=DonaCadenaJSON({cat: "Identificació usuaris NiMMbus", spa: "Identificación usuarios NiMMbus", eng: "Login with NiMMbus user"});
	document.getElementById("sign_in_user").placeholder=DonaCadenaJSON(l_msg_Username_or_email);
	document.getElementById("sign_in_pass").placeholder=DonaCadenaJSON(l_msg_Pwd);
	document.getElementById("sign_in_btn").value=DonaCadenaJSON({cat: "Iniciar sessió", spa: "Iniciar sesión", eng: "Sign in"});
	document.getElementById("sign_in_forgot").innerHTML=DonaCadenaJSON({cat: "Has oblidat la contrasenya?", spa: "¿Ha olvidado la contraseña?", eng: "Forgot the password?"});

	document.getElementById("front-signup-lang").innerHTML=DonaCadenaJSON(l_msg_New_to_NiMMbus_SignUp);
	document.getElementById("sign_up_user").placeholder=DonaCadenaJSON(l_msg_Username);
	document.getElementById("sign_up_pass").placeholder=DonaCadenaJSON(l_msg_Pwd);
	document.getElementById("sign_up_pass_valid").placeholder=DonaCadenaJSON({cat: "Verificació de contrasenya", spa: "Verificación de contraseña", eng: "Password verification"});
	document.getElementById("sign_up_btn").value=DonaCadenaJSON(l_msg_SignUp_for_NiMMbus);

	document.getElementById("front-signin-external-lang").innerHTML=DonaCadenaJSON({cat: "Identificació via federacions externes", spa: "Identificación vía federaciones externas", eng: "Login with external federations"});

	document.getElementById("settings-tooltip-text").innerHTML=DonaCadenaJSON({cat: "Configuració", spa: "Configuración", eng: "Settings"});
	document.getElementById("settings-profile").innerHTML=DonaCadenaJSON({cat: "Perfil", spa: "Perfil", eng: "Profile"});
	document.getElementById("settings-signout").innerHTML=DonaCadenaJSON(l_msg_Close_SignOut);

	document.getElementById("main-left-pannel-since-text").innerHTML=DonaCadenaJSON({cat: "Membre des de", spa: "Miembro desde", eng: "Member since"});
	document.getElementById("main-left-pannel-create-resources-text").innerHTML=DonaCadenaJSON({cat: "Crear recursos", spa: "Crear recursos", eng: "Create resources"});

	document.getElementById("resources-title-text").innerHTML=DonaCadenaJSON(l_msg_Resources);
	document.getElementById("resources-subtitle-text").innerHTML=DonaCadenaJSON({cat: "Llista de recursos disponibles", spa: "Lista de recursos disponibles", eng: "List of available resources"});
	
	document.getElementById("resource-type_screen").innerHTML=DonaCadenaJSON({cat: "Filtrar per tipus:", spa: "Filtrar por tipo:", eng: "Filter by type:"});
	document.getElementById("all-resource-type-value").innerHTML=DonaCadenaJSON(l_msg_All);
	document.getElementById("feedback-resource-type-value").innerHTML=DonaCadenaJSON(Msg_Feedback);
	document.getElementById("citation-resource-type-value").innerHTML=DonaCadenaJSON(Msg_Citation);
	document.getElementById("publicat-resource-type-value").innerHTML=DonaCadenaJSON(Msg_Publication);
	document.getElementById("individual-resource-type-value").innerHTML=DonaCadenaJSON(Msg_Individual);
	document.getElementById("organism-resource-type-value").innerHTML=DonaCadenaJSON(Msg_Organism);
	document.getElementById("href-resource-type-value").innerHTML=DonaCadenaJSON(Msg_Hyperlink);
	document.getElementById("poi-resource-type-value").innerHTML=DonaCadenaJSON(Msg_PoI);	
	
	document.getElementById("selector-owner-type_screen").innerHTML=DonaCadenaJSON(l_msg_Resources);
	document.getElementById("all-selector-owner-type-value").innerHTML=DonaCadenaJSON(l_msg_Owned_and_shared_with_me);
	document.getElementById("me-selector-owner-type-value").innerHTML=DonaCadenaJSON(l_msg_Only_Owned);
	document.getElementById("others-selector-owner-type-value").innerHTML=DonaCadenaJSON(l_msg_Only_Shared_me);
	document.getElementById("open-owner-type-value").innerHTML=DonaCadenaJSON(l_msg_Only_Shared_everyone);
		
	document.getElementById("owner-type_screen").innerHTML=DonaCadenaJSON(l_msg_Resources);
	document.getElementById("all-owner-type-value").innerHTML=DonaCadenaJSON(l_msg_Owned_and_shared_with_me);
	document.getElementById("me-owner-type-value").innerHTML=DonaCadenaJSON(l_msg_Only_Owned);
	document.getElementById("others-owner-type-value").innerHTML=DonaCadenaJSON(l_msg_Only_Shared_me);
	document.getElementById("open-selector-owner-type-value").innerHTML=DonaCadenaJSON(l_msg_Only_Shared_everyone);

	document.getElementById("newer-resources-tooltip-text").innerHTML=DonaCadenaJSON(l_msg_see_newer_resources);
	document.getElementById("older-resources-tooltip-text").innerHTML=DonaCadenaJSON(l_msg_see_older_resources);
	document.getElementById("newer-resource-selector-tooltip-text").innerHTML=DonaCadenaJSON(l_msg_see_newer_resources);
	document.getElementById("older-resource-selector-tooltip-text").innerHTML=DonaCadenaJSON(l_msg_see_older_resources);
	//document.getElementById("resources-hits-text").innerHTML="<small>"+DonaCadenaJSON(Msg_Use_New_button_to_create_resources)+"</small>"; -> ja es fa quan toca
	document.getElementById("resource-selector-hits-text").innerHTML="";
	
	document.getElementById("left-pannel-terms_of_use").innerHTML=DonaCadenaJSON(Msg_Terms_use);
	document.getElementById("left-pannel-privacy_statement").innerHTML=DonaCadenaJSON(Msg_Privacy_Statement);
	document.getElementById("left-pannel-last_updated").innerHTML="<i>"+DonaCadenaJSON(Msg_Last_Update)+":<br>"+Terms_and_Privacy_Last_Updated+"</i>";	

	for (var i=0; i<resources_per_page; i++)
	{
		if (document.getElementById("fb-resource-"+i))
			document.getElementById("fb-resource-"+i).innerHTML=DonaCadenaJSON(Msg_Feedback);
		if (document.getElementById("share-resource-"+i))
			document.getElementById("share-resource-"+i).innerHTML=DonaCadenaJSON(Msg_Share);
		if (document.getElementById("tag-resource-"+i))
			document.getElementById("tag-resource-"+i).innerHTML=DonaCadenaJSON(Msg_Tag);
	}
	
	document.getElementById("title-href-resource_screen").innerHTML=DonaCadenaJSON(Msg_Title);
	document.getElementById("title-href-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_For_example_)+" "+DonaCadenaJSON({cat: "Rius de Catalunya", spa: "Ríos de Cataluña", eng: "Catalonia rivers"});
	document.getElementById("href-href-resource_screen").innerHTML=DonaCadenaJSON(Msg_Hyperlink);
	document.getElementById("href-href-resource_descrip").innerHTML=DonaCadenaJSON(l_msg_For_example_)+" "+"http://www.gencat.net/mediamb/sig/bases/rius.mmz";
	document.getElementById("mimetype-href-resource_screen").innerHTML=DonaCadenaJSON({cat: "Format", spa: "Formato", eng: "Format"});
	document.getElementById("other-mimetype-href-resource_value").innerHTML=DonaCadenaJSON(l_msg_Other);
	document.getElementById("mimetype-href-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Format del fitxer al qual apunta l'hiperenllaç", spa: "Formato del fichero al que apunta el hiperenlace", eng: "File format of the Hyperlink target"});
	document.getElementById("reason-href-resource_screen").innerHTML=DonaCadenaJSON(l_msg_Motivation);
	document.getElementById("reason-href-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Reason_why);
	document.getElementById("href-resource-delete_btn").value=DonaCadenaJSON(Msg_Delete)+" "+DonaCadenaJSON(Msg_Hyperlink);
	document.getElementById("href-resource-exit_btn").value=DonaCadenaJSON(l_msg_Close_Sortir);
	document.getElementById("href-resource-close_btn").value=DonaCadenaJSON(l_msg_Discard);

	document.getElementById("poi-gps-resource_btn").value=DonaCadenaJSON({cat: "Obtenir del dispositiu", spa: "Obtener del dispositivo", eng: "Get it from the device"});
	document.getElementById("title-poi-resource_screen").innerHTML=DonaCadenaJSON(Msg_Title);
	document.getElementById("title-poi-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_For_example_)+" "+DonaCadenaJSON({cat: "Aplec de la sardana", spa: "Feria de abril", eng: "Olympic games stadium"});
	document.getElementById("long-poi-resource_screen").innerHTML=DonaCadenaJSON({cat: "Longitud", spa: "Longitud", eng: "Longitude"});
	document.getElementById("long-poi-resource_descrip").innerHTML=DonaCadenaJSON({cat: "Longitud en graus", spa: "Longitud en grados", eng: "Longitude in degrees"})+". "+DonaCadenaJSON(l_msg_For_example_)+" "+"3.25656";
	document.getElementById("lat-poi-resource_screen").innerHTML=DonaCadenaJSON({cat: "Latitud", spa: "Latitud", eng: "Latitude"});
	document.getElementById("lat-poi-resource_descrip").innerHTML=DonaCadenaJSON({cat: "Latitud en graus", spa: "Latitud en grados", eng: "Latitude in degrees"})+". "+DonaCadenaJSON(l_msg_For_example_)+" "+"41.3389";
	document.getElementById("pos-accur-poi-resource_screen").innerHTML=DonaCadenaJSON(Msg_Accuracy);
	document.getElementById("pos-accur-poi-resource_descrip").innerHTML=DonaCadenaJSON({cat: "Exactitud posicional preferiblement en m", spa: "Exactitud posicional preferiblemente en m", eng: "Positional accuracy, if possible in m"})+". "+DonaCadenaJSON(l_msg_For_example_)+" "+"25m";
	document.getElementById("elevation-poi-resource_screen").innerHTML=DonaCadenaJSON({cat: "Elevació", spa: "Elevación", eng: "Elevation"});
	document.getElementById("elevation-poi-resource_descrip").innerHTML=DonaCadenaJSON({cat: "Elevació en metres", spa: "Elevación en metros", eng: "Elevation in meters"})+". "+DonaCadenaJSON(l_msg_For_example_)+" "+"123.4";
	document.getElementById("reason-poi-resource_screen").innerHTML=DonaCadenaJSON(l_msg_Motivation);
	document.getElementById("reason-poi-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Reason_why);
	document.getElementById("poi-resource-delete_btn").value=DonaCadenaJSON(Msg_Delete)+" "+DonaCadenaJSON(Msg_PoI);
	document.getElementById("poi-resource-exit_btn").value=DonaCadenaJSON(l_msg_Close_Sortir);
	document.getElementById("poi-resource-close_btn").value=DonaCadenaJSON(l_msg_Discard);

	document.getElementById("target-feedback-resource").innerHTML=DonaCadenaJSON({cat: "Recurs(os) objectiu de la valoració", spa: "Recurso(s) objetivo de la valoración", eng: "Feedback target resource(s)"});
	document.getElementById("target_feedback-resource_compact_add_btn").value=DonaCadenaJSON(l_msg_Select);			
	document.getElementById("target_feedback-resource_compact_add_descrip").innerHTML=DonaCadenaJSON({cat: "Prem [Seleccionar] per a escollir un nou recurs valorat.", spa: "Presione [Seleccionar] para escoger un nuevo recurso valorado.", 
		eng: "Press [Select] to choose a new target item."})+" <img src=\"ExclamationMark20.png\"> "+DonaCadenaJSON({cat: "indica que el recurs no està compartit amb tothom.", spa: "indica que el recurso no está compartido con todos.", eng: "indicates that the resource is not shared to everyone."});

	//document.getElementById("title-feedback-resource_screen").innerHTML=DonaCadenaJSON(Msg_Title);
	//document.getElementById("title-feedback-resource_screen").innerHTML="Descriptor";//DonaCadenaJSON({cat: "Descriptor", spa: "Descriptor", eng: "Descriptor"}););
	//document.getElementById("title-feedback-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_For_example_)+" "+DonaCadenaJSON({cat: "Bon servidor de mapes", spa: "Buen servidor de mapas", eng: "Good map server"});
	document.getElementById("abstract-feedback-resource_screen").innerHTML=DonaCadenaJSON(l_msg_Abstract);
	document.getElementById("abstract-feedback-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Descripció textual curta de la valoració", spa: "Descripción textual corta de la valoración", eng: "Brief narrative description of the feedback item"});
	document.getElementById("reason-feedback-resource").innerHTML=DonaCadenaJSON({cat: "Propòsit", spa: "Propósito", eng: "Purpose"});
	document.getElementById("reason-feedback-resource_screen").innerHTML=DonaCadenaJSON({cat: "Propòsit", spa: "Propósito", eng: "Purpose"});
	document.getElementById("reason-feedback-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Raó o intenció per la qual explico la meva experiència i dono la meva valoració", spa: "Razón o intención por la cual explico mi experiencia y proporciono mi valoración", eng: "Reason or intention with which I explain my experience and provide this feedback"});
	document.getElementById("contactRole-feedback-resource_screen").innerHTML=DonaCadenaJSON({cat: "Rol de l'usuari", spa: "Rol del usuario", eng: "User role"});
	document.getElementById("commercialDataProd-contactRole-feedback-resource_value").innerHTML=DonaCadenaJSON(GUF_UserRoleCode["commercialDataProd"]);
	document.getElementById("commercialAddedValue-contactRole-feedback-resource_value").innerHTML=DonaCadenaJSON(GUF_UserRoleCode["commercialAddedValue"]);
	document.getElementById("researchDataProd-contactRole-feedback-resource_value").innerHTML=  DonaCadenaJSON(GUF_UserRoleCode["researchDataProd"]);
	document.getElementById("researchEndUser-contactRole-feedback-resource_value").innerHTML=   DonaCadenaJSON(GUF_UserRoleCode["researchEndUser"]);
	document.getElementById("decisionMaker-contactRole-feedback-resource_value").innerHTML=     DonaCadenaJSON(GUF_UserRoleCode["decisionMaker"]);
	document.getElementById("generalPublic-contactRole-feedback-resource_value").innerHTML=     DonaCadenaJSON(GUF_UserRoleCode["generalPublic"]);
	document.getElementById("contactRole-feedback-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Rol de l'usuari en el context d'aquesta valoració", spa: "Rol del usuario en el contexto de esta valoración", eng: "User's role in the context of this feedback item"});

	document.getElementById("rating-feedback-resource_screen").innerHTML=DonaCadenaJSON({cat: "Puntuació", spa: "Puntuación", eng: "Rating"});
	/*document.getElementById("undefined-rating-feedback-resource_value").innerHTML=DonaCadenaJSON(Msg_Indefinit);
	document.getElementById("oneStar-rating-feedback-resource_value").innerHTML=DonaCadenaJSON({cat: "1 estrella: Molt dolent", spa: "1 estrella: Muy malo", eng: "1 star: very bad"});
	document.getElementById("twoStars-rating-feedback-resource_value").innerHTML=DonaCadenaJSON({cat: "2 estrelles: Dolent", spa: "2 estrellas: Malo", eng: "2 stars: Bad"});
	document.getElementById("threeStars-rating-feedback-resource_value").innerHTML=DonaCadenaJSON({cat: "3 estrelles: Regular", spa: "3 estrellas: Regular", eng: "3 stars: Regular"});
	document.getElementById("fourStars-rating-feedback-resource_value").innerHTML=DonaCadenaJSON({cat: "4 estrelles: Bo", spa: "4 estrellas: Bueno", eng: "4 stars: Good"});
	document.getElementById("fiveStars-rating-feedback-resource_value").innerHTML=DonaCadenaJSON({cat: "5 estrelles: Excel·lent", spa: "5 estrellas: Excelente", eng: "5 stars: Excellent"});*/
	document.getElementById("rating-feedback-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Nombre d'estrelles que puntua subjectivament el recurs", spa: "Número de estrellas que puntúa subjetivamente el recurso", eng: "Number of stars that qualifies subjectively the resource"});

	document.getElementById("user-comment-feedback-resource").innerHTML=DonaCadenaJSON({cat: "Comentari de l'usuari", spa: "Comentario del usuario", eng: "User comment"});
	document.getElementById("comment-feedback-resource_screen").innerHTML=DonaCadenaJSON({cat: "Comentari", spa: "Comentario", eng: "Comment"});
	document.getElementById("comment-feedback-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Comentari de l'usuari sobre el recurs", spa: "Comentario del usuario sobre el recurso", eng: "User's comment about the resource"});
	document.getElementById("comment-motiv-feedback-resource_screen").innerHTML=DonaCadenaJSON({cat: "Motivació del comentari", spa: "Motivación del comentario", eng: "Comment motivation"});
	document.getElementById("undefined-motivation-feedback-resource_value").innerHTML=     DonaCadenaJSON(GUF_MotivationCode["undefined"]);
	document.getElementById("comment-motivation-feedback-resource_value").innerHTML=       DonaCadenaJSON(GUF_MotivationCode["comment"]);
	document.getElementById("question-motivation-feedback-resource_value").innerHTML=      DonaCadenaJSON(GUF_MotivationCode["question"]);
	document.getElementById("answer-motivation-feedback-resource_value").innerHTML=        DonaCadenaJSON(GUF_MotivationCode["answer"]);
	document.getElementById("acceptedAnswer-motivation-feedback-resource_value").innerHTML=DonaCadenaJSON(GUF_MotivationCode["acceptedAnswer"]);
	document.getElementById("response-motivation-feedback-resource_value").innerHTML=      DonaCadenaJSON(GUF_MotivationCode["response"]);
	document.getElementById("justification-motivation-feedback-resource_value").innerHTML= DonaCadenaJSON(GUF_MotivationCode["justification"]);
	document.getElementById("resolution-motivation-feedback-resource_value").innerHTML=    DonaCadenaJSON(GUF_MotivationCode["resolution"]);
	document.getElementById("moderation-motivation-feedback-resource_value").innerHTML=    DonaCadenaJSON(GUF_MotivationCode["moderation"]);
	document.getElementById("comment-motiv-feedback-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Motivació del comentari de l'usuari sobre el recurs", spa: "Motivación del comentario del usuario sobre el recurso", eng: "Motivation of user's comment about the resource"});

	document.getElementById("usage-feedback-resource").innerHTML=DonaCadenaJSON({cat: "Ús", spa: "Uso", eng: "Usage"});	
	document.getElementById("reportAspect-feedback-resource_screen").innerHTML=DonaCadenaJSON({cat: "Aspecte reportat", spa: "Aspecto reportado", eng: "Aspect reported"});
  document.getElementById("reportAspect-feedback-usage-label").innerHTML=DonaCadenaJSON(GUF_ReportAspectCode["usage"]);	
  document.getElementById("reportAspect-feedback-fitness-for-purpose-label").innerHTML=DonaCadenaJSON(GUF_ReportAspectCode["fitnessForPurpose"]);	
  document.getElementById("reportAspect-feedback-limitation-label").innerHTML=DonaCadenaJSON(GUF_ReportAspectCode["limitation"]);	
  document.getElementById("reportAspect-feedback-alternative-label").innerHTML=DonaCadenaJSON(GUF_ReportAspectCode["alternative"]);	
  document.getElementById("reportAspect-feedback-problem-label").innerHTML=DonaCadenaJSON(GUF_ReportAspectCode["problem"]);	
	document.getElementById("reportAspect-feedback-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Aspecte reportat sobre del recurs(os) objectiu de la valoració", spa: "Aspecto reportado sobre el recuso(s) objetivo de la valoración", eng: "Reported aspect about the target of the feedback item"});	
	
	document.getElementById("usage-description-feedback-resource").innerHTML=DonaCadenaJSON({cat: "Descripció de l'ús", spa: "Descripción del uso", eng: "Usage description"});	
	document.getElementById("specific-usage-feedback-resource_screen").innerHTML=DonaCadenaJSON({cat: "Ús específic", spa: "Uso específico", eng: "Specific usage"});	
	document.getElementById("specific-usage-feedback-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Breu descripció de l'ús del recurs(os) objectiu de la valoració", spa: "Breve descripción del uso del recurso(s) objetivo de la valoración", eng: "Brief description of the target usage"});	
	document.getElementById("usage-date-time-feedback-resource_screen").innerHTML=DonaCadenaJSON({cat: "Data i  hora de l'ús", spa: "Fecha y hora del uso", eng: "Usage date and time"});	
	document.getElementById("usage-date-time-feedback-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Data i hora de l'ús descrit en aquesta valoració", spa: "Fecha i hora del uso descrito en esta valoración", eng: "Date and time of the usage described in this feedback item"});	
	document.getElementById("user-determined-limitations-feedback-resource_screen").innerHTML=DonaCadenaJSON({cat: "Limitacions determinades per l'usuari", spa: "Limitaciones determinadas por el usuario", eng: "User determined limitations"});	
	document.getElementById("user-determined-limitations-feedback-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Aplicacions, determinades per l'usuari, per les quals el recurs(os) objectiu de la valoració no és adequat", spa: "Aplicaciones, determinadas por el usuario, para las que el recurso(s) objetivo de la valoración no es adecuado", eng: "Applications, determined by the user, for which the target is not suitable"});	
	document.getElementById("response-feedback-resource_screen").innerHTML=DonaCadenaJSON({cat: "Resposta", spa: "Respuesta", eng: "Response"});	
	document.getElementById("response-feedback-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Resposta a les limitacions determinades per l'usuari", spa: "Respuesta a las limitaciones determinadas por el usuario", eng: "Response to the user-determined limitations"});	
	document.getElementById("add-doc-feedback-resource").innerHTML=DonaCadenaJSON(Msg_Additional_documentation);
	document.getElementById("add-doc-feedback-resource_compact_add_btn").value=DonaCadenaJSON(l_msg_Select);			
	document.getElementById("add-doc-feedback-resource_compact_add_descrip").innerHTML=DonaCadenaJSON(l_msg_Press_select_choose_citation)+" <img src=\"ExclamationMark20.png\"> "+DonaCadenaJSON(l_msg_indicates_citation_not_shared);

	document.getElementById("reprodUsage-feedback-resource").innerHTML=DonaCadenaJSON({cat: "Ús reproduïble", spa: "Uso reproducible", eng: "Reproducible usage"});
	document.getElementById("reprodUsage-code-resource_screen").innerHTML=DonaCadenaJSON({cat: "Codi o sentència d'execució (text)", spa: "Código o sentencia de ejecución (texto)", eng: "Code or execution sentence (text)"});	
	document.getElementById("reprodUsage-code-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Codi o sentència d'execució necessari per a reproduir aquest ús*", spa: "Código o sentencia de ejecución necesario para reproducir este uso*", eng: "Necessary code or execution sentence to reproduce this usage*"});	
	document.getElementById("reprodUsage-codeLink-resource_screen").innerHTML=DonaCadenaJSON({cat: "Codi o sentència d'execució (Adreça URL)", spa: "Código o sentencia de ejecución (dirección URL)", eng: "Code or execution sentence (URL link)"});	
	document.getElementById("reprodUsage-codeLink-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Adreça URL del codi o la sentència d'execució necessari per a reproduir aquest ús*", spa: "Dirección URL del código o la  sentencia de ejecución necesario para reproducir este uso*", eng: "URL Link of the necessary code or execution sentence to reproduce this usage*"});			
	document.getElementById("reprodUsage-code-codeLink-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "*És habitual incloure només una descripció del codi o sentència d'execució (text o URL)", spa: "*Es habitual incluir sólo una descripción del código o sentencia de ejecución (texto o URL)", eng: "*Usually a single code or execution sentence description is provided (text or URL)"});			
	document.getElementById("reprodUsage-mimetype-resource_screen").innerHTML=DonaCadenaJSON({cat: "Format", spa: "Formato", eng: "Format"});
	document.getElementById("reprodUsage-mimetype-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Format del codi o la sentència d'execució necessari per a reproduir aquest ús", spa: "Formato del código o la sentencia de ejecución necesario para reproducir este uso", eng: "Format of the necessary code or execution sentence to reproduce this usage"});	
	document.getElementById("bat-reprodUsage-mimetype-resource_value").innerHTML=DonaCadenaJSON({cat: "Línia de comada de Windows", spa: "Línea de comandos de Windows", eng: "Windows command line"});
	document.getElementById("sh-reprodUsage-mimetype-resource_value").innerHTML=DonaCadenaJSON({cat: "Línia de comada de Linux", spa: "Línea de comandos de Linux", eng: "Linux command line"});
	document.getElementById("wps-reprodUsage-mimetype-resource_value").innerHTML=DonaCadenaJSON({cat: "Document d’execució WPS", spa: "Documento de ejecución WPS", eng: "WPS execute document"});
	document.getElementById("kvp-reprodUsage-mimetype-resource_value").innerHTML=DonaCadenaJSON({cat: "Parelles clau-valor (KVP)", spa: "Parejas clave-valor (KVP)", eng: "Key-value pair (KVP)"});
	document.getElementById("dock-reprodUsage-mimetype-resource_value").innerHTML=DonaCadenaJSON({cat: "Contenidor docker", spa: "Contenedor docker", eng: "Docker container"});
	document.getElementById("other-reprodUsage-mimetype-resource_value").innerHTML=DonaCadenaJSON(l_msg_Other);		
	document.getElementById("reprodUsage-platform-resource_screen").innerHTML=DonaCadenaJSON({cat: "Plataforma", spa: "Plataforma", eng: "Platform"});	
	document.getElementById("reprodUsage-platform-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Plataforma per a executar el codi o la sentència d'execució d'aquest ús", spa: "Plataforma para ejecutar el código o la sentencia de ejecución de este uso", eng: "Platform to execute the code or execution sentence of this usage"});	
	document.getElementById("reprodUsage-version-resource_screen").innerHTML=DonaCadenaJSON({cat: "Versió", spa: "Versión", eng: "Version"});	
	document.getElementById("reprodUsage-version-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Versió de la plataforma per a executar el codi o sentència d'execució d'aquest ús", spa: "Versión de la plataforma para ejecutar el código o sentencia de ejecución de este uso", eng: "Version of the platform to execute the code or execution sentence of this usage"});	
	document.getElementById("reprodUsage-schema-resource_screen").innerHTML=DonaCadenaJSON({cat: "Esquema", spa: "Esquema", eng: "Schema"});	
	document.getElementById("reprodUsage-schema-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Esquema del codi o la sentència d'execució per a reproduir aquest ús (només per a codi declaratiu: p.ex. JSON)", spa: "Esquema del código o la sentencia de ejecución necesario para reproducir este uso (sólo para código declarativo: p.ej. JSON)", eng: "Schema of the code or execution sentence to reproduce this usage (only for declarative code: e.g JSON)"});	
	document.getElementById("reprodUsage-suggApp-resource_screen").innerHTML=DonaCadenaJSON({cat: "Aplicació suggerida", spa: "Aplicación sugerida", eng: "Suggested application"});	
	document.getElementById("reprodUsage-suggApp-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Aplicació suggerida concreta per a obrir el codi i sentència d'execuciód d'aquest ús", spa: "Aplicación sugerida concreta para abrir el código o sentencia de ejecución de este uso", eng: "Specific suggested application to open the code or execution sentence of this usage"});	
	document.getElementById("reprodUsage-diagram-resource_screen").innerHTML=DonaCadenaJSON({cat: "Diagrama (text)", spa: "Diagrama (texto)", eng: "Diagram (text)"});	
	document.getElementById("reprodUsage-diagram-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Diagrama descriptiu d'aquest ús reproduïble**", spa: "Diagrama descriptivo de este uso reproducible**", eng: "Descriptive diagram of this reproducible usage**"});	
	document.getElementById("reprodUsage-diagramLink-resource_screen").innerHTML=DonaCadenaJSON({cat: "Diagrama (adreça URL)", spa: "Diagrama (dirección URL)", eng: "Diagram (URL link)"});	
	document.getElementById("reprodUsage-diagramLink-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Adreça URL del diagrama descriptiu d'aquest ús reproduïble**", spa: "Dirección URL del diagrama descriptivo de este uso reproducible**", eng: "URL Link of the descriptive diagram of this reproducible usage**"});		
	document.getElementById("reprodUsage-diagram-diagramLink-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "**És habitual incloure només una descripció del diagrama (text o URL)", spa: "**Es habitual incluir sólo una descripción del diagrama (texto o URL)", eng: "**Usually a single diagram description is provided (text or URL)"});	
	document.getElementById("reprodUsage-diagram-mimetype-resource_screen").innerHTML=DonaCadenaJSON({cat: "Format del diagrama", spa: "Formato del diagrama", eng: "Diagram format"});
	document.getElementById("reprodUsage-diagram-mimetype-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Format del diagrama descriptiu d'aquest ús reproduïble", spa: "Formato del diagrama descriptivo de este uso reproducible", eng: "Format of the descriptive diagram of this reproducible usage"});	
	document.getElementById("other-reprodUsage-diagram-mimetype-resource_value").innerHTML=DonaCadenaJSON(l_msg_Other);		

	document.getElementById("discovered-issue-feedback-resource").innerHTML=DonaCadenaJSON({cat: "Problema descobert", spa: "Problema descubierto", eng: "Discovered issue"});	
	document.getElementById("known-problem-feedback-resource_screen").innerHTML=DonaCadenaJSON({cat: "Problema conegut", spa: "Problema conocido", eng: "Known problem"});	
	document.getElementById("known-problem-feedback-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Problema conegut amb el recurs", spa: "Problema conocido con el recurso", eng: "Known problem wih the resource"});	
	document.getElementById("problem-date-time-feedback-resource_screen").innerHTML=DonaCadenaJSON({cat: "Data i hora del problema conegut", spa: "Fecha y hora del problema conocido", eng: "Known problem date and time"});	
	document.getElementById("problem-date-time-feedback-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Data i hora del problema conegut descrit en aquesta valoració", spa: "Fecha y hora del problema conocidodescrito en esta valoración", eng: "Date and time of the known problem described in this feedback item"});	
	document.getElementById("work-around-feedback-resource_screen").innerHTML=DonaCadenaJSON({cat: "Solució", spa: "Solución", eng: "Work around"});	
	document.getElementById("work-around-feedback-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Possible manera de solucionar el problema", spa: "Posible manera de solucionar el problema", eng: "Possible way to work around the problem"});
	document.getElementById("ref-doc-feedback-resource").innerHTML=DonaCadenaJSON(Msg_Reference_documents);
	document.getElementById("ref-doc-feedback-resource_compact_add_btn").value=DonaCadenaJSON(l_msg_Select);			
	document.getElementById("ref-doc-feedback-resource_compact_add_descrip").innerHTML=DonaCadenaJSON(l_msg_Press_select_choose_publication)+" <img src=\"ExclamationMark20.png\"> "+DonaCadenaJSON(l_msg_indicates_publication_not_shared);	
	document.getElementById("expected-fix-date-feedback-resource_screen").innerHTML=DonaCadenaJSON({cat: "Data esperada de solució", spa: "Fecha esperada de solución", eng: "Expected fix date"});	
	document.getElementById("expected-fix-date-feedback-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Data prevista per la distribució d'una solució pel part del proveïdor del recurs", 
			spa: "Fecha prevista para la distribución de una solución por parte del proveedor del recurso", eng: "Expected date for a solution to be released by the resource provider"});	
	document.getElementById("fix-rsrc-feedback-resource").innerHTML=DonaCadenaJSON(Msg_Fixed_Resource);
	document.getElementById("fix-rsrc-feedback-resource_compact_add_btn").value=DonaCadenaJSON(l_msg_Select);			
	document.getElementById("fix-rsrc-feedback-resource_compact_add_descrip").innerHTML=DonaCadenaJSON(l_msg_Press_select_choose_citation)+" <img src=\"ExclamationMark20.png\"> "+DonaCadenaJSON(l_msg_indicates_citation_not_shared);
	document.getElementById("alt-rsrc-feedback-resource").innerHTML=DonaCadenaJSON(Msg_Alternative_Resource);
	document.getElementById("alt-rsrc-feedback-resource_compact_add_btn").value=DonaCadenaJSON(l_msg_Select);			
	document.getElementById("alt-rsrc-feedback-resource_compact_add_descrip").innerHTML=DonaCadenaJSON(l_msg_Press_select_choose_citation)+" <img src=\"ExclamationMark20.png\"> "+DonaCadenaJSON(l_msg_indicates_citation_not_shared);

	document.getElementById("public-feedback-resource").innerHTML=DonaCadenaJSON(Msg_Related_Publications);
	//document.getElementById("public_feedback-resource_compact_screen").innerHTML=DonaCadenaJSON({cat: "Publicació(ns)", spa: "Publicación(es)", eng: "Publication(s)"});
	document.getElementById("public_feedback-resource_compact_add_btn").value=DonaCadenaJSON(l_msg_Select);			
	document.getElementById("public_feedback-resource_compact_add_descrip").innerHTML=DonaCadenaJSON(l_msg_Press_select_choose_publication)+" <img src=\"ExclamationMark20.png\"> "+DonaCadenaJSON(l_msg_indicates_publication_not_shared);

	document.getElementById("open-data-feedback-resource_screen").innerHTML=DonaCadenaJSON({cat: "Compartir amb tothom", spa: "Compartir con todos", eng: "Share to everyone"});
 	document.getElementById("open-data-feedback-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Compartir aquesta valoració (i els recursos associats) amb tothom", spa: "Compartir esta valoración (y los recursos asociados) con todos", eng: "If check this feedback (and related resources) will be visible to everyone"});

	document.getElementById("feedback-resource-delete_btn").value=DonaCadenaJSON(Msg_Delete)+" "+DonaCadenaJSON(Msg_Feedback);
	document.getElementById("feedback-resource-exit_btn").value=DonaCadenaJSON(l_msg_Close_Sortir);
	document.getElementById("feedback-resource-close_btn").value=DonaCadenaJSON(l_msg_Discard);

	document.getElementById("title-citation-resource_screen").innerHTML=DonaCadenaJSON(Msg_Title);
	document.getElementById("title-citation-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_For_example_)+" "+DonaCadenaJSON({cat: "Mapa Cobertes del Sòl de Catalunya", spa: "Sistema de Información sobre Ocupación del Suelo de España", eng: "Corine Land Cover 2012"});
		
	document.getElementById("edition-citation-resource").innerHTML=DonaCadenaJSON(l_msg_Resource_Edition);
	document.getElementById("edition-citation-resource_screen").innerHTML=DonaCadenaJSON(l_msg_Edition);
	document.getElementById("edition-citation-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Version_of_the_resource);
	document.getElementById("edition-date-citation-resource_screen").innerHTML=DonaCadenaJSON(l_msg_Edition_date);
	document.getElementById("edition-date-citation-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Date_of_edition);
	document.getElementById("identifier-citation-resource").innerHTML=DonaCadenaJSON({cat: "Identificador de la citació", spa: "Identificador de la citación", eng: "Citation identifier"});
	document.getElementById("id-code-citation-resource_screen").innerHTML=DonaCadenaJSON(l_msg_Code);
	document.getElementById("id-code-citation-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_resource_id_eg)+" "+"clc-2012";
	document.getElementById("id-namespace-citation-resource_screen").innerHTML=DonaCadenaJSON(Msg_Namespace);
	document.getElementById("id-namespace-citation-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Namespace_where_id_unique_eg_)+" "+"https://land.copernicus.eu";
	
	document.getElementById("responsible-citation-resource").innerHTML=DonaCadenaJSON(l_msg_Responsible);
	document.getElementById("responsible-citation-resource_compact_add_btn").value=DonaCadenaJSON(l_msg_Select);			
	document.getElementById("responsible-citation-resource_compact_add_descrip").innerHTML=DonaCadenaJSON(l_msg_Select_responsible)+" <img src=\"ExclamationMark20.png\"> "+DonaCadenaJSON(l_msg_responsible_not_open_data);

	document.getElementById("series-citation-resource").innerHTML=DonaCadenaJSON(l_msg_Series_which_resource_is_part_of);
	document.getElementById("series-name-citation-resource_screen").innerHTML=DonaCadenaJSON(l_msg_Series_name);
	document.getElementById("series-name-citation-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Series_name_of_which_this_resource);
	document.getElementById("series-issue-citation-resource_screen").innerHTML=DonaCadenaJSON(l_msg_Series_issue_id);
	document.getElementById("series-issue-citation-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Id_of_the_issue_within_series);
	document.getElementById("series-page-citation-resource_screen").innerHTML=DonaCadenaJSON(l_msg_Pages_in_the_issue);
	document.getElementById("series-page-citation-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Pages_resource_fills_in);
	document.getElementById("other-cit-details-citation-resource_screen").innerHTML=DonaCadenaJSON(l_msg_Other_citation_details);
	document.getElementById("other-cit-details-citation-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Other_info_requiered_citation);
	document.getElementById("url-citation-resource").innerHTML=DonaCadenaJSON(l_msg_OnlineResource);
	document.getElementById("url-link-citation-resource_screen").innerHTML=DonaCadenaJSON(l_msg_URL_link);
	document.getElementById("url-link-citation-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Online_resource_related_eg_)+" "+"http://land.copernicus.eu/pan-european/corine-land-cover/clc-2012/view";
	document.getElementById("url-descrip-citation-resource_screen").innerHTML=DonaCadenaJSON(l_msg_URL_description);
	document.getElementById("url-descrip-citation-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Detailed_description_onlineresource_eg_)+" "+DonaCadenaJSON({cat: "Exploració de les dades en un navegador", spa: "Exploración de los datos en un navegador", eng: "View the data on a web browser"});
	document.getElementById("url-function-citation-resource_screen").innerHTML=DonaCadenaJSON(l_msg_URL_function);	
	document.getElementById("undefined-url-function-citation-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["undefined"]);
	document.getElementById("download-url-function-citation-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["download"]);
	document.getElementById("information-url-function-citation-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["information"]);
	document.getElementById("offlineAccess-url-function-citation-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["offlineAccess"]);
	document.getElementById("order-url-function-citation-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["order"]);
	document.getElementById("search-url-function-citation-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["search"]);
	document.getElementById("completeMetadata-url-function-citation-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["completeMetadata"]);
	document.getElementById("browseGraphic-url-function-citation-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["browseGraphic"]);
	document.getElementById("upload-url-function-citation-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["upload"]);
	document.getElementById("emailService-url-function-citation-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["emailService"]);
	document.getElementById("browsing-url-function-citation-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["browsing"]);	
	document.getElementById("fileAccess-url-function-citation-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["fileAccess"]);
	document.getElementById("url-function-citation-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_URL_function_eg_)+" "+DonaCadenaJSON({cat: "Exploració", spa: "Exploración", eng: "View"});
	
	document.getElementById("open-data-citation-resource_screen").innerHTML=DonaCadenaJSON({cat: "Compartir amb tothom", spa: "Compartir con todos", eng: "Share to everyone"});
 	document.getElementById("open-data-citation-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Compartir aquesta cita (i els recursos associats) amb tothom", spa: "Compartir esta cita (y los recursos asociados) con todos", eng: "If check this citation (and related resources) will be visible to everyone"});

	document.getElementById("citation-resource-delete_btn").value=DonaCadenaJSON(Msg_Delete)+" "+DonaCadenaJSON(Msg_Citation);
	document.getElementById("citation-resource-exit_btn").value=DonaCadenaJSON(l_msg_Close_Sortir);
	document.getElementById("citation-resource-close_btn").value=DonaCadenaJSON(l_msg_Discard);

	document.getElementById("title-publication-resource_screen").innerHTML=DonaCadenaJSON(Msg_Title);
	document.getElementById("title-publication-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_For_example_)+" "+"Daytime urban heat islands from Landsat ETM+ and Corine land cover data: An application to major cities in Greece";
	document.getElementById("edition-publication-resource").innerHTML=DonaCadenaJSON(l_msg_Resource_Edition);
	document.getElementById("edition-publication-resource_screen").innerHTML=DonaCadenaJSON(l_msg_Edition);
	document.getElementById("edition-publication-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Version_of_the_resource);
	document.getElementById("edition-date-publication-resource_screen").innerHTML=DonaCadenaJSON(l_msg_Edition_date);
	document.getElementById("edition-date-publication-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Date_of_edition);
	document.getElementById("identifier-publication-resource").innerHTML=DonaCadenaJSON({cat: "Identificador de la publicació", spa: "Identificador de la publicación", eng: "Publication identifier"});
	document.getElementById("id-code-publication-resource_screen").innerHTML=DonaCadenaJSON(l_msg_Code);
	document.getElementById("id-code-publication-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_resource_id_eg)+" "+"10.1016/j.solener.2006.06.014";
	document.getElementById("id-namespace-publication-resource_screen").innerHTML=DonaCadenaJSON(Msg_Namespace);
	document.getElementById("id-namespace-publication-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Namespace_where_id_unique_eg_)+" "+"https://www.doi.org/";
	
	document.getElementById("responsible-publication-resource").innerHTML=DonaCadenaJSON(l_msg_Responsible);
	document.getElementById("responsible-publication-resource_compact_add_btn").value=DonaCadenaJSON(l_msg_Select);			
	document.getElementById("responsible-publication-resource_compact_add_descrip").innerHTML=DonaCadenaJSON(l_msg_Select_responsible)+" <img src=\"ExclamationMark20.png\"> "+DonaCadenaJSON(l_msg_responsible_not_open_data);

	document.getElementById("series-publication-resource").innerHTML=DonaCadenaJSON(l_msg_Series_which_resource_is_part_of);
	document.getElementById("series-name-publication-resource_screen").innerHTML=DonaCadenaJSON(l_msg_Series_name);
	document.getElementById("series-name-publication-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Series_name_of_which_this_resource)+". "+DonaCadenaJSON({cat: "P.ex.", spa: "P.ej.", eng: "E.g."})+": Solar Energy";
	document.getElementById("series-issue-publication-resource_screen").innerHTML=DonaCadenaJSON(l_msg_Series_issue_id);
	document.getElementById("series-issue-publication-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Id_of_the_issue_within_series_eg_)+" "+"Volume 81, Issue 3";
	document.getElementById("series-page-publication-resource_screen").innerHTML=DonaCadenaJSON(l_msg_Pages_in_the_issue);
	document.getElementById("series-page-publication-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Pages_resource_fills_in);
	document.getElementById("other-cit-details-publication-resource_screen").innerHTML=DonaCadenaJSON(l_msg_Other_citation_details);
	document.getElementById("other-cit-details-publication-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Other_info_requiered_citation);
	document.getElementById("url-publication-resource").innerHTML=DonaCadenaJSON(l_msg_OnlineResource);
	document.getElementById("url-link-publication-resource_screen").innerHTML=DonaCadenaJSON(l_msg_URL_link);
	document.getElementById("url-link-publication-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Online_resource_related_eg_)+" "+"http://www.sciencedirect.com/science/article/pii/S0038092X06001885";
	document.getElementById("url-descrip-publication-resource_screen").innerHTML=DonaCadenaJSON(l_msg_URL_description);
	document.getElementById("url-descrip-publication-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Detailed_description_onlineresource_eg_)+" "+DonaCadenaJSON({cat: "Informació (i possible descàrrega) sobre l'article", spa: "Información (y posible descarga) sobre el artículo", eng: "Paper information (and possible download)"});
	document.getElementById("url-function-publication-resource_screen").innerHTML=DonaCadenaJSON(l_msg_URL_function);
	document.getElementById("undefined-url-function-publication-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["undefined"]);
	document.getElementById("download-url-function-publication-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["download"]);
	document.getElementById("information-url-function-publication-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["information"]);
	document.getElementById("offlineAccess-url-function-publication-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["offlineAccess"]);
	document.getElementById("order-url-function-publication-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["order"]);
	document.getElementById("search-url-function-publication-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["search"]);
	document.getElementById("completeMetadata-url-function-publication-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["completeMetadata"]);
	document.getElementById("browseGraphic-url-function-publication-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["browseGraphic"]);
	document.getElementById("upload-url-function-publication-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["upload"]);
	document.getElementById("emailService-url-function-publication-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["emailService"]);
	document.getElementById("browsing-url-function-publication-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["browsing"]);	
	document.getElementById("fileAccess-url-function-publication-resource_value").innerHTML=DonaCadenaJSON(CI_OnLineFunctionCode["fileAccess"]);
	document.getElementById("url-function-publication-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_URL_function_eg_)+" "+DonaCadenaJSON({cat: "Informació", spa: "Información", eng: "Information"});
	document.getElementById("abstract-publication-resource_screen").innerHTML=DonaCadenaJSON(l_msg_Abstract);
	document.getElementById("abstract-publication-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Resum de la publicació", spa: "Resumen de la publicación", eng: "Abstract of the publication"});

	document.getElementById("category-publication-resource_screen").innerHTML=DonaCadenaJSON({cat: "Categoria", spa: "Categoría", eng: "Category"});
	document.getElementById("undefined-category-publication-resource_value").innerHTML=DonaCadenaJSON(QCM_PublicationCategoryCode["undefined"]);
	document.getElementById("bookChapter-category-publication-resource_value").innerHTML=DonaCadenaJSON(QCM_PublicationCategoryCode["bookChapter"]);
	document.getElementById("book-category-publication-resource_value").innerHTML=DonaCadenaJSON(QCM_PublicationCategoryCode["book"]);
	document.getElementById("report-category-publication-resource_value").innerHTML=DonaCadenaJSON(QCM_PublicationCategoryCode["report"]);
	document.getElementById("journalArticle-category-publication-resource_value").innerHTML=DonaCadenaJSON(QCM_PublicationCategoryCode["journalArticle"]);
	document.getElementById("magazineNewspaper-category-publication-resource_value").innerHTML=DonaCadenaJSON(QCM_PublicationCategoryCode["magazineNewspaper"]);
	document.getElementById("atlasMap-category-publication-resource_value").innerHTML=DonaCadenaJSON(QCM_PublicationCategoryCode["atlasMap"]);
	document.getElementById("applicationProgram-category-publication-resource_value").innerHTML=DonaCadenaJSON(QCM_PublicationCategoryCode["applicationProgram"]);
	document.getElementById("conferenceProceedings-category-publication-resource_value").innerHTML=DonaCadenaJSON(QCM_PublicationCategoryCode["conferenceProceedings"]);
	document.getElementById("multimediaContent-category-publication-resource_value").innerHTML=DonaCadenaJSON(QCM_PublicationCategoryCode["cdDvdBlueRay"]);
	document.getElementById("socialMediaComment-category-publication-resource_value").innerHTML=DonaCadenaJSON(QCM_PublicationCategoryCode["socialMediaComment"]);
	document.getElementById("blogWiki-category-publication-resource_value").innerHTML=DonaCadenaJSON(QCM_PublicationCategoryCode["blogWiki"]);
	document.getElementById("webSite-category-publication-resource_value").innerHTML=DonaCadenaJSON(QCM_PublicationCategoryCode["webSite"]);
	document.getElementById("webPage-category-publication-resource_value").innerHTML=DonaCadenaJSON(QCM_PublicationCategoryCode["webPage"]);
	document.getElementById("videoAudio-category-publication-resource_value").innerHTML=DonaCadenaJSON(QCM_PublicationCategoryCode["videoAudio"]);
	document.getElementById("tutorialManual-publication-resource_screen_value").innerHTML=DonaCadenaJSON(QCM_PublicationCategoryCode["tutorialManual"]);
	document.getElementById("category-publication-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Tipus de publicació. P. ex. Capítol de llibre", spa: "Tipo de publicación. P. ej. Capítulo de libro", eng: "Type of publication. E.g. Book chapter"});

	document.getElementById("open-data-publication-resource_screen").innerHTML=DonaCadenaJSON({cat: "Compartir amb tothom", spa: "Compartir con todos", eng: "Share to everyone"});
 	document.getElementById("open-data-publication-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Compartir aquesta publicació amb tothom", spa: "Compartir esta publicación con todos", eng: "If check this publication will be visible to everyone"});

	document.getElementById("publication-resource-delete_btn").value=DonaCadenaJSON(Msg_Delete)+" "+DonaCadenaJSON(Msg_Publication);
	document.getElementById("publication-resource-exit_btn").value=DonaCadenaJSON(l_msg_Close_Sortir);
	document.getElementById("publication-resource-close_btn").value=DonaCadenaJSON(l_msg_Discard);

	document.getElementById("title-individual-resource_screen").innerHTML=DonaCadenaJSON({cat: "Nom de l'individu", spa: "Nombre del individuo", eng: "Individual name"});
	document.getElementById("title-individual-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_For_example_)+" "+"Zabala Torres, Alaitz";
	document.getElementById("email-individual-resource_screen").innerHTML=DonaCadenaJSON(l_msg_Email);
	document.getElementById("email-individual-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Correu electrònic de l'individu", spa: "Correo electrónico del individuo", eng: "Individual email"});
	document.getElementById("identifier-1-individual-resource").innerHTML=DonaCadenaJSON({cat: "Identificador de l'individu", spa: "Identificador del individuo", eng: "Individual identifier"})+" (1)";
	document.getElementById("id-code-1-individual-resource_screen").innerHTML=DonaCadenaJSON(l_msg_Code);
	document.getElementById("id-code-1-individual-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_resource_id_eg)+" "+"0000-0002-3931-4221";
	document.getElementById("id-namespace-1-individual-resource_screen").innerHTML=DonaCadenaJSON(Msg_Namespace);
	document.getElementById("id-namespace-1-individual-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Namespace_where_id_unique_eg_)+" "+"https://orcid.org/";
	document.getElementById("id-code-2-individual-resource_screen").innerHTML=DonaCadenaJSON(l_msg_Code);
	document.getElementById("identifier-2-individual-resource").innerHTML=DonaCadenaJSON({cat: "Identificador de l'individu", spa: "Identificador del individuo", eng: "Individual identifier"})+" (2)";
	document.getElementById("id-code-2-individual-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_resource_id_eg)+" "+"cvPPJX0AAAAJ";
	document.getElementById("id-namespace-2-individual-resource_screen").innerHTML=DonaCadenaJSON(Msg_Namespace);
	document.getElementById("id-namespace-2-individual-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Namespace_where_id_unique_eg_)+" "+"http://scholar.google.es/citations?user=";	
	document.getElementById("url-link-individual-resource_screen").innerHTML=DonaCadenaJSON(l_msg_URL_link);
	document.getElementById("url-link-individual-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Online_resource_related_eg_)+" "+"https://www.grumets.cat/index_eng.htm";
	
	document.getElementById("open-data-individual-resource_screen").innerHTML=DonaCadenaJSON({cat: "Compartir amb tothom", spa: "Compartir con todos", eng: "Share to everyone"});
 	document.getElementById("open-data-individual-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Compartir aquest individu (i els recursos associats) amb tothom", spa: "Compartir este individuo (y los recursos asociados) con todos", eng: "If check this individual (and related resources) will be visible to everyone"});

	document.getElementById("individual-resource-delete_btn").value=DonaCadenaJSON(Msg_Delete)+" "+DonaCadenaJSON(Msg_Individual);
	document.getElementById("individual-resource-exit_btn").value=DonaCadenaJSON(l_msg_Close_Sortir);
	document.getElementById("individual-resource-close_btn").value=DonaCadenaJSON(l_msg_Discard);

	document.getElementById("title-organism-resource_screen").innerHTML=DonaCadenaJSON({cat: "Nom de la organització", spa: "Nombre de la organización", eng: "Organism name"});
	document.getElementById("title-organism-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_For_example_)+" "+"Dept. Geografia. Universitat Autònoma de Barcelona";
	document.getElementById("address-organism-resource").innerHTML=DonaCadenaJSON({cat: "Adreça de contacte", spa: "Dirección de contacto", eng: "Contact address"});
	document.getElementById("delivery-point-organism-resource_screen").innerHTML=DonaCadenaJSON({cat: "Punt de lliurament", spa: "Punto de entrega", eng: "Delivery point"});
	document.getElementById("delivery-point-organism-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_For_example_)+" "+"Campus de Bellaterra, Edifici B, Carrer de la Fortuna, s/n";
	document.getElementById("city-organism-resource_screen").innerHTML=DonaCadenaJSON({cat: "Ciutat", spa: "Ciudad", eng: "City"});
	document.getElementById("city-organism-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_For_example_)+" "+"Cerdanyola del Vallès";
	document.getElementById("administrative-area-organism-resource_screen").innerHTML=DonaCadenaJSON({cat: "Àrea administrativa", spa: "Area administrativa", eng: "Administrative area"});
	document.getElementById("administrative-area-organism-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_For_example_)+" "+"Barcelona";
	document.getElementById("postal-code-organism-resource_screen").innerHTML=DonaCadenaJSON({cat: "Codi postal", spa: "Código postal", eng: "Postal code"});
	document.getElementById("postal-code-organism-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_For_example_)+" "+"08193";
	document.getElementById("country-organism-resource_screen").innerHTML=DonaCadenaJSON({cat: "País", spa: "País", eng: "Country"});
	document.getElementById("country-organism-resource_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_For_example_)+" "+"Spain";
	
	document.getElementById("open-data-organism-resource_screen").innerHTML=DonaCadenaJSON({cat: "Compartir amb tothom", spa: "Compartir con todos", eng: "Share to everyone"});
 	document.getElementById("open-data-organism-resource_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Compartir aquest organisme (i els recursos associats) amb tothom", spa: "Compartir este organismo (y los recursos asociados) con todos", eng: "If check this organism (and related resources) will be visible to everyone"});

	document.getElementById("organism-resource-delete_btn").value=DonaCadenaJSON(Msg_Delete)+" "+DonaCadenaJSON(Msg_Organism);
	document.getElementById("organism-resource-exit_btn").value=DonaCadenaJSON(l_msg_Close_Sortir);
	document.getElementById("organism-resource-close_btn").value=DonaCadenaJSON(l_msg_Discard);

	document.getElementById("account-title-text").innerHTML=DonaCadenaJSON({cat: "Compte", spa: "Cuenta", eng: "Account"});
	document.getElementById("account-subtitle-text").innerHTML=DonaCadenaJSON({cat: "Canvia les característiques bàsiques del teu compte i la configuració d'idioma", spa: "Cambie las características básicas de su cuenta y la configuración de idioma", eng: "Change your basic account and language settings."});
	document.getElementById("new_user_screen").innerHTML=DonaCadenaJSON(l_msg_Username);
	document.getElementById("new_user_descrip").innerHTML=DonaCadenaJSON({cat: "Pots canviar el teu usuari en qualsevol moment.", spa: "Puede cambiar su usuario en cualquier momento.", eng: "Your username can be changed anytime."});
	document.getElementById("email_screen").innerHTML=DonaCadenaJSON(l_msg_Email);
	document.getElementById("email_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_For_Email_Notificactions);
	document.getElementById("name_screen").innerHTML=DonaCadenaJSON({cat: "Nom", spa: "Nombre", eng: "Name"});
	document.getElementById("name_screen_descrip").innerHTML=DonaCadenaJSON({cat: "El teu nom i cognoms", spa: "Su nombre y apellidos", eng: "Your name and surname"});
	document.getElementById("bio_screen").innerHTML=DonaCadenaJSON({cat: "Biografia", spa: "Biografía", eng: "Bio"});
	document.getElementById("bio_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Un text curt que et descriu", spa: "Un texto corto que le describe", eng: "About yourself in a few words."});
	document.getElementById("current_pass_screen").innerHTML=DonaCadenaJSON({cat: "Contrasenya actual", spa: "Contraseña actual", eng: "Current password"});
	document.getElementById("current_pass_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Cal que proporcionis la contrasenya actual si la vols canviar.", spa: "Es necesario proporcionar la contraseña actual si desea cambiarla.", eng: "Your current password is needed only if you want to change it."});
	document.getElementById("new_pass_screen").innerHTML=DonaCadenaJSON(l_msg_New_Pwd);
	document.getElementById("new_pass_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Pots canviar la teva contrasenya en qualsevol moment.", spa: "Puede cambiar su contraseña en cualquier momento.", eng: "Your password can be changed anytime."});
	document.getElementById("new_pass_valid_screen").innerHTML=DonaCadenaJSON(l_msg_Verify_pwd);
	document.getElementById("new_pass_valid_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Cal que tornis a escriure la teva contrasenya.", spa: "Debes repetir la contraseña.", eng: "You need to repeat your new password."});
	document.getElementById("language_screen").innerHTML=DonaCadenaJSON({cat: "Idioma", spa: "Idioma", eng: "Language"});
	document.getElementById("language_screen_descrip").innerHTML=DonaCadenaJSON({cat: "L'idioma que fas servir (l'entorn canviarà a aquest idioma).", spa: "El idioma que usas (el entorno cambiará a este idioma).", eng: "The language you use (the interface will change to this language)."});
	document.getElementById("account_btn").value=DonaCadenaJSON(Msg_Save_changes);
	document.getElementById("account-close_btn").value=DonaCadenaJSON(l_msg_Discard);

	document.getElementById("share-title-text").innerHTML=DonaCadenaJSON(Msg_Share);
	document.getElementById("share-subtitle-text").innerHTML=DonaCadenaJSON({cat: "Comparteix aquest recurs amb els altres", spa: "Comparte este recurso con otros", eng: "Share this resource with others"});
	document.getElementById("new_share_screen").innerHTML=DonaCadenaJSON(l_msg_Username_or_email);
	document.getElementById("new_share_descrip").innerHTML=DonaCadenaJSON({cat: "Escriu un nom d'usuari de NiMMbus o un email, escull els drets i prem [Afegir]", spa: "Escriba un nombre de usuario de NiMMbus o un email, escoja los derechos y presione [Añadir]", eng: "Type a username in NiMMbus or an email, choose the rights and press [Add]"});
	document.getElementById("new_share_open_screen").innerHTML=DonaCadenaJSON(l_msg_All);
	document.getElementById("new_share_open_read_label").innerHTML=DonaCadenaJSON(l_msg_Share_to_everyone_for_reading);
	document.getElementById("new_share_open_descrip").innerHTML=DonaCadenaJSON({cat: "Marca aquesta casella si vols compartir l'accés a aquest recurs a tothom (fins i tot sense identificar-se)", spa: "Marque esta casilla si desea compartir el acceso a este recurso a todos (incluso sin identificarse)", eng: "Check this box if you want to share the access to this resource to everyone (even if they are not identified)"});
	document.getElementById("new_share_open_btn").value=DonaCadenaJSON(l_msg_Add);
	document.getElementById("new_share_rights_read_label").innerHTML=DonaCadenaJSON(Msg_Read);
	document.getElementById("new_share_rights_write_label").innerHTML=DonaCadenaJSON(Msg_Write);
	document.getElementById("new_share_rights_share_label").innerHTML=DonaCadenaJSON(Msg_Share);
	document.getElementById("new_share_btn").value=DonaCadenaJSON(l_msg_Add);
	document.getElementById("current_share_screen").innerHTML=DonaCadenaJSON({cat: "Llista de comparticions", spa: "Lista de comparticiones", eng: "Sharing list"});
	document.getElementById("current_share_descrip").innerHTML=DonaCadenaJSON({cat: "Fes clic a les creus per esborrar usuaris de la llista.", spa: "Haga clic a las cruces para borrar usuarios de la lista.", eng: "Click on the crosses to remove users from the list."});
	document.getElementById("share-close_btn").value=DonaCadenaJSON(l_msg_Close_Tancar);

	document.getElementById("feedback-title-text").innerHTML=DonaCadenaJSON({cat: "Valoracions", spa: "Valoraciones", eng: "Feedback items"});
	document.getElementById("feedback-subtitle-text").innerHTML=DonaCadenaJSON({cat: "Valoracions sobre el recurs:", spa: "Valoraciones sobre el recurso:", eng: "Feedback about the resource:"});
	document.getElementById("feedback_target_compact_screen").innerHTML=DonaCadenaJSON({cat: "Recurs valorat", spa: "Recurso valorado", eng: "Target resource"});
	document.getElementById("new_feedback_screen").innerHTML=DonaCadenaJSON(Msg_Feedback);
	document.getElementById("new_feedback_descrip").innerHTML=DonaCadenaJSON({cat: "Prem [Afegir] per a crear una nova valoració sobre aquest recurs", spa: "Presione [Añadir] para crear una nueva valoración sobre este recurso", eng: "Press [Add] to create a new feedback item about this resource"});
	document.getElementById("new_feedback_btn").value=DonaCadenaJSON(l_msg_Add);
	document.getElementById("current_feedback_screen").innerHTML=DonaCadenaJSON({cat: "Llista de valoracions", spa: "Lista de valoraciones", eng: "Feedback list"});
	document.getElementById("current_feedback_descrip").innerHTML=DonaCadenaJSON({cat: "Prem [Editar] per a veure, modificar o esborrar aquesta valoració", spa: "Presione [Editar] para ver, modificar o borrar esta valoración", eng: "Press [Edit] to view, modify or delete this feedback item"});
	document.getElementById("feedback-close_btn").value=DonaCadenaJSON(l_msg_Close_Tancar);

	document.getElementById("reset-pass-title-text").innerHTML=DonaCadenaJSON({cat: "Restabliment de contrasenya", spa: "Restablecimiento de contraseña", eng: "Password reset"});
	document.getElementById("reset-pass-subtitle-text").innerHTML=DonaCadenaJSON({cat: "Troba el teu compte de NiMMbus", spa: "Encuentre su cuenta de NiMMbus", eng: "Find your NiMMbus account"});
	document.getElementById("reset-pass_user_descrip").innerHTML=DonaCadenaJSON({cat: "Introdueixi el nom d'usuari o correu electrònic. Se t'enviarà un email amb un enllaç per canviar la contrasenya.", spa: "Introduzca su nombre de usuario o el correo electrónico. Se le enviará un email con un enlace para cambiar la contraseña.", eng: "Enter your username or email. An email will be sent to you with a link to change the password."});
	document.getElementById("reset-pass_btn").value=DonaCadenaJSON({cat: "Cerca", spa: "Búsqueda", eng: "Search"});

	document.getElementById("new-pass-title-text").innerHTML=DonaCadenaJSON({cat: "Nova contrasenya", spa: "Nueva contraseña", eng: "New password"});
	document.getElementById("new-pass-subtitle-text").innerHTML=DonaCadenaJSON({cat: "Canvia la teva contrasenya del teu compte de NiMMbus", spa: "Cambie su contraseña para su cuenta de NiMMbus", eng: "Change password in your NiMMbus account"});
	document.getElementById("new-pass_new_pass_screen").innerHTML=DonaCadenaJSON(l_msg_New_Pwd);
	document.getElementById("new-pass_new_pass_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Escriu directament la teva contrasenya nova.", spa: "Escriba directamente su contraseña nueva.", eng: "Write your new password here."});
	document.getElementById("new-pass_new_pass_valid_screen").innerHTML=DonaCadenaJSON(l_msg_Verify_pwd);
	document.getElementById("new-pass_new_pass_valid_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Repeat_password);
	document.getElementById("new-pass_btn").value=DonaCadenaJSON({cat: "Canviar", spa: "Cambiar", eng: "Change"});

	document.getElementById("new-user-title-text").innerHTML=DonaCadenaJSON(l_msg_New_to_NiMMbus_SignUp)+":";
	document.getElementById("new-user-subtitle-text").innerHTML=DonaCadenaJSON({cat: "Crea el teu compte de NiMMbus", spa: "Cree su cuenta de NiMMbus", eng: "Create your NiMMbus account"});
	document.getElementById("new-user_new_user_screen").innerHTML=DonaCadenaJSON(l_msg_Username);
	document.getElementById("new-user_new_user_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Escriu el nom d'usuari que desitges.", spa: "Escriba el nombre de usuario que desea.", eng: "Write your username here."});
	document.getElementById("new-user_new_pass_screen").innerHTML=DonaCadenaJSON(l_msg_Pwd);
	document.getElementById("new-user_new_pass_screen_descrip").innerHTML=DonaCadenaJSON({cat: "Escriu la teva contrasenya.", spa: "Escriba directamente su contraseña.", eng: "Write your new password here."});
	document.getElementById("new-user_new_pass_valid_screen").innerHTML=DonaCadenaJSON(l_msg_Verify_pwd);
	document.getElementById("new-user_new_pass_valid_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_Repeat_password);
	document.getElementById("new-user_email_screen").innerHTML=DonaCadenaJSON(l_msg_Email);
	document.getElementById("new-user_email_screen_descrip").innerHTML=DonaCadenaJSON(l_msg_For_Email_Notificactions);
	document.getElementById("new-user_btn").value=DonaCadenaJSON(l_msg_SignUp_for_NiMMbus);

	document.getElementById("new-user-title-text").innerHTML=DonaCadenaJSON(l_msg_New_to_NiMMbus_SignUp)+":";

	document.getElementById("execute-token-title-text").innerHTML=DonaCadenaJSON({cat: "Sol·licitud", spa: "Solicitud", eng: "Request"});
	document.getElementById("execute-token-wait-text").innerHTML=DonaCadenaJSON({cat: "Espereu...", spa: "Espere...", eng: "Please wait..."});
}

// Index Temporary Out of Service

function ChangeLanguageIndexTOS(lang, expected_date_time)
{
	ActiveLanguage=lang;
	document.getElementById("front-welcome-text-title").innerHTML=DonaCadenaJSON(Msg_Welcome_NiMMbus);
	document.getElementById("front-welcome-text-subtitle").innerHTML=DonaCadenaJSON(Msg_EO_everywhere_Share);		
	document.getElementById("welcome-terms_of_use").innerHTML=DonaCadenaJSON(Msg_Terms_use);
	document.getElementById("welcome-privacy_statement").innerHTML=DonaCadenaJSON(Msg_Privacy_Statement);
	document.getElementById("welcome-last_updated").innerHTML="<i>"+DonaCadenaJSON(Msg_Last_Update)+": "+Terms_and_Privacy_Last_Updated+"</i>";	
	document.getElementById("welcome-access_policy").innerHTML=DonaCadenaJSON(Msg_Access_Policy);
	document.getElementById("welcome-mail-contact").innerHTML=DonaCadenaJSON(Msg_Mail_contacte)+": ";
	document.getElementById("front-language-lang").innerHTML=DonaCadenaJSON(Msg_small_Lang);
	document.getElementById("front-temp-oos-lang").innerHTML=DonaCadenaJSON({cat: "Servei temporalment fora de servei", 
		spa: "Servicio temporalmente fuera de servicio", eng: "Temporary Out of Service"});
	document.getElementById("front-temp-bts-lang").innerHTML=DonaCadenaJSON({cat: "Data i hora prevista del restabliment del servei", 
		spa: "Fecha y hora prevista de restablecimiento del servicio", eng: "Expected date and time for service restoration"})+": "+expected_date_time;
}

// Test New Feedback Page

function ChangeLanguageTestNewFeedback(lang)
{
	ActiveLanguage=lang;
	
	document.getElementById("head_title").innerHTML=DonaCadenaJSON({cat: "Test per afegir Valoracions", spa: "Test para añadir valoraciones", eng: "NiMMbus Test New Feedback"});
	document.getElementById("front-welcome-text-title").innerHTML=DonaCadenaJSON(Msg_NiMMbus_Test_Pages);
	document.getElementById("front-welcome-text-subtitle").innerHTML=DonaCadenaJSON({cat: "Test per a crear valoracions d'un recurs (descrit pel seu títol, identificador i espai de noms)",
				spa: "Test para crear valoraciones de un recurso (descrito por su título, identificador y espacio de nombres)", 
				eng: "Test to create feedback items about a resource (described by its title, identifier and namespace)"});
	document.getElementById("welcome-terms_of_use").innerHTML=DonaCadenaJSON(Msg_Terms_use);
	document.getElementById("welcome-privacy_statement").innerHTML=DonaCadenaJSON(Msg_Privacy_Statement);
	document.getElementById("welcome-last_updated").innerHTML="<i>"+DonaCadenaJSON(Msg_Last_Update)+": "+Terms_and_Privacy_Last_Updated+"</i>";	
	document.getElementById("welcome-access_policy").innerHTML=DonaCadenaJSON(Msg_Access_Policy);
	document.getElementById("welcome-mail-contact").innerHTML=DonaCadenaJSON(Msg_Mail_contacte)+": ";
	document.getElementById("front-language-lang").innerHTML=DonaCadenaJSON(Msg_small_Lang);
	document.getElementById("sign_in_title").placeholder=DonaCadenaJSON(Msg_Title);
	document.getElementById("sign_in_code").placeholder=DonaCadenaJSON(Msg_Identifier);
	document.getElementById("sign_in_codespace").placeholder=DonaCadenaJSON(Msg_Namespace);
	document.getElementById("sign_in_access_token_type_title").innerHTML=DonaCadenaJSON({cat: "Descriu el tipus d'usuari per a entrar a NiMMbus", spa: "Describe el tipo de usuario para entrar en NiMMbus", eng: "Describe the type of user to sign in NiMMbus"});
	document.getElementById("sign_in_btn").value=DonaCadenaJSON(Msg_Create);
	document.getElementById("sign_in_create_citation").innerHTML=DonaCadenaJSON({cat: "Descriu la citació al recurs sobre el qual donaràs valoracions", spa: "Describe la citación al recurso sobre el qual darás valoraciones", eng: "Describe the citation to the resource you are going to give feedback"});		
}


// Test Widget Page & Test Widget Custom Page

function ChangeLanguageTestWidget(lang, is_custom)
{
	ActiveLanguage=lang;
	
	document.getElementById("front-welcome-text-title").innerHTML=DonaCadenaJSON(Msg_NiMMbus_Test_Pages);
	if (is_custom)
	{
		document.getElementById("head_title").innerHTML=DonaCadenaJSON({cat: "Test del NiMMbus Widget Personalitzat", spa: "Test del NiMMbus Widget Personalizado", eng: "NiMMbus Test Custom Widget"});
		document.getElementById("front-welcome-text-subtitle").innerHTML=DonaCadenaJSON({cat: "Test per a mostrar l'ús de l'API JavaScript i el Widget de NiMMbus per crear i mostrar valoracions amb estil personal",
				spa: "Test para mostrar el uso del API JavaScript y el Widget de NiMMbus para mostrar valoraciones con estilo personal", 
				eng: "Test to show JavaScrip API and NiMMbus widget use to create and recover feedbacks using custom styles"});
		document.getElementById("sign_explanation_css_1").innerHTML=DonaCadenaJSON({cat: "En aquesta pàgina, unes poques <b>classes han estat definides</b> a la secció &ltstyle&gt per a canviar: <ul><li>tipus i color de lletra i alçada de línea de <i>guf_report</i><li>color de lletra de <i>guf_key</i>"+
				"<li>color de fons de <i>guf_folded</i><li>color dels vincles i de les línies horitzontals</ul>Això es pot usar també per decidir quins elements de les valoracions es mostren, modificant la seva propietat \"display\".</p>",
				spa: "En esta página, unas pocas <b>clases se han definido</b> en la sección &ltstyle&gt para cambiar: <ul><li>tipo y color de letra y altura de línea de <i>guf_report</i><li>color de letra de <i>guf_key</i>"+
				"<li>color de fondo de <i>guf_folded</i><li>color de los vínculos y de las lineas horizontales</ul>Esto se puede usar también para decidir que elementos de las valoraciones se muestran, modificando su propiedad \"display\".</p>",
				eng: "In this test page, a few <b>classes have been defined</b> in the &ltstyle&gt section to change:	<ul><li>font family and color and <i>guf_report</i> line height <li>font color for the <i>guf_key</i>"+
				"<li>background color of the <i>guf_folded</i><li>color of the links and horizontal lines</ul>This can be also used to decide which elements in the feedback item are shown, by changing their \"display\" property.</p>"});
		document.getElementById("sign_explanation_css_2").innerHTML=DonaCadenaJSON({cat: "La <b>referència</b> dels noms de classe del full d'estil guf.css que es poden modificar es poden consultar a la pàgina de GitHub ",
				spa: "La <b>referencia</b> de los nombres de clase de la hoja de estilo guf.css que se pueden modificar se pueden consultar en la página de GitHub ",
				eng: "The <b>reference</b> of the class names in the guf.css style sheets than can be modified can be read in the "})+
					"<a href=\"https://github.com/joanma747/nimmbus/tree/master/GUF_integration\" target=\"_blank\">GUF Integration</a>"+
				DonaCadenaJSON({cat: ".", spa: ".", eng: " GitHub page."})+"</p>";				
	}
	else
	{
		document.getElementById("head_title").innerHTML=DonaCadenaJSON({cat: "Test del NiMMbus Widget", spa: "Test del NiMMbus Widget", eng: "NiMMbus Test Widget"});
		document.getElementById("front-welcome-text-subtitle").innerHTML=DonaCadenaJSON({cat: "Test per a mostrar l'ús de l'API JavaScript i el Widget de NiMMbus per crear i mostrar valoracions",
				spa: "Test para mostrar el uso del API JavaScript y el Widget de NiMMbus per crear y mostrar valoraciones", 
				eng: "Test to show JavaScrip API and NiMMbus widget use to create and recover feedbacks"});
	}	
	document.getElementById("welcome-terms_of_use").innerHTML=DonaCadenaJSON(Msg_Terms_use);
	document.getElementById("welcome-privacy_statement").innerHTML=DonaCadenaJSON(Msg_Privacy_Statement);
	document.getElementById("welcome-last_updated").innerHTML="<i>"+DonaCadenaJSON(Msg_Last_Update)+": "+Terms_and_Privacy_Last_Updated+"</i>";	
	document.getElementById("welcome-access_policy").innerHTML=DonaCadenaJSON(Msg_Access_Policy);
	document.getElementById("welcome-mail-contact").innerHTML=DonaCadenaJSON(Msg_Mail_contacte)+": ";
	document.getElementById("front-language-lang").innerHTML=DonaCadenaJSON(Msg_small_Lang);
	document.getElementById("sign_in_resource_type").innerHTML=DonaCadenaJSON({cat: "Text de tipus de recurs:", spa: "Texto de tipo de recurso:", eng: "Resource type text:"});
	document.getElementById("sign_in_title").innerHTML=DonaCadenaJSON(Msg_Title)+" ("+DonaCadenaJSON({cat: "recurs valorat primari",
				spa: "recurso valorado primario", eng: "primary target"})+"):";
	document.getElementById("sign_in_code").innerHTML=DonaCadenaJSON(Msg_Identifier)+" ("+DonaCadenaJSON({cat: "recurs valorat primari",
				spa: "recurso valorado primario", eng: "primary target"})+"):";
	document.getElementById("sign_in_codespace").innerHTML=DonaCadenaJSON(Msg_Namespace)+" ("+DonaCadenaJSON({cat: "recurs valorat primari",
				spa: "recurso valorado primario", eng: "primary target"})+"):";
	if (document.getElementById("sign_in_title_2"))
		document.getElementById("sign_in_title_2").innerHTML=DonaCadenaJSON(Msg_Title)+" ("+DonaCadenaJSON({cat: "recurs valorat secundari",
				spa: "recurso valorado secundario", eng: "secondary target"})+"):";
	if (document.getElementById("sign_in_code_2"))
		document.getElementById("sign_in_code_2").innerHTML=DonaCadenaJSON(Msg_Identifier)+" ("+DonaCadenaJSON({cat: "recurs valorat secundari",
				spa: "recurso valorado secundario", eng: "secondary target"})+"):";
	if (document.getElementById("sign_in_codespace_2"))
		document.getElementById("sign_in_codespace_2").innerHTML=DonaCadenaJSON(Msg_Namespace)+" ("+DonaCadenaJSON({cat: "recurs valorat secundari",
				spa: "recurso valorado secundario", eng: "secondary target"})+"):";
	document.getElementById("sign_in_btn").value=DonaCadenaJSON({cat: "Afegir/Revisar valoracions prèvies", spa: "Añadir/Revisar valoraciones previas", eng: "Add/Review previous feedback items"});
	document.getElementById("clear_btn").value=DonaCadenaJSON({cat: "Buidar", spa: "Vaciar", eng: "Clear"});	
}

// Test Widget Corine Example Page

function ChangeLanguageTestWidgetCorine(lang)
{
	var l_msg_here={cat: "aquí", spa: "aquí", eng: "here"};
	
	ActiveLanguage=lang;
	
	document.getElementById("head_title").innerHTML=DonaCadenaJSON({cat: "Test del NiMMbus Widget al CLC2012", spa: "Test del NiMMbus Widget en el CLC2012", eng: "NiMMbus Test Widget CLC2012"});
	document.getElementById("front-welcome-text-title").innerHTML=DonaCadenaJSON(Msg_NiMMbus_Test_Pages);
	document.getElementById("front-welcome-text-subtitle").innerHTML=DonaCadenaJSON({cat: "Exemple d'integració de l'API JavaScript i el Widget de NiMMbus a les metadades del Corine Land Cover 2012",
				spa: "Ejemplo de integración del API JavaScript y el Widget de NiMMbus en los metadatos del Corine Land Cover 2012", 
				eng: "Example of JavaScrip API and NiMMbus widget integration in Corine Land Cover 2012 metadata"});
	document.getElementById("welcome-terms_of_use").innerHTML=DonaCadenaJSON(Msg_Terms_use);
	document.getElementById("welcome-privacy_statement").innerHTML=DonaCadenaJSON(Msg_Privacy_Statement);
	document.getElementById("welcome-last_updated").innerHTML="<i>"+DonaCadenaJSON(Msg_Last_Update)+": "+Terms_and_Privacy_Last_Updated+"</i>";	
	document.getElementById("welcome-access_policy").innerHTML=DonaCadenaJSON(Msg_Access_Policy);
	document.getElementById("welcome-mail-contact").innerHTML=DonaCadenaJSON(Msg_Mail_contacte)+": ";
	document.getElementById("front-language-lang").innerHTML=DonaCadenaJSON(Msg_small_Lang)
	
	document.getElementById("title").innerHTML=DonaCadenaJSON({cat: "<b>Exemple del Corine Land Cover 2012 amb el NiMMbus GUF widget</b>", spa: "<b>Ejemplo del Corine Land Cover 2012 con el NiMMbus GUF widget</b>", eng: "<b>Corine Land Cover 2012 with NiMMbus GUF widget example</b>"});	
	document.getElementById("explanation_1").innerHTML=DonaCadenaJSON({cat: "L'objectiu d'aquest exemple és il·lustrar com incloure el mecanisme de valoracions d'usuari (GUF) als catàlegs d'una comunitat.", spa: "El objetivo de este ejemplo es ilustrar cómo incluir el mecanismo de valoraciones de usuarios (GUF) en los catálogos de una comunidad.", eng: "The objective of this example is to illustrate how to include the Geospatial User Feedback (GUF) mechanism in community catalogues."});
	document.getElementById("explanation_2").innerHTML=DonaCadenaJSON({cat: "Simularem l'existència d'un catàleg que podem manipular utilitzant les metadades Corine Land Cover 2012 (extret de",
		spa: "Simularemos la existencia de un catálogo que podemos manipular utilizando los metadatos de Corine Land Cover 2012 (extraídos de",
		eng: "We will simulate the existence of a catalogue that we can manipulate using the Corine Land Cover 2012 metadata (extracted from"})+" Copernicus Land Service <a href=\"https://land.copernicus.eu/pan-european/corine-land-cover/clc-2012?tab=metadata\" target=\"_blank\">"+DonaCadenaJSON(l_msg_here)+"</a>).";
	document.getElementById("explanation_3").innerHTML=DonaCadenaJSON({cat: "A continuació, a la <u style=\"background-color: #E8E8E8;\">part esquerra</u>, podeu veure les metadades extretes del catàleg i disponibles a",
		spa: "A continuación, en el <u style=\"background-color: #E8E8E8;\">lado izquierdo</u>, puede ver los metadatos extraídos del catálogo y disponibles en",
		eng: "Below, on the <u style=\"background-color: #E8E8E8;\">left side</u>, you can see the metadata extracted from the catalogue and available in"})+" <a href=\"test_widget_corine_original.htm\" target=\"_blank\">test_widget_corine_original.htm</a>.";		
	document.getElementById("explanation_4").innerHTML=DonaCadenaJSON({cat: "A la <u style=\"background-color: #D6F7FA;\">part dreta</u>, podeu veure la pàgina de metadades modificada per incloure el widget GUF, disponible a", 
		spa: "En el <u style=\"background-color: #D6F7FA;\">lado derecho</u>, puede ver la página de metadatos modificados para incluir el widget GUF, disponible en", 
		eng: "On the <u style=\"background-color: #D6F7FA;\">right side</u> you can see the modified metadata page to include GUF widget, available in"})+" <a href=\"test_widget_corine_wt_guf.htm\" target=\"_blank\">test_widget_corine_wt_guf.htm</a>.";
	document.getElementById("explanation_5").innerHTML=DonaCadenaJSON({cat: "Les instruccions per integrar el GUF es poden trobar a la ", spa: "Las instrucciones para integrar el GUF se pueden encontrar en la ", eng: "The instructions to integrate the GUF can be found in the "})+" <a href=\"https://github.com/joanma747/nimmbus/tree/master/GUF_integration\" target=\"_blank\">"+DonaCadenaJSON({cat: "pàgina d'Integració del NiMMbus a GitHub", spa: "página de Integración del NiMMbus en GitHub", eng: "NiMMbus integration GitHub page"})+"</a>.";
	document.getElementById("explanation_6").innerHTML=DonaCadenaJSON({cat: "Aquest exemple va ser l'exercici del \"Tema 5 - Integració de valoracions d'usuaris aplicats a recursos\" al Segon Esdeveniment de Formació NextGEOSS (11 de setembre de 2018, Ginebra). Més informació sobre aquest exercici ", spa: "Este ejemplo fue el ejercicio del \"Tema 5 - Integración de las valoraciones de usuarios aplicada a los recursos\" en el Segundo Evento de Formación NextGEOSS (11 de septiembre de 2018, Ginebra). Más información sobre este ejercicio ", eng: "This example was the hands-on for the \"Topic 5 - Integration of geospatial user feedback applied to resources\" in the Second NextGEOSS Training event (11th September 2018, Geneva). More information about this hands-on "})+"<a href=\"https://github.com/ec-nextgeoss/nextgeoss-training-user-feedback/\" target=\"_blank\">"+DonaCadenaJSON(l_msg_here)+"</a>.";
}
