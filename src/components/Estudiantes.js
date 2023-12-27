import React, { useState, useEffect, useMemo } from "react";
import Container from "react-bootstrap/Container";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Estudiantes = () => {
  const [data, setData] = useState([]);
  const [selectEtnias, setSelectEtnias] = useState([]);
  const [selectProvincias, setSelectProvincias] = useState([]);
  const [selectParalelos, setSelectParalelos] = useState([]);

  useEffect(() => {
        //READ Action
        const fetchData = async () => {
            const response = await fetch("/api/read/estudiantes");
            const data = await response.json();
            setData(data.data);
        };

        const fetchEtnia = async () => {
          const response = await fetch("/api/read/etnias");
          const data = await response.json();
          setSelectEtnias(data.data);
      };
      const fetchProvincias = async () => {
        const response = await fetch("/api/read/provincias");
        const data = await response.json();
        setSelectProvincias(data.data);
    };

    const fetchParalelos = async () => {
      const response = await fetch("/api/read/paralelos");
      const data = await response.json();
      setSelectParalelos(data.data);
  };
        
        fetchData();
        fetchEtnia();
        fetchProvincias();
        fetchParalelos();
  }, []);


  const validateEstudiante = (values) => {
    const errors = {};
    if (!values.ced_est) {
      errors.Cédula = "La cédula es requerida";
    } else if (!values.ced_est.match(/^[0-9]{1,15}$/)) {
      errors.Cédula = "La cédula debe ser solo números";
    }
    if (!values.nom_est) {
      errors.Nombre = "El nombre es requerido";
    }
    if (!values.ape_est) {
      errors.Apellido = "El apellido es requerido";
    }
    return errors;
  };

  //Create action
  const handleCreateEstudiante = async ({ values, table }) => {
    const nomProvincia = values['provincia.nom_prov'] ? values['provincia.nom_prov']: undefined;
    const provincia = values['provincia.nom_prov']? selectProvincias.find(provincia => provincia.nom_prov === nomProvincia): undefined;
    const idProvincia = values['provincia.nom_prov'] ? provincia['id_prov']: undefined;
    const nomEtnia = values['etnia.nom_etn'] ? values['etnia.nom_etn'] : undefined;
    const etnia = values['etnia.nom_etn'] ? selectEtnias.find(etnia => etnia.nom_etn === nomEtnia) : undefined;
    const idEtnia = values['etnia.nom_etn'] ? etnia['id_etn'] : undefined;
    const nomParalelo = values['paralelo.nom_par'] ? values['paralelo.nom_par'] : undefined;
    const paralelo = values['paralelo.nom_par'] ? selectParalelos.find(paralelo => paralelo.nom_par === nomParalelo): undefined;
    const idParalelo = values['paralelo.nom_par']? paralelo['id_par']: undefined;
    const data = {
      ced_est: values.ced_est,
      nom_est: values.nom_est,
      ape_est: values.ape_est,
      nac_est: idProvincia,
      etn_est: idEtnia,
      dom_est: values.dom_est,
      tel_est: values.tel_est,
      cor_est: values.cor_est,
      id_par_per: idParalelo
    };
    const errors = validateEstudiante(data)
    if (Object.keys(errors).length > 0) {
      const message = Object.keys(errors).map((field) => {
        return `${field}: ${errors[field]}`;
      }).join(", ");
      alert(message);
      return;
    }
    const response = await fetch('/api/create/estudiantes',{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200) {
      alert("Guardado exitoso");
      const fetchData = async () => {
        const response = await fetch("/api/read/estudiantes");
        const data = await response.json();
        setData(data.data);

    };
    fetchData();
    } else {
      alert("Error en el guardado");
    }
    table.setCreatingRow(null); //exit creating mode
  };


  //UPDATE action
  const handleSaveEstudiante = async ({ values, table }) => {
    const nomProvincia = values['provincia.nom_prov'] ? values['provincia.nom_prov']: undefined;
    const provincia = values['provincia.nom_prov']? selectProvincias.find(provincia => provincia.nom_prov === nomProvincia): undefined;
    const idProvincia = values['provincia.nom_prov'] ? provincia['id_prov']: undefined;
    const nomEtnia = values['etnia.nom_etn'] ? values['etnia.nom_etn'] : undefined;
    const etnia = values['etnia.nom_etn'] ? selectEtnias.find(etnia => etnia.nom_etn === nomEtnia) : undefined;
    const idEtnia = values['etnia.nom_etn'] ? etnia['id_etn'] : undefined;
    const nomParalelo = values['paralelo.nom_par'] ? values['paralelo.nom_par'] : undefined;
    const paralelo = values['paralelo.nom_par'] ? selectParalelos.find(paralelo => paralelo.nom_par === nomParalelo): undefined;
    const idParalelo = values['paralelo.nom_par']? paralelo['id_par']: undefined;
    const data = {
      id_est: values.id_est,
      ced_est: values.ced_est,
      nom_est: values.nom_est,
      ape_est: values.ape_est,
      nac_est: idProvincia,
      etn_est: idEtnia,
      dom_est: values.dom_est,
      tel_est: values.tel_est,
      cor_est: values.cor_est,
      id_par_per: idParalelo
    };
    const errors = validateEstudiante(data)
    if (Object.keys(errors).length > 0) {
      const message = Object.keys(errors).map((field) => {
        return `${field}: ${errors[field]}`;
      }).join(", ");
      alert(message);
      return;
    }
    const response = await fetch(`/api/update/estudiantes/${data.id_est}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      alert("Estudiante actualizado exitosamente");
    } else {
      alert("Error al actualizar el estudiante");
    }
    table.setEditingRow(null); //exit editing mode
  };

  const openDeleteConfirmModal = async (row) => {
    const id = parseInt(row.original.id_est);
    if (window.confirm('Estas seguro que deseas eliminar este registro?')) {
      const response = await fetch(`/api/delete/estudiantes/${id}`, {
        method: 'DELETE',
      });
      
      if (response.status === 200) {
        alert("Estudiante eliminado exitosamente");
        const fetchData = async () => {
          const response = await fetch("/api/read/estudiantes");
          const data = await response.json();
          setData(data.data);

      };
      fetchData();
      } else {
        alert("Error al eliminar el estudiante");
      }
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id_est",
        header: "Id Estudiante",
        enableEditing: false,
        size: 10,
      },
      {
        accessorKey: "ced_est",
        header: "Cédula",
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
        },
      },
      {
        accessorKey: "nom_est",
        header: "Nombres",
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
        },
      },
      {
        accessorKey: "ape_est",
        header: "Apellidos",
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
        },
      },
      {
        accessorKey: "provincia.nom_prov",
        header: "Lugar de Nacimiento",
        editVariant: 'select',
        editSelectOptions: selectProvincias.map((provincia) => provincia.nom_prov),
        muiEditTextFieldProps: {
          select: true,
        },
      },
      {
        accessorKey: "etnia.nom_etn",
        header: "Etnia",
        editVariant: 'select',
        editSelectOptions: selectEtnias.map((etnia) => etnia.nom_etn),
        muiEditTextFieldProps: {
          select: true,
        },
      },
      {
        accessorKey: "dom_est",
        header: "Domicilio",
      },
      {
        accessorKey: "tel_est",
        header: "Teléfono",
      },
      {
        accessorKey: "cor_est",
        header: "Correo",
      },
      {
        accessorKey: "paralelo.nom_par",
        header: "Paralelo",
        editVariant: 'select',
        editSelectOptions: selectParalelos.map((paralelo) => paralelo.nom_par),
        muiEditTextFieldProps: {
          select: true,
        },
      },
    ],
    [selectProvincias,selectEtnias,selectParalelos]
  );

  const table = useMaterialReactTable({
    enableColumnActions: false,
    enableDensityToggle: false,
    data: data,
    columns,
    initialState: { pagination: { pageSize: 30 }, density: 'compact', columnVisibility: { id_est: false } },
    createDisplayMode: 'modal', 
    editDisplayMode: 'modal', 
    enableEditing: true,
    positionActionsColumn: 'last',
    getRowId:  (row) => row.id,
    onCreatingRowSave: handleCreateEstudiante,
    onEditingRowSave: handleSaveEstudiante,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5" style={{textAlign:"center"}}>Crear Nuevo Estudiante</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions style={{justifyContent: "center"}} >
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5" style={{textAlign:"center"}}>Editar Estudiante</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions style={{justifyContent: "center"}}>
          <MRT_EditActionButtons variant="secondary" table={table} row={row} />
        </DialogActions>
      </>
    ),

    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Editar">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="secondary"
        onClick={() => {
          table.setCreatingRow(true);
        }}
        style={{backgroundColor: 'E4E2E2', fontSize: "15"}}>
        Crear +
      </Button>
    ),
  });
  

  return(
  <div style={{
    display: "flex",
    height: "86%",
    flexDirection: "column",
  }}>
    <Container style={{ display: "flex", marginBottom: "10px", justifyContent: "center", alignItems: "center", fontSize: '50'}}>
    <div style={{marginBottom:"50px"}}>ESTUDIANTES</div>
    </Container>
    <Container style={{ borderRadius: "25px", border: "2px solid", borderColor:"E4E2E2", backgroundColor: 'E4E2E2', padding: "15px"}}>
    <MaterialReactTable table={table} />
    </Container>
</div>
  )
}

export default Estudiantes;