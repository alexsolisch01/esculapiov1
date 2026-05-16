var tablaDetalleReceta = null;


function ConstriorTablasReceta(){
  tablaDetalleReceta  = $('#datatableDetalleReceta').DataTable({
            'paging': false,
            'lengthChange': false,
            'searching': false,
            'ordering': false,
            'info': true,
            'autoWidth': false,
            scrollY: 250,
            scrollX: true,
            order: [[ 0, "desc" ]],
            "columnDefs": [
            {
                "targets": [0,8,1],
                "visible": false,
            }
             ]
        });


    var CargarProductosJS = {  
      ajax: {
        url: "Ajax/Aj_ManteBodega.php",
        type: "POST",
        dataType: "json",
        data: {
          q: "{{{q}}}",
          Requerimiento: "CargarProductosJS"
        }
      },
      locale: {
        emptyTitle: "Seleccionar"
      },
      preprocessData: function(data) {    
        var array = [];
          array.push({'value': "0",'text': "Seleccionar"});          
          $.each(data, function(i, value){
            
            array.push(
                {
                    'value': value.id,
                    'text': value.nombre,                     
                    'data': {
                                'principio1': value.principio1,
                                'principio2': value.principio2,
                                'principio3': value.principio3,
                                'principio4': value.principio4,
                                'presentacion1': value.prst2,
                                'presentacion2': value.prst1,
                                'precio1': value.pvp1,
                                'precio2': value.pvp2,
                                'farmacologico': value.descripcion,
                                'iva': value.iva,
                                'prescripcion': value.prescripcion,
                                content: '<div class="row"><div class="col-md-4">'+value.nombre+'</div>'
                                          +'<div class="col-md-3">'+value.presentacion+'</div>'
                                          +'<div class="col-md-3">'+value.principio1+'</div>'
                                          +'<div class="col-md-1">$ '+value.pvp1+'</div>'
                                          +'<div class="col-md-1">'+value.stock+'</div></div>',
                            }
                }
            );
          });          
          if(array.length==1){
            array.push({'value': "-1",'text': "Prescripción en blanco"});
          }
        return array;
      },
      preserveSelected: false
    };
    $("#cbmProducto").selectpicker().ajaxSelectPicker(CargarProductosJS);
}

ConstriorTablasReceta();


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(".body").on('change', "#cbmProducto", function(evt) {
       
       var idItem = $(this).val(); 
       if(idItem==0){
        return;
       }
       if(idItem==-1){
            PrescripcionBlanco();
            $(this).val("0");
            $('.selectpicker').selectpicker('refresh');
            return;
       } 
       var sugerencia = $(this).find("option:selected").html();  
       var p1= $(this).find("option:selected").attr("data-presentacion1");
       var p2= $(this).find("option:selected").attr("data-presentacion2"); 
       var pvp1= $(this).find("option:selected").attr("data-precio1");
       var pvp2= $(this).find("option:selected").attr("data-precio2");
       var iva= $(this).find("option:selected").attr("data-iva");  
       var farmacologico = $(this).find("option:selected").attr("data-farmacologico");  
       var principio1="";
       var principio2="";
       var principio3="";
       var principio4="";
       var prescripciondefault = $(this).find("option:selected").attr("data-prescripcion");

       if($(this).find("option:selected").attr("data-principio1")!="(NINGUNO)"){
            principio1=$(this).find("option:selected").attr("data-principio1");
       }
       if($(this).find("option:selected").attr("data-principio2")!="(NINGUNO)"){
            principio2="+"+$(this).find("option:selected").attr("data-principio2");
       }
       if($(this).find("option:selected").attr("data-principio3")!="(NINGUNO)"){
            principio3="+"+$(this).find("option:selected").attr("data-principio3");
       }
       if($(this).find("option:selected").attr("data-principio4")!="(NINGUNO)"){
            principio4="+"+$(this).find("option:selected").attr("data-principio4");
       }
       var prescripcion = principio1+principio2+principio3+principio4;
       var item = '<span p1="'+p1+'" p2="'+p2+'" pvp1="'+pvp1+'" pvp2="'+pvp2+'" prescripcion="'+prescripcion+'" id = "' + idItem+ '">' + sugerencia + '</span>';
       
       var presentacion ='<select iva="'+iva+'" class="form-control" width="100%"><option pvp="'+pvp1+'" value="'+p2+'">'+p2+'</option><option pvp="'+pvp2+'" value="'+p1+'">'+p1+'</option></select>';
       var cantidad = '<input style="width:50px;" type="number" required  value="" class="form-control cdrc" id="CantidadDetalleReceta"  placeholder="CANTIDAD">';
       var observaciones='<select class="form-control cbmtrd" style="width:80px;"><option value="">Seleccionar..</option><option value="UNA VEZ AL DIA">QD</option><option value="2 VECES AL DIA">BID</option>'
                            +'<option value="3 VECES AL DIA">TID</option><option value="4 VECES AL DIA">QID</option> </select>';
       var observaciones2 = '<input style="width:550px;" value="'+prescripciondefault+'" type="text" class="form-control txtrd" id="observaciones2Receta">';                            

       var boton = '<button type="submit" id="EliminarItemReceta" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
       if (!ExisteIten(idItem, sugerencia)) {
            var campos = [idItem, prescripcion,sugerencia,presentacion,cantidad,observaciones,observaciones2, boton, farmacologico];
            tablaDetalleReceta.row.add(campos).draw(true);
             $(".cdrc:last-child").focus();
       }
       PlanTratamientoReceta();
       $(this).val("0");
       $('.selectpicker').selectpicker('refresh');
});

$(".body").on('change', ".cdrc", function(evt){
    $(".txtrd:last-child").focus();  
});
$(".body").on('change', ".cbmtrd", function(evt){  
  
});
$(".body").on('change', ".txtrd", function(evt){  
  $("button[data-id=cbmProducto]").focus();  
});



function ExisteIten(idItem, sugerencia) {
    var confirma = false;
    var vector = $('.body').find("#datatableDetalleReceta tbody tr");
    $.each(vector, function(a) {        
        var itemf = $(this).find('td').eq(1).html();
        
        if (itemf == sugerencia) {
            confirma = true;
        }
    });
    return confirma;
}
function PlanTratamientoReceta(){
    var dd = tablaDetalleReceta.rows().count();
        $('.body div#FarmacoReceta').empty();
        $('.body div#FarmacoReceta').append("<h5>Farmacologia</h5>");
        for (var i = 0; i < dd ;i++) {
            var hh = $('#datatableProcedimientoGrupoAgenda').find('td span').attr('grupo');
            var gg = tablaDetalleReceta.row(i).data()[8];
            var tabla = '.body div#FarmacoReceta';
            validad(gg,tabla);
        }
}

$(".body table#datatableDetalleReceta").on('click', "button#EliminarItemReceta", function(evt) {
    var ff = $(this).find('select#CataBode option:selected').text();
    var idItem = tablaDetalleReceta.row($(this).parents("tr")).data()[0];
    var item = $(this).parent().parent().find('td').eq(0).html();
    if(idItem=='0'){
        item = $(this).parent().parent().find('td').eq(0).find("input").val();
    }
    
    var fila = $(this).parent().parent();
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Quitar El Item " + item + " ?",
        icon: "info",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            tablaDetalleReceta.row(fila).remove().draw(false);
            PlanTratamientoReceta();
        } else {}
    });
});


function PrescripcionBlanco(){
    var prescripcion = '<input class="form-control" width="100%" type="text">';
    var sugerencia = '<input class="form-control" width="100%" type="text">';
    var presentacion = '<input class="form-control" style="width:80px;" type="text">';
    var cantidad = '<input style="width:50px;" class="form-control" type="number">';

    var observaciones='<select style="width:80px;" class="form-control"><option value="">Seleccionar..</option><option value="TOMAR UNA VEZ AL DIA">QD</option><option value="TOMAR 2 VECES AL DIA">BID</option>'
                            +'<option value="TOMAR 3 VECES AL DIA">TID</option><option value="TOMAR 4 VECES AL DIA">QID</option> </select>';
    var observaciones2 = '<input style="width:550px;" type="text" class="form-control" id="observaciones2Receta">';                            

    var boton = '<button type="submit" id="EliminarItemReceta" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';

    var campos = [0, prescripcion,sugerencia,presentacion,cantidad,observaciones,observaciones2, boton, ""];
    tablaDetalleReceta.row.add(campos).draw(true);    
}