var wpWidgets;(function(a){wpWidgets={init:function(){var e,d=a("#available-widgets .widget-holder").height()-7,c=a("#widgets-right .widgets-holder-wrap .widgets-sortables:first"),b=c.height();a("#widgets-right div.sidebar-name").click(function(){var f=a(this).siblings(".widgets-sortables");if(f.is(":visible")){f.hide().sortable("disable");a(this).parent().addClass("closed")}else{f.show().sortable("enable").sortable("refresh");a(this).parent().removeClass("closed")}});a("#widgets-left div.sidebar-name").click(function(){if(a(this).siblings(".widget-holder").is(":visible")){a(this).parent().addClass("closed")}else{a(this).parent().removeClass("closed")}});if(d>b){c.css("minHeight",d+"px")}this.addEvents();a(".widget-error").parents(".widget").find("a.widget-action").click();a("#widget-list .widget").draggable({connectToSortable:".widgets-sortables",handle:".widget-title",distance:2,helper:"clone",zIndex:5,start:function(g,f){wpWidgets.fixWebkit(1);f.helper.find(".widget-description").hide()},stop:function(g,f){if(e){a(e).hide()}e="";wpWidgets.fixWebkit()}});a(".widgets-sortables").sortable({placeholder:"widget-placeholder",connectWith:".widgets-sortables",items:".widget",handle:".widget-title",cursor:"move",distance:2,opacity:0.65,start:function(g,f){wpWidgets.fixWebkit(1);f.item.find(".widget-inside").hide();f.item.css({marginLeft:"",width:""})},stop:function(h,f){var g=f.item.find("input.add_new").val(),k=f.item.find("input.multi_number").val(),j=f.item.attr("id"),i=a(this).attr("id");f.item.css({marginLeft:"",width:""});if(g){if("multi"==g){f.item.html(f.item.html().replace(/<[^<>]+>/g,function(l){return l.replace(/__i__|%i%/g,k)}));f.item.attr("id",j.replace(/__i__|%i%/g,k));k++;a("div#"+j).find("input.multi_number").val(k)}else{if("single"==g){f.item.attr("id","new-"+j);e="div#"+j}}wpWidgets.addEvents(f.item);wpWidgets.save(f.item.find("form").serialize(),i,0,0);f.item.find("input.add_new").val("");f.item.find("a.widget-action").click()}wpWidgets.saveOrder(i);wpWidgets.fixWebkit()},receive:function(g,f){if(!a(this).is(":visible")){a(this).sortable("cancel")}}}).not(":visible").sortable("disable")},saveOrder:function(c){a("#"+c).parents(".widgets-holder-wrap").find(".ajax-feedback").css("visibility","visible");var b={action:"widgets-order",savewidgets:a("#_wpnonce_widgets").val(),sidebars:[]};a(".widgets-sortables").each(function(){b["sidebars["+a(this).attr("id")+"]"]=a(this).sortable("toArray").join(",")});a.post(ajaxurl,b,function(){a(".ajax-feedback").css("visibility","hidden")})},save:function(e,f,c,d){a("#"+f).parents(".widgets-holder-wrap").find(".ajax-feedback").css("visibility","visible");var b={action:"save-widget",savewidgets:a("#_wpnonce_widgets").val(),sidebar:f};if(c){b.delete_widget=1}e+="&"+a.param(b);a.post(ajaxurl,e,function(g){var h;a(".ajax-feedback").css("visibility","hidden");if(!d){return}if(c){a(d).parents(".widget").slideUp("normal",function(){a(this).remove()});if(!b.widget_number){h=b["widget-id"];a("#available-widgets .widget-id").each(function(){if(a(this).val()==h){a(this).parents(".widget").show()}})}}else{a(d).parents(".widget-inside").slideUp("normal",function(){a(this).parents(".widget").css({width:"",marginLeft:""})})}})},fixWebkit:function(b){b=b?"none":"";a("body").css({WebkitUserSelect:b,KhtmlUserSelect:b})},addEvents:function(b){b=b||document;a("a.widget-action",b).click(function(){var d=parseInt(a(this).parents(".widget").find(".widget-width").val(),10),e={},c=a(this).parents(".widget-top").siblings(".widget-inside");if(c.is(":hidden")){if(d>250&&c.parents(".widgets-sortables").length){e.width=d+30+"px";if(c.parents(".widget-liquid-right").length){e.marginLeft=234-d+"px"}c.parents(".widget").css(e)}c.slideDown("normal")}else{c.slideUp("normal",function(){c.parents(".widget").css({width:"",marginLeft:""})})}return false});a(".widget-control-save",b).click(function(){wpWidgets.save(a(this).parents("form").serialize(),a(this).parents(".widgets-sortables").attr("id"),0,this);return false});a(".widget-control-remove",b).click(function(){wpWidgets.save(a(this).parents("form").serialize(),a(this).parents(".widgets-sortables").attr("id"),1,this);return false})}};a(document).ready(function(){wpWidgets.init()})})(jQuery);