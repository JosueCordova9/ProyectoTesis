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
import Avisos from './Avisos';

const Representantes = () => {
  const [data, setData] = useState([]);
  const [selectEstudiantes, setSelectEstudiantes] = useState([]);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/read/representantes");
            const data = await response.json();
            setData(data.data);
        };

      const fetchEstudiantes = async () => {
        const response = await fetch("/api/read/estudiantes");
        const data = await response.json();
        setSelectEstudiantes(data.data);
        console.log(selectEstudiantes);
    };
    fetchData();
    fetchEstudiantes();
  }, []);

  const validateRepresentante = (values) => {
    const errors = {};
    const estudiante = selectEstudiantes.find(estudiante => estudiante.ced_est === values.ced_est_rep);
    if(!estudiante){
      errors.Estudiante = "El estudiante con esa cédula no existe";
    }
    if (!values.ced_est_rep) {
      errors.Cédula = "La cédula es requerida";
    }else if (!values.ced_est_rep.match(/^[0-9]{1,15}$/)) {
      errors.Cédula = "La cédula debe ser solo números";
    }
    return errors;
  };

  //Create action
  const handleCreateRepresentante = async ({ values, table }) => {
    const data = {
      ced_est_rep: values.ced_est_rep,
      //madre
      ced_mad: values.ced_mad,
      nom_mad: values.nom_mad,
      ape_mad: values.ape_mad,
      ins_mad: values.ins_mad,
      ocu_mad: values.ocu_mad,
      lug_tra_mad: values.lug_tra_mad,
      tel_mad: values.tel_mad,
      //padre
      ced_pad: values.ced_pad,
      nom_pad: values.nom_pad,
      ape_pad: values.ape_pad,
      ins_pad: values.ins_pad,
      ocu_pad: values.ocu_pad,
      lug_tra_pad: values.lug_tra_pad,
      tel_pad: values.tel_pad,
      //representante
      ced_rep: values.ced_rep,
      nom_rep: values.nom_rep,
      ape_rep: values.ape_rep,
      par_rep: values.par_rep,
      ocu_rep: values.ocu_rep,
      lug_tra_rep: values.lug_tra_rep,
      tel_rep: values.tel_rep,

    };
    console.log(data);
    const errors = validateRepresentante(data)
    if (Object.keys(errors).length > 0) {
      const message = Object.keys(errors).map((field) => {
        return `${field}: ${errors[field]}`;
      }).join(", "+ "\n");
      alert(message);
      return;
    }
    const response = await fetch('/api/create/representantes',{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200) {
      setShow(true);
      setTitle("Aviso");
      setContent("Guardado exitoso");
      const fetchData = async () => {
        const response = await fetch("/api/read/representantes");
        const data = await response.json();
        setData(data.data);

    };
    fetchData();
    } else {
      setShow(true);
      setTitle("Aviso");
      setContent("Error en el guardado");
    }
    table.setCreatingRow(null); //exit creating mode
  };


  //UPDATE action
  const handleSaveRepresentante = async ({ values, table }) => {
    const data = {
      id_rep: values.id_rep,
      ced_est_rep: values.ced_est_rep,
      //madre
      ced_mad: values.ced_mad,
      nom_mad: values.nom_mad,
      ape_mad: values.ape_mad,
      ins_mad: values.ins_mad,
      ocu_mad: values.ocu_mad,
      lug_tra_mad: values.lug_tra_mad,
      tel_mad: values.tel_mad,
      //padre
      ced_pad: values.ced_pad,
      nom_pad: values.nom_pad,
      ape_pad: values.ape_pad,
      ins_pad: values.ins_pad,
      ocu_pad: values.ocu_pad,
      lug_tra_pad: values.lug_tra_pad,
      tel_pad: values.tel_pad,
      //representante
      ced_rep: values.ced_rep,
      nom_rep: values.nom_rep,
      ape_rep: values.ape_rep,
      par_rep: values.par_rep,
      ocu_rep: values.ocu_rep,
      lug_tra_rep: values.lug_tra_rep,
      tel_rep: values.tel_rep,
    };
    const errors = validateRepresentante(data)
    if (Object.keys(errors).length > 0) {
      const message = Object.keys(errors).map((field) => {
        return `${field}: ${errors[field]}`;
      }).join(", "+ "\n");
      alert(message);
      return;
    }
    const response = await fetch(`/api/update/representantes/${data.id_rep}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      setShow(true);
      setTitle("Aviso");
      setContent("Representante actualizado exitosamente");
    } else {
      setShow(true);
      setTitle("Aviso");
      setContent("Error al actualizar el representante");
    }
    table.setEditingRow(null); //exit editing mode
  };

  const openDeleteConfirmModal = async (row) => {
    const id = parseInt(row.original.id_rep);
    if (window.confirm('Estas seguro que deseas eliminar este registro?')) {
      const response = await fetch(`/api/delete/representantes/${id}`, {
        method: 'DELETE',
      });
      
      if (response.status === 200) {
        setShow(true);
      setTitle("Aviso");
      setContent("Representante eliminado exitosamente");
        const fetchData = async () => {
          const response = await fetch("/api/read/representantes");
          const data = await response.json();
          setData(data.data);

      };
      fetchData();
      } else {
        setShow(true);
      setTitle("Aviso");
      setContent("Error al eliminar el representante");
      }
    }
  };

  const closeAlert = () =>{
    setShow(false);
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: "id_rep",
        header: "Id Representante",
        enableEditing: false,
        size: 10,
      },
      {
        accessorKey: "ced_est_rep",
        header: "Estudiante",
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
        },
      },
      //Madre
      {
        accessorKey: "ced_mad",
        header: "Cédula Madre",
        muiEditTextFieldProps: {
          type: 'text',
        },
      },
      {
        accessorKey: "nom_mad",
        header: "Nombres Madre",
      },
      {
        accessorKey: "ape_mad",
        header: "Apellidos Madre",
      },
      {
        accessorKey: "ins_mad",
        header: "Instruccion Madre",
      },
      {
        accessorKey: "ocu_mad",
        header: "Ocupacion Madre",
      },
      {
        accessorKey: "lug_tra_mad",
        header: "Trabajo Madre",
      },
      {
        accessorKey: "tel_mad",
        header: "Telefono Madre",
      },
      //Padre
      {
        accessorKey: "ced_pad",
        header: "Cédula Padre",
        muiEditTextFieldProps: {
          type: 'text',
        },
      },
      {
        accessorKey: "nom_pad",
        header: "Nombres Padre",
      },
      {
        accessorKey: "ape_pad",
        header: "Apellidos Padre",
      },
      {
        accessorKey: "ins_pad",
        header: "Instruccion Padre",
      },
      {
        accessorKey: "ocu_pad",
        header: "Ocupacion Padre",
      },
      {
        accessorKey: "lug_tra_pad",
        header: "Trabajo Padre",
      },
      {
        accessorKey: "tel_pad",
        header: "Telefono padre",
      },
      //Representante
      {
        accessorKey: "ced_rep",
        header: "Cédula Rep",
        muiEditTextFieldProps: {
          type: 'text',
        },
      },
      {
        accessorKey: "nom_rep",
        header: "Nombres",
      },
      {
        accessorKey: "ape_rep",
        header: "Apellidos",
      },
      {
        accessorKey: "par_rep",
        header: "Parentesco",
      },
      {
        accessorKey: "ocu_rep",
        header: "Ocupacion",
      },
      {
        accessorKey: "lug_tra_rep",
        header: "Trabajo",
      },
      {
        accessorKey: "tel_rep",
        header: "Telefono",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    enableColumnActions: false,
    enableDensityToggle: false,
    data: data,
    columns,
    initialState: { pagination: { pageSize: 25 }, density: 'compact',
    columnVisibility: { 
      id_rep: false,
      ced_mad :false,
      nom_mad :false,
      ape_mad :false,
      ins_mad :false,
      ocu_mad :false,
      lug_tra_mad: false,
      tel_mad :false,
      //Padre
      ced_pad :false,
      nom_pad :false,
      ape_pad :false,
      ins_pad :false,
      ocu_pad :false,
      lug_tra_pad: false,
      tel_pad:false,

    }},
    createDisplayMode: 'modal', 
    editDisplayMode: 'modal', 
    enableEditing: true,
    positionActionsColumn: 'last',
    getRowId:  (row) => row.id,
    onCreatingRowSave: handleCreateRepresentante,
    onEditingRowSave: handleSaveRepresentante,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5" style={{textAlign:"center"}}>Crear Nuevo Representante</DialogTitle>
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
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5" style={{textAlign:"center"}}>Editar Representante</DialogTitle>
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
    <div style={{marginBottom:"50px"}}>REPRESENTANTES</div>
    </Container>
    <Container style={{ borderRadius: "25px", border: "2px solid", borderColor:"E4E2E2", backgroundColor: 'E4E2E2', padding: "15px"}}>
    <MaterialReactTable table={table} />
    </Container>
    <Avisos 
        show={show}
        title={title}
        content={content}
        close={closeAlert}
      />
</div>
  )
  
};

export default Representantes;