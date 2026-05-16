   // evento que se activa al dar clic en el boton guardar de la caja de registrar nuevo perfil
   $(".body").on('click', "button#GuardarPro", function(ev) {
       $(".body").on('submit', "form#RegistroProvincia", function(evt) {
           evt.preventDefault(); // evita que se envie el formulario
           var nombre = $(this).find('input#Nombre').val().trim();
           var limpiar = $(this).find('button#Limpiar');
           var t = $('#datatable').DataTable();
           var campos = {
               nombre
           };
           if (CamposLLenos(campos)) {
               return;
           }
           swal({
               title: "Esculapio",
               text: "Seguro Que Desea Guardar?",
               icon: "info",
               buttons: true,
               dangerMode: false,
           }).then((confirma) => {
               if (confirma) {
                   GuardarProvincia(nombre, limpiar, t);
               } else {
                   limpiar.trigger('click');
               }
           });
       });
   });
   // funcuion para registarar en la bd un nuevo perfil
   function GuardarProvincia(nombre, limpiar, t) {
       $.ajax({
           method: "POST",
           url: "Ajax/Aj_Procedimiento.php",
           data: {
               Requerimiento: "GuardarProvincia",
               Nombre: nombre
           },
           dataType: 'JSON',
       }).done(function(respuesta) {
           if (respuesta[0] == true) {
               swal("Esculapio!", "Provincia Guardada.!", "success");
               var fila = JSON.parse(respuesta[1]);
               //var campos = [fila[0][0],nombre,descripcion,fila[0][5],fila[0][4]];
               //var objeto = ["PerfilGuardar",'#datatable','select#cbmPerfil',campos,item];
               //send(JSON.stringify(objeto));
               limpiar.trigger('click');
               return;
           }
           if (respuesta[0] == false) {
               swal("Esculapio!", "No Se Pudo Guardar Especialidad!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
               // location.reload();
               return;
           }
       }).fail(function(jqXHR, textStatus, errorThrown) {
           swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + respuesta[0] + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
           //location.reload();
       });
   }
   // evento que se activa al dar clic en el boton guardar de la caja de registrar nuevo perfil
   $(".body").on('click', "button#GuardarCan", function(ev) {
       $(".body").on('submit', "form#RegistroCanton", function(evt) {
           evt.preventDefault(); // evita que se envie el formulario
           var nombre = $(this).find('input#Nombre').val().trim();
           var provi = $(this).find('select#Provi').val().trim();
           var limpiar = $(this).find('button#Limpiar');
           var t = $('#datatable').DataTable();
           var campos = {
               nombre
           };
           if (CamposLLenos(campos)) {
               return;
           }
           swal({
               title: "Esculapio",
               text: "Seguro Que Desea Guardar?",
               icon: "info",
               buttons: true,
               dangerMode: false,
           }).then((confirma) => {
               if (confirma) {
                   GuardarCanton(nombre, provi, limpiar, t);
               } else {
                   limpiar.trigger('click');
               }
           });
       });
   });
   // funcuion para registarar en la bd un nuevo perfil
   function GuardarCanton(nombre, provi, limpiar, t) {
       $.ajax({
           method: "POST",
           url: "Ajax/Aj_Procedimiento.php",
           data: {
               Requerimiento: "GuardarCanton",
               Nombre: nombre,
               Id_provincia: provi
           },
           dataType: 'JSON',
       }).done(function(respuesta) {
           if (respuesta[0] == true) {
               swal("Esculapio!", "Canton Guardada.!", "success");
               var fila = JSON.parse(respuesta[1]);
               //var campos = [fila[0][0],nombre,descripcion,fila[0][5],fila[0][4]];
               //var objeto = ["PerfilGuardar",'#datatable','select#cbmPerfil',campos,item];
               //send(JSON.stringify(objeto));
               limpiar.trigger('click');
               return;
           }
           if (respuesta[0] == false) {
               swal("Esculapio!", "No Se Pudo Guardar Especialidad!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
               // location.reload();
               return;
           }
       }).fail(function(jqXHR, textStatus, errorThrown) {
           swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + respuesta[0] + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
           //location.reload();
       });
   }
   // funcuion para registarar en la bd un nuevo perfil
   // evento que se activa al dar clic en el boton guardar de la caja de registrar nuevo perfil
   $(".body").on('click', "button#GuardarParro", function(ev) {
       $(".body").on('submit', "form#RegistroParroquia", function(evt) {
           evt.preventDefault(); // evita que se envie el formulario
           var nombre = $(this).find('input#Nombre').val().trim();
           var canton = $(this).find('select#Canto').val().trim();
           var limpiar = $(this).find('button#Limpiar');
           var t = $('#datatable').DataTable();
           var campos = {
               nombre
           };
           if (CamposLLenos(campos)) {
               return;
           }
           swal({
               title: "Esculapio",
               text: "Seguro Que Desea Guardar?",
               icon: "info",
               buttons: true,
               dangerMode: false,
           }).then((confirma) => {
               if (confirma) {
                   GuardarParro(nombre, canton, limpiar, t);
               } else {
                   limpiar.trigger('click');
               }
           });
       });
   });
   // funcuion para registarar en la bd un nuevo perfil
   function GuardarParro(nombre, canton, limpiar, t) {
       $.ajax({
           method: "POST",
           url: "Ajax/Aj_Procedimiento.php",
           data: {
               Requerimiento: "GuardarParro",
               Nombre: nombre,
               Id_canton: canton
           },
           dataType: 'JSON',
       }).done(function(respuesta) {
           if (respuesta[0] == true) {
               swal("Esculapio!", "Parroquia Guardada.!", "success");
               var fila = JSON.parse(respuesta[1]);
               //var campos = [fila[0][0],nombre,descripcion,fila[0][5],fila[0][4]];
               //var objeto = ["PerfilGuardar",'#datatable','select#cbmPerfil',campos,item];
               //send(JSON.stringify(objeto));
               limpiar.trigger('click');
               return;
           }
           if (respuesta[0] == false) {
               swal("Esculapio!", "No Se Pudo Guardar Especialidad!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
               // location.reload();
               return;
           }
       }).fail(function(jqXHR, textStatus, errorThrown) {
           swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + respuesta[0] + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
           //location.reload();
       });
   }