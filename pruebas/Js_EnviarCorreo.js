$(".body").on('click', "button#enviarRide", function(ev) {
    alert('sdfsdf');
});

function enviarCorreo(){
    var mensaje = $('body').find('div#Ride').html();
    $.ajax({
        method: "POST",
        url: "../Ajax/Aj_Correo.php",
        data: {
            Requerimiento: "enviarCorreo",
            Email: 'mauro_vv96@hotmail.com',
            Paciente: 'VELIZ VASQUEZ MAURO',
            Mensaje: mensaje
        },
        dataType: 'JSON'
    }).done(function(respuesta) {
        swal("Esculapio!", "Correo Enviado con Exito", "success");
    });
}