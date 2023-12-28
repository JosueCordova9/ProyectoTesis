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

const Paralelos = () => {
  const [data, setData] = useState([]);
  const [selectCursos, setSelectCursos] = useState([]);
  const [selectPeriodos, setSelectPeriodos] = useState([]);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/read/paralelos");
            const data = await response.json();
            setData(data.data);
        };

        const fetchCursos = async () => {
          const response = await fetch("/api/read/cursos");
          const data = await response.json();
          setSelectCursos(data.data);
      };

      const fetchPeriodos = async () => {
        const response = await fetch("/api/read/periodos");
        const data = await response.json();
        setSelectPeriodos(data.data);
    };

    fetchData();
    fetchCursos();
    fetchPeriodos();
  }, []);

  const validateParalelo = (paralelo) => {
    const errors = {};
    if (!paralelo.nom_par) {
      errors.Paralelo = "El nombre del paralelo es requerido";
    }
    if (!paralelo.id_cur_per) {
      errors.Curso = "El curso es requerido";
    }
    if (!paralelo.id_per_per) {
      errors.Periodo = "El periodo es requerido";
    }
    return errors;
  };


  //Create action
  const handleCreateParalelos = async ({ values, table }) => {
    const Nomcurso = values['curso.nom_cur'] ? values['curso.nom_cur']: undefined;
    const curso = values['curso.nom_cur'] ? selectCursos.find(curso => curso.nom_cur === Nomcurso): undefined;
    const idCurso = values['curso.nom_cur'] ? curso['id_cur'] : undefined;
    const Nomperiodo = values['periodo.nom_per'] ? values['periodo.nom_per']: undefined;
    const periodo = values['periodo.nom_per'] ?selectPeriodos.find(periodo => periodo.nom_per === Nomperiodo): undefined;
    const idPeriodo = values['periodo.nom_per'] ? periodo['id_per'] : undefined;
    const data = {
      nom_par: values.nom_par,
      id_cur_per: idCurso,
      id_per_per: idPeriodo,
    };
    const errors = validateParalelo(data)
    if (Object.keys(errors).length > 0) {
      const message = Object.keys(errors).map((field) => {
        return `${field}: ${errors[field]}`;
      }).join(", "+ "\n");
      alert(message);
      return;
    }
    const response = await fetch('/api/create/paralelos',{
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
        const response = await fetch("/api/read/paralelos");
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
  const handleSaveParalelos = async ({ values, table }) => {
    const Nomcurso = values['curso.nom_cur'] ? values['curso.nom_cur']: undefined;
    const curso = values['curso.nom_cur'] ? selectCursos.find(curso => curso.nom_cur === Nomcurso): undefined;
    const idCurso = values['curso.nom_cur'] ? curso['id_cur'] : undefined;
    const Nomperiodo = values['periodo.nom_per'] ? values['periodo.nom_per']: undefined;
    const periodo = values['periodo.nom_per'] ?selectPeriodos.find(periodo => periodo.nom_per === Nomperiodo): undefined;
    const idPeriodo = values['periodo.nom_per'] ? periodo['id_per'] : undefined;
    const data = {
      id_par: values.id_par,
      nom_par: values.nom_par,
      id_cur_per: idCurso,
      id_per_per: idPeriodo,
    };
    const errors = validateParalelo(data)
    if (Object.keys(errors).length > 0) {
      const message = Object.keys(errors).map((field) => {
        return `${field}: ${errors[field]}`;
      }).join(", "+ "\n");
      alert(message);
      return;
    }
    const response = await fetch(`/api/update/paralelos/${data.id_par}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      setShow(true);
      setTitle("Aviso");
      setContent("Paralelo actualizado exitosamente");
      const fetchData = async () => {
        const response = await fetch("/api/read/paralelos");
        const data = await response.json();
        setData(data.data);

    };
    fetchData();
    } else {
      setShow(true);
      setTitle("Aviso");
      setContent("Error al actualizar el paralelo");
    }
    table.setEditingRow(null); //exit editing mode
  };

  //Delete action
  const openDeleteConfirmModal = async (row) => {
    const id = parseInt(row.original.id_par);
    if (window.confirm('Estas seguro que deseas eliminar este registro?')) {
      const response = await fetch(`/api/delete/paralelos/${id}`, {
        method: 'DELETE',
      });
      
      if (response.status === 200) {
        setShow(true);
      setTitle("Aviso");
      setContent("Paralelo eliminado exitosamente");
        const fetchData = async () => {
          const response = await fetch("/api/read/paralelos");
          const data = await response.json();
          setData(data.data);

      };
      fetchData();
      } else {
        setShow(true);
      setTitle("Aviso");
      setContent("Error al eliminar el paralelo");
      }
    }
  };

  const closeAlert = () =>{
    setShow(false);
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: "id_par",
        header: "Id Paralelo",
        enableEditing: false,
        size: 10,
      },
      {
        accessorKey: "nom_par",
        header: "Paralelo",
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
        },
      },
      {
        accessorKey: "curso.nom_cur",
        header: "Curso",
        editVariant: 'select',
        editSelectOptions: selectCursos.map((curso) => curso.nom_cur),
        muiEditTextFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: "periodo.nom_per",
        header: "Periodo",
        editVariant: 'select',
        editSelectOptions: selectPeriodos.map((periodo) => periodo.nom_per),
        muiEditTextFieldProps: {
          required: true,
        },
      },
    ],
    [selectCursos,selectPeriodos]
  );

  const table = useMaterialReactTable({
    enableColumnActions: false,
    enableDensityToggle: false,
    data: data,
    columns,
    initialState: { pagination: { pageSize: 25 }, density: 'compact', columnVisibility: { id_par: false } },
    createDisplayMode: 'modal', 
    editDisplayMode: 'modal', 
    enableEditing: true,
    positionActionsColumn: 'last',
    getRowId:  (row) => row.id,
    onCreatingRowSave: handleCreateParalelos,
    onEditingRowSave: handleSaveParalelos,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5" style={{textAlign:"center"}}>Crear Nuevo Paralelo</DialogTitle>
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
        <DialogTitle variant="h5" style={{textAlign:"center"}}>Editar Paralelo</DialogTitle>
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
    <div style={{marginBottom:"50px"}}>PARALELOS</div>
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

export default Paralelos;