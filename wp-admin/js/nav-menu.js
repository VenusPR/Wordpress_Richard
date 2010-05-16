var wpNavMenu;(function(b){var a=wpNavMenu={options:{menuItemDepthPerLevel:30,globalMaxDepth:11},menuList:undefined,targetList:undefined,init:function(){a.menuList=b("#menu-to-edit");a.targetList=a.menuList;this.jQueryExtensions();this.attachMenuEditListeners();this.setupInputWithDefaultTitle();this.attachAddMenuItemListeners();this.attachQuickSearchListeners();this.attachTabsPanelListeners();this.attachHomeLinkListener();if(a.menuList.length){this.initSortables()}this.initToggles();this.initTabManager()},jQueryExtensions:function(){b.fn.extend({menuItemDepth:function(){return a.pxToDepth(this.eq(0).css("margin-left").slice(0,-2))},updateDepthClass:function(d,c){return this.each(function(){var e=b(this);c=c||e.menuItemDepth();b(this).removeClass("menu-item-depth-"+c).addClass("menu-item-depth-"+d)})},shiftDepthClass:function(c){return this.each(function(){var d=b(this),e=d.menuItemDepth();b(this).removeClass("menu-item-depth-"+e).addClass("menu-item-depth-"+(e+c))})},childMenuItems:function(){var c=b();this.each(function(){var d=b(this),f=d.menuItemDepth(),e=d.next();while(e.length&&e.menuItemDepth()>f){c=c.add(e);e=e.next()}});return c},updateParentMenuItemDBId:function(){return this.each(function(){var e=b(this),c=e.find(".menu-item-data-parent-id"),f=e.menuItemDepth(),d=e.prev();if(f==0){c.val(0)}else{while(d.menuItemDepth()!=f-1){d=d.prev()}c.val(d.find(".menu-item-data-db-id").val())}})},hideAdvancedMenuItemFields:function(){return this.each(function(){var c=b(this);b(".hide-column-tog").not(":checked").each(function(){c.find(".field-"+b(this).val()).addClass("hidden-field")})})},addSelectedToMenu:function(c){return this.each(function(){var e=b(this),d={},g=e.find(".tabs-panel-active .categorychecklist li input:checked"),f=new RegExp("menu-item\\[([^\\]]*)");c=c||a.addMenuItemToBottom;if(!g.length){return false}e.find("img.waiting").show();b(g).each(function(){var h=f.exec(b(this).attr("name")),i="undefined"==typeof h[1]?0:parseInt(h[1],10);d[i]=a.getListDataFromID(i)});a.addItemToMenu(d,c,function(){g.removeAttr("checked");e.find("img.waiting").hide()})})}})},initToggles:function(){postboxes.add_postbox_toggles("nav-menus");columns.useCheckboxesForHidden();columns.checked=function(c){b(".field-"+c).removeClass("hidden-field")};columns.unchecked=function(c){b(".field-"+c).addClass("hidden-field")};a.menuList.hideAdvancedMenuItemFields()},initSortables:function(){var m=0,l,j,e,h,n,k,o,d,g,i=a.menuList.offset().left;a.menuList.sortable({handle:".menu-item-handle",placeholder:"sortable-placeholder",start:function(w,v){var p,t,s,q,r,u;g=v.item.children(".menu-item-transport");l=v.item.menuItemDepth();f(v,l);s=(v.item.next()[0]==v.placeholder[0])?v.item.next():v.item;q=s.childMenuItems();g.append(q);p=g.outerHeight();p+=(p>0)?(v.placeholder.css("margin-top").slice(0,-2)*1):0;p+=v.helper.outerHeight();d=p;p-=2;v.placeholder.height(p);r=l;q.each(function(){var x=b(this).menuItemDepth();r=(x>r)?x:r});t=v.helper.find(".menu-item-handle").outerWidth();t+=a.depthToPx(r-l);t-=2;v.placeholder.width(t);u=v.placeholder.next();u.css("margin-top",d+"px");v.placeholder.detach();b(this).sortable("refresh");v.item.after(v.placeholder);u.css("margin-top",0);c(v)},stop:function(s,r){var q,p=m-l;q=g.children().insertAfter(r.item);if(p!=0){r.item.updateDepthClass(m);q.shiftDepthClass(p)}r.item.updateParentMenuItemDBId()},change:function(q,p){if(!p.placeholder.parent().hasClass("menu")){(h.length)?h.after(p.placeholder):a.menuList.prepend(p.placeholder)}c(p)},sort:function(q,p){var s=p.helper.offset(),r=a.pxToDepth(s.left-i);if(r>e||s.top<k){r=e}else{if(r<j){r=j}}if(r!=m){f(p,r)}if(o&&s.top+d>o){n.after(p.placeholder);c(p);b(this).sortable("refreshPositions")}}});function c(p){var q;h=p.placeholder.prev();n=p.placeholder.next();if(h[0]==p.item[0]){h=h.prev()}if(n[0]==p.item[0]){n=n.next()}k=(h.length)?h.offset().top+h.height():0;o=(n.length)?n.offset().top+n.height()/3:0;j=(n.length)?n.menuItemDepth():0;if(h.length){e=((q=h.menuItemDepth()+1)>a.options.globalMaxDepth)?a.options.globalMaxDepth:q}else{e=0}}function f(p,q){p.placeholder.updateDepthClass(q,m);m=q}},attachMenuEditListeners:function(){var c=this;b("#update-nav-menu").bind("click",function(d){if(d.target&&d.target.className){if(-1!=d.target.className.indexOf("item-edit")){return c.eventOnClickEditLink(d.target)}else{if(-1!=d.target.className.indexOf("menu-save")){return c.eventOnClickMenuSave(d.target)}else{if(-1!=d.target.className.indexOf("menu-delete")){return c.eventOnClickMenuDelete(d.target)}else{if(-1!=d.target.className.indexOf("item-delete")){return c.eventOnClickMenuItemDelete(d.target)}else{if(-1!=d.target.className.indexOf("item-close")){return c.eventOnClickCloseLink(d.target)}}}}}}})},setupInputWithDefaultTitle:function(){var c="input-with-default-title";b("."+c).each(function(){var f=b(this),e=f.attr("title"),d=f.val();f.data(c,e);if(""==d){f.val(e)}else{if(e==d){return}else{f.removeClass(c)}}}).focus(function(){var d=b(this);if(d.val()==d.data(c)){d.val("").removeClass(c)}}).blur(function(){var d=b(this);if(""==d.val()){d.addClass(c).val(d.data(c))}})},attachAddMenuItemListeners:function(){var c=b("#nav-menu-meta");c.find(".add-to-menu input").click(function(){b(this).trigger("wp-add-menu-item",[a.addMenuItemToBottom]);return false});c.find(".customlinkdiv").bind("wp-add-menu-item",function(f,d){a.addCustomLink(d)});c.find(".posttypediv, .taxonomydiv").bind("wp-add-menu-item",function(f,d){b(this).addSelectedToMenu(d)})},attachQuickSearchListeners:function(){var c;b(".quick-search").keypress(function(f){var d=b(this);if(13==f.which){a.updateQuickSearchResults(d);return false}if(c){clearTimeout(c)}c=setTimeout(function(){a.updateQuickSearchResults(d)},400)}).attr("autocomplete","off")},updateQuickSearchResults:function(d){var c,g,e=2,f=d.val();if(f.length<e){return}c=d.parents(".tabs-panel");g={action:"menu-quick-search","response-format":"markup",menu:b("#menu").val(),"menu-settings-column-nonce":b("#menu-settings-column-nonce").val(),q:f,type:d.attr("name")};b("img.waiting",c).show();b.post(ajaxurl,g,function(h){a.processQuickSearchQueryResponse(h,g,c)})},addCustomLink:function(c){var e=b("#custom-menu-item-url").val(),d=b("#custom-menu-item-name").val();c=c||a.addMenuItemToBottom;if(""==e||"http://"==e){return false}b(".customlinkdiv img.waiting").show();this.addLinkToMenu(e,d,c,function(){b(".customlinkdiv img.waiting").hide();b("#custom-menu-item-name").val("").blur();b("#custom-menu-item-url").val("http://")})},addLinkToMenu:function(e,d,c,f){c=c||a.addMenuItemToBottom;f=f||function(){};a.addItemToMenu({"-1":{"menu-item-type":"custom","menu-item-url":e,"menu-item-title":d}},c,f)},addItemToMenu:function(e,c,g){var f=b("#menu").val(),d=b("#menu-settings-column-nonce").val();c=c||function(){};g=g||function(){};params={action:"add-menu-item",menu:f,"menu-settings-column-nonce":d,"menu-item":e};b.post(ajaxurl,params,function(h){c(h,params);g()})},addMenuItemToBottom:function(c,d){b(c).hideAdvancedMenuItemFields().appendTo(a.targetList)},addMenuItemToTop:function(c,d){b(c).hideAdvancedMenuItemFields().prependTo(a.targetList)},attachHomeLinkListener:function(){b(".add-home-link",".customlinkdiv").click(function(c){a.addLinkToMenu(navMenuL10n.homeurl,navMenuL10n.home,a.addMenuItemToTop);return false})},attachTabsPanelListeners:function(){b("#menu-settings-column").bind("click",function(h){var f,i,d,j,c,g=b(h.target);if(g.hasClass("nav-tab-link")){d=/#(.*)$/.exec(h.target.href);if(d&&d[1]){d=d[1]}else{return false}j=g.parents(".inside").first();b("input",j).removeAttr("checked");b(".tabs-panel-active",j).removeClass("tabs-panel-active").addClass("tabs-panel-inactive");b("#"+d,j).removeClass("tabs-panel-inactive").addClass("tabs-panel-active");b(".tabs",j).removeClass("tabs");g.parent().addClass("tabs");b(".quick-search",j).focus();return false}else{if(g.hasClass("select-all")){f=/#(.*)$/.exec(h.target.href);if(f&&f[1]){c=b("#"+f[1]+" .tabs-panel-active .menu-item-title input");if(c.length===c.filter(":checked").length){c.removeAttr("checked")}else{c.attr("checked","checked")}return false}}}})},initTabManager:function(){var h=b(".nav-tabs-wrapper"),i=h.children(".nav-tabs"),g=i.children(".nav-tab-active"),l=i.children(".nav-tab"),e=0,m,f,k,d,j=false;function c(){f=h.offset().left;m=f+h.width();g.makeTabVisible()}b.fn.extend({makeTabVisible:function(){var o=this.eq(0),p,n;if(!o.length){return}p=o.offset().left;n=p+o.outerWidth();if(n>m){i.animate({"margin-left":"+="+(m-n)+"px"},"fast")}else{if(p<f){i.animate({"margin-left":"-="+(p-f)+"px"},"fast")}}return o},isTabVisible:function(){var o=this.eq(0),p=o.offset().left,n=p+o.outerWidth();return(n<=m&&p>=f)?true:false}});l.each(function(){e+=b(this).outerWidth(true)});if(e<=h.width()-i.css("padding-left").slice(0,-2)-i.css("padding-right").slice(0,-2)){return}i.css({"margin-right":(-1*e)+"px",padding:0});k=b('<div class="nav-tabs-arrow nav-tabs-arrow-left"><a>&laquo;</a></div>');d=b('<div class="nav-tabs-arrow nav-tabs-arrow-right"><a>&raquo;</a></div>');h.wrap('<div class="nav-tabs-nav"/>').parent().prepend(k).append(d);c();b(window).resize(function(){if(j){return}j=true;setTimeout(function(){c();j=false},1000)});b.each([{arrow:k,next:"next",last:"first",operator:"+="},{arrow:d,next:"prev",last:"last",operator:"-="}],function(){var n=this;this.arrow.mousedown(function(){var p=l[n.last](),o=function(){if(!p.isTabVisible()){i.animate({"margin-left":n.operator+"90px"},300,"linear",o)}};o()}).mouseup(function(){var p,o;i.stop(true);p=l[n.last]();while((o=p[n.next]())&&o.length&&!o.isTabVisible()){p=o}p.makeTabVisible()})})},eventOnClickEditLink:function(c){var e,d=/#(.*)$/.exec(c.href);if(d&&d[1]){e=b("#"+d[1]);if(0!=e.length){if(e.hasClass("menu-item-edit-inactive")){e.slideDown("fast").siblings("dl").andSelf().removeClass("menu-item-edit-inactive").addClass("menu-item-edit-active")}else{e.slideUp("fast").siblings("dl").andSelf().removeClass("menu-item-edit-active").addClass("menu-item-edit-inactive")}return false}}},eventOnClickCloseLink:function(c){b(c).closest(".menu-item-settings").siblings("dl").find(".item-edit").click();return false},eventOnClickMenuSave:function(c){a.menuList.find(".menu-item-data-position").val(function(d){return d+1});return true},eventOnClickMenuDelete:function(c){if(confirm(navMenuL10n.warnDeleteMenu)){return true}else{return false}},eventOnClickMenuItemDelete:function(c){var f,e,d=this;if(confirm(navMenuL10n.warnDeleteMenuItem)){e=/_wpnonce=([a-zA-Z0-9]*)$/.exec(c.href);if(e&&e[1]){f=parseInt(c.id.replace("delete-",""),10);b.post(ajaxurl,{action:"delete-menu-item","menu-item":f,_wpnonce:e[1]},function(g){if("1"==g){d.removeMenuItem(document.getElementById("menu-item-"+f))}});return false}return true}else{return false}},processQuickSearchQueryResponse:function(g,m,c){var h,e,j,f={},d=document.getElementById("nav-menu-meta"),l=new RegExp("menu-item\\[([^\\]]*)","g"),k=g.match(/<li>.*<\/li>/g);if(!k){b(".categorychecklist",c).html("<li><p>"+navMenuL10n.noResultsFound+"</p></li>");b("img.waiting",c).hide();return}h=k.length;while(h--){e=l.exec(k[h]);if(e&&e[1]){j=e[1];while(d.elements["menu-item["+j+"][menu-item-type]"]||f[j]){j--}f[j]=true;if(j!=e[1]){k[h]=k[h].replace(new RegExp("menu-item\\["+e[1]+"\\]","g"),"menu-item["+j+"]")}}}b(".categorychecklist",c).html(k.join(""));b("img.waiting",c).hide()},removeMenuItem:function(d){d=b(d);var c=d.childMenuItems(),e=this;d.addClass("deleting").fadeOut(350,function(){d.remove();c.shiftDepthClass(-1).updateParentMenuItemDBId()})},getListDataFromID:function(k,h){if(!k){return false}h=h||document;var d=["menu-item-db-id","menu-item-object-id","menu-item-object","menu-item-parent-id","menu-item-position","menu-item-type","menu-item-title","menu-item-url","menu-item-description","menu-item-attr-title","menu-item-target","menu-item-classes","menu-item-xfn"],c={},e=h.getElementsByTagName("input"),g=e.length,f;while(g--){f=d.length;while(f--){if(e[g]&&e[g].name&&"menu-item["+k+"]["+d[f]+"]"==e[g].name){c[d[f]]=e[g].value}}}return c},depthToPx:function(c){return c*a.options.menuItemDepthPerLevel},pxToDepth:function(c){return Math.floor(c/a.options.menuItemDepthPerLevel)}};b(document).ready(function(){wpNavMenu.init()})})(jQuery);