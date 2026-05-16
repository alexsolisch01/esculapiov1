
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title id="titulo">ESCULAPIO</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="css/main.css">
  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

  <script src="Lib/jquery4.3.min.js"></script>
  <script src="Lib/jquery-ui.min.js"></script>
  <script src="Lib/bootstrap.min.js"></script>
  <script src="Lib/sweetalert.min.js"></script>
  <link rel="stylesheet" href="css/sweetalert-custom.css">
  <script src="Lib/datatables.min.js?v=1.0"></script>
  <script src="Lib/dataTables.responsive.min.js"></script>
  <script>
    if (window.jQuery && window.jQuery.fn && window.jQuery.fn.dataTable) {
      window.jQuery.extend(true, window.jQuery.fn.dataTable.defaults, {
        pageLength: 10,
        lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]],
        paging: true,
        autoWidth: false,
        responsive: true,
        scrollCollapse: true,
        language: {
          lengthMenu: "Mostrar _MENU_ registros por página",
          zeroRecords: "No se encontraron registros",
          info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
          infoEmpty: "Mostrando 0 a 0 de 0 registros",
          infoFiltered: "(filtrado de _MAX_ registros totales)",
          search: "Buscar:",
          paginate: { first: "Primero", previous: "Anterior", next: "Siguiente", last: "Último" },
          loadingRecords: "Cargando...",
          processing: "Procesando...",
          emptyTable: "No hay datos disponibles"
        }
      });
    }
  </script>
  <script src="Lib/bootstrap-select.js"></script>
  <script src="Lib/bootstrap-select-ajax.js"></script>
  <script src="Lib/es.js"></script>
  <script src="Lib/numeral.min.js"></script>
  <script src="Lib/moment.js"></script>
  <script src="Lib/fullcalendar.min.js"></script>
  <script src="Lib/locale/es.js"></script>
  <script src="Lib/bootstrap-timepicker.min.js"></script>
  <script src="Lib/Chart.js?v=1.0"></script>
  <script src="js/Js_Socket.js"></script>

</head>

<body class="hold-transition skin-black-light sidebar-mini sidebar-collapse body fixed">
  <input type="hidden" id="FcSri" value="<?php echo $_SESSION["FcElentronica"]; ?>">
  <input type="hidden" id="razonEmpresa" value="<?php echo $_SESSION["empresa"]; ?>">
  <input type="hidden" id="rucEmpresa" value="<?php echo $_SESSION["ruc"]; ?>">
  <input type="hidden" id="dirEmpresa" value="<?php echo $_SESSION["direccion"]; ?>">
  <input type="hidden" id="telEmpresa" value="<?php echo $_SESSION["telefono"]; ?>">
  <input type="hidden" id="horarioEmpresa" value="<?php echo $_SESSION["horario"]; ?>">
  <input type="hidden" id="logo1Empresa" value="<?php echo $_SESSION["logo1"]; ?>">
  <input type="hidden" id="logo2Empresa" value="<?php echo $_SESSION["logo2"]; ?>">
  <input type="hidden" id="cedulaUsuario" value="<?php echo $_SESSION["cedula"]; ?>">

  <input type="hidden" id="Fpcheque" value="<?php echo $_SESSION["CHEQUES"]; ?>">
  <input type="hidden" id="FpTransfencias" value="<?php echo $_SESSION["TRANSFERENCIAS"]; ?>">
  <input type="hidden" id="FpTarjeta" value="<?php echo $_SESSION["TARJETA"]; ?>">
  <input type="hidden" id="FpCredito" value="<?php echo $_SESSION["CREDITO"]; ?>">
  <input type="hidden" id="FcCorreo" value="<?php echo $_SESSION["FcCorreos"]; ?>">
  <input type="hidden" id="imagenEmpresa" value="<?php echo $_SESSION["logo1"]; ?>">
  <input type="hidden" id="Empresa" value="<?php echo $_SESSION["empresa"]; ?>">
  <input type="hidden" id="CorreoBasura" value="<?php echo $_SESSION["correoBasura"]; ?>">
  <input type="hidden" id="CorreoFacturas" value="<?php echo $_SESSION["correoEmpresa"]; ?>">
  <input style="display: none;" type="date" name="" id="FechaActualEsculapio" value="<?php echo date("Y-m-d"); ?>">
  <input type="hidden" name="" id="nombrePc" value="<?php echo gethostname(); ?>">

  <input type="hidden" id="integradoQuickcont" value="<?php echo $_SESSION["QUICKCONT_INTEGRADO A QUICKCONT"]; ?>">
  <input type="hidden" id="habilitarDescuentoPredefinido" value="<?php echo $_SESSION["HABILITARDESCUENTOPREDEFINIDO"]; ?>">

  <input type="hidden" name="" id="linkPago" value="http://94.130.108.30/esculapiowecare/servicios/api/pagar/">

  <input type="hidden" name="" id="PINPAD" value="N">

  <input type="hidden" id="nombreComercio" value="TOGOTEC S.A.">
  <input type="hidden" id="direccionComercio" value="Guayas, Samborondon">
  <input type="hidden" id="telefonoComercio" value="0997952269">
  <input type="hidden" id="localidadComercio" value="Ecuador">

  <div class="wrapper">

    <header class="main-header">
      <!-- Logo: abre el sidebar al hacer clic sobre el nombre -->
      <a href="#" class="logo" data-toggle="push-menu" role="button" title="Abrir menú">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini"><b>E</b></span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg"><b>Esculapio 1.0</b></span>
      </a>
      <!-- Header Navbar: style can be found in header.less -->
      <nav class="navbar navbar-static-top">
        <!-- Sidebar toggle button escondido porque ahora se usa el logo -->
        <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button" style="display:none;">
          <span class="sr-only">Menu</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </a>

        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <!-- Messages: style can be found in dropdown.less-->
            <li class="dropdown messages-menu">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-envelope-o"></i>
                <span class="label label-success">4</span>
              </a>
              <ul class="dropdown-menu">
                <li class="header"></li>
                <li>
                  <!-- inner menu: contains the actual data -->
                  <ul class="menu">
                    <li>
                      <!-- start message -->
                      <a href="#">
                        <div class="pull-left">
                          <img src="<?php echo $_SESSION["foto"] ?>" class="img-circle" alt="User Image">
                        </div>
                        <h4>
                          
                          <small><i class="fa fa-clock-o"></i></small>
                        </h4>
                        <p></p>
                      </a>
                    </li>
                    <!-- end message -->
                    <li>
                      <a href="#">
                        <div class="pull-left">
                          <img src="<?php echo $_SESSION["foto"] ?>" class="img-circle" alt="User Image">
                        </div>
                        <h4>
                          
                          <small><i class="fa fa-clock-o"></i></small>
                        </h4>
                        <p></p>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="pull-left">
                          <img src="<?php echo $_SESSION["foto"] ?>" class="img-circle" alt="User Image">
                        </div>
                        <h4>
                          
                          <small><i class="fa fa-clock-o"></i></small>
                        </h4>
                        <p></p>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="pull-left">
                          <img src="<?php echo $_SESSION["foto"] ?>" class="img-circle" alt="User Image">
                        </div>
                        <h4>
                          
                          <small><i class="fa fa-clock-o"></i></small>
                        </h4>
                        <p></p>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="pull-left">
                          <img src="<?php echo $_SESSION["foto"] ?>" class="img-circle" alt="User Image">
                        </div>
                        <h4>
                          
                          <small><i class="fa fa-clock-o"></i></small>
                        </h4>
                        <p></p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="footer"><a href="#"></a></li>
              </ul>
            </li>
            <!-- Notifications: style can be found in dropdown.less -->
            <li class="dropdown notifications-menu">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-bell-o"></i>
                <span class="label label-warning"></span>
              </a>
              <ul class="dropdown-menu">
                <li class="header"></li>
                <li>
                  <!-- inner menu: contains the actual data -->
                  <ul class="menu">
                    <li>
                      <a href="#">
                        <i class="fa fa-users text-aqua"></i> 
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-warning text-yellow"></i> 
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-users text-red"></i> 
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-shopping-cart text-green"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-user text-light-blue"></i> 
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="footer"><a href="#"></a></li>
              </ul>
            </li>
            <!-- Tasks: style can be found in dropdown.less -->
            <li class="dropdown tasks-menu">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-flag-o"></i>
                <span class="label label-danger"></span>
              </a>
              <ul class="dropdown-menu">
                <li class="header"></li>
                <li>
                  <!-- inner menu: contains the actual data -->
                  <ul class="menu">
                    <li>
                      <!-- Task item -->
                      <a href="#">
                        <h3>
                          
                          <small class="pull-right"></small>
                        </h3>
                        <div class="progress xs">
                          <div class="progress-bar progress-bar-aqua" style="width: 20%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                            <span class="sr-only"></span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <!-- end task item -->
                    <li>
                      <!-- Task item -->
                      <a href="#">
                        <h3>
                          
                          <small class="pull-right"></small>
                        </h3>
                        <div class="progress xs">
                          <div class="progress-bar progress-bar-green" style="width: 40%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                            <span class="sr-only"></span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <!-- end task item -->
                    <li>
                      <!-- Task item -->
                      <a href="#">
                        <h3>
                          Some task I need to do
                          <small class="pull-right"></small>
                        </h3>
                        <div class="progress xs">
                          <div class="progress-bar progress-bar-red" style="width: 60%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                            <span class="sr-only"></span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <!-- end task item -->
                    <li>
                      <!-- Task item -->
                      <a href="#">
                        <h3>
                          Make beautiful transitions
                          <small class="pull-right"></small>
                        </h3>
                        <div class="progress xs">
                          <div class="progress-bar progress-bar-yellow" style="width: 80%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                            <span class="sr-only"></span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <!-- end task item -->
                  </ul>
                </li>
                <li class="footer">
                  <a href="#">View all tasks</a>
                </li>
              </ul>
            </li>
            <!-- User Account: style can be found in dropdown.less -->
            <li class="dropdown user user-menu">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <img src="<?php echo $_SESSION["foto"] ?>" class="user-image" alt="User Image">
                <span foto="<?php echo $_SESSION["foto"] ?>" id="nombresUsuario" perfil="<?php echo $_SESSION["perfil"] ?>" nombres="<?php echo $_SESSION["nombres"] ?>" class="hidden-xs"><?php echo $_SESSION["usuario"] ?></span>
              </a>
              <ul class="dropdown-menu">
                <!-- User image -->
                <li class="user-header">
                  <img src="<?php echo $_SESSION["foto"] ?>" class="profile-user-img img-responsive img-circle" alt="User Image">
                  <p>
                    <?php echo $_SESSION["nombres"] ?>
                    <small><?php echo $_SESSION["perfil"] ?></small>
                  </p>
                </li>
                <!-- Menu Body -->
                <li class="user-body">
                  <div class="row">
                    <div class="col-xs-12">
                      <a href="javascript:void(0)" class="btn btn-block btn-default btn-sm" data-toggle="modal" data-target=".modalFoto">Cambiar Foto</a>
                    </div>
                  </div>
                  <!-- /.row -->
                </li>
                <!-- Menu Footer-->
                <li class="user-footer">
                  <div class="pull-left">
                    <a id="CambiarContra" IdEmpleado="<?php echo $_SESSION["id_empleado"] ?>" fol="<?php echo $_SESSION["id"] ?>" class="btn btn-warning btn-flat">Cambiar Contraseña</a>
                  </div>
                  <div class="pull-right">
                    <a href="index.php?pagina=salir" class="btn btn-danger btn-flat">Salir</a>
                  </div>
                </li>
              </ul>
            </li>
            <!-- Control Sidebar Toggle Button -->
            <li>
              <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar">
        <!-- Sidebar user panel -->
        <div class="user-panel">
          <div class="pull-left image">
            <img src="<?php echo $_SESSION["foto"] ?>" class="img-circle" alt="User Image">
          </div>
          <div class="pull-left info">
            <p><?php echo $_SESSION["usuario"] ?></p>
            <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
          </div>
        </div>
        <!-- search form
      <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="Search...">
              <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
        </div>
      </form> -->
        <!-- /.search form -->
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu" data-widget="tree">
          <?php
          $usuarios = new Con_Usuario();
          $usuarios->CargarMenu();
          ?>
        </ul>
      </section>
      <!-- /.sidebar -->
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper<?php echo (basename($_SERVER['PHP_SELF']) == 'index.php') ? ' dashboard-background' : ''; ?>">
      <!-- Content Header (Page header) -->

      <!-- Main content -->
      <section class="content">

        <div class="row">
          <?php
          $e = new Con_Enlaces();
          $e->Enlaces();

          ?>
        </div>
        <!-- /.row -->


      </section>
      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

    <footer class="main-footer">
      <div class="pull-right hidden-xs">
        <b>Version</b> 1.0
      </div>
      <strong>Copyright &copy; <?php echo date('Y'); ?> <a href="https://www.togotec.com">TOGOTEC</a>.</strong> Todos los derechos reservados
    </footer>

    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
      <!-- Create the tabs -->
      <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
        <li><a href="#control-sidebar-home-tab" data-toggle="tab"><i class="fa fa-home"></i></a></li>
        <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i class="fa fa-gears"></i></a></li>
      </ul>
      <!-- Tab panes -->
      <div class="tab-content">
        <!-- Home tab content -->
        <div class="tab-pane" id="control-sidebar-home-tab">
          <h3 class="control-sidebar-heading">Recent Activity</h3>
          <ul class="control-sidebar-menu">
            <li>
              <a href="javascript:void(0)">
                <i class="menu-icon fa fa-birthday-cake bg-red"></i>

                <div class="menu-info">
                  <h4 class="control-sidebar-subheading"></h4>

                  <p></p>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <i class="menu-icon fa fa-user bg-yellow"></i>

                <div class="menu-info">
                  <h4 class="control-sidebar-subheading"></h4>

                  <p></p>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <i class="menu-icon fa fa-envelope-o bg-light-blue"></i>

                <div class="menu-info">
                  <h4 class="control-sidebar-subheading"></h4>

                  <p></p>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <i class="menu-icon fa fa-file-code-o bg-green"></i>

                <div class="menu-info">
                  <h4 class="control-sidebar-subheading">d</h4>

                  <p></p>
                </div>
              </a>
            </li>
          </ul>
          <!-- /.control-sidebar-menu -->

          <h3 class="control-sidebar-heading">Tasks Progress</h3>
          <ul class="control-sidebar-menu">
            <li>
              <a href="javascript:void(0)">
                <h4 class="control-sidebar-subheading">
                  Custom Template Design
                  <span class="label label-danger pull-right">70%</span>
                </h4>

                <div class="progress progress-xxs">
                  <div class="progress-bar progress-bar-danger" style="width: 70%"></div>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <h4 class="control-sidebar-subheading">
                  Update Resume
                  <span class="label label-success pull-right">95%</span>
                </h4>

                <div class="progress progress-xxs">
                  <div class="progress-bar progress-bar-success" style="width: 95%"></div>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <h4 class="control-sidebar-subheading">
                  Laravel Integration
                  <span class="label label-warning pull-right">50%</span>
                </h4>

                <div class="progress progress-xxs">
                  <div class="progress-bar progress-bar-warning" style="width: 50%"></div>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <h4 class="control-sidebar-subheading">
                  Back End Framework
                  <span class="label label-primary pull-right">68%</span>
                </h4>

                <div class="progress progress-xxs">
                  <div class="progress-bar progress-bar-primary" style="width: 68%"></div>
                </div>
              </a>
            </li>
          </ul>
          <!-- /.control-sidebar-menu -->

        </div>
        <!-- /.tab-pane -->
        <!-- Stats tab content -->
        <div class="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>
        <!-- /.tab-pane -->
        <!-- Settings tab content -->
        <div class="tab-pane" id="control-sidebar-settings-tab">
          <form method="post">
            <h3 class="control-sidebar-heading">General Settings</h3>

            <div class="form-group">
              <label class="control-sidebar-subheading">
                Report panel usage
                <input type="checkbox" class="pull-right" checked>
              </label>

              <p>
                Some information about this general settings option
              </p>
            </div>
            <!-- /.form-group -->

            <div class="form-group">
              <label class="control-sidebar-subheading">
                Allow mail redirect
                <input type="checkbox" class="pull-right" checked>
              </label>

              <p>
                Other sets of options are available
              </p>
            </div>
            <!-- /.form-group -->

            <div class="form-group">
              <label class="control-sidebar-subheading">
                Expose author name in posts
                <input type="checkbox" class="pull-right" checked>
              </label>

              <p>
                Allow the user to show his name in blog posts
              </p>
            </div>
            <!-- /.form-group -->

            <h3 class="control-sidebar-heading">Chat Settings</h3>

            <div class="form-group">
              <label class="control-sidebar-subheading">
                Show me as online
                <input type="checkbox" class="pull-right" checked>
              </label>
            </div>
            <!-- /.form-group -->

            <div class="form-group">
              <label class="control-sidebar-subheading">
                Turn off notifications
                <input type="checkbox" class="pull-right">
              </label>
            </div>
            <!-- /.form-group -->

            <div class="form-group">
              <label class="control-sidebar-subheading">
                Delete chat history
                <a href="javascript:void(0)" class="text-red pull-right"><i class="fa fa-trash-o"></i></a>
              </label>
            </div>
            <!-- /.form-group -->
          </form>
        </div>
        <!-- /.tab-pane -->
      </div>
    </aside>
    <!-- /.control-sidebar -->
    <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
    <div class="control-sidebar-bg"></div>
  </div>
  <!-- ./wrapper -->


  <div class="modal fade modalFoto" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content profile-modal-content">

        <div class="modal-header profile-modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title">CAMBIAR IMAGEN DE PERFIL</h4>
        </div>
        <div class="modal-body text-center">
          <div class="profile-photo-preview" style="background-image: url('<?php echo $_SESSION["foto"] ?>');"></div>
          <p class="text-muted small" style="margin-top: 16px;">Selecciona una nueva imagen de perfil.</p>
          <div class="row">
            <div class="col-md-12">
              <div class="btn btn-file btn-primary btn-block profile-file-picker">
                Seleccionar archivo
                <input type="file" name="fotoUser" id="fotoUser">
              </div>
            </div>
          </div>
          <div class="clearfix"></div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success btn-flat" id="CambiarFoto" data-dismiss="modal">Aceptar</button>
        </div>

      </div>
    </div>
  </div>



  <div style="display: none;" id="cabeceraOrdenes">
    <div style="width: 100%">
      <!--<div style="width: 100px;float: left;">
      <img src="<?php echo $_SESSION["logo1"]; ?>" style="width: 100%"> 
    </div>-->
      <div style="width: 100%;">
        <table style="width: 100%;">
          <thead>
            <th></th>
            <th></th>
          </thead>
          <tbody style="width: 100%">
            <tr>
              <td>
                <label style="font-weight: bold;min-width: 70px;display: inline-block;">Paciente:</label>
                <span id="PacienteOrden"></span>
              </td>
              <td>
                <label style="font-weight: bold;min-width: 50px;display: inline-block;">H.C.U:</label>
                <span id="HcuOrden"></span>
              </td>
            </tr>
            <tr>
              <td>
                <label style="font-weight: bold;min-width: 70px;display: inline-block;">Edad:</label>
                <span id="EdadOrden"></span>
              </td>
              <td>
                <label style="font-weight: bold;min-width: 50px;display: inline-block;">Orden:</label>
                <span id="NumeroOrden"></span>
              </td>
            </tr>
            <tr>
              <td>
                <label id="titulo" style="font-weight: bold;min-width: 70px;display: inline-block;">Fecha:</label>
                <span id="MedicoExamen"><?php echo date("Y-m-d"); ?></span>
              </td>
              <td>
                <label id="titulo2" style="font-weight: bold;min-width: 50px;display: inline-block;">P.V.P $:</label>
                <span id="totalOrden"></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div id="cabecera" style="width: 100%; height: 180px; overflow: hidden;display: none; margin-top: -1em;">
    <div style="width: 15%; float: left;">
      <img src="<?php echo $_SESSION["logo1"]; ?>" style="width: 100%; height: 150px; margin-top: -2em;">
    </div>
    <div style="width: 75%; float: left;">
      <div style="width: 100%; padding-top: 2.3em; line-height: 20px;text-align: left;margin-top: -0.5em;">
        <label><b><?php echo $_SESSION["empresa"]; ?></b></label><br>
        <label style="font-weight: normal;font-size: 11px;"><?php echo $_SESSION["direccion"]; ?></label><br>
        <label style="font-weight: normal;font-size: 11px;"><b>Teléfonos:</b> <?php echo $_SESSION["telefono"]; ?></label><br>

      </div>
    </div>
    <!--<div style="width: 15%; float: right;">
    <img src="<?php echo $_SESSION["logo2"]; ?>" style="width: 100%; height: 100px; padding-top: 2em;">
  </div>-->
  </div>

  <div id="cabeceraLocal" style="width: 100%;  overflow: hidden; display: none;">
    <div style="width: 100%; text-align: center;">
      <label><b><?php echo $_SESSION["empresa"]; ?></b></label><br>
      <label id="tituloReporte"><b></b></label><br>
      <label id="reporteFechaLocal"><b></b></label><br>
    </div>
  </div>

  <div class="modal fade" id="modal-ride" tabindex='1' data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                    <h4 id="tituloModal" class="modal-title">RIDE</h4>
                </div>
                <div class="modal-body" id="Ride">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

  <!-- Slimscroll -->
  <script src="Lib/jquery.slimscroll.min.js"></script>
  <!-- FastClick -->
  <script src="Lib/fastclick.js"></script>
  <!-- AdminLTE App -->
  <script src="Lib/adminlte.min.js?v=1.2"></script>
  <!-- AdminLTE for demo purposes -->


  <script src="js/Js_Validaciones.js?v=1.10"></script>

  <script src="Lib/demo.js?v=1.3"></script>

  <script src="js/Js_RealTime.js"></script>
</body>

</html>