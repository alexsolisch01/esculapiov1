var tablaReservaciones = null;
var filaReserva = null;

function ConstruirTablasReserva() {
	tablaReservaciones = $('#datatableReservaciones').DataTable({
        "processing": true,
        "serverSide": true,
        "ordering": false,
        "ajax": {
            url: "Ajax/Aj_Reserva.php",
            data: {
                Requerimiento: "CargarTablaReservasFacturarJS"
            },
            type: "POST"
        },
        scrollY: 300
    });
}
ConstruirTablasReserva();

$('#modal-reservaciones').on('shown.bs.modal', function() {
    noModal = false;    
    tablaReservaciones.search('').draw();    
});

$(".body").on('change', "input#fechaDesdeRe", function(ev){
    tablaReservaciones.column(1).search($('#fechaDesdeRe').val());
    tablaReservaciones.column(2).search($('#fechaHastaRe').val()).draw();
});
$(".body").on('change', "input#fechaHastaRe", function(ev){
    tablaReservaciones.column(1).search($('#fechaDesdeRe').val());
    tablaReservaciones.column(2).search($('#fechaHastaRe').val()).draw();
});

function ObtenerConsulta(especialidad,procedimiento,fecha,idMedico,nombremedico,especialidadnombre,procedimientonombre,precio,servicio){
    var idProce = procedimiento;
    var item = '<span especialidad="'+especialidadnombre+'">'+procedimientonombre+'</span>';    
    var img = '<img src="imagenes/doctor.png" />';
    if(servicio==13){
        img = '<img src="imagenes/diente.png" />';
    }
    if(servicio==14){
        img = '<img src="imagenes/heart.png" />';
    }
    var descuento = '<input style="width:80px;" type="number" required step=".01" max="20" value="0.00" class="form-control" id="DescuentoConsulta"  placeholder="DESCUENTO">';
    var id = '<span especialidad="'+especialidad+'" procedimiento="' + idProce + '" >'+img+'</span>';
    var boton = '<button type="submit" idconsultaitem="'+iditemmodificar+'" id="EliminarItemConsulta" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
    var medico = '<span id = "' + idMedico + '">' + nombremedico + '</span>';

    if (!ExisteIten(idProce, item, fecha)) {                
        var campos = [id, item, medico, fecha, 1, precio.toFixed(2), descuento, "$ " + precio.toFixed(2), boton,1];
        tableDetalle.row.add(campos).draw(true);
    }
    CalcularTotalConsulta();        
    
}

$(".body").on('dblclick', "#datatableReservaciones tr", function(ev){    
    var fila = tablaReservaciones.row($(this)).data();
    idReservacion = fila[20];
    ObtenerConsulta(fila[6],fila[8],fila[1],fila[7],fila[5],fila[3],fila[4],parseFloat(fila[9]),fila[10]);

    var cerrar = $('.body').find('button.close');
    id = fila[11];
    $('.body').find('strong#nombreCompleto').attr('idPaciente', id);
    LimpiarCobrar();
    var cedula = $('.body').find('span#cedula');
    var apellido = $('.body').find('strong#nombreCompleto');
    var direccion = $('.body').find('span#direccion');
    var telefono = $('.body').find('span#telefono');
    var correo = $('.body').find('span#email');
    
    correo.text(fila[16]);
    cedula.text(fila[12]);
    apellido.text(fila[13] + ' ' + fila[14] + ' ' + fila[15]);

    direccion.text(fila[17]);
    
    telefono.text(fila[18]);
    apellido.attr("fecha", fila[19]);

    $(".body div#DatosPaciente").css('visibility', 'visible');
    cerrar.trigger('click');
    var edad = calcularEdad($('strong#nombreCompleto').attr("fecha"));
    $('.body').find('span#edad').html(edad);
});