
$('#design_file_form').submit(function(event){
      event.preventDefault();   

    var alertbox = document.getElementById("popup1");
    var alertmessage = document.getElementById("pop_alert");
    var alerttype = document.getElementById("pop_type");
    var inputfile = $('#dropzone').val();
    var formData = new FormData(this);

    if (inputfile != '') {
        $.ajax({
            url: '/uploads/design/files',
            type: 'POST',
            data: formData,
            beforeSend: function() {

               $('#loadingPop').removeClass('show-hide');
               },
            success: function (data) {
              setTimeout(function() {
              $('#loadingPop').addClass('show-hide');
              $('#multipleDesign').html('');
                alertbox.classList.remove("show-hide");
                $('#pop_type').text('Success');
                $('#dropzone').val(''); 
                $('#pop_alert').text('Files Uploaded succefully');
                $('#file-show-d').html(data.data);
                $('#UploadDesId').val(data.id);
                $('#uploadUnique').val(data.unique);
                $('#pop_btn').click(function () {
                  $('#popup1').addClass('show-hide');
                });
              }, (4 * 1000));
            },
            cache: false,
            contentType: false,
            processData: false
        });
    }
});

function deleteFiledesign(Id, Uniqueid){
        var id = Id;
        var Uid = Uniqueid;
        $.ajax({
              headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
              },
              method: "POST",
              url: '/uploads/design/files/delete/'+id+'/'+Uid,
              data: { UpdFileId : id },
              beforeSend: function() {
                   $('#loadingPop').removeClass('show-hide');
              },
              success: function(data){
                  setTimeout(function() {
                  $('#loadingPop').addClass('show-hide');
                    $('#popup1').removeClass("show-hide");
                    $('#pop_type').text('Success');
                    $('#pop_alert').text('Files Delete succefully');
                    $('#file-show-d').html(data);
                    $('#pop_btn').click(function () {
                      $('#popup1').addClass('show-hide');
                    });
                  }, (4 * 1000));
            }
        })
}

$('#design_form').submit(function(event){
      event.preventDefault();   

    var alertbox = document.getElementById("popup1");
    var alertmessage = document.getElementById("pop_alert");
    var alerttype = document.getElementById("pop_type");

    var formData = new FormData(this);

    $.ajax({
        url: '/uploads/design/post',
        type: 'POST',
        data: formData,
        beforeSend: function() {
           $('#loadingPop').removeClass('show-hide');
           },
        success: function (data) {
          $('#loadingPop').addClass('show-hide');
            alertbox.classList.remove("show-hide");
            $('#pop_type').text('Success');
            $('#pop_alert').text(data);
            $('#pop_btn').click(function () {
              $("#design_form")[0].reset();
               window.location.reload();
            });
        },
        cache: false,
        contentType: false,
        processData: false
    });
});




$('#designEdit_form').submit(function(event){
      event.preventDefault();   
    var alertbox = document.getElementById("popup1");
    var alertmessage = document.getElementById("pop_alert");
    var alerttype = document.getElementById("pop_type");
    var id = $('#DesignID').val();

    var formData = new FormData(this);

    $.ajax({
        url: '/edit/design/update/'+id ,
        type: 'POST',
        data: formData,
        beforeSend: function() {
            $('#saved').text("Loading...");
            $('#saved').css('background', '#cccccc');
           $('#saved').prop("disabled", true);
           },
        success: function (data) {
            alertbox.classList.remove("show-hide");
            $('#pop_type').text('Success');
            $('#pop_alert').text(data);
            $('#pop_btn').click(function () {
              $("#designEdit_form")[0].reset();
               window.location.reload();
            });
        },
        cache: false,
        contentType: false,
        processData: false
    });
});


/*====================================== Delete Post Design ===========================================*/

$('#deleteDesignPost').submit(function(event){
      event.preventDefault();  

       var id = $('#DesignPostId').val();

    var formData = new FormData(this);

    $.ajax({
        url: '/delete/design/'+id,
        type: 'POST',
        data: formData,
        beforeSend: function() {
            $('#designDelete').text("Loading...");
            $('#designDelete').css('background', '#cccccc');
           $('#designDelete').prop("disabled", true);
           },
        success: function (data) {
            // $('#deleteDesignClose').click(function () {
              window.location.reload();
            // });

        },
        cache: false,
        contentType: false,
        processData: false
    });
});


$('#titleDesign').keyup(function(){
  var alertbox = document.getElementById("popup1");
  var alertmessage = document.getElementById("pop_alert");
  var alerttype = document.getElementById("pop_type");
  var title = $(this).val();



  $.ajax({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      method: "POST",
      url: '/uploads/design/title',
      data: { titleDesign : title },
      success: function(data){
        if(data == '0') {

        }else{
            alertbox.classList.remove("show-hide");
            $('#pop_type').text('Error');
            $('#pop_alert').text(data);
            $('#pop_btn').click(function () {
            alertbox.classList.add("show-hide");
            });
        }

      }
})
});



// $('#thumbnailDesign').keyup(function(){
//   var alertbox = document.getElementById("popup1");
//   var alertmessage = document.getElementById("pop_alert");
//   var alerttype = document.getElementById("pop_type");
//   var thumbnail = $(this).val();

//     var Extension = thumbnail.substring(thumbnail.lastIndexOf('.') + 1).toLowerCase();

//     if (Extension == "gif" || Extension == "png" || Extension == "jpeg" || Extension == "jpg" || Extension == "svg") {
//     }else{
//             alertbox.classList.remove("show-hide");
//             $('#pop_type').text('Error');
//             $('#pop_alert').text('Image only allows file types of GIF, PNG, JPG, JPEG, SVG, and MP4 !');
//             $('#pop_btn').click(function () {
//             alertbox.classList.add("show-hide");
//             });
//     }
// });

// ==================================== Comment turn off Button ====================================================

$('[data-commentoffdesign]').on('click', function(e) {


        var self = $(this),
        id = self.data('commentoffdesign');

        $.ajax({
              headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
              },
              method: "POST",
              url: '/commentoff/design/upload/'+id,
              data: { UniqueId : id },
              success: function(data){
                   
                  $('#'+id).html(data.data);

                  $("#errorPopup").removeClass("show-hide");
                  $("#error-id").html('You have succefully '+ data.message +' box !');
                    setTimeout(function() {
                       $("#errorPopup").addClass("show-hide");
                  }, (4 * 1000));
             
            
            }
        })
});


//============================================= Design Multiple File upload ==========================================================

let generate_file_list = files => {

  var element = document.getElementById("deleteFile");
  element.classList.remove("hide");
   document.getElementById('stepButton1').disabled = false;

        document.querySelector('.file_list').innerHTML = [...files].map(file => `
          <div class="file_uploaded_item"  style="color:white;">
            <svg id="Layer_1" data-name="Layer 1" style="width: 34px;margin-right: 23px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 274.9 343.4"><defs><style>.cls-1,.cls-3{fill:#0c0824;}.cls-2{fill:#f7f7f7;}.cls-3{font-size:100.88px;font-family:ArialRoundedMTBold, Arial Rounded MT Bold;}.cls-4{letter-spacing:-0.01em;}</style></defs><title>file sv</title><path class="cls-1" d="M1022.3,779.3l-225.9-.6a23.8,23.8,0,0,1-23.7-24.1l.6-294.7a23.9,23.9,0,0,1,23.9-24l158.5,1.3,91.9,103.5-1.5,214.6A23.9,23.9,0,0,1,1022.3,779.3Z" transform="translate(-772.7 -435.9)"/><path class="cls-2" d="M1013,766.2l-207.3-.5a19.3,19.3,0,0,1-19.2-19.4l.7-279a19.3,19.3,0,0,1,19.2-19.4l159.2.4,67.2,76.3-.6,222.2A19.2,19.2,0,0,1,1013,766.2Z" transform="translate(-772.7 -435.9)"/><text class="cls-3" transform="matrix(1.04, 0, 0, 1, 47.29, 220.76)"><tspan class="cls-4">F</tspan><tspan x="59.6" y="0">ile</tspan></text><path class="cls-1" d="M1047.6,541.7H979.2a24.1,24.1,0,0,1-23.7-24.2l.2-79.2v-1Z" transform="translate(-772.7 -435.9)"/></svg>
            <div>
              <div class="editorTitle">${file.name}</div>
              <p>${file.size}kb | ${file.type}</p>
            </div>
          </div>
        `).join(' ')
}

const inputElement = document.getElementById("dropzone")
inputElement.addEventListener("change", function() {
    const fileList = this.files;
    generate_file_list(document.getElementById("dropzone").files)
    console.log(document.getElementById("dropzone").files)
}, false)


function deleteData(){
  $("#multipleDesign").html(" ");
  $('#dropzone').val(' '); 
}



// $('#sellcode').keyup(function(evt)
//        {
//           var alertbox = document.getElementById("popup1");

//           var charCode = (evt.which) ? evt.which : evt.keyCode;
//           if (charCode != 46 && charCode > 31 
//             && (charCode < 48 || charCode > 57))
//           {
//             alertbox.classList.remove("show-hide");
//             $('#pop_type').text('Error');
//             $('#pop_alert').text('Only number are allowed !');
//             $('#pop_btn').click(function () {
//             alertbox.classList.add("show-hide");
//             });
//           }
// });




    function readFile(input) {

        if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function(e) {

              for (var i=0; i<input.files.length; i++) {
                  var fname = input.files[i].name; 
                  var re = /(\.mp4)$/i;
                  
                  var Extension = fname.substring(fname.lastIndexOf('.') + 1).toLowerCase();

                  if (Extension == "gif" || Extension == "png" || Extension == "jpeg" || Extension == "jpg" || Extension == "svg" || Extension == "mp4") {

                  } else{
                    $('#thumbnailDesign').val(''); 
                    alert('System only allows file types of GIF, PNG, JPG, JPEG, SVG, and MP4 !');

                  }
              } 

              if(!re.exec(fname))
              {

                          var length = input.files.length;

                          // alert(length);
                          if ( length > 1 && length <= 4){

                            // $("#thumbnailDesign").val('');
                            $('#multipleSlidePreview').empty();
                            $('#slideLabel').empty();
                            $.each(input.files, function(i, v) {
                            var n = i + 1;
                            var File = new FileReader();
                            File.onload = function(event) {

                                var htmlPreview ='    <div class="mySlides fades" id="img-'+n+'"><img  src="' + event.target.result + '" style="width:100%;padding: 2%;width: 100%;height: 28em;"></div>';
                                $('#multipleSlidePreview').append(htmlPreview);

                                var slideLabel ='<span class="dot" onclick="currentSlide('+n+')"></span> ';
                                $('#slideLabel').append(slideLabel);
                                // var slidelabelFor ='<label for=slide'+n+'></label>';
                                //   $('#slidelabelFor').append(slidelabelFor);
                                $('#img-2').css('display', 'block');
                                };
                                $('#multipleI').removeClass('hidden');
                                $('#singleI').empty();
                                $('#multiVideoImages').addClass('hidden');
                                $("#imgInp1").val('');
                                $('#shot-1').empty();
                                $('#shot-1').addClass('hidden');
                                $("#imgInp2").val('');
                                $('#shot-2').empty();
                                $('#shot-2').addClass('hidden');
                                $('#preview-zone').removeClass('hidden');

                                File.readAsDataURL(input.files[i]);

                            });

                          }else if(length == 1) {
                              // $("#thumbnailDesign").val('');
                              $('#singleI').empty();
                              var htmlPreview ='<img width="100%" style="height: 29em;border: 9px solid white; background: white;border-radius: 7px;" src="' + e.target.result + '" />' +
                              '<p style="display:none;">' + input.files[0].name + '</p>';

                       
                                $('#multipleI').addClass('hidden');
                                $('#multipleSlidePreview').empty();
                                $('#slideLabel').empty();
                                $('#multiVideoImages').addClass('hidden');
                                $("#imgInp1").val('');
                                $('#shot-1').empty();
                                $('#shot-1').addClass('hidden');
                                $("#imgInp2").val('');
                                $('#shot-2').empty();
                                $('#shot-2').addClass('hidden');
                                $('#preview-zone').removeClass('hidden');


                          }else{
                              alert('Only 4 images allowed!');
                          }

              }else{

                      var length = input.files.length;
                      if ( length > 1 && length <= 2){

                            var FileSize = input.files[0].size / 1024 / 1024; // in MB
                            if (FileSize >= 80){
                                alert('Your file size higher than 80 MB');
                                $("#thumbnailDesign").val('');
                                $('#preview-zone').addClass('hidden');
                            }else{
                                    var videoMaxTime = "02:30"; //minutes:seconds   //video
                                    // var uploadMax = 31457280; //bytes  //30MB

                                    //for seconds to time
                                    function secondsToTime(in_seconds) {
                                      var time = '';
                                      in_seconds = parseFloat(in_seconds.toFixed(2));

                                      var hours = Math.floor(in_seconds / 3600);
                                      var minutes = Math.floor((in_seconds - (hours * 3600)) / 60);
                                      var seconds = in_seconds - (hours * 3600) - (minutes * 60);
                                      //seconds = Math.floor( seconds );
                                      seconds = seconds.toFixed(0);

                                      if (hours < 10) {
                                        hours = "0" + hours;
                                      }
                                      if (minutes < 10) {
                                        minutes = "0" + minutes;
                                      }
                                      if (seconds < 10) {
                                        seconds = "0" + seconds;
                                      }
                                      var time = minutes + ':' + seconds;

                                      return time;
                                    }

                                    var videoElement = document.createElement('video');
                                    videoElement.src = e.target.result;
                                    var timer = setInterval(function() {
                                      
                                      if (videoElement.readyState === 4) {
                                        getTime = secondsToTime(videoElement.duration);
                                        if (getTime > videoMaxTime) {
                                            alert('Your video duration higher than 30 sec');
                                            $("#thumbnailDesign").val('');
                                            $('#preview-zone').addClass('hidden');
                                        }else{

                                       // alert(VideoDuration);
                                       // $("#thumbnailDesign").val('');
                                       $('#singleI').empty();
                                        $('#singleI').html('<div class="video"><video width="100%" style="height:28em;border: 9px solid white; background: white;border-radius: 7px;"  class="thevideo" loop><source src="' + e.target.result + '" type="video/mp4"></video></div>');
                                        // '<p style="display:none;">' + input.files[0].name + '</p>'
                                        $('#multipleI').addClass('hidden');
                                        $('#multipleSlidePreview').empty();
                                        $('#slideLabel').empty();
                                        $('#multiVideoImages').removeClass('hidden');
                                        $('#preview-zone').removeClass('hidden');

                                        }
                                        
                                        clearInterval(timer);
                                      }
                                    }, 500)
                             
                            }
                      }else if(length == 1){
                            var FileSize = input.files[0].size / 1024 / 1024; // in MB
                            if (FileSize >= 80){
                                alert('Your file size higher than 80 MB');
                                $("#thumbnailDesign").val('');
                                $('#preview-zone').addClass('hidden');
                            }else{
                                    var videoMaxTime = "02:30"; //minutes:seconds   //video
                                    // var uploadMax = 31457280; //bytes  //30MB

                                    //for seconds to time
                                    function secondsToTime(in_seconds) {
                                      var time = '';
                                      in_seconds = parseFloat(in_seconds.toFixed(2));

                                      var hours = Math.floor(in_seconds / 3600);
                                      var minutes = Math.floor((in_seconds - (hours * 3600)) / 60);
                                      var seconds = in_seconds - (hours * 3600) - (minutes * 60);
                                      //seconds = Math.floor( seconds );
                                      seconds = seconds.toFixed(0);

                                      if (hours < 10) {
                                        hours = "0" + hours;
                                      }
                                      if (minutes < 10) {
                                        minutes = "0" + minutes;
                                      }
                                      if (seconds < 10) {
                                        seconds = "0" + seconds;
                                      }
                                      var time = minutes + ':' + seconds;

                                      return time;
                                    }

                                    var videoElement = document.createElement('video');
                                    videoElement.src = e.target.result;
                                    var timer = setInterval(function() {
                                      
                                      if (videoElement.readyState === 4) {
                                        getTime = secondsToTime(videoElement.duration);
                                        if (getTime > videoMaxTime) {
                                            alert('Your video duration higher than 30 sec');
                                            $("#thumbnailDesign").val('');
                                            $('#preview-zone').addClass('hidden');
                                        }else{

                                       // alert(VideoDuration);
                                       // $("#thumbnailDesign").val('');
                                       $('#singleI').empty();
                                        $('#singleI').html('<div class="video"><video width="100%" style="height:28em;border: 9px solid white; background: white;border-radius: 7px;"  class="thevideo" loop><source src="' + e.target.result + '" type="video/mp4"></video></div>');
                                        // '<p style="display:none;">' + input.files[0].name + '</p>'
                                        $('#multipleI').addClass('hidden');
                                        $('#multipleSlidePreview').empty();
                                        $('#slideLabel').empty();
                                        $('#multiVideoImages').removeClass('hidden');
                                        $('#preview-zone').removeClass('hidden');

                                        }
                                        
                                        clearInterval(timer);
                                      }
                                    }, 500)
                             
                            }

                      }     
                                
              }

              var wrapperZone = $(input).parent();
              var boxZone = $(input).parent().parent().find('.preview-zone').find('.box').find('.box-body').find('#singleI');
              wrapperZone.removeClass('dragover');
              // boxZone.empty();
              boxZone.append(htmlPreview);
              // $("#thumbnailDesign").val('');


          };

            reader.readAsDataURL(input.files[0]);

        }
    }

    function reset(e) {
        e.wrap('<form>').closest('form').get(0).reset();
        e.unwrap();
    }

    $(".dropzone").change(function() {
        readFile(this);
    });

    // $('.dropzone-wrapper').on('dragover', function(e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     $(this).addClass('dragover');
    // });

    // $('.dropzone-wrapper').on('dragleave', function(e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     $(this).removeClass('dragover');
    // });

    $('.remove-preview').on('click', function(){

        var previewZone = $(this).parents('.preview-zone');
        var dropzone = $(this).parents('.form-group').find('.dropzone');
        $('#multipleSlidePreview').empty();
        $('#slideLabel').html('');
        // reset(dropzone);
         $('#singleI').empty();
        $("#thumbnailDesign").val('');
        previewZone.addClass('hidden');
        $('#multiVideoImages').addClass('hidden');
        $("#imgInp1").val('');
        $('#shot-1').empty();
        $('#shot-1').addClass('hidden');
        $("#imgInp2").val('');
        $('#shot-2').empty();
        $('#shot-2').addClass('hidden');


    });







function readURL1(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function(e) {

      $('#shot-1').html('<img id="blah1" style="width: 43%;height: 5em;margin: 0;" src="'+e.target.result+'"  />');

    }
     $('#shot-1').removeClass('hidden');
    reader.readAsDataURL(input.files[0]);

  }
}

$("#imgInp1").change(function() {
  readURL1(this);
});






function readURL2(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function(e) {
      $('#shot-2').html('<img id="blah1" style="width: 43%;height: 5em;margin: 0;" src="'+e.target.result+'"  />');
    }
    $('#shot-2').removeClass('hidden');
    reader.readAsDataURL(input.files[0]);
  }
}

$("#imgInp2").change(function() {
  readURL2(this);
});





//============================ Step upload count =====================================================



function nextStep2(){
    $("#file-designc").addClass("show-hide");
    $("#step-dash-2").css("color", "#ff084a");
    $("#step-dash-2").css("border", "dashed 2px #ff084a");
    $("#step-h6-2").css("color", "#ff084a");
    $("#step-design-1").addClass("show-hide");
    $("#step-design-3").addClass("show-hide");
    $("#buttonStep1").addClass("show-hide");
    $("#buttonStep3").addClass("show-hide");

    $("#step-dash-1").css("color", "#1e1e1e");
    $("#step-dash-1").css("border", "dashed 2px #1e1e1e");
    $("#step-h6-1").css("color", "#1e1e1e");
    $("#step-design-2").removeClass("show-hide");
    $("#buttonStep2").removeClass("show-hide");
    
}

function previewStep1(){
  
    $("#file-designc").removeClass("show-hide");
    $("#step-dash-1").css("color", "#ff084a");
    $("#step-dash-1").css("border", "dashed 2px #ff084a");
    $("#step-h6-1").css("color", "#ff084a");
    $("#step-design-2").addClass("show-hide");
    $("#step-design-3").addClass("show-hide");
    $("#buttonStep2").addClass("show-hide");
    $("#buttonStep3").addClass("show-hide");

    $("#step-dash-2").css("color", "#1e1e1e");
    $("#step-dash-2").css("border", "dashed 2px #1e1e1e");
    $("#step-h6-2").css("color", "#1e1e1e");
    $("#step-design-1").removeClass("show-hide");
    $("#buttonStep1").removeClass("show-hide");

}

function nextStep3(){
    $("#step-dash-3").css("color", "#ff084a");
    $("#step-dash-3").css("border", "dashed 2px #ff084a");
    $("#step-h6-3").css("color", "#ff084a");
    $("#step-design-1").addClass("show-hide");
    $("#step-design-2").addClass("show-hide");
    $("#buttonStep1").addClass("show-hide");
    $("#buttonStep2").addClass("show-hide");

    $("#step-dash-2").css("color", "#1e1e1e");
    $("#step-dash-2").css("border", "dashed 2px #1e1e1e");
    $("#step-h6-2").css("color", "#1e1e1e");
    $("#step-design-3").removeClass("show-hide");
    $("#buttonStep3").removeClass("show-hide");

}

function previewStep2(){
    $("#step-dash-2").css("color", "#ff084a");
    $("#step-dash-2").css("border", "dashed 2px #ff084a");
    $("#step-h6-2").css("color", "#ff084a");
    $("#step-design-1").addClass("show-hide");
    $("#step-design-3").addClass("show-hide");
    $("#buttonStep1").addClass("show-hide");
    $("#buttonStep3").addClass("show-hide");

    $("#step-dash-3").css("color", "#1e1e1e");
    $("#step-dash-3").css("border", "dashed 2px #1e1e1e");
    $("#step-h6-3").css("color", "#1e1e1e");
    $("#step-design-2").removeClass("show-hide");
    $("#buttonStep2").removeClass("show-hide");

}

