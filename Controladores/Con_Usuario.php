<?php

class Con_Usuario
{

	public function CargarMenu()
	{

		$dao = new Dao();
		$dao->Campo("m.nombre", ""); //0
		$dao->Campo("m.icono", ""); //1
		$dao->Campo("m.orden", ""); //2
		$dao->Campo("p.nombre", ""); //3
		$dao->Campo("p.archivo", ""); //4
		$dao->Campo("m.id", ""); //5

		$dao->TablasInnerAlias("perfil_pantalla", "pp", "pantalla", "p");
		$dao->TablasInnerAlias("pantalla", "p", "modulo", "m");

		$dao->Where("pp.id_perfil", $_SESSION["perfil"], "");
		$dao->Ordenar("3,4");

		$respuesta = $dao->Consultar();
		$nombreModulo = "";
		$modulo = "";
		$menuitem = "";
		foreach ($respuesta as $row => $item) {
			$_SESSION["PerlaPantalla"][$item[4]] = "S";

			if ($nombreModulo != $item[0]) {
				if ($nombreModulo != "") {
					$modulo = str_replace("[ITEMS]", $menuitem, $modulo);
					echo $modulo;
					$menuitem = "";
				}
				/*$modulo = ' <li class="treeview">
                              <a href="javascript:void(0)">
                                <img style="margin-left:-0.8em;" src="' . $item[1] . '"><span> &nbsp;&nbsp;&nbsp;' . $item[0] . '</span>
								<span class="pull-right-container">
									<i class="fa fa-angle-left pull-right"></i>
								</span>
                              </a>
                              <ul class="treeview-menu">
                                [ITEMS]
                              </ul>
                            </li>';*/
				$iconClass = trim($item[1]);
				if ($iconClass === '') {
					$iconClass = 'fa fa-circle';
				} else {
					if (strpos($iconClass, 'fa ') === false) {
						if (strpos($iconClass, 'fa-') === false) {
							$iconClass = 'fa fa-' . $iconClass;
						} else {
							$iconClass = 'fa ' . $iconClass;
						}
					}
				}
				$modulo = ' <li class="treeview">
                              <a href="javascript:void(0)">
                                <i class="' . $iconClass . ' menu-icon"></i><span>' . $item[0] . '</span>
								<span class="pull-right-container">
									<i class="fa fa-angle-left pull-right"></i>
								</span>
                              </a>
                              <ul class="treeview-menu">
                                [ITEMS]
                              </ul>
                            </li>';
				$nombreModulo = $item[0];
			}
			$menuitem .= '<li><a href="index.php?pagina=' . $item[4] . '" modulo="' . $item[5] . '"> <i class="fa fa-angle-right"></i> <span>' . $item[3] . '</span>  </a></li>';
		}
		$modulo = str_replace("[ITEMS]", $menuitem, $modulo);
		echo $modulo;

		$dao1 = new Dao();
		$dao2 = new Dao();

		/////////////////////////////////////////////////////////////////	CARGA LOS PACIENTES QUE YA TIENEN SIGNOS VITALES
		$dao1->Campo("DISTINCT c.id", "");
		$dao1->Campo("CONCAT(p.apellido,' ',p.apellido_materno)", "");
		$dao1->Campo("p.nombre", "");
		$dao1->Campo("p.id", "");
		$dao1->Campo("c.id_estado", "");
		$dao1->Campo("p.cedula", "");
		$dao1->Campo("s.triage", "");
		$dao1->Campo("s.prioridad", "");
		$dao1->Campo("g.nombre", "");
		$dao1->Campo("s.edad", "");
		$dao1->Campo("s.presion", "");
		$dao1->Campo("s.pulso", "");
		$dao1->Campo("s.talla", "");
		$dao1->Campo("s.peso", "");
		$dao1->Campo("s.imc", "");
		$dao1->Campo("s.temp_bucal", "");
		$dao1->Campo("s.temp_rectal", "");
		$dao1->Campo("s.temp_axilar", "");
		$dao1->Campo("s.perim_cefalico", "");
		$dao1->Campo("s.perim_abdominal", "");
		$dao1->Campo("s.prioridad", "");
		$dao1->Campo("s.usuario_registro", "");
		$dao1->Campo("s.id_consulta", "");
		$dao1->Campo("s.fr", "");
		$dao1->Campo("ci.id_estado", "");
		$dao1->Campo("ci.turno", "");
		$dao1->TablasInnerAlias("signo", "s", "paciente", "p");
		$dao1->TablasInnerAlias("consulta", "c", "paciente", "p");
		$dao1->TablasInnerAlias("signo", "s", "consulta", "c");
		$dao1->TablasInnerAlias("paciente", "p", "genero", "g");
		$dao1->TablasInnerAliasOtra("consulta_item", "ci", "consulta", "c");
		$dao1->TablasInnerAlias("consulta_item", "ci", "empleado", "em");
		$dao1->In_Where("ci.id_estado", "9,19", "and");
		$dao1->Where("CONVERT(ci.fecha_atencion,DATE)", 'CURDATE()', "and");
		$dao1->Where("em.id", $_SESSION["id_empleado"], "");
		$dao1->Agrupar("p.id");
		$dao1->Ordenar("ci.turno");

		/////////////////////////////////////////////////////////////////	CARGA LOS PACIENTES QUE NO TIENEN SIGNOS VITALES
		$dao2->Campo("DISTINCT c.id", "");
		$dao2->Campo("CONCAT(p.apellido,' ',p.apellido_materno)", "");
		$dao2->Campo("p.nombre", "");
		$dao2->Campo("p.id", "");
		$dao2->Campo("c.id_estado", "");
		$dao2->Campo("p.cedula", "");
		$dao2->Campo("ci.turno", "");
		$dao2->TablasInnerAlias("consulta", "c", "paciente", "p");
		$dao2->TablasInnerAliasOtra("consulta_item", "ci", "consulta", "c");
		$dao2->TablasInnerAlias("consulta_item", "ci", "empleado", "em");
		$dao2->Where("c.id_estado", "1", "and");
		$dao2->Where("CONVERT(ci.fecha_atencion,DATE)", 'CURDATE()', "and");
		$dao2->Where("em.id", $_SESSION["id_empleado"], "");


		$respuesta1 = $dao1->Consultar();
		$respuesta2 = $dao2->Consultar();

		$pacientes = "";
		$totalPacientesAtendidos = 0;
		$totalPacientes = 0;
		$pacientesAtendidos = 0;
		foreach ($respuesta1 as $row1 => $item1) {
			$nombre = $item1[2];
			$nombre1 = explode(" ", $nombre);
			if ($item1[7] == 'PACIENTE EN SILLA DE RUEDAS') {
				$prioridad = '<img style="width:20px; margin-top:-0.2em; margin-left:0.3em;" src="imagenes/silla.jpg">';
			}
			if ($item1[7] == 'DISCAPACITADO') {
				$prioridad = '<img style="width:20px; margin-top:-0.2em; margin-left:0.3em;" src="imagenes/camilla.png">';
			}
			if ($item1[7] == 'TERCERA EDAD') {
				$prioridad = '<img style="width:20px; margin-top:-0.2em; margin-left:0.3em;" src="imagenes/tercera.jpg">';
			}
			if ($item1[7] == 'SELECCIONAR') {
				$prioridad = '<img style="width:20px; margin-top:-0.2em; margin-left:0.3em;" src="">';
			}

			if ($item1[24] != 19) {
				if ($item1[6] == 'EMERGENCIA') {
					$pacientes .= '<li class="pointer " title="TURNO : ' . $item1[25] . '"   id="PacienteConsultaExterna"><a idConsulta="' . $item1[0] . '" idPaciente="' . $item1[3] . '" nombrePaciente="' . $item1[1] . ' ' . $nombre1[0] . '" cedulaPaciente="' . $item1[5] . '" Estado="' . $item1[4] . '" Sexo="' . $item1[8] . '" Edad="' . $item1[9] . '" Presion="' . $item1[10] . '" Pulso="' . $item1[11] . '" FreRes="' . $item1[23] . '" TAxilar="' . $item1[17] . '" Peso="' . $item1[13] . '" Talla="' . $item1[12] . '" Imc="' . $item1[14] . '" PCefalico="' . $item1[18] . '" ><i class="fa fa-circle-o text-orange"></i>' . $item1[1] . ' ' . $nombre1[0] . ' ' . $prioridad . '</a></li>';
				}
				if ($item1[6] == 'RESUCITACION') {
					$pacientes .= '<li class="pointer " title="TURNO : ' . $item1[25] . '"   id="PacienteConsultaExterna"><a idConsulta="' . $item1[0] . '" idPaciente="' . $item1[3] . '" nombrePaciente="' . $item1[1] . ' ' . $nombre1[0] . '" cedulaPaciente="' . $item1[5] . '" Estado="' . $item1[4] . '" Sexo="' . $item1[8] . '" Edad="' . $item1[9] . '" Presion="' . $item1[10] . '" Pulso="' . $item1[11] . '" FreRes="' . $item1[23] . '" TAxilar="' . $item1[17] . '" Peso="' . $item1[13] . '" Talla="' . $item1[12] . '" Imc="' . $item1[14] . '" PCefalico="' . $item1[18] . '"> <i class="fa fa-circle-o text-red"></i> ' . $item1[1] . ' ' . $nombre1[0] . ' ' . $prioridad . '</a></li>';
				}
				if ($item1[6] == 'URGENCIA') {
					$pacientes .= '<li class="pointer " title="TURNO : ' . $item1[25] . '"   id="PacienteConsultaExterna"><a idConsulta="' . $item1[0] . '" idPaciente="' . $item1[3] . '" nombrePaciente="' . $item1[1] . ' ' . $nombre1[0] . '" cedulaPaciente="' . $item1[5] . '" Estado="' . $item1[4] . '" Sexo="' . $item1[8] . '" Edad="' . $item1[9] . '" Presion="' . $item1[10] . '" Pulso="' . $item1[11] . '" FreRes="' . $item1[23] . '" TAxilar="' . $item1[17] . '" Peso="' . $item1[13] . '" Talla="' . $item1[12] . '" Imc="' . $item1[14] . '" PCefalico="' . $item1[18] . '" ><i class="fa fa-circle-o text-yellow"></i> ' . $item1[1] . ' ' . $nombre1[0] . ' ' . $prioridad . '</a></li>';
				}
				if ($item1[6] == 'URGENCIA MENOR') {
					$pacientes .= '<li class="pointer " title="TURNO : ' . $item1[25] . '"   id="PacienteConsultaExterna"><a idConsulta="' . $item1[0] . '" idPaciente="' . $item1[3] . '" nombrePaciente="' . $item1[1] . ' ' . $nombre1[0] . '" cedulaPaciente="' . $item1[5] . '" Estado="' . $item1[4] . '" Sexo="' . $item1[8] . '" Edad="' . $item1[9] . '" Presion="' . $item1[10] . '" Pulso="' . $item1[11] . '" FreRes="' . $item1[23] . '" TAxilar="' . $item1[17] . '" Peso="' . $item1[13] . '" Talla="' . $item1[12] . '" Imc="' . $item1[14] . '" PCefalico="' . $item1[18] . '" ><i class="fa fa-circle-o text-green"></i> ' . $item1[1] . ' ' . $nombre1[0] . ' ' . $prioridad . '</a></li>';
				}
				if ($item1[6] == 'SIN URGENCIA' || $item1[6] == 'SELECCIONAR') {
					$pacientes .= '<li class="pointer " title="TURNO : ' . $item1[25] . '"   id="PacienteConsultaExterna"><a idConsulta="' . $item1[0] . '" idPaciente="' . $item1[3] . '" nombrePaciente="' . $item1[1] . ' ' . $nombre1[0] . '" cedulaPaciente="' . $item1[5] . '" Estado="' . $item1[4] . '" Sexo="' . $item1[8] . '" Edad="' . $item1[9] . '" Presion="' . $item1[10] . '" Pulso="' . $item1[11] . '" FreRes="' . $item1[23] . '" TAxilar="' . $item1[17] . '" Peso="' . $item1[13] . '" Talla="' . $item1[12] . '" Imc="' . $item1[14] . '" PCefalico="' . $item1[18] . '" ><i class="fa fa-square-o text-aqua"></i> ' . $item1[1] . ' ' . $nombre1[0] . ' ' . $prioridad . '</a></li>';
				}
				$totalPacientes++;
			} else {

				if ($item1[6] == 'EMERGENCIA') {
					$pacientesAtendidos .= '<li class="pointer " title="TURNO : ' . $item1[25] . '"   id="PacienteConsultaExterna"><a idConsulta="' . $item1[0] . '" idPaciente="' . $item1[3] . '" nombrePaciente="' . $item1[1] . ' ' . $nombre1[0] . '" cedulaPaciente="' . $item1[5] . '" Estado="' . $item1[24] . '" Sexo="' . $item1[8] . '" Edad="' . $item1[9] . '" Presion="' . $item1[10] . '" Pulso="' . $item1[11] . '" FreRes="' . $item1[23] . '" TAxilar="' . $item1[17] . '" Peso="' . $item1[13] . '" Talla="' . $item1[12] . '" Imc="' . $item1[14] . '" PCefalico="' . $item1[18] . '" ><i class="fa fa-circle-o text-orange"></i>' . $item1[1] . ' ' . $nombre1[0] . ' ' . $prioridad . '</a></li>';
				}
				if ($item1[6] == 'RESUCITACION') {
					$pacientesAtendidos .= '<li class="pointer " title="TURNO : ' . $item1[25] . '"   id="PacienteConsultaExterna"><a idConsulta="' . $item1[0] . '" idPaciente="' . $item1[3] . '" nombrePaciente="' . $item1[1] . ' ' . $nombre1[0] . '" cedulaPaciente="' . $item1[5] . '" Estado="' . $item1[24] . '" Sexo="' . $item1[8] . '" Edad="' . $item1[9] . '" Presion="' . $item1[10] . '" Pulso="' . $item1[11] . '" FreRes="' . $item1[23] . '" TAxilar="' . $item1[17] . '" Peso="' . $item1[13] . '" Talla="' . $item1[12] . '" Imc="' . $item1[14] . '" PCefalico="' . $item1[18] . '"> <i class="fa fa-circle-o text-red"></i> ' . $item1[1] . ' ' . $nombre1[0] . ' ' . $prioridad . '</a></li>';
				}
				if ($item1[6] == 'URGENCIA') {
					$pacientesAtendidos .= '<li class="pointer " title="TURNO : ' . $item1[25] . '"   id="PacienteConsultaExterna"><a idConsulta="' . $item1[0] . '" idPaciente="' . $item1[3] . '" nombrePaciente="' . $item1[1] . ' ' . $nombre1[0] . '" cedulaPaciente="' . $item1[5] . '" Estado="' . $item1[24] . '" Sexo="' . $item1[8] . '" Edad="' . $item1[9] . '" Presion="' . $item1[10] . '" Pulso="' . $item1[11] . '" FreRes="' . $item1[23] . '" TAxilar="' . $item1[17] . '" Peso="' . $item1[13] . '" Talla="' . $item1[12] . '" Imc="' . $item1[14] . '" PCefalico="' . $item1[18] . '" ><i class="fa fa-circle-o text-yellow"></i> ' . $item1[1] . ' ' . $nombre1[0] . ' ' . $prioridad . '</a></li>';
				}
				if ($item1[6] == 'URGENCIA MENOR') {
					$pacientesAtendidos .= '<li class="pointer "  title="TURNO : ' . $item1[25] . '"  id="PacienteConsultaExterna"><a idConsulta="' . $item1[0] . '" idPaciente="' . $item1[3] . '" nombrePaciente="' . $item1[1] . ' ' . $nombre1[0] . '" cedulaPaciente="' . $item1[5] . '" Estado="' . $item1[24] . '" Sexo="' . $item1[8] . '" Edad="' . $item1[9] . '" Presion="' . $item1[10] . '" Pulso="' . $item1[11] . '" FreRes="' . $item1[23] . '" TAxilar="' . $item1[17] . '" Peso="' . $item1[13] . '" Talla="' . $item1[12] . '" Imc="' . $item1[14] . '" PCefalico="' . $item1[18] . '" ><i class="fa fa-circle-o text-green"></i> ' . $item1[1] . ' ' . $nombre1[0] . ' ' . $prioridad . '</a></li>';
				}
				if ($item1[6] == 'SIN URGENCIA' || $item1[6] == 'SELECCIONAR') {
					$pacientesAtendidos .= '<li class="pointer " title="TURNO : ' . $item1[25] . '"   id="PacienteConsultaExterna"><a idConsulta="' . $item1[0] . '" idPaciente="' . $item1[3] . '" nombrePaciente="' . $item1[1] . ' ' . $nombre1[0] . '" cedulaPaciente="' . $item1[5] . '" Estado="' . $item1[24] . '" Sexo="' . $item1[8] . '" Edad="' . $item1[9] . '" Presion="' . $item1[10] . '" Pulso="' . $item1[11] . '" FreRes="' . $item1[23] . '" TAxilar="' . $item1[17] . '" Peso="' . $item1[13] . '" Talla="' . $item1[12] . '" Imc="' . $item1[14] . '" PCefalico="' . $item1[18] . '" ><i class="fa fa-square-o text-aqua"></i> ' . $item1[1] . ' ' . $nombre1[0] . ' ' . $prioridad . '</a></li>';
				}
				$totalPacientesAtendidos++;
			}
		}
		foreach ($respuesta2 as $row2 => $item2) {
			$nombre2 = $item2[2];
			$nombre3 = explode(" ", $nombre2);
			$pacientes .= '<li class="pointer " title="TURNO : ' . $item2[6] . '"  id="PacienteConsultaExterna"><a idConsulta="' . $item2[0] . '" idPaciente="' . $item2[3] . '" nombrePaciente="' . $item2[1] . ' ' . $item2[2] . '" cedulaPaciente="' . $item2[5] . '" Estado="' . $item2[4] . '"><i class="fa fa-circle-o"></i> ' . $item2[1] . ' ' . $nombre3[0] . '</a></li>';
			$totalPacientes++;
		}

		$menuAtendidos	= ' <li id="agendaAtendidos" class="treeview">
						          <a href="#">
						            <i class="fa fa-folder-open"></i> <span><small class="label pull-right bg-red">' . $totalPacientesAtendidos . '</small>ATENDIDOS</span>
						            <span class="pull-right-container">
						              <i class="fa fa-angle"></i>
						            </span>
						          </a>
						          <ul class="treeview-menu">
						            ' . $pacientesAtendidos . '
						          </ul>
						        </li>';

		if ($_SESSION["perfil"] == 60) {
			echo $menuAtendidos;
		}
	}



	public function Cargar()
	{

		$dao = new Dao();

		$dao->Campo("u.id", "");
		$dao->Campo("u.usuario", "");
		$dao->Campo("e.nombres", "");
		$dao->Campo("e.apellidos", "");
		$dao->Campo("p.nombre", "");
		$dao->Campo("pv.nombre", "");
		$dao->Campo("pe.secuencia", "");
		$dao->Campo("u.fecha_registro", "");

		$dao->TablasInnerAlias("usuario", "u", "empleado", "e");
		$dao->TablasInnerAlias("usuario", "u", "perfil", "p");
		$dao->TablasInnerAlias("usuario", "u", "punto_venta", "pv");
		$dao->TablasInnerAlias("punto_venta", "pv", "punto_emision", "pe");
		$dao->Where("u.id_estado", "1", "");


		$respuesta = $dao->Consultar();

		foreach ($respuesta as $row => $item) {

			echo '		<tr id=' . $item[0] . '>
                          <td>' . $item[0] . '</td>
                          <td id="Nombress">' . $item[3] . " " . $item[2] . '</td>
                          <td>' . $item[4] . '</td>
                          <td>' . $item[1] . '</td>
                          <td>' . $item[6] . "-" . $item[5] . '</td>
                          <td>' . $item[7] . '</td>
                        </tr>';
		}
	}

	public function CargarUsuariosEnLinea()
	{

		$dao = new Dao();

		$dao->Campo("e.id", "");
		$dao->Campo("e.nombres", "");
		$dao->Campo("e.apellidos", "");
		$dao->Campo("e.foto", "");

		$dao->TablasInnerAlias("sesiones", "s", "usuario", "u");
		$dao->TablasInnerAlias("usuario", "u", "empleado", "e");

		$dao->Where("u.id_estado", "1", "and");
		$dao->Diferente("e.id", $_SESSION["id_empleado"], "");
		$dao->Agrupar("e.id");

		$respuesta = $dao->Consultar();

		foreach ($respuesta as $row => $item) {

			echo '	<div class="col-md-12 pointer usuariosOnline" id="UsuarioChat' . $item[0] . '" style="margin-top: 1em;">
				      <img src="' . $item[3] . '" class="img-circle" width="20%">
				      <span foto="' . $item[3] . '" id="' . $item[0] . '"> ' . $item[1] . ' 
						
				       <i class="fa fa-circle pull-right text-success" style="margin-top: 1em;"></i> </span>
				    </div>';
		}
	}
}
