<?php

require_once "../Dao/Dao.php";

class Con_estado{

	
	public function Cargar(){

		$dao = new Dao();

		$dao->Campo("estado","");
		$dao->Tabla("estado","");
		$dao->Where("estado","'A'","");

		/*$datos = array("descripcion"=>"Prueba Actualiza");

		$respuesta =$dao->modificar("",$datos,"");

        echo '<div class="alert alert-danger">'.$respuesta.' </div> ';
		/*foreach ($respuesta as $row => $item){
			
			echo '<div class="alert alert-danger">'.$item['estado'].'</div> ';


		}*/

	}


	public function Guardar(){

			if(isset($_POST['estado']) ){

				$dao = new Dao();

				$datos = array("estado"=>$_POST["estado"],
								"descripcion"=>$_POST["descripcion"]);

				$respuesta = $dao->guardar("estado",$datos);

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