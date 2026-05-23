function obtenerCSRFToken() {
    return $('meta[name="csrf-token"]').attr('content') || '';
}

function validarFortalezaContrasena(password) {
    const tiene_minuscula = /[a-z]/.test(password);
    const tiene_mayuscula = /[A-Z]/.test(password);
    const tiene_numero = /[0-9]/.test(password);
    const tiene_especial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const tiene_longitud = password.length >= 8 && password.length <= 128;
    
    return {
        valido: tiene_minuscula && tiene_mayuscula && tiene_numero && tiene_especial && tiene_longitud,
        errores: []
    };
}

function mostrarRequisitosContrasena() {
    return '<small class="text-muted d-block mt-2">Requisitos: Min 8 caracteres, máx 128, mayúscula, minúscula, número, especial</small>';
}

$(".body").on('click', "button#IniciarSesion", function(evt) {
    evt.preventDefault();
    IniciarSesion($('input#Pass').val());
});

$(document).on('click', '#ForgotPasswordLink', function(evt) {
    evt.preventDefault();
    $('#modalForgotPassword').modal('show');
});

$('#forgotPasswordForm').on('submit', function(evt) {
    try {
        evt.preventDefault();
        var usuarioInput = $.trim($('#ForgotUsuario').val());
        if (!usuarioInput) {
            if (typeof swal === 'function') {
                swal(NOMBRE_APLICACION, "Ingrese su usuario o correo electrónico.", "warning");
            } else {
                alert('Ingrese su usuario o correo electrónico.');
            }
            return;
        }
        // show loading indicator and disable submit (only if elements exist)
        if ($('#forgotLoading').length) { $('#forgotLoading').show(); }
        if ($('#SubmitForgotPassword').length) { $('#SubmitForgotPassword').prop('disabled', true); }

        $.ajax({
        method: "POST",
        url: "Ajax/Aj_Usuario.php",
        data: {
            Requerimiento: "OlvidoContrasena",
            Usuario: usuarioInput,
            csrf_token: obtenerCSRFToken()
        },
        dataType: 'JSON'
        }).done(function(respuesta) {
        if (respuesta && respuesta.valido === true) {
            $('#modalForgotPassword').modal('hide');
            $('#ForgotUsuario').val('');
            swal(NOMBRE_APLICACION, respuesta.mensaje || "Solicitud enviada.", "success");
        } else {
            swal(NOMBRE_APLICACION,
                 (respuesta && respuesta.mensaje) || "No se pudo procesar la solicitud.",
                 "warning");
        }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error("Error en la petición AJAX:", jqXHR.statusText, errorThrown);
            if (typeof swal === 'function') {
                swal(NOMBRE_APLICACION, "Ocurrió un error al enviar la solicitud. Inténtelo de nuevo.", "error");
            } else {
                alert('Ocurrió un error al enviar la solicitud. Inténtelo de nuevo.');
            }
        }).always(function() {
            // hide loading and re-enable submit regardless of outcome
            if ($('#forgotLoading').length) { $('#forgotLoading').hide(); }
            if ($('#SubmitForgotPassword').length) { $('#SubmitForgotPassword').prop('disabled', false); }
        });
    } catch (e) {
        console.error('Error manejando forgotPasswordForm submit:', e);
        if ($('#forgotLoading').length) { $('#forgotLoading').hide(); }
        if ($('#SubmitForgotPassword').length) { $('#SubmitForgotPassword').prop('disabled', false); }
    }
});

function IniciarSesion(psd){
   $.ajax({
        method: "POST",
        url: "Ajax/Aj_Usuario.php",
        data: {
            Requerimiento: "IniciarSesion",
            Usuario: $('input#Usuario').val(),
            Pass: psd,
            csrf_token: obtenerCSRFToken()
        },
        dataType: 'JSON',
    }).done(function(respuesta) {    
    
        if (respuesta[0]=='NuevoUsuario' || respuesta[0]=='UsuarioTemporal') {
            var titulo = (respuesta[0]=='NuevoUsuario') ? "Por favor cambie su contraseña antes de continuar" : "Se detectó contraseña temporal. Debe cambiar su contraseña antes de continuar";
            mostrarDialogoNuevaContrasena(respuesta[1], titulo);
        }

        if (respuesta[0]=='UsuarioNormal') {
            window.location.href = "index.php";
        }
        if (respuesta[0]=='UsuarioIncorrecto') {
            swal(NOMBRE_APLICACION, "El Usuario Es Incorrecto", "warning");                                     
        }
        if (respuesta[0]=='UsuarioBloqueado') {
            swal(NOMBRE_APLICACION, respuesta[1] || "Usuario bloqueado por exceso de intentos.", "error");                                     
        }
        if (respuesta[0]=='PsdIncorrecta') {
            swal(NOMBRE_APLICACION, "La Contraseña Es Incorrecta", "warning");                                     
        }
        if (respuesta[0]=='ContraseñaTemporalExpirada') {
            swal(NOMBRE_APLICACION, respuesta[1] || "La contraseña temporal ha expirado.", "error");                                     
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal(NOMBRE_APLICACION, "Ocurrio un error !  " + errorThrown, "error");
    }); 
}

function mostrarDialogoNuevaContrasena(usuarioId, titulo) {
    swal({
        title: titulo,
        content: {
            element: "div",
            attributes: {
                innerHTML: '<input type="password" id="PrimeraPass" placeholder="Nueva contraseña" class="form-control mb-2">' +
                           mostrarRequisitosContrasena() +
                           '<input type="password" id="SegundaPass" placeholder="Confirmar contraseña" class="form-control mt-3">'
            }
        }
    }).then(value => {
        let primera = $('#PrimeraPass').val();
        let segunda = $('#SegundaPass').val();
        
        if (!primera || !segunda) {
            swal(NOMBRE_APLICACION, "Ingrese las dos contraseñas", "warning");
            return;
        }
        
        if (primera !== segunda) {
            swal(NOMBRE_APLICACION, "Las contraseñas no coinciden", "warning");
            return;
        }
        
        // Validar fortaleza en cliente
        if (!validarFortalezaContrasena(primera).valido) {
            swal(NOMBRE_APLICACION, "Contraseña débil. Cumpla con todos los requisitos:\nMin 8 caracteres\nMayúscula\nMinúscula\nNúmero\nCarácter especial", "warning");
            return;
        }
        
        ModificarContra(usuarioId, primera);
    });
}

function ModificarContra(id, segundo){  
    $.ajax({
        method:"POST",
        url:"Ajax/Aj_Usuario.php",
        data: {
            Requerimiento:"ModificaContra",
            Segundo: segundo,
            Id: id,
            csrf_token: obtenerCSRFToken()
        },
        dataType: "JSON",
    }).done(function(respuesta) {
        if(respuesta.valido === true){
            swal(NOMBRE_APLICACION, respuesta.mensaje, "success").then(() => {
                IniciarSesion(segundo);
            });
        } else if (respuesta.errores && respuesta.errores.length > 0) {
            let mensaje = "Errores:\n" + respuesta.errores.join("\n");
            swal(NOMBRE_APLICACION, mensaje, "error");
        } else {
            swal(NOMBRE_APLICACION, respuesta.mensaje || "Error al cambiar contraseña", "error");
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error en petición ModificaContra:", jqXHR.status, textStatus, errorThrown);
        swal(NOMBRE_APLICACION, "Error de conexión al cambiar contraseña. Intente de nuevo.", "error");
    });
}

