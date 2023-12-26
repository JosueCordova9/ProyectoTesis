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


const Cursos = () => {
  const [data, setData] = useState([]);
  const [selectLectivos, setSelectLectivos] = useState([]);

  useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/read/cursos");
            const data = await response.json();
            setData(data.data);
        };

        const fetchLectivos = async () => {
          const response = await fetch("/api/read/lectivos");
          const data = await response.json();
          setSelectLectivos(data.data);
      };


    fetchData();
    fetchLectivos();
  }, []);

  const validateCurso = (curso) => {
    const errors = {};
    if (!curso.nom_cur) {
      errors.Curso = "El nombre del curso es requerido";
    }
    if (!curso.id_año_per) {
      errors.Año = "El año es requerido";
    }
    return errors;
  };

  //Create action
  const handleCreateCursos = async ({ values, table }) => {
    const año = values['año_lectivo.nom_año'];
    const lectivo = selectLectivos.find(lectivo => lectivo.nom_año === año);
    const id = lectivo['id_ano'];
    const dataCurso = {
      nom_cur: values.nom_cur,
      id_año_per: id,
    };
    const errors = validateCurso(dataCurso)
    if (Object.keys(errors).length > 0) {
      const message = Object.keys(errors).map((field) => {
        return `${field}: ${errors[field]}`;
      }).join(", ");
      alert(message);
      return;
    }
    const response = await fetch('/api/create/cursos',{
      method: 'POST',
      body: JSON.stringify(dataCurso),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200) {
      alert("Guardado exitoso");
      const fetchData = async () => {
        const response = await fetch("/api/read/cursos");
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
  const handleSaveCursos = async ({ values, table }) => {
    const año = values['año_lectivo.nom_año'];
    const lectivo = selectLectivos.find(lectivo => lectivo.nom_año === año);
    const id = lectivo['id_ano'];
    const dataCurso = {
      id_cur: values.id_cur,
      nom_cur: values.nom_cur,
      id_año_per: id,
    };
    const errors = validateCurso(dataCurso)
    if (Object.keys(errors).length > 0) {
      const message = Object.keys(errors).map((field) => {
        return `${field}: ${errors[field]}`;
      }).join(", ");
      alert(message);
      return;
    }
    const response = await fetch(`/api/update/cursos/${dataCurso.id_cur}`, {
      method: 'PATCH',
      body: JSON.stringify(dataCurso),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      alert("Curso actualizado exitosamente");
      const fetchData = async () => {
        const response = await fetch("/api/read/cursos");
        const data = await response.json();
        setData(data.data);
    };
    fetchData();
    } else {
      alert("Error al actualizar el curso");
    }
    table.setEditingRow(null); //exit editing mode
  };

  //Delete action
  const openDeleteConfirmModal = async (row) => {
    const id = parseInt(row.original.id_cur);
    if (window.confirm('Estas seguro que deseas eliminar este registro?')) {
      const response = await fetch(`/api/delete/cursos/${id}`, {
        method: 'DELETE',
      });
      
      if (response.status === 200) {
        alert("Curso eliminado exitosamente");
        const fetchData = async () => {
          const response = await fetch("/api/read/cursos");
          const data = await response.json();
          setData(data.data);

      };
      fetchData();
      } else {
        alert("Error al eliminar el curso");
      }
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id_cur",
        header: "Id Año",
        enableEditing: false,
        size: 10,
      },
      {
        accessorKey: "nom_cur",
        header: "Curso",
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
        },
      },
      {
        accessorKey: "año_lectivo.nom_año",
        header: "Año",
        editVariant: "select",
        editSelectOptions: selectLectivos.map((lectivo) => lectivo.nom_año),
        muiEditTextFieldProps: {
          required: true,
        },
      }
    ],
    [selectLectivos]
  );


  const table = useMaterialReactTable({
    enableColumnActions: false,
    data: data,
    columns,
    columns,
    createDisplayMode: 'modal', 
    editDisplayMode: 'modal', 
    enableEditing: true,
    positionActionsColumn: 'last',
    getRowId:  (row) => row.id,
    onCreatingRowSave: handleCreateCursos,
    onEditingRowSave: handleSaveCursos,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5" style={{textAlign:"center"}}>Crear Nuevo Curso</DialogTitle>
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
        <DialogTitle variant="h5" style={{textAlign:"center"}}>Editar Curso</DialogTitle>
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
    <div style={{marginBottom:"50px"}}>CURSOS</div>
    </Container>
    <Container style={{ borderRadius: "25px", border: "2px solid", borderColor:"E4E2E2", backgroundColor: 'E4E2E2', padding: "15px"}}>
    <MaterialReactTable table={table} />
    </Container>
</div>
  )
  
};

export default Cursos;