/*
	This is part of the NiMMbus libraries.
  The main objective of this library is to expose localised strings that are useful both for NiMMbus application and for other GUF applications
     Developed by Joan Masó and Alaitz Zabala.
     License: Attribution 4.0 International (CC BY 4.0) http://creativecommons.org/licenses/by/4.0/
*/

var Msg_Indefinit={cat: "Indefinit", spa: "Indefinido", eng: "Undefined", fre: "Indéfini"};


// *****************************
// *  GUF standard code lists  *
// *****************************

// GUF Table 1 — Contents of data dictionary tables
// GUF Table 2 — QCM_Publication extension elements

// GUF Table 3 — QCM_CitationMotivationCode type
/*var QCM_CitationMotivationCode=
  "compare
	"derive
	"describe
	"evaluate
	"comment
	"use
	"highlight
	"moderate
	"question
	"reply
	"link*/

// GUF Table 4 — QCM_PublicationCategoryCode type
var QCM_PublicationCategoryCode={"undefined": Msg_Indefinit,
		"bookChapter": {cat: "Capítol de llibre", spa: "Capítulo de libro", eng: "Book chapter", fre: "Chapitre du livre"},
		"book": {cat: "Llibre", spa: "Libro", eng: "Book", fre: "Livre"},
		"report": {cat: "Informe", spa: "Informe", eng: "Report", fre: "Rapport"},
		"journalArticle": {cat: "Article de revista", spa: "Artículo de revista", eng: "Journal article", fre: "Article de journal"},
		"magazineNewspaper": {cat: "Revista o diari", spa: "Revista o periódico", eng: "Magazine or Newspaper", fre: "Magazine ou journal"},
		"atlasMap": {cat: "Atles o mapa (imprès o digital)", spa: "Atlas o mapa (impreso o digital)", eng: "Atlas or map (printed or digital)", fre: "Atlas ou carte (imprimé ou numérique)"},
		"applicationProgram": {cat: "Programa", spa: "Programa", eng: "Application program", fre: "Programme d'application"},
		"conferenceProceedings": {cat: "Actes de congressos", spa: "Actas de congresos", eng: "Conference proceedings", fre: "Actes de la conférence"},
		"cdDvdBlueRay": {cat: "Paquet de dades multimèdia (suport físic o a Internet)", spa: "Paquete de datos multimedia (soporte físico o en Internet)", eng: "Multimedia package (physical support or Internet)", fre: "Paquet multimédia (support physique ou Internet)"},
		"socialMediaComment": {cat: "Comentari xarxes socials (p.ex. tuit)", spa: "Comentario redes sociales (p.ej. tuit)", eng: "Social media comment (e.g. tweet)", fre: "Commentaire sur les médias sociaux (par exemple, tweet)"},
		"blogWiki": {cat: "Entrada a un bloc o una wiki", spa: "Entrada en un bloc o una wiki", eng: "Blog or wiki entry", fre: "Blog ou entrée wiki"},
		"webSite": {cat: "Pàgina web completa", spa: "Página web completa", eng: "Complete web site", fre: "Site web complet"},
		"webPage": {cat: "Pàgina web", spa: "Página web", eng: "Web page", fre: "page Web"},
		"videoAudio": {cat: "Vídeo o àudio", spa: "Vídeo o audio", eng: "Video or audio", fre: "Vidéo ou audio"},
		"tutorialManual": {cat: "Tutorial o Manual", spa: "Tutorial o Manual", eng: "Tutorial or Manual", fre: "Tutoriel ou manuel"}};

// GUF Table 5 — QCM_ DiscoveredIssue data type
// GUF Table 6 — GUF_FeedbackItem data type
// GUF Table 7 — GUF_UserInformation data type

// GUF Table 8 — GUF_UserRoleCode code list
var GUF_UserRoleCode={"commercialDataProd": {cat: "Productor comercial de dades", spa: "Productor comercial de datos", eng: "Commercial data producer", fre: "Producteur de données commerciales"},
		"commercialAddedValue": {cat: "Afegir valor a les dades comercials", spa: "Añadir valor a los datos comerciales", eng: "Commercial added value", fre: "Valeur ajoutée commerciale"},
		"researchDataProd": {cat: "Productor de dades científiques", spa: "Productor de datos científicos", eng: "Scientific data producer", fre: "Producteur de données scientifiques"},
		"researchEndUser": {cat: "Usuari científic final", spa: "Usuario científico final", eng: "Research end user", fre: "Recherche utilisateur final"},
		"decisionMaker": {cat: "Responsables de presa de decisions", spa: "Responsables de toma de decisiones", eng: "Decision maker", fre: "Décideur"},
		"generalPublic": {cat: "Públic general", spa: "Público general", eng: "General public", fre: "Grand public"}};

// GUF Table 9 — GUF_FeedbackTarget data type

// GUF Table 10 — GUF_TargetRoleCode code list
var GUF_TargetRoleCode={"undefined": Msg_Indefinit,
		"primary": {cat: "Primari", spa: "Primario", eng: "Primary", fre: "Principale"},
		"secondary": {cat: "Secundari", spa: "Secundario", eng: "Secondary", fre: "Secondaire"},
		"supplementary": {cat: "Suplementari", spa: "Suplementario", eng: "Supplementary", fre: "Supplémentaire"}};

// GUF Table 11 — GUF_UserComment data type

// GUF Table 12 — GUF_MotivationCode code list
var GUF_MotivationCode={"undefined": Msg_Indefinit,
		"comment": {cat: "Comentari", spa: "Comentario", eng: "Comment", fre: "Commentaire"},
		"question": {cat: "Pregunta", spa: "Pregunta", eng: "Question", fre: "Question"},
		"answer": {cat: "Solució", spa: "Solución", eng: "Answer", fre: "Solution"},
		"acceptedAnswer": {cat: "Solució acceptada", spa: "Solución acceptada", eng: "Accepted answer", fre: "Solution acceptée"},
		"response": {cat: "Resposta", spa: "Respuesta", eng: "Response", fre: "Réponse"},	
		"justification": {cat: "Justificació", spa: "Justificación", eng: "Justification", fre: "Justification"},
		"resolution": {cat: "Resolució", spa: "Resolución", eng: "Resolution", fre: "Résolution"},
		"moderation": {cat: "Moderació", spa: "Moderación", eng: "Moderation", fre: "Modération"}};

// GUF Table 13 — GUF_UsageReport data type

// GUF Table 14 — GUF_ReportAspectCode code list
/*var GUF_ReportAspectCode={"undefined": Msg_Indefinit,
		"usage":
		"fitnessForPurpose":
		"limitation":
		"alternative":
		"problem": };*/

// GUF Table 15 — GUF_Rating data type
// GUF Table 16 — GUF_SignificantEvent data type

// GUF Table 17 — GUF_SignificantEventTypeCode code list
/*var GUF_SignificantEventTypeCode={"undefined": Msg_Indefinit,
		"hurricaneNatural":
		"volcanicEruptionNatural":
		"elNinoNatural":
		"droughtNatural":
		"stormNatural":
		"wildfireNatural":
		"floodNatural":
		"earthquakeNatural":
		"tsunamiNatural":
		"ifsEvent":
		"systemEvent":
		"satelliteAnomaly":
		"dropsondeAnomaly":
		"aircraftAnomaly":
		"buoyAnomaly":
		"shipAnomaly":
		"landStationAnomaly":
		"mobileSensorAnomaly":
		"sensorAlarm": };*/

// GUF Table 18 — GUF_RatingCode numeric code type
/*var	GUF_RatingCode=
		1 oneStar Very bad
		2 twoStars Bad
		3 threeStars Regular
		4 fourStars Good
		5 fiveStars Excellent */	
	
// GUF Table 19 — GUF_ThumbsCode numeric code type
/*var GUF_ThumbsCode=
		-1 thumbsDown Thumbs down
		1 thumbsUp Thumbs up */

// GUF Table 20 — GUF_SignCode numeric code type
/* var GUF_SignCode=
		-1 negative Negative
		0 neutral Neutral
		1 positive Positive*/
		
// GUF Table 21 — UFS_FeedbackSummary data type
// GUF Table 22 — UFS_ExpertiseLevelCount data type
// GUF Table 23 — UFS_UserRoleCount data type
// GUF Table 24 — UFS_TagCount data type
// GUF Table 25 — UFS_KeywordCount data type
// GUF Table 26 — UFS_RatingCount data type
// GUF Table 27 — UFS_RatingExpertiseLevelCount data type
// GUF Table 28 — UFC_FeedbackResponse data type
// GUF Table 29 — UFC_FeedbackCollection data type
// GUF Table 30 — UFC_ResponsePagination data type



// ******************************
// * Other standards code lists *   
// ******************************

//Some Fre from https://www.fgdc.gov/nap/metadata/register/registerItemClasses.html#IC_85
var CI_OnLineFunctionCode={"undefined": Msg_Indefinit,
		"download": {cat: "Descàrrega", spa: "Descarga", eng: "Download", fre: "Téléchargement"},
		"information": {cat: "Informació", spa: "Información", eng: "Information", fre: "Information"},
		"offlineAccess": {cat: "Accés fora de línia", spa: "Acceso fuera de línea", eng: "Offline access", fre: "Accès hors ligne"},
		"order": {cat: "Comandes", spa: "Encargos", eng: "Order", fre: "Commande"},
		"search": {cat: "Cerca", spa: "Búsqueda", eng: "Search", fre: "Recherche"},
		"completeMetadata": {cat: "Metadades completes", spa: "Metadatos completos", eng: "Complete Metadata", fre: "Métadonnées complètes"},
		"browseGraphic": {cat: "Exploració", spa: "Exploración", eng: "View", fre: "Vue"},
		"upload": {cat: "Càrrega", spa: "Carga", eng: "Upload", fre: "Téléversement"},
		"emailService": {cat: "Servei de correu electrònic", spa: "Servicio de correo electrónico", eng: "Email service", fre: "Service courriel"},
		"browsing": {cat: "Navegació", spa: "Navegación", eng: "Browsing", fre: "Ffuretage"},
		"fileAccess":{cat: "Accés a fitxer", spa: "Acceso a fichero", eng: "File access", fre: "Accès au fichier"}};	
			
//CI_PresentationFormCode ...

//CI_DateTypeCode
var CI_DateTypeCode={"undefined": Msg_Indefinit,
		"creation": {cat: "creació", spa: "creación", eng: "creation", fre: "création"},
		"publication": {cat: "publicació", spa: "publicación", eng: "publication", fre: "publication"},
		"revision": {cat: "revisió", spa: "revisión", eng: "revision", fre: "révision"},
		"expiry": {cat: "expiració", spa: "expiración", eng: "expiry", fre: "expiration"},
		"lastUpdate": {cat: "darrera actualització", spa: "última actualitzación", eng: "last update", fre: "dernière mise à jour"},
		"lastRevision": {cat: "darrera revisió", spa: "úlima revisión", eng: "last revision", fre: "dernière révision"},
		"nextUpdate": {cat: "propera actualització", spa: "próxima actualización", eng: "", fre: "prochaine mise à jour"},
		"unavailable": {cat: "no disponible", spa: "no disponible", eng: "unavailable", fre: "non disponible"},
		"inForce": {cat: "en vigor", spa: "en vigor", eng: "in force", fre: "en vigueur"},
		"adopted": {cat: "adoptada", spa: "adoptada", eng: "adopted", fre: "adoptée"},
		"deprecated": {cat: "obsoleta", spa: "obsoleta", eng: "deprecated", fre: "réprouvée"},
		"superseded": {cat: "sustituïda", spa: "sustituida", eng: "superseded", fre: "remplacée"},
		"validityBegins": {cat: "inici validesa", spa: "inicio validez", eng: "validity begin", fre: "début de validité"},
		"validityExpires": {cat: "fi validesa", spa: "fin validez", eng: "validity end", fre: "validité finale"},
		"released": {cat: "divulgación", spa: "divulgación", eng: "release", fre: "sortie"},
		"distribution": {cat: "distribució", spa: "distribución", eng: "distribution", fre: "diffusion"}}

//MD_ScopeCode ...