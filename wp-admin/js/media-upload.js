function send_to_editor(b){var a;if(typeof tinyMCE!="undefined"&&(a=tinyMCE.activeEditor)&&!a.isHidden()){a.focus();if(tinymce.isIE){a.selection.moveToBookmark(tinymce.EditorManager.activeEditor.windowManager.bookmark)}if(b.indexOf("[caption")===0){if(a.plugins.wpeditimage){b=a.plugins.wpeditimage._do_shcode(b)}}else{if(b.indexOf("[gallery")===0){if(a.plugins.wpgallery){b=a.plugins.wpgallery._do_gallery(b)}}}a.execCommand("mceInsertContent",false,b)}else{if(typeof edInsertContent=="function"){edInsertContent(edCanvas,b)}else{jQuery(edCanvas).val(jQuery(edCanvas).val()+b)}}tb_remove()}(function(b){var a=function(){var f=b("#TB_window"),e=b(window).width(),d=b(window).height(),c=(720<e)?720:e;if(f.size()){f.width(c-50).height(d-45);b("#TB_iframeContent").width(c-50).height(d-75);f.css({"margin-left":"-"+parseInt(((c-50)/2),10)+"px"});if(typeof document.body.style.maxWidth!="undefined"){f.css({top:"20px","margin-top":"0"})}}return b("a.thickbox").each(function(){var g=b(this).attr("href");if(!g){return}g=g.replace(/&width=[0-9]+/g,"");g=g.replace(/&height=[0-9]+/g,"");b(this).attr("href",g+"&width="+(c-80)+"&height="+(d-85))})};b("a.thickbox").click(function(){if(typeof tinyMCE!="undefined"&&tinyMCE.activeEditor){tinyMCE.get("content").focus();tinyMCE.activeEditor.windowManager.bookmark=tinyMCE.activeEditor.selection.getBookmark("simple")}});b(window).resize(function(){a()});b(document).ready(function(){a()})})(jQuery);