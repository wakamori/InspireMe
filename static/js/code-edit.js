(function($) {
	var activeSection = "konoha-section";

	// エディタ設定 ///////////////////////////////////////
	var htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-code'), {
	  mode: {name: 'xml', alignCDATA: true},
	  lineNumbers: true
	});
	var cssEditor = CodeMirror.fromTextArea(document.getElementById('css-code'), {
	  mode: {name: 'css', alignCDATA: true},
	  lineNumbers: true
	});

	var konohaEditor = CodeMirror.fromTextArea(document.getElementById('konoha-code'), {
	  lineNumbers: true,
	  matchBrackets: true,
	  mode: 'text/x-java'
	});
	
	var sectionDefaultEditor = {
		'konoha-section': konohaEditor,
		'html-section': htmlEditor,
		'css-section': cssEditor
	};
	
	
	// サイズ調整 ///////////////////////////////////////	
	var headerHeight = $('#header').outerHeight(true) + $('h1.page-header').outerHeight(true);
	var refreshSize = function() {
		// document.innerHeightを調整するため、高さをリセット
		$('#console').height(0);
		$('div.CodeMirror-scroll').height(0);
		var editorHeight = 
			$(document).innerHeight()
			- headerHeight
			- $('#editor-section-tab').outerHeight(true);
		
		var consoleHeight = 
			$(document).innerHeight() - headerHeight - $('#viewer').outerHeight(true);
		
		$('#console').height(consoleHeight);
		$('div.CodeMirror-scroll').height(editorHeight);
		refreshEditor(activeSection);
	};
	
	$(window).resize(refreshSize);
	refreshSize();
	
	
	
	// タブ設定 //////////////////////////////////////
	function refreshEditor(sectionName) {
		if (sectionDefaultEditor[sectionName] != undefined) {
			sectionDefaultEditor[sectionName].refresh();
		}
	}
	
	$('#editor-section-tab a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
		activeSection = $(this).attr('data-toggle');
		// Twitter BootstrapのタブとCodeMirrorを同時に利用するとactivateされたタブのコードが表示されないため、1msしてからリフレッシュ
		setTimeout(function(){refreshEditor(activeSection)}, 1);
	})

})(jQuery);
