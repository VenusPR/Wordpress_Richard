(function(i,j){var c=function(m,l,d){if(m.addEventListener){m.addEventListener(l,d,false)}else{if(m.attachEvent){m.attachEvent("on"+l,function(){return d.call(m,window.event)})}}},e,f=new RegExp("\\bhover\\b","g"),a=[],g=function(l){var d=a.length;while(d--){if(a[d]&&l==a[d][1]){return a[d][0]}}return false},h=function(d){while(d&&d!=e&&d!=i){if("LI"==d.nodeName.toUpperCase()){var l=g(d);if(l){clearTimeout(l)}d.className=d.className?(d.className.replace(f,"")+" hover"):"hover"}d=d.parentNode}},k=function(d){while(d&&d!=e&&d!=i){if("LI"==d.nodeName.toUpperCase()){(function(l){var m=setTimeout(function(){l.className=l.className?l.className.replace(f,""):""},500);a[a.length]=[m,l]})(d)}d=d.parentNode}},b=function(n){var m=n.target||n.srcElement,d,l;if("undefined"==typeof adminBarL10n){return}while(m&&m!=e&&m!=i&&(!m.className||-1==m.className.indexOf("ab-get-shortlink"))){m=m.parentNode}if(m&&m.className&&-1!=m.className.indexOf("ab-get-shortlink")){d=i.getElementsByTagName("link");if(!d.length){d=i.links}l=d.length;if(n.preventDefault){n.preventDefault()}n.returnValue=false;while(l--){if(d[l]&&"shortlink"==d[l].getAttribute("rel")){prompt(adminBarL10n.url,d[l].href);return false}}alert(adminBarL10n.noShortlink);return false}};c(j,"load",function(){var d=i.getElementsByTagName("body")[0],l=i.getElementById("adminbar-search");e=i.getElementById("wpadminbar");if(d&&e){d.appendChild(e);c(e,"mouseover",function(m){h(m.target||m.srcElement)});c(e,"mouseout",function(m){k(m.target||m.srcElement)});c(e,"click",b)}if(l){if(""==l.value){l.value=l.getAttribute("title")}l.onblur=function(){this.value=""==this.value?this.getAttribute("title"):this.value};l.onfocus=function(){this.value=this.getAttribute("title")==this.value?"":this.value}}if(j.location.hash){j.scrollBy(0,-32)}})})(document,window);