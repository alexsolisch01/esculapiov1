<?php
session_start();

require_once "autoloadAjax.php";


if (isset($_POST['Requerimiento'])) {


	if ($_POST['Requerimiento'] == "ExisteSesion") {

		$dao = new Dao();

		$dao->Campo("s.id", "");
		$dao->Campo("s.id_usuario", "");
		$dao->Campo("u.psd", "");


		$dao->TablasInnerAlias("sesiones", "s", "usuario", "u");
		$dao->Where("u.usuario", "'" . $_POST["Usuario"] . "'", "and");
		$dao->Where("s.id_estado", '1', "");
		$dao->Limite("0,1");
		$respuesta = $dao->Consultar();
		$confirma = true;
		$id = 0;
		foreach ($respuesta as $row => $item) {

			if (password_verify($_POST["Pass"], $item['psd']) && $_POST["Pass"] != 1234) {
				$confirma = false;
				$id = $item[1];
			}
		}
		$jsondata = array();
		$jsondata[0] = $confirma;
		$jsondata[1] = $id;
		echo json_encode($jsondata);
	}



	if ($_POST['Requerimiento'] == "IniciarSesion") {

		$dao = new Dao();

		$dao->Campo("u.id", "");
		$dao->Campo("u.usuario", "");
		$dao->Campo("u.psd", "");
		$dao->Campo("u.id_perfil", "");
		$dao->Campo("u.id_empleado", "");
		$dao->Campo("p.id_establecimiento", "");
		$dao->Campo("u.id_punto_venta", "");
		$dao->Campo("e.foto", "");
		$dao->Campo("pe.secuencia", "");
		$dao->Campo("es.id", "");
		$dao->Campo("p.secuencia_fc", "");
		$dao->Campo("p.impresora", "");
		$dao->Campo("CONCAT(e.apellidos,' ',e.nombres) nombresEmple", "");
		$dao->Campo("e.id", "");
		$dao->Campo("es.nombre_comercial", "");
		$dao->Campo("p.descuento", "");
		$dao->Campo("p.secuencia_nc", "");

		$dao->Campo("ep.razon_social", "");
		$dao->Campo("ep.horario", "");
		$dao->Campo("ep.direccion", "");
		$dao->Campo("ep.telefono", "");
		$dao->Campo("ep.logo", "");
		$dao->Campo("ep.logo2", "");
		$dao->Campo("ep.correo1", "");
		$dao->Campo("ep.ruc", "");
		$dao->Campo("ep.correo2", "");
		$dao->Campo("ep.correo3", "");

		$dao->Campo("ep.psd1", "");
		$dao->Campo("ep.psd2", "");
		$dao->Campo("ep.psd3", "");

		$dao->Campo("ep.host", "");
		$dao->Campo("ep.puerto", "");
		$dao->Campo("ep.smtpsecure", "");

		$dao->Campo("e.firma", "");
		$dao->Campo("e.cedula", "");

		$dao->TablasInnerAlias("usuario", "u", "punto_venta", "p");
		$dao->TablasInnerAlias("usuario", "u", "empleado", "e");
		$dao->TablasInnerAlias("punto_venta", "p", "punto_emision", "pe");
		$dao->TablasInnerAlias("punto_venta", "p", "establecimiento", "es");
		$dao->TablasInnerAlias("establecimiento", "es", "empresa", "ep");
		$dao->Where("u.id_estado", "1", "and");
		$dao->Where("u.usuario", "'" . $_POST["Usuario"] . "'", "");

		$respuesta = $dao->Consultar();
		$jsondata = array();
		$jsondata[0] = "UsuarioIncorrecto";
		
		foreach ($respuesta as $row => $item) {

			if (password_verify(1234, $item['psd']) && $_POST["Pass"] == 1234) {
				$jsondata[0] = "NuevoUsuario";
				$jsondata[1] = $item[0];
			} else {
				
				//error_log("Contraseña: ". password_hash($_POST["Pass"], PASSWORD_BCRYPT));
				if (password_verify($_POST["Pass"], $item['psd']) && $_POST["Pass"] != 1234) {
				//if ($_POST["Pass"]=="35cu14p10"){
					$_SESSION["QUICKCONT_INTEGRADO A QUICKCONT"] = "NO";
					$_SESSION["impresora"] = $item[11];
					$_SESSION["validar"] = true;
					$_SESSION["usuario"] = $item["usuario"];
					$_SESSION["id"] = $item[0];
					$_SESSION["foto"] = $item["foto"];
					$_SESSION["firma"] = $item["firma"];
					$_SESSION["perfil"] = $item["id_perfil"];
					$_SESSION["empleado"] = $item["id_empleado"];
					$_SESSION["establecimiento"] = str_pad($item[9],  3, "0", STR_PAD_LEFT);
					$_SESSION["puntoVenta"] = $item["id_punto_venta"];
					$_SESSION["puntoEmision"] = $item["secuencia"];
					$_SESSION["secuencia_fc"] = str_pad($item[10],  9, "0", STR_PAD_LEFT);
					$_SESSION["secuencia_nc"] = str_pad($item[16],  9, "0", STR_PAD_LEFT);
					$_SESSION["cedula"] = $item["cedula"];

					$_SESSION["nombres"] = $item[12];
					$_SESSION["id_empleado"] = $item[13];
					$_SESSION["nombreComercial"] = $item[14];
					$_SESSION["descuento"] = $item[15];
					$_SESSION["puntoVentaSecuencia"] = $item[8];

					$_SESSION["empresa"] = $item[17];
					$_SESSION["horario"] = $item[18];
					$_SESSION["direccion"] = $item[19];
					$_SESSION["telefono"] = $item[20];
					$_SESSION["logo1"] = $item[21];
					$_SESSION["logo2"] = $item[22];
					$_SESSION["correoEmpresa"] = $item[23];
					$_SESSION["ruc"] = $item[24];

					$_SESSION["correoResultados"] = $item[25];
					$_SESSION["correoBasura"] = $item[26];

					$_SESSION["PsdCorreo1"] = $item[27];
					$_SESSION["PsdCorreo2"] = $item[28];
					$_SESSION["PsdCorreo3"] = $item[29];

					$_SESSION["HostSmtp"] = $item[30];
					$_SESSION["PuertoSmtp"] = $item[31];
					$_SESSION["SmtpSecure"] = $item[32];

					$dao = new Dao();

					$dao->Campo("id", "");
					$dao->Campo("parametro", "");
					$dao->Campo("descripcion", "");
					$dao->Campo("valor", "");
					$dao->Campo("usuario_modifico", "");
					$dao->Campo("fecha_modifico", "");

					$dao->Tabla("parametros", "");

					$respuesta = $dao->Consultar();

					$_SESSION["CHEQUES"] = "0";
					$_SESSION["TRANSFERENCIAS"] = "0";
					$_SESSION["TARJETA"] = "0";
					$_SESSION["CREDITO"] = "0";

					foreach ($respuesta as $row => $item) {
						if ($item[0] == 1 && $item[3] == 1) {
							$_SESSION["FcElentronica"] = "Online";
						}
						if ($item[0] == 3 && $item[3] == 1) {
							$_SESSION["FcElentronica"] = "Manual";
						}

						if ($item[0] == 5 && $item[3] == 1) {
							$_SESSION["FcElentronica"] = "2";
						}
						if ($item[0] == 6 && $item[3] == 1) {
							$_SESSION["FcElentronica"] = "4";
						}
						if ($item[0] == 7 && $item[3] == 1) {
							$_SESSION["FcElentronica"] = "6";
						}
						if ($item[0] == 8) {
							$_SESSION["FcCorreos"] = $item[3];
						}

						if ($item[0] == 10 && $item[3] == 1) {
							$_SESSION["CHEQUES"] = "1";
						}
						if ($item[0] == 11 && $item[3] == 1) {
							$_SESSION["TRANSFERENCIAS"] = "1";
						}
						if ($item[0] == 12 && $item[3] == 1) {
							$_SESSION["TARJETA"] = "1";
						}
						if ($item[0] == 13 && $item[3] == 1) {
							$_SESSION["CREDITO"] = "1";
						}

						if ($item[0] >= 14 && $item[0] < 22 || $item[0]==23) {
							$_SESSION["QUICKCONT_".$item[1]] = $item[3];
						}
						if ($item[0] == 22 && $item[3] == 1) {
							$_SESSION["INVENTARIOSINSTOCK"] = "1";
						}
						if ($item[0] == 24) {
							$_SESSION["HABILITARDESCUENTOPREDEFINIDO"] = $item[3];
						}
					}
					$jsondata[0] = "UsuarioNormal";
				} else {
					$jsondata[0] = "PsdIncorrecta";
				}
			}
		}
		echo json_encode($jsondata);
	}
	if ($_POST['Requerimiento'] == "CerrarSesion") {

		if (isset($_SESSION['usuario'])) {
			if ($_SESSION['usuario'] == $_POST['Usuario']) {
			}
		}
		$jsondata = array();
		$jsondata[0] = true;
		echo json_encode($jsondata);
	}
	if ($_POST['Requerimiento'] == "GuardarUsuario") {

		$passHash = password_hash(1234, PASSWORD_BCRYPT);

		$datos = array(
			"usuario" => $_POST["Usuario"],
			"psd" => $passHash,
			"id_empleado" => $_POST["Empleado"],
			"id_perfil" => $_POST["Perfil"],
			"id_estado" => 1,
			"id_punto_venta" => $_POST["Punto"]
		);

		$dao = new Dao();
		$dao->GuardarAjax("usuario", $datos);
	}

	if ($_POST['Requerimiento'] == "ModificarUsuario") {

		$datos = array(
			"id_perfil" => $_POST["Perfil"],
			"usuario" => $_POST["Usuario"],
			"id_punto_venta" => $_POST["Punto"]
		);

		$dao = new Dao();
		$dao->ModificarAjax("usuario", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "EliminarUsuario") {
		$dao = new Dao();
		$dao->EliminarAjax("usuario", $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "CargarMenu") {

		$dao = new Dao();

		$dao->Campo("pp.id_pantalla", "");

		$dao->TablasInnerAlias("perfil_pantalla", "pp", "pantalla", "p");
		$dao->Where("p.id_estado", "1", "and");
		$dao->Where("pp.id_perfil", $_SESSION["perfil"], "");


		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "ModificaContra") {

		$passHash1 = password_hash($_POST["Segundo"], PASSWORD_BCRYPT);

		$datos = array("psd" => $passHash1);

		$dao = new Dao();
		$dao->ModificarAjax("usuario", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "Resetear") {

		$passHash2 = password_hash(1234, PASSWORD_BCRYPT);

		$datos = array("psd" => $passHash2);

		$dao = new Dao();
		$dao->ModificarAjax("usuario", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}


	if ($_POST['Requerimiento'] == "EliminarEmpleado") {

		$datos = array("id_estado" => 2);
		$dao = new Dao();
		$dao->ModificarAjax("empleado", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "cargarPantalla") {

		$dao = new Dao();

		$dao->Campo("t.nombre", "");


		$dao->TablasInnerAlias("medico_especialidad", "ms", "especialidad", "e");
		$dao->TablasInnerAlias("especialidad", "e", "tipo_servicio", "t");
		$dao->Where("ms.id_empleado", $_SESSION["id_empleado"], "");


		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "CargarMensajesPorUsuario") {

		$dao = new Dao();

		$sql = ' SELECT X.* 
				FROM
				(SELECT c.id,c.id_receptor,e.nombres,c.fecha_registro,e.foto,c.sms,c.id_emisor
				FROM chat c INNER JOIN empleado e ON (e.id = c.id_receptor)
				WHERE  c.id_emisor =' . $_SESSION['id_empleado'] . ' and C.id_receptor = ' . $_POST['Empleado'] . '
				UNION 
				SELECT c.id,c.id_receptor,e.nombres,c.fecha_registro,e.foto,c.sms,c.id_emisor
				FROM chat c INNER JOIN empleado e ON (e.id = c.id_receptor)
				WHERE c.id_receptor =' . $_SESSION['id_empleado'] . ' and C.id_emisor = ' . $_POST['Empleado'] . ' 
				) X ORDER BY X.fecha_registro';
		/*if($_POST['Estado']==23){
			$sql =' SELECT X.* 
				FROM
				(
				SELECT c.id,c.id_receptor,e.nombres,c.fecha_registro,e.foto,c.sms,c.id_emisor
				FROM chat c INNER JOIN empleado e ON (e.id = c.id_receptor)
				WHERE c.id_estado=23 and c.id_receptor ='.$_SESSION['id_empleado'].' and C.id_emisor = '.$_POST['Empleado'].' 
				) X ORDER BY X.fecha_registro';
		}*/
		$dao->ConsultarSqlNativoAjax($sql);
	}

	if ($_POST['Requerimiento'] == "EnviarMensaje") {

		$datos = array(

			"id_emisor" => $_SESSION["id_empleado"],
			"id_receptor" => $_POST["Empleado"],
			"id_estado" => 1,
			"sms" => $_POST["Mensaje"]
		);

		$dao = new Dao();
		$dao->GuardarAjax("chat", $datos);
	}
	if ($_POST['Requerimiento'] == "ActualizarMensajesALeidos") {

		$datos = array("id_estado" => 23);

		$dao = new Dao();
		$dao->ModificarAjax("chat", $datos, "id_receptor=" . $_SESSION['id_empleado'] . ' and id_emisor=' . $_POST["Empleado"], $_POST['Empleado']);
	}

	if ($_POST['Requerimiento'] == "CargarUsuarioPorPuntoVenta") {

		$dao = new Dao();
		$dao->Campo("u.usuario", "");
		$dao->Tabla("usuario", "u");
		$dao->Where("u.id_punto_venta", $_POST["Punto"], "");

		$dao->ConsultarAjax();
	}
	if ($_POST['Requerimiento'] == "CargarTablaUsuarioJS") {
		
		$dao = new Dao();
		
		$dao->Campo("u.id","");//0
		$dao->Campo("Concat(e.apellidos,' ',e.nombres)","");//1
		$dao->Campo("p.nombre","");//2
		$dao->Campo("u.usuario","");//3
		$dao->Campo("pv.nombre","");//4
		$dao->Campo("u.fecha_registro","");//5
		$dao->Campo("pe.secuencia","");//6

		$dao->TablasInnerAlias("usuario","u","empleado","e");
		$dao->TablasInnerAlias("usuario","u","perfil","p");
		$dao->TablasInnerAlias("usuario","u","punto_venta","pv");
		$dao->TablasInnerAlias("punto_venta","pv","punto_emision","pe");
		$dao->Where("u.id_estado","1","and");

		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("Concat(e.apellidos,' ',e.nombres,' ',u.usuario)", $_POST["search"]["value"], "");
			}
		}

		$respuesta = $dao->Consultar();
		$data = array();
		$totalFilter = 0;
		foreach ($respuesta as $row => $item) {
			$totalFilter++;
			
			//$editar = ' <i class="fa fa-pencil btn btn-sm btn-success btnEditar" registro="' . $item[0] . '" title="MODIFICAR REGISTRO"></i> ';
			//$eliminar = ' <i class="fa fa-trash-o btn btn-sm btn-danger btnEliminar" registro="' . $item[0] . '" title="ELIMINAR REGISTRO"></i> ';
			//$resetear = ' <i class="fa fa-refresh btn btn-sm btn-warning btnResetear" registro="' . $item[0] . '" title="RESETEAR CONTRASEÑA"></i> ';

			$editar = '<button class="action-btn edit btnEditar" registro="' . $item[0] . '" title="Modificar"><i class="fa fa-pencil"></i></button>';
			$eliminar = '<button class="action-btn delete btnEliminar" registro="' . $item[0] . '" title="Eliminar"><i class="fa fa-trash-o"></i></button>';
			$resetear = '<button class="action-btn reset btnResetear" registro="' . $item[0] . '" title="Resetear Contraseña"><i class="fa fa-refresh"></i></button>';

			$item[0] = $editar . $eliminar . $resetear;
			$data[] = $item;
		}
		$output = array(
			"draw"           => intval($_POST["draw"]),
			"recordsTotal"   => $totalFilter,
			"recordsFiltered" => $totalFilter,
			"data"           => $data
		);
		echo json_encode($output);
	}
}
