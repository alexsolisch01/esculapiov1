<?php

class Con_Bodega{
	public function CargarBodega(){

		$dao = new Dao();

		$dao->Campo("b.id","");
		$dao->Campo("e.nombre_comercial","");
		$dao->Campo("b.nombre","");
		$dao->Campo("b.descripcion","");
		$dao->Campo("b.estado","");
		$dao->Campo("b.usuario_registro","");
		$dao->Campo("b.fecha_registro","");

		$dao->Campo("b.id_estado","");
		

		$dao->TablasInnerAlias("bodega","b","establecimiento","e");
		$dao->In_Where("b.id_estado","1,2","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '		<tr id='.$item[0].' estado='.$item[7].'>
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

	public function CargarBodega2(){

		$dao = new Dao();

		$dao->Campo("b.id","");
		$dao->Campo("b.nombre","");
		
		

		$dao->TablasInnerAlias("bodega","b","establecimiento","e");
		$dao->Where("b.id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '		<tr id='.$item["id"].'>
                          <td>'.$item[0].'</td>
                          <td>'.$item[1].'</td>
                       
                        </tr>';
		}

	}



	public function CargarDepa(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("descripcion","");
		$dao->Campo("Cuenta_Contable","");
		$dao->Campo("Cuenta_Presupuestaria","");
		$dao->Campo("id_estado","");
		

		$dao->Tabla("departamento","");
		$dao->In_Where("id_estado","1,2","");


		$respuesta =$dao->Consultar();

		
		foreach ($respuesta as $row => $item){
			
			echo '		<tr id='.$item["id"].' estado='.$item["id_estado"].'>
                          <td>'.$item["id"].'</td>
                          <td>'.$item["descripcion"].'</td>
                          <td>'.$item["Cuenta_Contable"].'</td>
                          <td>'.$item["Cuenta_Presupuestaria"].'</td>
                          
                        
                          
                        </tr>';


			}
			}


	public function LlenarComboBodega(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("bodega","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';


		}

	}

	public function LlenarComboProveedor(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("descripcion","");

		$dao->Tabla("proveedor","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['id'].'>'.$item['descripcion'].'</option>';


		}

	}
		



	public function CargarIngreso(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("descripcion","");
		$dao->Campo("prefijo","");
		$dao->Campo("estado","");
		$dao->Campo("Cuenta_Contable","");
		$dao->Campo("Cuenta_Presupuestaria","");
		$dao->Campo("id_estado","");
		
		

		$dao->Tabla("motivo","");
		$dao->In_Where("id_estado","1,2","");


		$respuesta =$dao->Consultar();

		
		foreach ($respuesta as $row => $item){
			
			echo '		<tr id='.$item["id"].' estado='.$item["id_estado"].'>
                          <td>'.$item["id"].'</td>
                          <td>'.$item["descripcion"].'</td>
                          <td>'.$item["prefijo"].'</td>
                          <td>'.$item["estado"].'</td>
                          <td>'.$item["Cuenta_Contable"].'</td>
                          <td>'.$item["Cuenta_Presupuestaria"].'</td>
                         
                          
                          
                        </tr>';


			}
			}


public function CargarLinea(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("descripcion","");
		$dao->Campo("id_estado","");
		
		
		

		$dao->Tabla("linea","");
		$dao->In_Where("id_estado","1,2","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '		<tr id='.$item["id"].' estado='.$item["id_estado"].'>
                          <td>'.$item["id"].'</td>
                          <td>'.$item["descripcion"].'</td>
                         
                        </tr>';


		}

	}

	
	
	

	public function CargarUnidad(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("descripcion","");
		$dao->Campo("prefijo","");
		$dao->Campo("fecha_registro","");
		$dao->Campo("id_estado","");
		
		

		$dao->Tabla("unidad","");
		$dao->In_Where("id_estado","1,2","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '		<tr id='.$item["id"].' estado='.$item["id_estado"].'>
                          <td>'.$item["id"].'</td>
                          <td>'.$item["descripcion"].'</td>
                          <td>'.$item["prefijo"].'</td>
                          <td>'.$item["fecha_registro"].'</td>
                        </tr>';


		}

	}


public function CargarClasificacion(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("clasificacion","");
		$dao->Campo("descripcion","");
		
		$dao->Campo("fecha_registro","");
		$dao->Campo("id_estado","");
		
		

		$dao->Tabla("clasificacion","");
		$dao->In_Where("id_estado","1,2","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '		<tr id='.$item["id"].' estado='.$item["id_estado"].'>
                          <td>'.$item["id"].'</td>
                          <td>'.$item["clasificacion"].'</td>
                          <td>'.$item["descripcion"].'</td>
                          <td>'.$item["fecha_registro"].'</td>
                        </tr>';


		}

	}

	public function CargarFarma(){

		$dao = new Dao();

		$dao->Campo("f.id","");
		$dao->Campo("b.nombre","");
		$dao->Campo("f.descripcion","");
		$dao->TablasInnerAlias("farmacologia","f","bodega","b");
		$dao->Where("f.id_estado","1","");


		$respuesta =$dao->Consultar();

		
		foreach ($respuesta as $row => $item){
			
			echo '		<tr id='.$item["id"].'>
                          <td>'.$item[0].'</td>
                          <td>'.$item[1].'</td>
                          <td>'.$item[2].'</td> 
                        </tr>';
			}
		}



	public function LlenarComboUnidad(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("descripcion","");

		$dao->Tabla("unidad","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['id'].'>'.$item['descripcion'].'</option>';


		}

	}

public function LlenarComboLinea(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("descripcion","");

		$dao->Tabla("linea","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['id'].'>'.$item['descripcion'].'</option>';


		}

	}

	public function LlenarComboPrincipio(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("clasificacion","");

		$dao->Tabla("clasificacion","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['clasificacion'].'>'.$item['clasificacion'].'</option>';


		}

	}

	public function LlenarComboFarmacologia(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("descripcion","");

		$dao->Tabla("farmacologia","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['id'].'>'.$item['descripcion'].'</option>';


		}

	}

	public function LlenarComboTipoMotivo(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("descripcion","");
		$dao->Campo("estado","");

		$dao->Tabla("motivo","");
		$dao->Where("id_estado","1","");
		//$dao->Ordenar("nombre ASC");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option tipo= "'.$item['estado'].'" value='.$item['id'].'>'.$item['descripcion'].'</option>';


		}

	}


	public function CargarInventario(){

		$dao = new Dao();

		$dao->Campo("i.id","");
		$dao->Campo("b.nombre","");
		$dao->Campo("l.descripcion","");
		$dao->Campo("u.descripcion","");
		$dao->Campo("f.descripcion","");
		$dao->Campo("i.nombre","");
		$dao->Campo("i.presentacion","");
		$dao->Campo("i.codigo_barra","");
		$dao->Campo("i.principio1","");
		$dao->Campo("i.principio2","");
		$dao->Campo("i.principio3","");
		$dao->Campo("i.principio4","");
		$dao->Campo("i.medida1","");
		$dao->Campo("i.medida2","");
		$dao->Campo("i.medida3","");
		$dao->Campo("i.medida4","");
		$dao->Campo("i.um1","");
		$dao->Campo("i.um2","");
		$dao->Campo("i.um3","");
		$dao->Campo("i.um4","");
		$dao->Campo("i.presentacion1","");
		$dao->Campo("i.presentacion2","");
		$dao->Campo("i.cantidad1","");
		$dao->Campo("i.cantidad2","");
		$dao->Campo("i.costo1","");
		$dao->Campo("i.costo2","");
		$dao->Campo("i.descuento1","");
		$dao->Campo("i.descuento2","");
		$dao->Campo("i.pvp1","");
		$dao->Campo("i.pvp2","");
		$dao->Campo("Date_format(i.fecha_caducidad,'%Y-%m-%d')","");
		$dao->Campo("i.imagen","");
		$dao->Campo("i.stock_minimo","");
		$dao->Campo("e.descripcion","");
		

		$dao->TablasInnerAlias("inventario","i","bodega","b");
		$dao->TablasInnerAlias("inventario","i","linea","l");
		$dao->TablasInnerAlias("inventario","i","unidad","u");
		$dao->TablasInnerAlias("inventario","i","farmacologia","f");
		$dao->TablasInnerAlias("inventario","i","estado","e");
		$dao->Where("i.id_estado","1","");


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
                          <td>'.$item[7].'</td>
                          <td>'.$item[8].'</td>
                          <td>'.$item[12].'</td>
                          <td>'.$item[16].'</td>
                          <td>'.$item[9].'</td>
                          <td>'.$item[13].'</td>
                          <td>'.$item[17].'</td>
                          <td>'.$item[10].'</td>
                          <td>'.$item[14].'</td>
                          <td>'.$item[18].'</td>
                          <td>'.$item[11].'</td>
                          <td>'.$item[15].'</td>
                          <td>'.$item[19].'</td>
                          <td>'.$item[20].'</td>
                          <td>'.$item[22].'</td>
                          <td>'.$item[24].'</td>
                          <td>'.$item[26].'</td>
                          <td>'.$item[28].'</td>
                          <td>'.$item[21].'</td>
                          <td>'.$item[23].'</td>
                          <td>'.$item[25].'</td>
                          <td>'.$item[27].'</td>
                          <td>'.$item[29].'</td>
                          <td>'.$item[30].'</td>
                          <td>'.$item[31].'</td>
                          <td>'.$item[32].'</td>
                          <td>'.$item[33].'</td>
                        </tr>';
		}

	}

	public function CargarInventario2(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("presentacion1","");
		$dao->Campo("presentacion2","");
		$dao->Campo("principio1","");
		$dao->Campo("principio2","");
		$dao->Campo("principio3","");
		$dao->Campo("principio4","");
		
		$dao->Tabla("inventario","");
		/*$dao->TablasInnerAlias("inventario","i","bodega","b");
		$dao->TablasInnerAlias("inventario","i","linea","l");
		$dao->TablasInnerAlias("inventario","i","unidad","u");
		$dao->TablasInnerAlias("inventario","i","farmacologia","f");
		$dao->TablasInnerAlias("inventario","i","estado","e");*/
		$dao->Where("id_estado","1","");

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
                          <td>'.$item[7].'</td>
                          <td><div class="checkbox checkbox-info checkbox-circle"><input idInventario="'.$item[0].'" class="checkProductoInventario" id="checkboxFact'.$item[0].'" type="checkbox"><label for="checkboxFact'.$item[0].'"></label> </div></td>
                        </tr>';
		}

	}

}