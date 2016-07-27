/* ========================================================================
 * Similarity: similarity.js v1.0
 * http://itmanTos.github.io/
 * ======================================================================== */

var Similarity = function (options) {
	this.options = {};
	if (options) {
		for (var i in options) {
			this.options[i] = options[i];
		}
	}    // public functions
    return {
		VERSION: '1.0',
		
		/**
		* @name getLcsRate
		* @description returns similarity based on Longest Common Substring in both two strings
		* 
        * @param {String} s - a string to compute similarity
        * @param {String} t - a string to compute similarity
		*
		* @returns {float} similarity
		*
		* @example
		* <pre>
			var rate = Similarity.getLcsRate("common chars", "longest common string")
		* </pre>
		* 
		*/
		getLcsRate: function (s, t) {
			if (!s || !t) {
				return 0;
			}
			var m = s;
			if (t.length < s.length) {
				s = t;
				t = m;
			}
			
			var max = 0;
			for (var i = 0; i < s.length; i++) {
				if (t.indexOf(s[i]) < 0) {
					continue;
				}
				for (var j=s.length; j > i; j--) {
					if (t.indexOf(s.substring(i, j)) > -1) {
						if (j - i > max) {
							max = j - i;
						}
						break;
					}
				}
			}
			return (max * 2 / (s.length + t.length)).toFixed(4);
		}, 

		/**
		* @name getTccRate
		* @description returns similarity based on common chars in both two strings
		* 
        * @param {String} s - a string to compute similarity
        * @param {String} t - a string to compute similarity
		*
		* @returns {float} similarity
		*
		* @example
		* <pre>
			var rate = Similarity.getTccRate("common chars", "longest common string")
		* </pre>
		* 
		*/
		getTccRate: function (s, t) {
			if (!s || !t) {
				return 0;
			}
			var m = s;
			if (t.length < s.length) {
				s = t;
				t = m;
			}
			return __getCCR(s, t);

			// private function: get common chars rate
			function __getCCR(s, t) {
				var n = 0;
				var len = s.length + t.length;
				for (var i = s.length - 1; i > -1; i--) {
					if (t.indexOf(s[i]) > -1) {
						n += 2;
						t = t.replace(s[i], "");
					}
				}
				return (n / len).toFixed(4);
			}
		},

		/**
		* @name get
		* @description returns similarity based on common chars/longest common substring in both two strings
		* 
        * @param {String} s - a string to compute similarity
        * @param {String} t - a string to compute similarity
        * @param {String} c - [optional] default: 0.5 how important the common char rate in fanal result
        * @param {String} l - [optional] default: 0.3 how important the longest common substring rate in fanal result
		*
		* @returns {float} similarity
		*
		* @example
		* <pre>
			var rate = Similarity.get("common chars", "longest common string")
		//	var rate = Similarity.get("common chars", "longest common string", 0.6, 0.4);
		* </pre>
		* 
		*/
		get: function (s, t, c, l) {
			return (this.getTccRate(s,t) * (c || 0.5) + this.getLcsRate(s,t) * (l || 0.5)).toFixed(4);
		},

		/**
		* @name getSmartRate
		* @description returns similarity based on common chars/comon substrings/longest common substring in both two strings
		*          If need get high precise result more fast, use get function instead.
		* 
        * @param {String} s - a string to compute similarity
        * @param {String} t - a string to compute similarity
        * @param {String} c - [optional] default: 0.5 how important the common char rate in fanal result
        * @param {String} sl - [optional] default: 0.2 how important the common string slices rate in fanal result
        * @param {String} l - [optional] default: 0.3 how important the longest common string rate in fanal result
		*
		* @returns {float} similarity
		*
		* @example
		* <pre>
			var rate = Similarity.getSmartRate("common chars", "longest common string")
		//	var rate = Similarity.getSmartRate("common chars", "longest common string", 0.4, 0.4, 0.2);
		* </pre>
		* 
		*/
		getSmartRate: function getSmartRate (s, t, c, sl, l) {
			if (!s || !t) {
				return 0;
			}
			var m = s;
			if (t.length < s.length) {
				s = t;
				t = m;
			}
			var len = t.length;
			var cs = [];
			// finds out all matched sub strings
			for (var i = 0; i < s.length; i++) {
				if (t.indexOf(s[i]) < 0) {
					continue;
				}
				if (i == s.length - 1) {
					if (!cs[1]) {
						cs[1] = [];
					}
					cs[1].push(s[i]);
					continue;
				}
				for (var j = i + 1; j <= s.length; j++) {
					if (t.indexOf(s.substring(i, j)) > -1 && j < s.length) {
						continue;
					}

					if (!cs[j - i]) {
						cs[j - i] = [];
					}
					cs[j - i].push(s.substring(i, j == s.length ? j : j - 1));
					i = j - 1;
					break;
				}
			}
			
			// removes all duplicated matched strings 
			var lst = [];
			for (var i = s.length; i > -1; i--) {
				if (!i in cs || !cs[i]) {
					continue;
				}
				for (var j = 0; j < cs[i].length; j++) {
					if (t.indexOf(cs[i][j]) < 0) {
						continue;
					}
					// only keep all available sub strings - not included in longer strings
					t = t.replace(cs[i][j], "\n");
					lst.push(cs[i][j]);
				}
			}

			// common chars
			m = lst.join("").length;
			return (m / len * (c || 0.5) + (1 - lst.length / m) * (sl || 0.2) + ((lst[0] || "").length / len) * (l || 0.3)).toFixed(4);
		}
	}
}();
