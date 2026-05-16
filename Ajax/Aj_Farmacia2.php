<?php
session_start();

require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){

    if($_POST['Requerimiento'] == "CargarFacturaConsultaFarmacia"){

        $dao= new Dao();

        $dao->Campo("c.id","");
        $dao->Campo("c.id_paciente","");
        $dao->Campo("p.nombre","");
        $dao->Campo("p.apellido","");
        $dao->Campo("p.cedula","");
        $dao->Campo("p.direccion","");
        $dao->Campo("p.telefono","");
        $dao->Campo("p.email","");
        $dao->Campo("p.fecha_nacimiento","");
        $dao->Campo("p.apellido","");
        $dao->Campo("c.id_paciente_cliente","");
        $dao->Campo("c.mismosdatos","");
        $dao->Campo("c.total","");
        $dao->Campo("c.descuento","");
        $dao->Campo("c.numero","");

    
        $dao->TablasInnerAlias("nc_farmacia","c","paciente","p");
        
        $dao->Where("c.numero","'".$_POST['Numero']."'","");

        $dao->ConsultarAjax();
    }

    if($_POST['Requerimiento'] == "CargarItemIdFarmacia"){

        $dao= new Dao();
        $dao->Campo("nombre","");
        $dao->Tabla($_POST['Tabla'],"");
        
        $dao->Where("id",$_POST['Id'],"");

        $dao->ConsultarAjax();
    }

    if($_POST['Requerimiento'] == "ConsultarDetalleConsultaFarmacia"){

        $dao= new Dao();
        
        $dao->Campo("f.*","");
        $dao->Campo("i.iva","");
        $dao->Campo("i.nombre","");
        $dao->Campo("i.presentacion","");
        
        $dao->TablasInnerAlias("nc_farmacia_item","f","inventario","i");
        
        $dao->Where("f.id_farmacia",$_POST['Farmacia'],"");

        $dao->ConsultarAjax();
    }

    if($_POST['Requerimiento'] == "CargarRecetaPorid"){

        $dao= new Dao();

        $dao->Campo("c.id","");
        $dao->Campo("c.id_paciente","");
        $dao->Campo("p.nombre","");
        $dao->Campo("p.apellido","");
        $dao->Campo("p.cedula","");
        $dao->Campo("p.direccion","");
        $dao->Campo("p.telefono","");
        $dao->Campo("p.email","");
        $dao->Campo("p.fecha_nacimiento","");
        $dao->Campo("p.apellido","");
        

    
        $dao->TablasInnerAlias("receta","c","paciente","p");
        
        $dao->Where("c.id","'".$_POST['Numero']."'","");

        $dao->ConsultarAjax();
    }

    if($_POST['Requerimiento'] == "ConsultarDetalleReceta"){

        $dao= new Dao();
        
        $dao->Campo("d.*","");
        $dao->Campo("i.iva","");
        $dao->Campo("i.nombre","");
        $dao->Campo("i.presentacion","");
        $dao->Campo("i.pvp1","");
        $dao->Campo("i.pvp2","");
        
        $dao->TablasInnerAlias("receta_detalle","d","inventario","i");
        
        $dao->Where("d.id_receta",$_POST['Farmacia'],"");

        $dao->ConsultarAjax();
    }
}