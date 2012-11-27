(function(){tinymce.create("tinymce.plugins.wpGallery",{init:function(a,b){var c=this;c.url=b;c.editor=a;c._createButtons();a.addCommand("WP_Gallery",function(){if(tinymce.isIE){a.selection.moveToBookmark(a.wpGalleryBookmark)}var e=a.selection.getNode(),d=wp.media.gallery,f;if(typeof wp==="undefined"||!wp.media||!wp.media.gallery){return}if(e.nodeName!="IMG"||a.dom.getAttrib(e,"class").indexOf("wpGallery")==-1){return}f=d.edit("["+a.dom.getAttrib(e,"title")+"]");f.get("gallery-edit").on("update",function(g){var h=d.shortcode(g).string().slice(1,-1);a.dom.setAttrib(e,"title",h)})});a.onInit.add(function(d){if("ontouchstart" in window){d.dom.events.add(d.getBody(),"touchstart",function(g){var f=g.target;if(f.nodeName=="IMG"&&d.dom.hasClass(f,"wpGallery")){d.selection.select(f);d.dom.events.cancel(g);d.plugins.wordpress._hideButtons();d.plugins.wordpress._showButtons(f,"wp_gallerybtns")}})}});a.onMouseDown.add(function(d,f){if(f.target.nodeName=="IMG"&&d.dom.hasClass(f.target,"wpGallery")){d.plugins.wordpress._hideButtons();d.plugins.wordpress._showButtons(f.target,"wp_gallerybtns")}});a.onBeforeSetContent.add(function(d,e){e.content=c._do_gallery(e.content)});a.onPostProcess.add(function(d,e){if(e.get){e.content=c._get_gallery(e.content)}})},_do_gallery:function(a){return a.replace(/\[gallery([^\]]*)\]/g,function(d,c){return'<img src="'+tinymce.baseURL+'/plugins/wpgallery/img/t.gif" class="wpGallery mceItem" title="gallery'+tinymce.DOM.encode(c)+'" />'})},_get_gallery:function(b){function a(c,d){d=new RegExp(d+'="([^"]+)"',"g").exec(c);return d?tinymce.DOM.decode(d[1]):""}return b.replace(/(?:<p[^>]*>)*(<img[^>]+>)(?:<\/p>)*/g,function(e,d){var c=a(d,"class");if(c.indexOf("wpGallery")!=-1){return"<p>["+tinymce.trim(a(d,"title"))+"]</p>"}return e})},_createButtons:function(){var b=this,a=tinymce.activeEditor,d=tinymce.DOM,e,c,f;if(d.get("wp_gallerybtns")){return}f=(window.devicePixelRatio&&window.devicePixelRatio>1)||(window.matchMedia&&window.matchMedia("(min-resolution:130dpi)").matches);d.add(document.body,"div",{id:"wp_gallerybtns",style:"display:none;"});e=d.add("wp_gallerybtns","img",{src:f?b.url+"/img/edit-2x.png":b.url+"/img/edit.png",id:"wp_editgallery",width:"24",height:"24",title:a.getLang("wordpress.editgallery")});tinymce.dom.Event.add(e,"mousedown",function(h){var g=tinymce.activeEditor;g.wpGalleryBookmark=g.selection.getBookmark("simple");g.execCommand("WP_Gallery");g.plugins.wordpress._hideButtons()});c=d.add("wp_gallerybtns","img",{src:f?b.url+"/img/delete-2x.png":b.url+"/img/delete.png",id:"wp_delgallery",width:"24",height:"24",title:a.getLang("wordpress.delgallery")});tinymce.dom.Event.add(c,"mousedown",function(i){var g=tinymce.activeEditor,h=g.selection.getNode();if(h.nodeName=="IMG"&&g.dom.hasClass(h,"wpGallery")){g.dom.remove(h);g.execCommand("mceRepaint");g.dom.events.cancel(i)}g.plugins.wordpress._hideButtons()})},getInfo:function(){return{longname:"Gallery Settings",author:"WordPress",authorurl:"http://wordpress.org",infourl:"",version:"1.0"}}});tinymce.PluginManager.add("wpgallery",tinymce.plugins.wpGallery)})();