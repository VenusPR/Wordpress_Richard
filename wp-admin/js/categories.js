jQuery(document).ready(function(c){var b=false,e,d,a;if(document.forms.addcat.category_parent){b=document.forms.addcat.category_parent.options}e=function(h,g){var f,i;f=c("<span>"+c("name",h).text()+"</span>").html();i=c("cat",h).attr("id");b[b.length]=new Option(f,i);d(h,g)};d=function(f,h){var g=c(h.parsed.responses[0].data);if(g.length==1){inlineEditTax.addEvents(c(g.id))}};a=function(g,f){var i=c("cat",g).attr("id"),h;for(h=0;h<b.length;h++){if(i==b[h].value){b[h]=null}}};if(b){c("#the-list").wpList({addAfter:e,delAfter:a})}else{c("#the-list").wpList({addAfter:d})}});