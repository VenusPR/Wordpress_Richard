var showNotice,adminMenu,columns,validateForm,screenMeta;(function(a){adminMenu={init:function(){var b=a("#adminmenu");this.favorites();a("#collapse-menu",b).click(function(){if(a("body").hasClass("folded")){adminMenu.fold(1);deleteUserSetting("mfold")}else{adminMenu.fold();setUserSetting("mfold","f")}return false});this.flyout(a("#adminmenu li.wp-has-submenu"));this.fold(!a("body").hasClass("folded"))},restoreMenuState:function(){},flyout:function(c,b){if(b){c.unbind();return}c.hoverIntent({over:function(k){var g,d,i,l,j;g=a(this).find(".wp-submenu");d=a(this).offset().top+g.height()+1;i=a("#wpwrap").height();l=60+d-i;j=a(window).height()+a(window).scrollTop()-15;if(j<(d-l)){l=d-j}if(l>1){g.css({marginTop:"-"+l+"px"})}else{if(g.css("marginTop")){g.css({marginTop:""})}}g.addClass("sub-open")},out:function(){a(this).find(".wp-submenu").removeClass("sub-open")},timeout:220,sensitivity:8,interval:100})},toggle:function(){},fold:function(c){var b=a("#adminmenu li.wp-has-current-submenu");a("body").toggleClass("folded",!c);a("body").toggleClass("expanded",c);this.flyout(b,c);if(c){b.find(".wp-submenu").css("marginTop","0")}},favorites:function(){a("#favorite-inside").width(a("#favorite-actions").width()-4);a("#favorite-toggle, #favorite-inside").bind("mouseenter",function(){a("#favorite-inside").removeClass("slideUp").addClass("slideDown");setTimeout(function(){if(a("#favorite-inside").hasClass("slideDown")){a("#favorite-inside").slideDown(100);a("#favorite-first").addClass("slide-down")}},200)}).bind("mouseleave",function(){a("#favorite-inside").removeClass("slideDown").addClass("slideUp");setTimeout(function(){if(a("#favorite-inside").hasClass("slideUp")){a("#favorite-inside").slideUp(100,function(){a("#favorite-first").removeClass("slide-down")})}},300)})}};a(document).ready(function(){adminMenu.init()});columns={init:function(){var b=this;a(".hide-column-tog","#adv-settings").click(function(){var d=a(this),c=d.val();if(d.prop("checked")){b.checked(c)}else{b.unchecked(c)}columns.saveManageColumnsState()})},saveManageColumnsState:function(){var b=this.hidden();a.post(ajaxurl,{action:"hidden-columns",hidden:b,screenoptionnonce:a("#screenoptionnonce").val(),page:pagenow})},checked:function(b){a(".column-"+b).show();this.colSpanChange(+1)},unchecked:function(b){a(".column-"+b).hide();this.colSpanChange(-1)},hidden:function(){return a(".manage-column").filter(":hidden").map(function(){return this.id}).get().join(",")},useCheckboxesForHidden:function(){this.hidden=function(){return a(".hide-column-tog").not(":checked").map(function(){var b=this.id;return b.substring(b,b.length-5)}).get().join(",")}},colSpanChange:function(b){var d=a("table").find(".colspanchange"),c;if(!d.length){return}c=parseInt(d.attr("colspan"),10)+b;d.attr("colspan",c.toString())}};a(document).ready(function(){columns.init()});validateForm=function(b){return !a(b).find(".form-required").filter(function(){return a("input:visible",this).val()==""}).addClass("form-invalid").find("input:visible").change(function(){a(this).closest(".form-invalid").removeClass("form-invalid")}).size()};showNotice={warn:function(){var b=commonL10n.warnDelete||"";if(confirm(b)){return true}return false},note:function(b){alert(b)}};screenMeta={links:{"screen-options-link-wrap":"screen-options-wrap","contextual-help-link-wrap":"contextual-help-wrap"},init:function(){a(".screen-meta-toggle").click(screenMeta.toggleEvent)},toggleEvent:function(c){var b;c.preventDefault();if(!screenMeta.links[this.id]){return}b=a("#"+screenMeta.links[this.id]);if(b.is(":visible")){screenMeta.close(b,a(this))}else{screenMeta.open(b,a(this))}},open:function(b,c){a(".screen-meta-toggle").not(c).css("visibility","hidden");b.slideDown("fast",function(){c.addClass("screen-meta-active")})},close:function(b,c){b.slideUp("fast",function(){c.removeClass("screen-meta-active");a(".screen-meta-toggle").css("visibility","")})}};a(document).ready(function(){var i=false,b,f,e,d,h,g=a("input.current-page"),c=g.val();a("div.wrap h2:first").nextAll("div.updated, div.error").addClass("below-h2");a("div.updated, div.error").not(".below-h2, .inline").insertAfter(a("div.wrap h2:first"));screenMeta.init();h={doc:a(document),element:a("#user_info"),open:function(){if(!h.element.hasClass("active")){h.element.addClass("active");h.doc.one("click",h.close);return false}},close:function(){h.element.removeClass("active")}};h.element.click(h.open);a("tbody").children().children(".check-column").find(":checkbox").click(function(j){if("undefined"==j.shiftKey){return true}if(j.shiftKey){if(!i){return true}b=a(i).closest("form").find(":checkbox");f=b.index(i);e=b.index(this);d=a(this).prop("checked");if(0<f&&0<e&&f!=e){b.slice(f,e).prop("checked",function(){if(a(this).closest("tr").is(":visible")){return d}return false})}}i=this;return true});a("thead, tfoot").find(".check-column :checkbox").click(function(l){var m=a(this).prop("checked"),k="undefined"==typeof toggleWithKeyboard?false:toggleWithKeyboard,j=l.shiftKey||k;a(this).closest("table").children("tbody").filter(":visible").children().children(".check-column").find(":checkbox").prop("checked",function(){if(a(this).closest("tr").is(":hidden")){return false}if(j){return a(this).prop("checked")}else{if(m){return true}}return false});a(this).closest("table").children("thead,  tfoot").filter(":visible").children().children(".check-column").find(":checkbox").prop("checked",function(){if(j){return false}else{if(m){return true}}return false})});a("#default-password-nag-no").click(function(){setUserSetting("default_password_nag","hide");a("div.default-password-nag").hide();return false});a("#newcontent").bind("keydown.wpevent_InsertTab",function(o){if(o.keyCode!=9){return true}var l=o.target,q=l.selectionStart,k=l.selectionEnd,p=l.value,j,n;try{this.lastKey=9}catch(m){}if(document.selection){l.focus();n=document.selection.createRange();n.text="\t"}else{if(q>=0){j=this.scrollTop;l.value=p.substring(0,q).concat("\t",p.substring(k));l.selectionStart=l.selectionEnd=q+1;this.scrollTop=j}}if(o.stopPropagation){o.stopPropagation()}if(o.preventDefault){o.preventDefault()}});a("#newcontent").bind("blur.wpevent_InsertTab",function(j){if(this.lastKey&&9==this.lastKey){this.focus()}});if(g.length){g.closest("form").submit(function(j){if(a('select[name="action"]').val()==-1&&a('select[name="action2"]').val()==-1&&g.val()==c){g.val("1")}})}});a(document).bind("wp_CloseOnEscape",function(c,b){if(typeof(b.cb)!="function"){return}if(typeof(b.condition)!="function"||b.condition()){b.cb()}return true})})(jQuery);