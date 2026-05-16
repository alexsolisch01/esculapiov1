var id = 0;
ConsultarEmpresa();

// ===== CONFIGURACIÓN =====
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB (parametrizable)

// ===== DRAG & CLICK =====

$('.logo-uploader').on('dragover', function (e) {
    e.preventDefault();
    $(this).addClass('dragover');
});

$('.logo-uploader').on('dragleave', function () {
    $(this).removeClass('dragover');
});

$('.logo-uploader').on('drop', function (e) {
    e.preventDefault();
    let input = $(this).find('input')[0];
    input.files = e.originalEvent.dataTransfer.files;
    handleImage(input);
});

// ===== CHANGE =====
$('#Logo1, #Logo2').on('change', function () {
    handleImage(this);
});

// ===== VALIDACIÓN + CROP =====
function handleImage(input) {
    let file = input.files[0];

    if (!file) return;
    
    // ✔ VALIDAR TIPO
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/bmp"
    ];

    /*if (!file.type.startsWith('image/')) {
        swal("Esculapio", "Solo imágenes permitidas", "warning");
        return;
    }*/
    if (!allowedTypes.includes(file.type)) {
        swal("Esculapio", "Formato permitido: JPG, PNG, SVG, BMP", "warning");
        input.value = "";
        return;
    }

    if (file.size > MAX_FILE_SIZE) {
        swal("Esculapio", "Máximo permitido 2MB", "warning");
        input.value = "";
        return;
    }

    //currentInput = input;

    let reader = new FileReader();
    /*reader.onload = function (e) {
        openCropper(e.target.result);
    };*/
    reader.onload = function (e) {

        let previewId = input.id === "Logo1"
            ? "#previewLogo1"
            : "#previewLogo2";

        $(previewId).css({
            "background-image": "url(" + e.target.result + ")",
            "background-size": "contain",
            "background-position": "center",
            "background-repeat": "no-repeat",
            "background-color": "#fff"
        });
    };
    reader.readAsDataURL(file);
}

$(".body").on('click', "button#ModificarEmpresa", function(ev) {
    $(".body").on('submit', "form#RegistroEmpresa", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var razon = $(this).find('input#Razon').val().trim();
        var ruc = $(this).find('input#RucAdmi').val().trim();
        
        if (!validarRUC(ruc)) {
            swal("Esculapio!", "RUC inválido", "error");
            return;
        }
        
        var actividad = $(this).find('input#Actividad').val().trim();
        var direccion = $(this).find('input#DireccionEmpre').val().trim();
        var telefono = $(this).find('input#TelefonoEmpre').val().trim();
        var horario = $(this).find('input#HorarioEmpre').val().trim();
        var tipo = $(this).find('select#PersoneriaEmpre').val().trim();
        var repre = $(this).find('input#RepreAdmin').val().trim();
        var correo1 = $(this).find('input#CorreoEmpre1').val().trim();
        var correo2 = $(this).find('input#CorreoEmpre2').val().trim();
        var correo3 = $(this).find('input#CorreoEmpre3').val().trim();
        var institucion = $(this).find('select#Tipoinstitucion').val().trim();

        var logo1 = $('.body').find('input#Logo1')[0].files[0];
        var logo2 = $('.body').find('input#Logo2')[0].files[0];

        if(institucion==0){
            swal("Esculapio!", "Seleccione el tipo de institución..!", "warning");
            return;
        }
        var limpiar = $(this).find('button#LimpiarEmpresa');
        var t = $('#datatableEmpresas').DataTable();
        var campos = {
            razon,
            ruc,
            telefono,
            direccion,
            correo1
        };
        if (CamposLLenos(campos)) {
            return;
        }
        swal({
            title: "Esculapio",
            text: "Seguro que Desea Modificar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                ModificarEmpresa(razon, ruc, actividad, direccion, telefono,horario, tipo, repre, correo1, correo2, correo3,institucion,logo1,logo2, limpiar, t);
            } else {
            }
        });
    });
});

function ModificarEmpresa(razon, ruc, actividad, direccion, telefono,horario, tipo, repre, correo1, correo2, correo3,institucion,logo1,logo2, limpiar, t) {
    
    var formData = new FormData();
    formData.append('Requerimiento',"ModificaEmpresa");
    formData.append('Razon',razon);
    formData.append('RucAdmi',ruc);
    formData.append('Actividad',actividad);
    formData.append('DireccionEmpre',direccion);
    formData.append('TelefonoEmpre',telefono);
    formData.append('HorarioEmpre',horario);
    formData.append('TipoEmpre',tipo);
    formData.append('RepreAdmin',repre);
    formData.append('HostSmtp',$("#hostSmtp").val());
    formData.append('PuertoSmtp',$("#puertoSmtp").val());
    formData.append('SmtpSecure',$("#cbmSmtpSecure").val());
    formData.append('CorreoEmpre1',correo1);
    formData.append('PsdCorreo1',$("#PsdCorreo1").val());
    formData.append('CorreoEmpre2',correo2);
    formData.append('PsdCorreo2',$("#PsdCorreo2").val());
    formData.append('CorreoEmpre3',correo3);
    formData.append('PsdCorreo3',$("#PsdCorreo3").val());
    formData.append('Institucion',institucion);
    formData.append('Logo1',logo1);
    formData.append('Logo2',logo2);            
    formData.append('Id',id);         
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Empresa.php",
        data: formData,
        contentType: false, 
        processData: false,
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Empresa Modificada..!", "success");
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Guardar La Empresa..!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$('.body').on('click', '#CancelarEmpresa, #CerrarEmpresa', function (e) {
    e.preventDefault();
    swal({
        title: "Esculapio",
        text: "Desea continuar, los datos se perderan.",
        icon: "warning",
        buttons: ["No", "Si"],
        dangerMode: true,
    }).then((confirm) => {
        if (confirm) {
            window.location.href = "index.php";
        }
    });
});

function ConsultarEmpresa() {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Empresa.php",
        dataType: 'JSON',
        data: {
            Requerimiento: "ConsultarEmpresa"
        }
    }).done(function(respuesta) {
        var razon = $('form#RegistroEmpresa').find('input#Razon');
        var ruc = $('form#RegistroEmpresa').find('input#RucAdmi');
        var actividad = $('form#RegistroEmpresa').find('input#Actividad');
        var direccion = $('form#RegistroEmpresa').find('input#DireccionEmpre');
        var telefono = $('form#RegistroEmpresa').find('input#TelefonoEmpre');
        var tipo = $('form#RegistroEmpresa').find('select#PersoneriaEmpre');
        var repre = $('form#RegistroEmpresa').find('input#RepreAdmin');
        var correo1 = $('form#RegistroEmpresa').find('input#CorreoEmpre1');
        var correo2 = $('form#RegistroEmpresa').find('input#CorreoEmpre2');
        var correo3 = $('form#RegistroEmpresa').find('input#CorreoEmpre3');
        var institucion = $('form#RegistroEmpresa').find('select#Tipoinstitucion');
        var horario = $('form#RegistroEmpresa').find('#HorarioEmpre');
        var logo1 = $('form#RegistroEmpresa').find('#Logo1');
        var logo2 = $('form#RegistroEmpresa').find('#Logo2');
        razon.val(respuesta[0][1]);
        ruc.val(respuesta[0][15]);
        actividad.val(respuesta[0][2]);
        direccion.val(respuesta[0][3]);
        telefono.val(respuesta[0][4]);
        tipo.val(respuesta[0][6]);
        repre.val(respuesta[0][7]);
        correo1.val(respuesta[0][5]);
        correo2.val(respuesta[0][13]);
        correo3.val(respuesta[0][14]);
        id = respuesta[0][0];
        institucion.val(respuesta[0][16]);
        horario.val(respuesta[0][18]);

        var imagen1 = respuesta[0][17];
        var imagen2 = respuesta[0][19];
        
        $("#PsdCorreo1").val(respuesta[0][20])
        $("#PsdCorreo2").val(respuesta[0][21])
        $("#PsdCorreo3").val(respuesta[0][22])

        $("#hostSmtp").val(respuesta[0][23])
        $("#puertoSmtp").val(respuesta[0][24])
        $("#cbmSmtpSecure").val(respuesta[0][25])

        if (imagen1 == "") {
            imagen1 = "imagenes/imagen.png";
        }
        if (imagen2 == "") {
            imagen2 = "imagenes/imagen.png";
        }
        let logo1Path = $("#logo1Empresa").val();
        let logo2Path = $("#logo2Empresa").val();

        if (logo1Path) {
            $("#previewLogo1").css("background-image", "url(" + logo1Path + ")");
        }

        if (logo2Path) {
            $("#previewLogo2").css("background-image", "url(" + logo2Path + ")");
        }
        /*logo1.parent().css({
            "background": "url('" + imagen1 + "') no-repeat",
            "background-size": "cover",
            "height": "10em",
            "background-position": "center center"
        });
        logo2.parent().css({
            "background": "url('" + imagen2 + "') no-repeat",
            "background-size": "cover",
            "height": "10em",
            "background-position": "center center"
        });*/

        $('.selectpicker').selectpicker('refresh');
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}

function validarRUC(ruc) {
    if (ruc.length !== 13) return false;

    var provincia = parseInt(ruc.substring(0, 2));
    if (provincia < 1 || provincia > 24) return false;

    var tercer = parseInt(ruc[2]);

    // PERSONA NATURAL
    if (tercer < 6) {
        var coef = [2,1,2,1,2,1,2,1,2];
        var suma = 0;

        for (var i = 0; i < 9; i++) {
            var val = coef[i] * parseInt(ruc[i]);
            suma += (val >= 10) ? val - 9 : val;
        }

        var dig = (10 - (suma % 10)) % 10;
        return dig == ruc[9];
    }

    // PERSONA JURIDICA
    if (tercer == 9) {
        var coef = [4,3,2,7,6,5,4,3,2];
        var suma = 0;

        for (var i = 0; i < 9; i++) {
            suma += coef[i] * parseInt(ruc[i]);
        }

        var dig = 11 - (suma % 11);
        dig = (dig == 11) ? 0 : dig;

        return dig == ruc[9];
    }

    return false;
}

$(document).on('change', '#RucAdmi', function () {
    var ruc = $(this).val();

    if (!validarRUC(ruc)) {
        swal("Esculapio", "RUC inválido", "warning");
        $(this).focus();
    }
});

$(document).on('click', '.toggle-password', function () {
    var target = $($(this).data('target'));
    var type = target.attr('type') === 'password' ? 'text' : 'password';

    target.attr('type', type);

    $(this).toggleClass('glyphicon-eye-open glyphicon-eye-close');

    $(this).attr('title', type === 'password'
        ? 'Mostrar contraseña'
        : 'Ocultar contraseña'
    );
});

function uploadLogo(file, inputId) {

    let uploader = inputId === "Logo1"
        ? "#uploaderLogo1"
        : "#uploaderLogo2";

    let progressBar = inputId === "Logo1"
        ? "#progressLogo1"
        : "#progressLogo2";

    $(uploader).addClass("loading");

    let formData = new FormData();
    formData.append("file", file);
    formData.append("Requerimiento", "SubirLogo"); // crea endpoint

    $.ajax({
        url: "Ajax/Aj_Empresa.php",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,

        xhr: function () {
            let xhr = new window.XMLHttpRequest();

            xhr.upload.addEventListener("progress", function (e) {
                if (e.lengthComputable) {
                    let percent = (e.loaded / e.total) * 100;
                    $(progressBar).css("width", percent + "%");
                }
            });

            return xhr;
        },

        success: function (res) {
            $(uploader).removeClass("loading");
            $(progressBar).css("width", "0%");

            // opcional: actualizar sesión o path
        },

        error: function () {
            $(uploader).removeClass("loading");
            swal("Error", "No se pudo subir imagen", "error");
        }
    });
}

function updatePreviewAndFile(base64) {

    let previewId = currentInput.id === "Logo1"
        ? "#previewLogo1"
        : "#previewLogo2";

    $(previewId).css({
        "background-image": "url(" + base64 + ")",
        "background-size": "contain",
        "background-color": "#fff"
    });

    fetch(base64)
        .then(res => res.blob())
        .then(blob => {

            let file = new File([blob], "logo.jpg", { type: "image/jpeg" });

            // 🔥 AUTO UPLOAD AQUÍ
            uploadLogo(file, currentInput.id);
        });
}     

//let cropper = null;
//let currentInput = null;

// ===== MODAL CROP =====
/*function openCropper(image) {

    let modal = `
    <div class="modal fade" id="modalCrop">
      <div class="modal-dialog modal-cropper">
        <div class="modal-content">
          <div class="modal-body">
                <div style="margin-bottom:10px;">
                    <button class="btn btn-default btn-sm" id="rotateLeft">↺ Rotar</button>
                    <button class="btn btn-default btn-sm" id="rotateRight">↻ Rotar</button>
                    <button class="btn btn-default btn-sm" id="zoomIn">＋</button>
                    <button class="btn btn-default btn-sm" id="zoomOut">－</button>
                    <button class="btn btn-default btn-sm" id="resetCrop">Reset</button>
                </div>
                <img id="cropImage">
            </div>
          <div class="modal-footer">
            <button class="btn btn-default" data-dismiss="modal">Cancelar</button>
            <button class="btn btn-success" id="cropConfirm">Aceptar</button>
          </div>
        </div>
      </div>
    </div>`;

    $('body').append(modal);

    $('#cropImage').attr('src', image);

    $('#modalCrop').modal('show');

    $('#modalCrop').on('shown.bs.modal', function () {
        cropper = new Cropper(document.getElementById('cropImage'), {
            aspectRatio: 1,
            viewMode: 1,
            responsive: true,
            autoCropArea: 0.8,
            movable: true,
            zoomable: true,
            rotatable: true,
            scalable: true
        });
    });

    $('#cropConfirm').on('click', function () {

        let canvas = cropper.getCroppedCanvas({
            width: 400,
            height: 400
        });

        compressImage(canvas.toDataURL('image/jpeg', 0.8));
        $('#modalCrop').modal('hide');
    });

    $('#modalCrop').on('hidden.bs.modal', function () {
        cropper.destroy();
        $('#modalCrop').remove();
    });
}

// ===== COMPRESIÓN =====
function compressImage(base64) {

    let img = new Image();
    img.src = base64;

    img.onload = function () {

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');

        canvas.width = 400;
        canvas.height = 400;

        ctx.drawImage(img, 0, 0, 400, 400);

        let compressed = canvas.toDataURL('image/jpeg', 0.7);

        updatePreviewAndFile(compressed);
    };
}

// ===== ACTUALIZAR PREVIEW + FILE =====
function updatePreviewAndFile(base64) {

    let previewId = currentInput.id === "Logo1"
        ? "#previewLogo1"
        : "#previewLogo2";

    $(previewId).css("background-image", "url(" + base64 + ")");

    // convertir base64 a File
    fetch(base64)
        .then(res => res.blob())
        .then(blob => {

            let file = new File([blob], "logo.jpg", { type: "image/jpeg" });

            let dt = new DataTransfer();
            dt.items.add(file);

            currentInput.files = dt.files;
        });
}*/

// CONTROLES
/*$(document).on('click', '#rotateLeft', function () {
    cropper.rotate(-90);
});

$(document).on('click', '#rotateRight', function () {
    cropper.rotate(90);
});

$(document).on('click', '#zoomIn', function () {
    cropper.zoom(0.1);
});

$(document).on('click', '#zoomOut', function () {
    cropper.zoom(-0.1);
});

$(document).on('click', '#resetCrop', function () {
    cropper.reset();
});*/
/*function filePreview(input) {
    
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function (e) {
            $(input).parent().css({"background-image": "url("+e.target.result+") ", "background-size": "cover","height":"10em","background-position":"center center"});           
        }        
    }

}*/
/*$('.body').find('input#Logo1').change(function () {

      filePreview(this);
});
$('.body').find('input#Logo2').change(function () {

      filePreview(this);
});*/
/*function filePreview(input) {
    
    var file = input.files[0];
    if (!file.type.startsWith("image/")) {
        swal("Esculapio", "Solo se permiten imágenes", "warning");
        return;
    }

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            $(input).parent().css({
                "background-image": "url(" + e.target.result + ")",
                "background-size": "cover",
                "background-position": "center",
                "background-repeat": "no-repeat"
            });
        };

        reader.readAsDataURL(input.files[0]);
    }
}*/