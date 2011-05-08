var PubSub,fullscreen,wptitlehint;PubSub=function(){this.topics={}};PubSub.prototype.subscribe=function(a,b){if(!this.topics[a]){this.topics[a]=[]}this.topics[a].push(b);return b};PubSub.prototype.unsubscribe=function(b,e){var c,a,d=this.topics[b];if(!d){return e||[]}if(e){for(c=0,a=d.length;c<a;c++){if(e==d[c]){d.splice(c,1)}}return e}else{this.topics[b]=[];return d}};PubSub.prototype.publish=function(c,b){var d,a,e,f=this.topics[c];if(!f){return}b=b||[];for(d=0,a=f.length;d<a;d++){e=(f[d].apply(null,b)===false||e)}return !e};(function(c){var b,e,d,a;fullscreen=b={};e=b.pubsub=new PubSub();timer=0;block=false;a=b.settings={visible:false,mode:"tinymce",editor_id:"content",title_id:"title",timer:0};d=function(i,h,g){g=g||1250;if(block){return}block=true;setTimeout(function(){block=false},400);if(a.timer){clearTimeout(a.timer)}else{e.publish(i)}function f(){e.publish(h);a.timer=0}a.timer=setTimeout(f,g)};b.on=function(){if(a.visible){return}a.mode=c("#"+a.editor_id).is(":hidden")?"tinymce":"html";if(!a.element){b.ui.init()}a.is_mce_on=a.has_tinymce&&typeof(tinyMCE.get(a.editor_id))!="undefined";b.ui.fade("show","showing","shown")};b.off=function(){if(!a.visible){return}b.ui.fade("hide","hiding","hidden")};b.switchmode=function(g){var f=a.mode;if(!g||!a.visible||!a.has_tinymce){return f}if(f==g){return f}e.publish("switchMode",[f,g]);a.mode=g;e.publish("switchedMode",[f,g]);return g};b.save=function(){var h=c("#hiddenaction"),f=h.val(),i=c("#wp-fullscreen-save img"),g=c("#wp-fullscreen-save span");i.show();b.savecontent();h.val("wp-fullscreen-save-post");c.post(ajaxurl,c("form#post").serialize(),function(j){i.hide();g.show();setTimeout(function(){g.fadeOut(1000)},3000);if(j.last_edited){c("#wp-fullscreen-save input").attr("title",j.last_edited)}},"json");h.val(f)};b.savecontent=function(){var f,g;c("#"+a.title_id).val(c("#wp-fullscreen-title").val());if(a.mode==="tinymce"&&(f=tinyMCE.get("wp_mce_fullscreen"))){g=f.save()}else{g=c("#wp_mce_fullscreen").val()}c("#"+a.editor_id).val(g)};set_title_hint=function(f){if(!f.val().length){f.siblings("label").css("visibility","")}else{f.siblings("label").css("visibility","hidden")}};b.dfw_width=function(h){var g=c("#wp-fullscreen-wrap"),f=g.width();if(!h){g.width(c("#wp-fullscreen-central-toolbar").width());deleteUserSetting("dfw_width");return}if(f<200||f>1200){return}g.width(h+f);setUserSetting("dfw_width",h+f)};e.subscribe("showToolbar",function(){a.topbar.removeClass("fade-1000").addClass("fade-300");b.fade.In(a.topbar,300,function(){e.publish("toolbarShown")},true);c("#wp-fullscreen-body").addClass("wp-fullscreen-focus")});e.subscribe("hideToolbar",function(){a.topbar.removeClass("fade-300").addClass("fade-1000");b.fade.Out(a.topbar,1000,function(){e.publish("toolbarHidden")},true);c("#wp-fullscreen-body").removeClass("wp-fullscreen-focus")});e.subscribe("toolbarShown",function(){a.topbar.removeClass("fade-300")});e.subscribe("toolbarHidden",function(){a.topbar.removeClass("fade-1000")});e.subscribe("show",function(){var f=c("#wp-fullscreen-title").val(c("#"+a.title_id).val());set_title_hint(f);c("#wp-fullscreen-save input").attr("title",c("#last-edit").text());a.textarea_obj.value=edCanvas.value;if(a.has_tinymce&&a.mode==="tinymce"){tinyMCE.execCommand("wpFullScreenInit")}a._edCanvas=edCanvas;edCanvas=a.textarea_obj;a.orig_y=c(window).scrollTop()});e.subscribe("showing",function(){var f=a.mode==="html"?220+a._edCanvas.scrollTop:140+tinyMCE.get(a.editor_id).getBody().scrollTop;c(document.body).addClass("fullscreen-active");b.refresh_buttons();c(document).bind("mousemove.fullscreen",function(g){d("showToolbar","hideToolbar",2000)});d("showToolbar","hideToolbar",2000);b.bind_resize();setTimeout(b.resize_textarea,200);if(f<171){f=0}scrollTo(0,f)});e.subscribe("shown",function(){a.visible=true;if(a.has_tinymce&&!a.is_mce_on){htmled=document.getElementById(a.editor_id),old_val=htmled.value;htmled.value=switchEditors.wpautop(old_val);tinyMCE.settings.setup=function(f){f.onInit.add(function(g){g.hide();delete tinyMCE.settings.setup;g.getElement().value=old_val})};tinyMCE.execCommand("mceAddControl",false,a.editor_id);a.is_mce_on=true}});e.subscribe("hide",function(){b.savecontent();c(document).unbind(".fullscreen");c(a.textarea_obj).unbind(".grow");if(a.has_tinymce&&a.mode==="tinymce"){tinyMCE.execCommand("wpFullScreenSave")}set_title_hint(c("#"+a.title_id));edCanvas=a._edCanvas;edCanvas.value=a.textarea_obj.value});e.subscribe("hiding",function(){if(a.has_tinymce&&a.mode==="tinymce"&&c("#"+a.editor_id).is(":visible")){switchEditors.go(a.editor_id,"tinymce")}else{if(a.mode=="html"&&c("#"+a.editor_id).is(":hidden")){switchEditors.go(a.editor_id,"html")}}c(document.body).removeClass("fullscreen-active");scrollTo(0,a.orig_y)});e.subscribe("hidden",function(){a.visible=false;c("#wp_mce_fullscreen").removeAttr("style");if(a.has_tinymce&&a.is_mce_on){tinyMCE.execCommand("wpFullScreenClose")}a.textarea_obj.value="";b.oldheight=0});e.subscribe("switchMode",function(h,g){var f;if(!a.has_tinymce||!a.is_mce_on){return}f=tinyMCE.get("wp_mce_fullscreen");if(h==="html"&&g==="tinymce"){a.textarea_obj.value=switchEditors.wpautop(a.textarea_obj.value);if("undefined"==typeof(f)){tinyMCE.execCommand("wpFullScreenInit")}else{f.show()}}else{if(h==="tinymce"&&g==="html"){if(f){f.hide()}}}});e.subscribe("switchedMode",function(g,f){b.refresh_buttons(true);if(f==="html"){setTimeout(b.resize_textarea,200)}});b.b=function(){if(a.has_tinymce&&"tinymce"===a.mode){tinyMCE.execCommand("Bold")}};b.i=function(){if(a.has_tinymce&&"tinymce"===a.mode){tinyMCE.execCommand("Italic")}};b.ul=function(){if(a.has_tinymce&&"tinymce"===a.mode){tinyMCE.execCommand("InsertUnorderedList")}};b.ol=function(){if(a.has_tinymce&&"tinymce"===a.mode){tinyMCE.execCommand("InsertOrderedList")}};b.link=function(){if(a.has_tinymce&&"tinymce"===a.mode){tinyMCE.execCommand("WP_Link")}else{wpLink.open()}};b.unlink=function(){if(a.has_tinymce&&"tinymce"===a.mode){tinyMCE.execCommand("unlink")}};b.refresh_buttons=function(f){f=f||false;if(a.mode==="html"){c("#wp-fullscreen-mode-bar").removeClass("wp-tmce-mode").addClass("wp-html-mode");if(f){c("#wp-fullscreen-button-bar").fadeOut(150,function(){c(this).addClass("wp-html-mode").fadeIn(150)})}else{c("#wp-fullscreen-button-bar").addClass("wp-html-mode")}}else{if(a.mode==="tinymce"){c("#wp-fullscreen-mode-bar").removeClass("wp-html-mode").addClass("wp-tmce-mode");if(f){c("#wp-fullscreen-button-bar").fadeOut(150,function(){c(this).removeClass("wp-html-mode").fadeIn(150)})}else{c("#wp-fullscreen-button-bar").removeClass("wp-html-mode")}}}};b.ui={init:function(){var f=a.topbar=c("#fullscreen-topbar");a.element=c("#fullscreen-fader");a.textarea_obj=document.getElementById("wp_mce_fullscreen");a.has_tinymce=typeof(tinyMCE)!="undefined";if(!a.has_tinymce){c("#wp-fullscreen-mode-bar").hide()}if(wptitlehint){wptitlehint("wp-fullscreen-title")}c(document).keyup(function(h){var i=h.charCode||h.keyCode,g;if(!fullscreen.settings.visible){return true}if(navigator.platform&&navigator.platform.indexOf("Mac")!=-1){g=h.ctrlKey}else{g=h.altKey}if(27==i){fullscreen.off()}if(g&&(61==i||187==i)){b.dfw_width(25)}if(g&&(45==i||189==i)){b.dfw_width(-25)}if(g&&48==i){b.dfw_width(0)}return true});f.mouseenter(function(g){c("#fullscreen-topbar").addClass("fullscreen-make-sticky");c(document).unbind(".fullscreen");clearTimeout(a.timer);a.timer=0}).mouseleave(function(g){c("#fullscreen-topbar").removeClass("fullscreen-make-sticky");c(document).bind("mousemove.fullscreen",function(h){d("showToolbar","hideToolbar",2000)})})},fade:function(g,f,h){if(!a.element){b.ui.init()}if(g&&!e.publish(g)){return}b.fade.In(a.element,600,function(){if(f){e.publish(f)}b.fade.Out(a.element,600,function(){if(h){e.publish(h)}})})}};b.fade={transitionend:"transitionend webkitTransitionEnd oTransitionEnd",sensitivity:100,In:function(g,h,i,f){i=i||c.noop;h=h||400;f=f||false;if(b.fade.transitions){if(g.is(":visible")){g.addClass("fade-trigger");return g}g.show();g.one(this.transitionend,function(){i()});setTimeout(function(){g.addClass("fade-trigger")},this.sensitivity)}else{if(f){g.stop()}g.css("opacity",1).fadeIn(h,i)}return g},Out:function(g,h,i,f){i=i||c.noop;h=h||400;f=f||false;if(!g.is(":visible")){return g}if(b.fade.transitions){g.one(b.fade.transitionend,function(){if(g.hasClass("fade-trigger")){return}g.hide();i()});setTimeout(function(){g.removeClass("fade-trigger")},this.sensitivity)}else{if(f){g.stop()}g.fadeOut(h,i)}return g},transitions:(function(){var f=document.documentElement.style;return(typeof(f.WebkitTransition)=="string"||typeof(f.MozTransition)=="string"||typeof(f.OTransition)=="string"||typeof(f.transition)=="string")})()};b.bind_resize=function(){c(a.textarea_obj).bind("keypress.grow click.grow paste.grow",function(){setTimeout(b.resize_textarea,200)})};b.oldheight=0;b.resize_textarea=function(){var f=a.textarea_obj,g;g=f.scrollHeight>300?f.scrollHeight:300;if(g!=b.oldheight){f.style.height=g+"px";b.oldheight=g}}})(jQuery);