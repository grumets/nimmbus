(function (hello) {

	hello.init({

		"nextgeoss": {

			name: "NextGEOSS",

			oauth: {
				version: 2,
				auth: "https://um.nextgeoss.eu/oxauth/restv1/authorize",
				grant: "https://um.nextgeoss.eu/oxauth/restv1/token"
			},

			scope: {
				openid: "openid",
				profile: "profile"
			},

			login: function (p) {
				p.qs.nonce = "12345";
				p.qs.response_type = "token id_token";
			},

			logout: function (callback, o) {

				if (o.options.force) {
					var token = (o.authResponse || {}).access_token;
					var revokeUrl = "https://um.nextgeoss.eu/oxauth/restv1/revoke";

					var xhr = new XMLHttpRequest();
					xhr.open("POST", revokeUrl, true);

					// Send the proper header information along with the request
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

					// Call a function when the state changes.
					xhr.onreadystatechange = function () {
						if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
							callback();
						} else {
							return false;
						}
					}

					xhr.send("token=" + token); 
				}
			},

			base: "https://um.nextgeoss.eu/oxauth/restv1/",

			get: {
				me: "userinfo"
			},

			// Refresh the access_token once expired
			refresh: true,

			// OAuth2 standard defines SPACE as scope delimiter, hello.js defaults to ','
			scope_delim: " ",

			// Changed according to: https://github.com/MrSwitch/hello.js/issues/167
			xhr: function (p) {
				var token = p.query.access_token;
				delete p.query.access_token;

				if (token) {
					p.headers = {
						"Authorization": "Bearer " + token
					};
				}

				return true;
			}
		}
	});

})(hello);