var tablaDetalle = null;

$(".body").on('change', "select#movimientoC", function(ev) {
	if($(this).val()=="INGRESO"){
        $('select#tipoMoviC').find('option[tipo="EGRESO"]').css("display","none");
        $('select#tipoMoviC').find('option[tipo="INGRESO"]').css("display","block");
    }
    if($(this).val()=="EGRESO"){
    	$('select#tipoMoviC').find('option[tipo="EGRESO"]').css("display","block");
        $('select#tipoMoviC').find('option[tipo="INGRESO"]').css("display","none");
    }
});

tablaDetalle = $('#datatableDetalleFactFarmacia2').DataTable({
            'paging': false,
            'lengthChange': false,
            'searching': false,
            'ordering': false,
            'info': true,
            'autoWidth': true,
            scrollY: 200,
            scrollX: true,
            "columnDefs": [{
                "targets": [11,12],
                "visible": false,
                "searchable": false
            }]
        });  

var tablaReporteMovimiento = null;


tablaReporteMovimiento  = $('#datatableReporteMovimiento').DataTable({
            'paging': false,
            'lengthChange': false,
            'searching': false,
            'ordering': false,
            'info': true,
            'autoWidth': false,
            scrollY: 350,
            scrollX: true,
            order: [[ 0, "desc" ]],
            "columnDefs": [
            {
                "targets": [5],
                "visible": false,
            },
            {
                "targets": [4],
                "className": "text-right"
            } 
            ]
        });

function CargarDatos(fechaDesde, fechaHasta, tipo, motivo) {
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Movimiento.php",
        data: {
            Requerimiento: "CargarMovimientos",
            FechaDesde: fechaDesde,
            FechaHasta: fechaHasta,
            Tipo: tipo,
            Motivo: motivo
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try {
            tablaReporteMovimiento.clear().draw();
        } catch (error) {}
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }
        var totalF1=0;
        $.each(respuesta, function(i, value) {
            var dataSet = [respuesta[i][0],respuesta[i][1],respuesta[i][2],respuesta[i][3],parseFloat(respuesta[i][4]).toFixed(2),respuesta[i][5]];
            tablaReporteMovimiento.row.add(dataSet);
            totalF1 +=parseFloat(respuesta[i][4]);
        });
        tablaReporteMovimiento.draw(false);
        var column = tablaReporteMovimiento.column(4); 
        $(column.footer()).html('$ '+totalF1.toFixed(2));
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}

$(".body").on('click', "button#CagarReporteMovimientos", function(ev) {
    var fechaDesde = $("#fechaDesde").val();
    var fechaHasta = $("#fechaHasta").val();
    var tipo = $("#movimientoC").val();
    var motivo = $("#tipoMoviC").val();
    
    CargarDatos(fechaDesde,fechaHasta,tipo,motivo);  
});

$('.body table#datatableReporteMovimiento tbody').on('dblclick', 'tr', function(evt) {
    CargarMovimientoConsulta(tablaReporteMovimiento.row($(this)).data()[5]);
    tablaDetalle.clear().draw();
    CargarMovimientoItems(tablaReporteMovimiento.row($(this)).data()[5]);    
    tablaDetalle.draw(false);
    $('#modal-bdkardex').modal();
    setTimeout(function(){
        tablaDetalle.columns.adjust().draw();        
    },200);                
    
});

function CargarMovimientoConsulta(id){
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "CargarMovimientoConsulta",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        console.log(respuesta);
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        $('.body').find('input#NumeroFactMovi').val(respuesta[0][1]);
        $('.body').find('select#bodegaMovi').val(respuesta[0][2]);
        $('.body').find('select#proveMovi').val(respuesta[0][3]);
        $('.body').find('select#movimiento').val(respuesta[0][4]);
        $('.body').find('select#tipoMovi').val(respuesta[0][5]);
        $('.body').find('input#fechaMovi').val(respuesta[0][6]);
        $('.body').find('textarea#textAreaMovi').val(respuesta[0][7]);
        $('.body').find('span#subtotal').html(respuesta[0][8]);
        $('.body').find('span#descuento').html(respuesta[0][10]);
        $('.body').find('span#iva').html(respuesta[0][9]);
        $('.body').find('span#total').html(respuesta[0][11]);
        $('.selectpicker').selectpicker('refresh');       
        
    });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////CARGAR TABLA DE LA CONSULTA KARDEX POR ID DE ARRIBA/////////////////////////////////////
                                   ///////////////////////////////////////////////////////
                                  ///////////////////////////////////////////////////////
function CargarMovimientoItems(idMovimiento){
    
    try{
        $.ajax({
            async:false,
            method: "POST",
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "CargarMovimientoItems",
                Movimiento: idMovimiento
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                swal("Esculapio!", "OCURRIO UN ERROR.", "error");
                return;
            }
            $.each(respuesta, function(i, value) {
               var id=value[1];
               var item=value[10];
               var presentacion=value[3];
               var cantidad = '<input style="width:80px;" type="number" disabled step=".01" value="'+value[4]+'" class="form-control" id="CantidadDetalleFact">';
               var precio = '<input style="width:80px;" type="number" disabled step=".01" value="'+value[5]+'" class="form-control" id="PrecioProducto" >';
               var precioCaja = '<input style="width:80px;" type="number" disabled step=".01" value="'+parseFloat(value[9]).toFixed(2)+'" class="form-control" id="PrecioCajaProducto" >';
               var subtotal="$ "+value[6];
               var iva=value[11];
               var descuento = '<input style="width:80px;" type="number" disabled step=".01" value="'+value[7]+'" class="form-control" id="DescuentoDetalle">';
               var total="$ "+value[8];
               var campos = [id, item, presentacion, cantidad,precio,precioCaja,subtotal,iva, descuento,total,"","",value[12]];
               tablaDetalle.row.add(campos);
            });
            tablaDetalle.draw();   
            CalcularTotalMovimientos()   
        });
    }catch(error){
        console.log(error)
    }
}