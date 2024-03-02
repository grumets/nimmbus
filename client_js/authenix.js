(function (hello) {

	hello.init({

		"authenix": {

			name: "authenix",

			oauth: {
				version: 2,
				auth: "https://www.authenix.eu/oauth/authorize",
				grant: "https://www.authenix.eu/oauth/token"
			},

			scope: {
				idp: "idp",
				openid: "openid",
				profile: "profile",
				r: "citiobs.secd.eu%23read",
				c: "citiobs.secd.eu%23create",
				u: "citiobs.secd.eu%23update",
				d: "citiobs.secd.eu%23delete"
			},

			login: function (p) {
				p.qs.nonce = "390je0f3f3f2218d9j";
				p.qs.response_type = "token id_token";
			},

			logout: function (callback, o) {

                                var id_token = (o.authResponse || {}).id_token;
                                var logoutUrl = "https://www.authenix.eu/openid/logout";
				var post_logout_redirect_uri = "https://www.tapis.grumets.cat/";

				logoutUrl += "?post_logout_redirect_uri=" + post_logout_redirect_uri + "&id_token_hint=" + id_token; 

				window.location = logoutUrl;
                        },

			base: "https://www.authenix.eu/openid/",

			get: {
				me: "userinfo"
			},

			// Refresh the access_token once expired
			refresh: true,

			locale: 'es_ES',

			// OAuth2 standard defines SPACE as scope delimiter, hello.js defaults to ','
			scope_delim: " "/*,

			//Changed according to: https://github.com/MrSwitch/hello.js/issues/167
			xhr: function (p) {
				var token = p.query.access_token;
				delete p.query.access_token;

				if (token) {
					p.headers = {
						"Authorization": "Bearer " + token
					};
				}

				return true;
			}*/
		}
	});

})(hello);
