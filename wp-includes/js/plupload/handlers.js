var topWin=window.dialogArguments||opener||parent||top,uploader,uploader_init;function fileDialogStart(){jQuery("#media-upload-error").empty()}function fileQueued(b){jQuery(".media-blank").remove();var a=jQuery("#media-items").children();if(a.length==1){a.removeClass("open").find(".slidetoggle").slideUp(200)}jQuery("#media-items").append('<div id="media-item-'+b.id+'" class="media-item child-of-'+post_id+'"><div class="progress"><div class="percent">0%</div><div class="bar"></div></div><div class="filename original"> '+b.name+"</div></div>");jQuery(".progress",jQuery("#media-item-"+b.id)).fadeIn();jQuery("#insert-gallery").prop("disabled",true)}function uploadStart(){try{if(typeof topWin.tb_remove!="undefined"){topWin.jQuery("#TB_overlay").unbind("click",topWin.tb_remove)}}catch(a){}return true}function uploadProgress(a,b){var c=jQuery("#media-item-"+b.id);jQuery(".bar",c).width((200*b.percent)/100);jQuery(".percent",c).html(b.percent+"%");if(b.percent==100){setTimeout(function(){jQuery(".percent",c).html(pluploadL10n.crunching)},200)}}function fileUploading(c,d){var b=100*1024*1024,a=parseInt(c.settings.max_file_size,10);if(a>b&&d.size>b){setTimeout(function(){if(d.status==2&&d.loaded==0){wpFileError(d,pluploadL10n.big_upload_failed.replace("%1$s",'<a class="uploader-html" href="#">').replace("%2$s","</a>"));if(c.current&&c.current.file.id==d.id&&c.current.xhr.abort){c.current.xhr.abort()}c.removeFile(d)}},5000)}}function updateMediaForm(){var a=jQuery("#media-items").children();if(a.length==1){a.addClass("open").find(".slidetoggle").slideDown();jQuery(".insert-gallery").hide()}else{if(a.length>1){a.removeClass("open");jQuery(".insert-gallery").show()}}if(a.not(".media-blank").length>0){jQuery(".savebutton").show()}else{jQuery(".savebutton").hide()}}function uploadSuccess(c,a){var b=jQuery("#media-item-"+c.id);if(a.match("media-upload-error")){b.html(a);return}prepareMediaItem(c,a);updateMediaForm();if(b.hasClass("child-of-"+post_id)){jQuery("#attachments-count").text(1*jQuery("#attachments-count").text()+1)}}function setResize(a){if(a){if(uploader.features.jpgresize){uploader.settings.resize={width:resize_width,height:resize_height,quality:100}}else{uploader.settings.multipart_params.image_resize=true}}else{delete (uploader.settings.resize);delete (uploader.settings.multipart_params.image_resize)}}function prepareMediaItem(c,a){var d=(typeof shortform=="undefined")?1:2,b=jQuery("#media-item-"+c.id);jQuery(".bar",b).remove();jQuery(".progress",b).hide();try{if(typeof topWin.tb_remove!="undefined"){topWin.jQuery("#TB_overlay").click(topWin.tb_remove)}}catch(g){}if(isNaN(a)||!a){b.append(a);prepareMediaItemInit(c)}else{b.load("async-upload.php",{attachment_id:a,fetch:d},function(){prepareMediaItemInit(c);updateMediaForm()})}}function prepareMediaItemInit(b){var a=jQuery("#media-item-"+b.id);jQuery(".thumbnail",a).clone().attr("class","pinkynail toggle").prependTo(a);jQuery(".filename.original",a).replaceWith(jQuery(".filename.new",a));jQuery("a.toggle",a).click(function(){jQuery(this).siblings(".slidetoggle").slideToggle(350,function(){var d=jQuery(window).height(),e=jQuery(this).offset().top,f=jQuery(this).height(),c;if(d&&e&&f){c=e+f;if(c>d&&(f+48)<d){window.scrollBy(0,c-d+13)}else{if(c>d){window.scrollTo(0,e-36)}}}});if(jQuery(this).is(".describe-toggle-on")){a.addClass("open")}else{a.removeClass("open")}jQuery(this).siblings("a.toggle").focus();return false});jQuery("a.delete",a).click(function(){jQuery.ajax({url:"admin-ajax.php",type:"post",success:deleteSuccess,error:deleteError,id:b.id,data:{id:this.id.replace(/[^0-9]/g,""),action:"trash-post",_ajax_nonce:this.href.replace(/^.*wpnonce=/,"")}});return false});jQuery("a.undo",a).click(function(){jQuery.ajax({url:"admin-ajax.php",type:"post",id:b.id,data:{id:this.id.replace(/[^0-9]/g,""),action:"untrash-post",_ajax_nonce:this.href.replace(/^.*wpnonce=/,"")},success:function(d,e){var c=jQuery("#media-item-"+b.id);if(type=jQuery("#type-of-"+b.id).val()){jQuery("#"+type+"-counter").text(jQuery("#"+type+"-counter").text()-0+1)}if(c.hasClass("child-of-"+post_id)){jQuery("#attachments-count").text(jQuery("#attachments-count").text()-0+1)}jQuery(".filename .trashnotice",c).remove();jQuery(".filename .title",c).css("font-weight","normal");jQuery("a.undo",c).addClass("hidden");jQuery(".menu_order_input",c).show();c.css({backgroundColor:"#ceb"}).animate({backgroundColor:"#fff"},{queue:false,duration:500,complete:function(){jQuery(this).css({backgroundColor:""})}}).removeClass("undo")}});return false});jQuery("#media-item-"+b.id+".startopen").removeClass("startopen").slideToggle(500).siblings(".toggle").toggle()}function wpQueueError(a){jQuery("#media-upload-error").show().html('<div class="error"><p>'+a+"</p></div>")}function wpFileError(b,a){itemAjaxError(b.id,a)}function itemAjaxError(d,c){var b=jQuery("#media-item-"+d),a=b.find(".filename").text();b.html('<div class="error-div"><a class="dismiss" href="#">'+pluploadL10n.dismiss+"</a><strong>"+pluploadL10n.error_uploading.replace("%s",jQuery.trim(a))+"</strong> "+c+"</div>")}function deleteSuccess(b,d){if(b=="-1"){return itemAjaxError(this.id,"You do not have permission. Has your session expired?")}if(b=="0"){return itemAjaxError(this.id,"Could not be deleted. Has it been deleted already?")}var c=this.id,a=jQuery("#media-item-"+c);if(type=jQuery("#type-of-"+c).val()){jQuery("#"+type+"-counter").text(jQuery("#"+type+"-counter").text()-1)}if(a.hasClass("child-of-"+post_id)){jQuery("#attachments-count").text(jQuery("#attachments-count").text()-1)}if(jQuery("form.type-form #media-items").children().length==1&&jQuery(".hidden","#media-items").length>0){jQuery(".toggle").toggle();jQuery(".slidetoggle").slideUp(200).siblings().removeClass("hidden")}jQuery(".toggle",a).toggle();jQuery(".slidetoggle",a).slideUp(200).siblings().removeClass("hidden");a.css({backgroundColor:"#faa"}).animate({backgroundColor:"#f4f4f4"},{queue:false,duration:500}).addClass("undo");jQuery(".filename:empty",a).remove();jQuery(".filename .title",a).css("font-weight","bold");jQuery(".filename",a).append('<span class="trashnotice"> '+pluploadL10n.deleted+" </span>").siblings("a.toggle").hide();jQuery(".filename",a).append(jQuery("a.undo",a).removeClass("hidden"));jQuery(".menu_order_input",a).hide();return}function deleteError(c,b,a){}function uploadComplete(){jQuery("#insert-gallery").prop("disabled",false)}function switchUploader(a){if(a){deleteUserSetting("uploader");jQuery(".media-upload-form").removeClass("html-uploader");if(typeof(uploader)=="object"){uploader.refresh()}}else{setUserSetting("uploader","1");jQuery(".media-upload-form").addClass("html-uploader")}}function dndHelper(a){var b=document.getElementById("dnd-helper");if(a){b.style.display="block"}else{b.style.display="none"}}function uploadError(b,c,a){switch(c){case plupload.FAILED:wpFileError(b,pluploadL10n.upload_failed);break;case plupload.FILE_EXTENSION_ERROR:wpFileError(b,pluploadL10n.invalid_filetype);break;case plupload.FILE_SIZE_ERROR:wpQueueError(pluploadL10n.file_exceeds_size_limit.replace("%s",b.name));break;case plupload.IMAGE_FORMAT_ERROR:wpFileError(b,pluploadL10n.not_an_image);break;case plupload.IMAGE_MEMORY_ERROR:wpFileError(b,pluploadL10n.image_memory_exceeded);break;case plupload.IMAGE_DIMENSIONS_ERROR:wpFileError(b,pluploadL10n.image_dimensions_exceeded);break;case plupload.GENERIC_ERROR:wpQueueError(pluploadL10n.upload_failed);break;case plupload.IO_ERROR:wpQueueError(pluploadL10n.io_error);break;case plupload.HTTP_ERROR:wpQueueError(pluploadL10n.http_error);break;case plupload.INIT_ERROR:jQuery(".media-upload-form").addClass("html-uploader");break;case plupload.SECURITY_ERROR:wpQueueError(pluploadL10n.security_error);break;default:wpFileError(b,pluploadL10n.default_error)}}function uploadSizeError(a,b){var c=b.file;jQuery("#media-items").append('<div id="media-item-'+c.id+'" class="media-item error"><p>'+pluploadL10n.file_exceeds_size_limit.replace("%s",c.name)+"</p></div>");a.removeFile(c)}jQuery(document).ready(function(a){a(".media-upload-form").bind("click.uploader",function(f){var d=a(f.target),b,g;if(d.is('input[type="radio"]')){b=d.closest("tr");if(a(b).hasClass("align")){setUserSetting("align",d.val())}else{if(a(b).hasClass("image-size")){setUserSetting("imgsize",d.val())}}}else{if(d.is("button.button")){g=f.target.className||"";g=g.match(/url([^ '"]+)/);if(g&&g[1]){setUserSetting("urlbutton",g[1]);d.siblings(".urlfield").val(d.attr("title"))}}else{if(d.is("a.dismiss")){d.parents(".media-item").fadeOut(200,function(){a(this).remove()})}else{if(d.is(".upload-flash-bypass a")||d.is("a.uploader-html")){switchUploader(0);return false}else{if(d.is(".upload-html-bypass a")){switchUploader(1);return false}}}}}});uploader_init=function(){uploader=new plupload.Uploader(wpUploaderInit);a("#image_resize").bind("change",function(){var b=a(this).prop("checked");setResize(b);if(b){setUserSetting("upload_resize","1")}else{deleteUserSetting("upload_resize")}});uploader.bind("Init",function(b){setResize(getUserSetting("upload_resize",false));if(b.features.dragdrop){a("#plupload-upload-ui").addClass("drag-drop");a("#drag-drop-area").bind("dragover.wp-uploader",function(){a(this).css("border-color","#ccff55")}).bind("dragleave.wp-uploader, drop.wp-uploader",function(){a(this).css("border-color","")})}else{a("#plupload-upload-ui").removeClass("drag-drop");a("#drag-drop-area").unbind(".wp-uploader")}});uploader.init();uploader.bind("FilesAdded",function(b,c){a("#media-upload-error").html("");uploadStart();b.refresh();b.start()});uploader.bind("BeforeUpload",function(b,c){fileQueued(c)});uploader.bind("UploadFile",function(b,c){fileUploading(b,c)});uploader.bind("UploadProgress",function(b,c){uploadProgress(b,c)});uploader.bind("Error",function(b,c){if(c.code==plupload.FILE_SIZE_ERROR){uploadSizeError(b,c)}else{uploadError(c.file,c.code,c.message);b.refresh()}});uploader.bind("FileUploaded",function(b,d,c){uploadSuccess(d,c.response)});uploader.bind("UploadComplete",function(b,c){uploadComplete()})};if(typeof(wpUploaderInit)=="object"){uploader_init()}});