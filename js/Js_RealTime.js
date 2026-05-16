function CargarPacientesSinSignoVitales(idConsulta){

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarPacientesSinSignoVitales",
            Consulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        
        $.each(respuesta, function(i, value) {
            
            $('li#agendaPendientes ul').append(value);              

        });
        
        
    });

}

function CargarPacientesConSignoVitales(idConsulta){
    
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarPacientesConSignoVitales",
            Consulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        
        $.each(respuesta, function(i, value) {
            
            $('li#agendaPendientes ul li').find('a[idConsulta='+idConsulta+']').parent().remove();
            $('li#agendaPendientes ul').append(value);              

        });
        
        
    });

}

function zfill(number, width) {
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = number.toString().length; /* Largo del número */ 
    var zero = "0"; /* String de cero */  
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }
    }
}

function ActualizarSecuencialRealTime(puntoVenta){
    if(puntoVenta==$('input#puntoVenta').val()){
        var secuencia = parseInt($('input#secuenciaPunto').val()) + 1;
        $('input#secuenciaPunto').val(secuencia);
        var establecimiento = $('input#establecimiento').val();
        var puntoemision = $('input#puntoEmision').val();
        $('strong#SecuenciaFacturaConsulta').attr('secuencia', establecimiento + "-" + puntoemision + "-" + zfill(secuencia, 9));
        $('strong#SecuenciaFacturaConsulta').html('FACTURA #: ' + establecimiento + "-" + puntoemision + "-" + zfill(secuencia, 9));
    }
}