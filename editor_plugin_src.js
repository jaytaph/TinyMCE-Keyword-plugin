/**
 * Keyword_plugin_src.js
 * Revision: 1.3
 * Date: 2010/01/13 19:48:00
 *
 * Author: Joshua Thijssen <jthijssen@noxlogic.nl>
 *
 * Changelog v1.3:
 *   + Added patch from Louis Clotman louis@clotman.name for the
 *     splitting on configurable keyword_operator
 *
 */

(function() {
	// Load plugin specific language pack
	tinymce.PluginManager.requireLangPack('keyword', 'en,nl');

	tinymce.create('tinymce.plugins.keyword', {
		init : function(ed, url) {
		},


		execCommand : function(command, user_interface, value) {
			// Handle commands
			switch (command) {
			  case "keyword":
					ed.execCommand ('mceInsertContent', false, value);
					ed.addVisual();
					return true;
			}

			// Pass to next handler in chain
			return false;
		},

		createControl : function(n, cm) {
			if (n == "keyword") {

				var mlb = cm.createListBox ('keywordListBox', {
					title : 'Listbox Macros',
					onselect : function (v) {
						tinyMCE.execCommand('mceInsertContent', false, v);
					}
				});

				var keywords = tinyMCE.activeEditor.getParam ("plugin_keyword_list", false);
				var assignmentOperator = tinyMCE.activeEditor.getParam ("plugin_keyword_operator", "=");
				if (! keywords) return mlb;

				keywords = keywords.split (";");

				for (i=0; i<keywords.length; i++) {
					if (keywords[i] != '') {
						var parts = keywords[i].split(assignmentOperator);
						if (parts[0].indexOf ("~") > -1) {
							tmp = parts[0].split ("~");
							mlb.add ('---'+tmp[0]+'----', null);
							parts[0] = tmp[1];
						}
						mlb.add (parts[0], parts[1]);
					}
				}
				return mlb;
			}
			return null;
		},

		getInfo : function() {
			return {
				longname : 'Keyword plugin',
				author : 'Joshua Thijssen <jthijssen@noxlogic.nl>',
				authorurl : 'http://www.noxlogic.nl',
				infourl : 'http://www.noxlogic.nl',
				version : "1.2"
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('keyword', tinymce.plugins.keyword);
})();
