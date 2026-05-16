$(".body").on('click', "button#IniciarSesion", function(evt) {
    evt.preventDefault();
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Usuario.php",
        data: {
            Requerimiento: "ExisteSesion",
            Usuario: $('input#Usuario').val(),
            Pass: $('input#Pass').val()
        },
        dataType: 'JSON',
    }).done(function(respuesta) {    
       if (respuesta[0]) {
            IniciarSesion($('input#Pass').val());                       
        }else{
            IniciarSesion($('input#Pass').val());
            var objeto = ["CerrarSesion",respuesta[1]];
            send(JSON.stringify(objeto));
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
    // Logging detallado para depuración (solo visible en consola del navegador)
    console.error("Error en la petición AJAX:");
    console.error("URL solicitada:", "Ajax/Aj_Usuario.php");
    console.error("Código de estado HTTP:", jqXHR.status);
    console.error("Texto del estado:", jqXHR.statusText);
    console.error("Tipo de error:", textStatus);
    console.error("Excepción lanzada:", errorThrown);
    console.error("Respuesta del servidor:", jqXHR.responseText);

    // Mensaje al usuario basado en el tipo de error
    let mensajeUsuario = "Ocurrió un error inesperado.";
    if (textStatus === "timeout") {
        mensajeUsuario = "La solicitud tardó demasiado en responder. Verifica tu conexión a internet.";
    } else if (jqXHR.status === 500) {
        mensajeUsuario = "Error interno del servidor. Inténtalo de nuevo más tarde.";
    } else if (jqXHR.status === 404) {
        mensajeUsuario = "Recurso no encontrado. Contacta al administrador.";
    } else if (textStatus === "parsererror") {
        mensajeUsuario = "Error al procesar la respuesta del servidor.";
    }

    // Muestra el mensaje al usuario
    swal("Esculapio!", mensajeUsuario, "error");
    });
});

function IniciarSesion(psd){
   $.ajax({
        method: "POST",
        url: "Ajax/Aj_Usuario.php",
        data: {
            Requerimiento: "IniciarSesion",
            Usuario: $('input#Usuario').val(),
            Pass: psd
        },
        dataType: 'JSON',
    }).done(function(respuesta) {    
    
        if (respuesta[0]=='NuevoUsuario') {
            var primer;
            var segundo;
            swal("Por Favor cambie su contraseña antes de continuar", {
                content: {
                element: "input",
                attributes: {
                    id: "PrimeraPass",
                     placeholder: "Escriba su nueva contraseña",
                     type: "password",
                },
                },
            }).then((value) => {
                if (value) {
                    primer = value;
                    swal("Confirmar Contraseña", {
                        content: {
                        element: "input",
                        attributes: {
                            id: "SegundaPass",
                            placeholder: "Repita su nueva contraseña",
                            type: "password",
                        },
                        },
                    })
                    .then((value1) => {
                        segundo = value1;
                        if (value1==value) {
                            ModificarContra(respuesta[1],segundo);
                        }else{
                             swal("Esculapio!","Las Contraseñas Ingresadas no Coinciden, Por Favor intente nuevamente", "warning"); 
                        } 
                    }); 
                } 
            });


        }
        if (respuesta[0]=='UsuarioNormal') {
            window.location.href = "index.php";                                   
        }
        if (respuesta[0]=='UsuarioMedico') {
            window.location.href = "index.php?pagina=agenda";                                 
        }
        if (respuesta[0]=='UsuarioOdontologo') {
            window.location.href = "index.php?pagina=odontograma";                                 
        }
        if (respuesta[0]=='UsuarioIncorrecto') {
            swal("Esculapio!", "El Usuario Es Incorrecto", "warning");                                     
        }
        if (respuesta[0]=='PsdIncorrecta') {
            swal("Esculapio!", "La Contraseña Es Incorrecta", "warning");                                     
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error !  " + errorThrown, "error");
    }); 
}

function ModificarContra(id,segundo){  
    $.ajax({
        method:"POST",
        url:"Ajax/Aj_Usuario.php",
        data: {Requerimiento:"ModificaContra",Segundo:segundo,Id:id},
        dataType: "JSON",
    }).done(function(respuesta) {
        if(respuesta[0]==true){
          IniciarSesion(segundo);
        }
    });
}

function CerrarSesion(id){  
    console.log(id+" "+$('.body #CambiarContra').attr("fol"));
    if($('.body #CambiarContra').attr("fol")==id){        
        window.location.href = "index.php?pagina=salir";     
    }else{
        if(id!=undefined){
            IniciarSesion($('input#Pass').val());     
        }
        //},1000);
        
    }
}