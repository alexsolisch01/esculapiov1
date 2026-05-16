<?php

class Con_Perfil{

	
	public function Cargar(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("descripcion","");
		$dao->Campo("usuario_registro","");
		$dao->Campo("fecha_registro","");
		$dao->Campo("id_estado","");

		$dao->Tabla("perfil","");
		$dao->In_Where("id_estado","1,2","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '		<tr id='.$item["id"].' estado='.$item["id_estado"].'>
                          <td>'.$item["id"].'</td>
                          <td>'.$item["nombre"].'</td>
                          <td>'.$item["descripcion"].'</td>
                        </tr>';


		}
	

	}


	public function LlenarCombo(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("perfil","");
		$dao->In_Where("id_estado","1,2","");
		$dao->Ordenar("nombre");

		$respuesta =$dao->Consultar();

		
		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';


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
					
						echo '<div class="alert alert-danger">¡Pepa</div> ';
						
				}

				else{

					echo '<div class="alert alert-danger">¡Ocurrio un error !'.$respuesta.' </div> ';

				}
			}

	}
	

}