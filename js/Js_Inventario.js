  function filePreview(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.readAsDataURL(input.files[0]);
          reader.onload = function(e) {
              $(input).parent().css({
                  "background": "url(" + e.target.result + ") no-repeat",
                  "background-size": "cover",
                  "height": "12em",
                  "background-position": "center center"
              });
          }
      }
  }
  $('form#RegistroPadre').find('input#FotoInventario').change(function() {
      filePreview(this);
  });

  function LlenarPrincipios(){
    $("select#PABode2").html($("select#PABode1").html());
    $("select#PABode3").html($("select#PABode1").html());
    $("select#PABode4").html($("select#PABode1").html());
  }
  CargarComboPrincipio();
  CargarComboFarmacologia();
  CargarComboPresentacionGalenica();
  CargarComboProveedores();  
  LlenarTablaInventario();
          
  CargarComboLinea();
  $('.selectpicker').selectpicker('refresh');

  

  function CargarComboPrincipio(){
    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "CargarComboPrincipio"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        
        
        $.each(respuesta, function(i, value) {
            var elem = ' <option value="'+value.clasificacion+'">'+value.clasificacion+'</option> ';
            $("select#PABode1").append(elem);
        });
        LlenarPrincipios();
        $('.selectpicker').selectpicker('refresh');

     });   
  }

  function CargarComboFarmacologia(){
    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "CargarComboFarmacologia"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        
        
        $.each(respuesta, function(i, value) {
            var elem = ' <option value="'+value.id+'">'+value.descripcion+'</option> ';
            $("select#ClasiBode").append(elem);
        });
        $('.selectpicker').selectpicker('refresh');

     });   
  }

  function CargarComboLinea(){
    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "CargarComboLinea"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        
        
        $.each(respuesta, function(i, value) {
            var elem = ' <option value="'+value.id+'">'+value.descripcion+'</option> ';
            $("select#LineaBode").append(elem);
        });
        $('.selectpicker').selectpicker('refresh');

     });   
  }

  function CargarComboPresentacionGalenica(){
    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "CargarComboPresentacionGalenica"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        
        
        $.each(respuesta, function(i, value) {
            var elem = ' <option value="'+value.id+'">'+value.descripcion+'</option> ';
            $("select#PreseBode").append(elem);
        });
        $('.selectpicker').selectpicker('refresh');

     });   
  }

function CargarComboProveedores(){
    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "CargarComboProveedores"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        
        
        $.each(respuesta, function(i, value) {
            var elem = ' <option value="'+value.id+'">'+value.descripcion+'</option> ';
            $("select#proveMovi").append(elem);
        });
        $('.selectpicker').selectpicker('refresh');

     });   
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////MOVIMIENTSO////////////////////////////////////////////////////////
