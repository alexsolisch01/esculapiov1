<?php

class Con_Establecimiento{

	
	public function Cargar(){

		$dao = new Dao();

		$dao->Campo("p.id","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.tipo","");
		$dao->Campo("p.facturas","");
		$dao->Campo("e.nombre_comercial","");
		$dao->Campo("p.usuario_registro","");
		$dao->Campo("p.fecha_registro","");

		$dao->TablasInnerAlias("punto_venta","p","establecimiento","e");
		$dao->TablasInnerAlias("establecimiento","e","empresa","em");
		
		$dao->Where("p.id_estado","1","and");
		$dao->Where("em.id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '		<tr id='.$item[0].'>
                          <td>'.$item[0].'</td>
                          <td>'.$item[1].'</td>
                          <td>'.$item[2].'</td>
                          <td>'.$item[3].'</td>
                          <td>'.$item[4].'</td>
                          <td>'.$item[5].'</td>
                          <td>'.$item[6].'</td>
                        </tr>';


		}
	}


	public function LlenarCombo(){

		$dao = new Dao();

		$dao->Campo("e.id","");
		$dao->Campo("e.nombre_comercial","");
		$dao->Campo("e.codigo","");

		$dao->TablasInnerAlias("establecimiento","e","empresa","em");
		$dao->Where("e.id_estado","1","and");
		$dao->Where("em.id_estado","1","");
		$dao->Ordenar("e.nombre_comercial ASC");


		$respuesta =$dao->Consultar();
		
		
		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['id'].'>00'.$item['id'].'-'.$item['nombre_comercial'].'</option>';


		}

	}

	public function LlenarPuntoEmision(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("secuencia","");

		$dao->Tabla("punto_emision","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();
		
		
		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['id'].'>'.$item['secuencia'].'</option>';


		}

	}


	public function LlenarComboPuntos(){

		$dao = new Dao();

		$dao->Campo("pv.id","");
		$dao->Campo("pv.nombre","");
		$dao->Campo("pe.secuencia","");

		$dao->TablasInnerAlias("punto_venta","pv","punto_emision","pe");
		$dao->Where("pv.id_estado","1","");
		//$dao->Diferente("pv.id","1","");


		$respuesta =$dao->Consultar();
		
		
		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item[0].'>'.$item[2]."-".$item[1].'</option>';


		}

	}

	public function Guardar(){

			if(isset($_POST['nombre']) ){

				$dao = new Dao();

				$datos = array("nombre"=>$_POST["nombre"],
								"descripcion"=>$_POST["descripcion"],
								"id_estado"=>1);

				$respuesta = $dao->Guardar("perfil",$datos);

				if($respuesta === true ){

				/*	echo'<script>
							
							swal({
								  title: "¡OK!",
								  text: "¡Estado Registrado!",
								  type: "success",
								  confirmButtonText: "Cerrar",
								  closeOnConfirm: true
							},

							function(isConfirm){
									 if (isConfirm) {	   
									    window.location.href = "index.php?action=ubicaciones";
									  } 
							});

						</script>';
*/
					
						echo '<div class="alert alert-danger">¡Ocurrio un error</div> ';
						
				}

				else{

					echo '<div class="alert alert-danger">¡Ocurrio un error !'.$respuesta.' </div> ';

				}
			}

	}
}