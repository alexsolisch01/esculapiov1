var tablautilidadespaciente;
function CargarTabla(){
  tablautilidadespaciente = $('#datatablePacientes').DataTable({
        "processing": true,
        "serverSide": true,
        //'paging': false,
        //'lengthChange': false,
        "ordering": false,
        "ajax": {
            url: "Ajax/Aj_Paciente.php",
            data: {
                Requerimiento: "CargarTablaUtilidades"
            },
            type: "POST"
        },
        scrollY: 400
    });

    var CargarPacienteSelect = {  
      ajax: {
        url: "Ajax/Aj_Paciente.php",
        type: "POST",
        dataType: "json",
        data: {
          q: "{{{q}}}",
          Requerimiento: "CargarPacienteSelect"
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
                    'text': value.paciente                    
                }
            );
          });          
          
        return array;
      },
      preserveSelected: false
    };
    $("#cbmPaciente1").selectpicker().ajaxSelectPicker(CargarPacienteSelect);
    $("#cbmPaciente2").selectpicker().ajaxSelectPicker(CargarPacienteSelect);

 }
 CargarTabla();

$('.body').on('change', '.chSexo', function(evt) {  
  if($(this).prop("checked")){
    $.ajax({
                    method:"POST",
                    url:"Ajax/Aj_Paciente.php",
                    data: {Requerimiento:"ActualizarSexo",
                           Paciente:$(this).attr("idPaciente"),
                           Genero:$(this).attr("idGenero")},
                    dataType: 'JSON',
              }).done(function(respuesta) {                    
                    //console.log(respuesta);
             }).fail( function(jqXHR, textStatus, errorThrown ) {
                    console.log(errorThrown);
                      
             });
  }            
});

$('.body').on('click', '#UnificarHCU', function(evt) {  
    if($("#cbmPaciente1").val()==$("#cbmPaciente2").val()){
        swal("Sistema!", "Los pacientes son iguales.", "warning");
        return;
    }
    swal({
            title: "Sistema",
            text: "Seguro Que Desea Unificar las Historias Clinicas ?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                Unificar()
            }else{
                
            } 
        });                   
}); 

function Unificar(){

            $.ajax({
                    method:"POST",
                    url:"Ajax/Aj_Paciente.php",
                    data: {Requerimiento:"UnificarHCU",
                           PacienteUnificar:$("#cbmPaciente1").val(),
                           PacienteEliminar:$("#cbmPaciente2").val()},
                    dataType: 'JSON',
            }).done(function(respuesta) {                    
                if(respuesta[0]==true){
                    swal("Sistema!", "Unificado con exito.!", "success");                                
                }
                if(respuesta[0]==false){
                    swal("Sistema!", "Ocurrio un error al unificar.", "error");
                }
            }).fail( function(jqXHR, textStatus, errorThrown ) {
                    console.log(errorThrown);                    
            });
}

$('.body').on('click', '#HabilitarDocumentos', function(evt) {  
    
    swal({
            title: "Sistema",
            text: "Seguro Que Desea Habilitar los documentos devueltos ?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                Habilitar()
            }else{
                
            } 
        });                   
}); 

function Habilitar(){
            $.ajax({
                    method:"POST",
                    url:"Ajax/Aj_Consulta.php",
                    data: {Requerimiento:"HabilitarDocumentos"},
                    dataType: 'JSON',
            }).done(function(respuesta) {                    
                if(respuesta[0]==true){
                    swal("Sistema!", "Habilitados con exito.!", "success");                                
                }
                if(respuesta[0]==false){
                    swal("Sistema!", "Ocurrio un error al habilitar.", "error");
                }
            }).fail( function(jqXHR, textStatus, errorThrown ) {
                    console.log(errorThrown);                    
            });
}

$('.body').on('click', '#ActualizarStock', function(evt) {  
    
    swal({
            title: "Sistema",
            text: "Seguro Que Desea Igualar el stock de cajeros al kardex ?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                ActualizarStockKardex();
                swal("Sistema!", "Proceso terminado con exito.!", "success");
            }else{
                
            } 
        });                   
}); 

