var wpWidgets;(function(a){wpWidgets={init:function(){var c,b=a("div.widgets-sortables");a("#widgets-right").children(".widgets-holder-wrap").children(".sidebar-name").click(function(){var e=a(this).siblings(".widgets-sortables"),d=a(this).parent();if(!d.hasClass("closed")){e.sortable("disable");d.addClass("closed")}else{d.removeClass("closed");e.sortable("enable").sortable("refresh")}});a("#widgets-left").children(".widgets-holder-wrap").children(".sidebar-name").click(function(){a(this).siblings(".widget-holder").parent().toggleClass("closed")});b.not("#wp_inactive_widgets").each(function(){var e=50,d=a(this).children(".widget").length;e=e+parseInt(d*48,10);a(this).css("minHeight",e+"px")});a("a.widget-action").live("click",function(){var f={},g=a(this).closest("div.widget"),d=g.children(".widget-inside"),e=parseInt(g.find("input.widget-width").val(),10);if(d.is(":hidden")){if(e>250&&d.closest("div.widgets-sortables").length){f.width=e+30+"px";if(d.closest("div.widget-liquid-right").length){f.marginLeft=235-e+"px"}g.css(f)}wpWidgets.fixLabels(g);d.slideDown("fast")}else{d.slideUp("fast",function(){g.css({width:"",marginLeft:""})})}return false});a("input.widget-control-save").live("click",function(){wpWidgets.save(a(this).closest("div.widget"),0,1,0);return false});a("a.widget-control-remove").live("click",function(){wpWidgets.save(a(this).closest("div.widget"),1,1,0);return false});a("a.widget-control-close").live("click",function(){wpWidgets.close(a(this).closest("div.widget"));return false});b.children(".widget").each(function(){wpWidgets.appendTitle(this);if(a("p.widget-error",this).length){a("a.widget-action",this).click()}});a("#widget-list").children(".widget").draggable({connectToSortable:"div.widgets-sortables",handle:"> .widget-top > .widget-title",distance:2,helper:"clone",zIndex:5,containment:"document",start:function(f,d){wpWidgets.fixWebkit(1);d.helper.find("div.widget-description").hide()},stop:function(f,d){if(c){a(c).hide()}c="";wpWidgets.fixWebkit()}});b.sortable({placeholder:"widget-placeholder",items:"> .widget",handle:"> .widget-top > .widget-title",cursor:"move",distance:2,containment:"document",start:function(f,d){wpWidgets.fixWebkit(1);d.item.children(".widget-inside").hide();d.item.css({marginLeft:"",width:""})},stop:function(g,d){if(d.item.hasClass("ui-draggable")){d.item.draggable("destroy")}if(d.item.hasClass("deleting")){wpWidgets.save(d.item,1,0,1);d.item.remove();return}var f=d.item.find("input.add_new").val(),j=d.item.find("input.multi_number").val(),i=d.item.attr("id"),h=a(this).attr("id");d.item.css({marginLeft:"",width:""});wpWidgets.fixWebkit();if(f){if("multi"==f){d.item.html(d.item.html().replace(/<[^<>]+>/g,function(e){return e.replace(/__i__|%i%/g,j)}));d.item.attr("id",i.replace(/__i__|%i%/g,j));j++;a("div#"+i).find("input.multi_number").val(j)}else{if("single"==f){d.item.attr("id","new-"+i);c="div#"+i}}wpWidgets.save(d.item,0,0,1);d.item.find("input.add_new").val("");d.item.find("a.widget-action").click();return}wpWidgets.saveOrder(h)},receive:function(f,d){if(!a(this).is(":visible")){a(this).sortable("cancel")}}})..sortable("option","connectWith","div.widgets-sortables").parent().filter(".closed").children(".widgets-sortables").sortable("disable");a("#available-widgets").droppable({tolerance:"pointer",accept:function(d){return a(d).parent().attr("id")!="widget-list"},drop:function(f,d){d.draggable.addClass("deleting");a("#removing-widget").hide().children("span").html("")},over:function(f,d){d.draggable.addClass("deleting");a("div.widget-placeholder").hide();if(d.draggable.hasClass("ui-sortable-helper")){a("#removing-widget").show().children("span").html(d.draggable.find("div.widget-title").children("h4").html())}},out:function(f,d){d.draggable.removeClass("deleting");a("div.widget-placeholder").show();a("#removing-widget").hide().children("span").html("")}})},saveOrder:function(c){if(c){a("#"+c).closest("div.widgets-holder-wrap").find("img.ajax-feedback").css("visibility","visible")}var b={action:"widgets-order",savewidgets:a("#_wpnonce_widgets").val(),sidebars:[]};a("div.widgets-sortables").each(function(){b["sidebars["+a(this).attr("id")+"]"]=a(this).sortable("toArray").join(",")});a.post(ajaxurl,b,function(){a("img.ajax-feedback").css("visibility","hidden")});this.resize()},save:function(g,d,e,b){var h=g.closest("div.widgets-sortables").attr("id"),f=g.find("form").serialize(),c;g=a(g);a(".ajax-feedback",g).css("visibility","visible");c={action:"save-widget",savewidgets:a("#_wpnonce_widgets").val(),sidebar:h};if(d){c.delete_widget=1}f+="&"+a.param(c);a.post(ajaxurl,f,function(i){var j;if(d){if(!a("input.widget_number",g).val()){j=a("input.widget-id",g).val();a("#available-widgets").find("input.widget-id").each(function(){if(a(this).val()==j){a(this).closest("div.widget").show()}})}if(e){b=0;g.slideUp("fast",function(){a(this).remove();wpWidgets.saveOrder()})}else{g.remove();wpWidgets.resize()}}else{a(".ajax-feedback").css("visibility","hidden");if(i&&i.length>2){a("div.widget-content",g).html(i);wpWidgets.appendTitle(g);wpWidgets.fixLabels(g)}}if(b){wpWidgets.saveOrder()}})},appendTitle:function(b){var c=a('input[id*="-title"]',b);if(c=c.val()){c=c.replace(/<[^<>]+>/g,"").replace(/</g,"&lt;").replace(/>/g,"&gt;");a(b).children(".widget-top").children(".widget-title").children().children(".in-widget-title").html(": "+c)}},resize:function(){a("div.widgets-sortables").not("#wp_inactive_widgets").each(function(){var c=50,b=a(this).children(".widget").length;c=c+parseInt(b*48,10);a(this).css("minHeight",c+"px")})},fixWebkit:function(b){b=b?"none":"";a("body").css({WebkitUserSelect:b,KhtmlUserSelect:b})},fixLabels:function(b){b.children(".widget-inside").find("label").each(function(){var c=a(this).attr("for");if(c&&c==a("input",this).attr("id")){a(this).removeAttr("for")}})},close:function(b){b.children(".widget-inside").slideUp("fast",function(){b.css({width:"",marginLeft:""})})}};a(document).ready(function(b){wpWidgets.init()})})(jQuery);