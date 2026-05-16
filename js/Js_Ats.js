var tablaAts = null;

function ConstruirTabla(){
 tablaAts = $('#TablaAts').DataTable();
}        

ConstruirTabla();

$(".body").on('click', "button#GenerarAts", function(ev){  
 
      
        var mes = $("#cbmMes").val();
        var año = $("#Año").val();

            swal({
                title: "Sistema",
                text: "Seguro Que Desea Generar el ATS de "+mes+" "+año,
                icon: "info",
                buttons: true,
                dangerMode: false,
              })
              .then((confirma) => {
                if (confirma) {
                  GenerarAts(año,mes);
                }else{
                  
                } 
              });
                
       
                 
         
  });


function GenerarAts(año,mes){

            $.ajax({
                        method:"POST",
                        url:"Ajax/Aj_Ats.php",
                        data: {Requerimiento:"GenerarAts",
                              Anio:año,
                              Mes:mes
                              
                            },
                        dataType: 'JSON',

              }).done(function(respuesta) {
                    
                               if(respuesta[0]==true){
                                                 
                                   swal({
                                        title: "Sistema",
                                        text: "ATS GENERADO.!",
                                        icon: "success",
                                        buttons: true,
                                        dangerMode: false,
                                    }).then((confirma) => {
                                        if (confirma) {
                                            //ImprimirTicKetConsulta(idConsulta, numero, hc, edad,JSON.stringify(productos),JSON.stringify(productos_lab),JSON.stringify(productos_rx),JSON.stringify(productos_eco),JSON.stringify(productos_tac));
                                        } else {
                                            
                                        }
                                        location.reload();
                                    });
                                   return;
                                
                               }
                               if(respuesta[0]==false){

                                   swal("Sistema!", "Ocurrio un error al Generar el Ats.", "error");
                                
                                   return;
                               }

                               

             }).fail( function(jqXHR, textStatus, errorThrown ) {
                 console.log(errorThrown)
                      
             });

}