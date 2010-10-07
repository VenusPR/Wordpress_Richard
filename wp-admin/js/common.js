var showNotice,adminMenu,columns,validateForm;(function(a){adminMenu={init:function(){var b=a("#adminmenu");a(".wp-menu-toggle",b).each(function(){var c=a(this),d=c.siblings(".wp-submenu");if(d.length){c.click(function(){adminMenu.toggle(d)})}else{c.hide()}});this.favorites();a(".separator",b).click(function(){if(a("body").hasClass("folded")){adminMenu.fold(1);deleteUserSetting("mfold")}else{adminMenu.fold();setUserSetting("mfold","f")}return false});if(a("body").hasClass("folded")){this.fold()}this.restoreMenuState()},restoreMenuState:function(){a("li.wp-has-submenu","#adminmenu").each(function(c,d){var b=getUserSetting("m"+c);if(a(d).hasClass("wp-has-current-submenu")){return true}if("o"==b){a(d).addClass("wp-menu-open")}else{if("c"==b){a(d).removeClass("wp-menu-open")}}})},toggle:function(b){var c=b.slideToggle(150,function(){b.css("display","")}).parent().toggleClass("wp-menu-open").attr("id");if(c){a("li.wp-has-submenu","#adminmenu").each(function(f,g){if(c==g.id){var d=a(g).hasClass("wp-menu-open")?"o":"c";setUserSetting("m"+f,d)}})}return false},fold:function(b){if(b){a("body").removeClass("folded");a("#adminmenu li.wp-has-submenu").unbind()}else{a("body").addClass("folded");a("#adminmenu li.wp-has-submenu").hoverIntent({over:function(j){var d,c,g,k,i;d=a(this).find(".wp-submenu");c=a(this).offset().top+d.height()+1;g=a("#wpwrap").height();k=60+c-g;i=a(window).height()+a(window).scrollTop()-15;if(i<(c-k)){k=c-i}if(k>1){d.css({marginTop:"-"+k+"px"})}else{if(d.css("marginTop")){d.css({marginTop:""})}}d.addClass("sub-open")},out:function(){a(this).find(".wp-submenu").removeClass("sub-open").css({marginTop:""})},timeout:220,sensitivity:8,interval:100})}},favorites:function(){a("#favorite-inside").width(a("#favorite-actions").width()-4);a("#favorite-toggle, #favorite-inside").bind("mouseenter",function(){a("#favorite-inside").removeClass("slideUp").addClass("slideDown");setTimeout(function(){if(a("#favorite-inside").hasClass("slideDown")){a("#favorite-inside").slideDown(100);a("#favorite-first").addClass("slide-down")}},200)}).bind("mouseleave",function(){a("#favorite-inside").removeClass("slideDown").addClass("slideUp");setTimeout(function(){if(a("#favorite-inside").hasClass("slideUp")){a("#favorite-inside").slideUp(100,function(){a("#favorite-first").removeClass("slide-down")})}},300)})}};a(document).ready(function(){adminMenu.init()});columns={init:function(){var b=this;a(".hide-column-tog","#adv-settings").click(function(){var d=a(this),c=d.val();if(d.attr("checked")){b.checked(c)}else{b.unchecked(c)}columns.saveManageColumnsState()})},saveManageColumnsState:function(){var b=this.hidden();a.post(ajaxurl,{action:"hidden-columns",hidden:b,screenoptionnonce:a("#screenoptionnonce").val(),page:pagenow})},checked:function(b){a(".column-"+b).show()},unchecked:function(b){a(".column-"+b).hide()},hidden:function(){return a(".manage-column").filter(":hidden").map(function(){return this.id}).get().join(",")},useCheckboxesForHidden:function(){this.hidden=function(){return a(".hide-column-tog").not(":checked").map(function(){var b=this.id;return b.substring(b,b.length-5)}).get().join(",")}}};a(document).ready(function(){columns.init()});validateForm=function(b){return !a(b).find(".form-required").filter(function(){return a("input:visible",this).val()==""}).addClass("form-invalid").find("input:visible").change(function(){a(this).closest(".form-invalid").removeClass("form-invalid")}).size()}})(jQuery);showNotice={warn:function(){var a=commonL10n.warnDelete||"";if(confirm(a)){return true}return false},note:function(a){alert(a)}};jQuery(document).ready(function(d){var f=false,a,e,c,b;d("div.wrap h2:first").nextAll("div.updated, div.error").addClass("below-h2");d("div.updated, div.error").not(".below-h2, .inline").insertAfter(d("div.wrap h2:first"));d("#show-settings-link").click(function(){if(!d("#screen-options-wrap").hasClass("screen-options-open")){d("#contextual-help-link-wrap").css("visibility","hidden")}d("#screen-options-wrap").slideToggle("fast",function(){if(d(this).hasClass("screen-options-open")){d("#show-settings-link").css({backgroundImage:'url("images/screen-options-right.gif?ver=20100531")'});d("#contextual-help-link-wrap").css("visibility","");d(this).removeClass("screen-options-open")}else{d("#show-settings-link").css({backgroundImage:'url("images/screen-options-right-up.gif?ver=20100531")'});d(this).addClass("screen-options-open")}});return false});d("#contextual-help-link").click(function(){if(!d("#contextual-help-wrap").hasClass("contextual-help-open")){d("#screen-options-link-wrap").css("visibility","hidden")}d("#contextual-help-wrap").slideToggle("fast",function(){if(d(this).hasClass("contextual-help-open")){d("#contextual-help-link").css({backgroundImage:'url("images/screen-options-right.gif?ver=20100531")'});d("#screen-options-link-wrap").css("visibility","");d(this).removeClass("contextual-help-open")}else{d("#contextual-help-link").css({backgroundImage:'url("images/screen-options-right-up.gif?ver=20100531")'});d(this).addClass("contextual-help-open")}});return false});d("tbody").children().children(".check-column").find(":checkbox").click(function(g){if("undefined"==g.shiftKey){return true}if(g.shiftKey){if(!f){return true}a=d(f).closest("form").find(":checkbox");e=a.index(f);c=a.index(this);b=d(this).attr("checked");if(0<e&&0<c&&e!=c){a.slice(e,c).attr("checked",function(){if(d(this).closest("tr").is(":visible")){return b?"checked":""}return""})}}f=this;return true});d("thead, tfoot").find(".check-column :checkbox").click(function(i){var j=d(this).attr("checked"),h="undefined"==typeof toggleWithKeyboard?false:toggleWithKeyboard,g=i.shiftKey||h;d(this).closest("table").children("tbody").filter(":visible").children().children(".check-column").find(":checkbox").attr("checked",function(){if(d(this).closest("tr").is(":hidden")){return""}if(g){return d(this).attr("checked")?"":"checked"}else{if(j){return"checked"}}return""});d(this).closest("table").children("thead,  tfoot").filter(":visible").children().children(".check-column").find(":checkbox").attr("checked",function(){if(g){return""}else{if(j){return"checked"}}return""})});d("#default-password-nag-no").click(function(){setUserSetting("default_password_nag","hide");d("div.default-password-nag").hide();return false});d("#newcontent").keydown(function(l){if(l.keyCode!=9){return true}var i=l.target,n=i.selectionStart,h=i.selectionEnd,m=i.value,g,k;try{this.lastKey=9}catch(j){}if(document.selection){i.focus();k=document.selection.createRange();k.text="\t"}else{if(n>=0){g=this.scrollTop;i.value=m.substring(0,n).concat("\t",m.substring(h));i.selectionStart=i.selectionEnd=n+1;this.scrollTop=g}}if(l.stopPropagation){l.stopPropagation()}if(l.preventDefault){l.preventDefault()}});d("#newcontent").blur(function(g){if(this.lastKey&&9==this.lastKey){this.focus()}})});