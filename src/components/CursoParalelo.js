import React, { useState, useEffect, useMemo } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { MaterialReactTable, useMaterialReactTable,} from "material-react-table";
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';

const CursoParalelo = () => {
  const handleExportRows = (rows) => {
    const doc = new jsPDF('landscape');
    const tableHeaders = columns.map((c) => c.header);
    const tableData = rows.map((row) => {
      const visibleColumns = columns.filter((column) => column.show);
      return visibleColumns.map((column) => column.accessorFn ? column.accessorFn(row.original) : row.original[column.accessorKey]);
    });
    console.log(tableData);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
      theme: 'striped'
    });

    doc.save('reporteCursoParalelo.pdf');
  };
  const [data, setData] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [paralelos, setParalelos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState([]);
  const [paraleloSeleccionado, setParaleloSeleccionado] = useState("");

  useEffect(() => {
    const fetchCursos = async () => {
      const response = await fetch("/api/read/cursos");
      const data = await response.json();
      setCursos(data.data);
      
    };

    fetchCursos();

    if (cursoSeleccionado.length > 0) {
      const fetchParalelos = async () => {
        const id_cur_per = cursoSeleccionado;
        const response = await fetch(`/api/read/paralelos/${id_cur_per}`);
        const data = await response.json();
        setParalelos(data.data);
      };

      fetchParalelos();
    }

    if(paraleloSeleccionado){
      const fetchObservaciones = async () => {
        const id_par = paraleloSeleccionado;
        const response = await fetch(`/api/read/observaciones/${id_par}`);
        const data = await response.json();
        setData(data.data);
      };
      fetchObservaciones();
    }

  }, [cursoSeleccionado, paraleloSeleccionado]);

  const cursoOptions = cursos.map((curso) => ({
    value: curso.id_cur,
    label: curso.nom_cur,
  }));
  
  const paraleloOptions = paralelos.map((paralelo) => ({
    value: paralelo.id_par,
    label: paralelo.nom_par,
  }));


  const columns = useMemo(
    () => [
      {
        accessorKey: "id_obs",
        header: "Id Observacion",
        size: 40,
        show: true,
      },
      {
        accessorFn: (row) => `${row.alerta.ced_est}`,
        id: 'alerta.ced_est',
        header: "cedula",
        size: 120,
        show: true,
      },
      {
        accessorFn: (row) => `${row.alerta.estudiante.nom_est} ${row.alerta.estudiante.ape_est}`,
        id: 'estudiante',
        header: 'Estudiante',
        size: 120,
        show: true,
      },
      {
        accessorFn: (row) => `${row.alerta.estudiante.paralelo.nom_par}`,
        id: 'paralelo',
        header: 'Paralelo',
        size: 120,
        show: true,
      },
      {
        accessorFn: (row) => `${row.alerta.des_ale}`,
        id: "alerta.des_ale",
        header: "Descripción",
        size: 120,
        show: true,
      },
      {
        accessorFn: (row) => `${row.alerta.nom_ale} ${row.alerta.ape_ale}`,
        id: "notifica",
        header: "Notifica",
        size: 120,
        show: true,
      },
      {
        accessorFn: (row) => `${row.alerta.car_ale}`,
        id: "alerta.car_ale",
        header: "Cargo",
        size: 120,
        show: true,
      },
      {
        accessorKey: "observacion",
        header: "Observacion",
        size: 120,
        show: true,
      },
      {
        accessorFn: (row) => `${row.usuario.usuario}`,
        id: "usuario.usuario",
        header: "Usuario",
        size: 120,
        show: true,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    enableColumnActions: false,
    enableDensityToggle: false,
    initialState: { density: "comfortable", },
    data: data,
    columns,
    positionToolbarAlertBanner: 'bottom',
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Exportar
        </Button>
      </Box>
    ),
  });
  return(
  <div style={{
    display: "flex",
    height: "86%",
    flexDirection: "column",
  }}>
    <Container style={{ display: "flex", marginBottom: "10px", justifyContent: "center", alignItems: "center", fontSize: '50'}}>
    <div style={{marginBottom:"50px"}}>REPORTE CURSO/PARALELO</div>
    </Container>
    <Container style={{ borderRadius: "25px", border: "2px solid", borderColor:"E4E2E2", backgroundColor: 'E4E2E2', padding: "15px"}}>
    <div style={{marginBottom: "15px"}}>
    <Form style={{display: "flex",paddingInline: "25em"}}>
            <Form.Group style={{width: "50%"}}>
            <Form.Select onChange={(e) => {setCursoSeleccionado(e.target.value);}}>
              <option>Cursos: </option>
              {cursoOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            </Form.Select>
            </Form.Group>
            <div style={{ marginLeft: "2em", marginRight: "2em"}}></div>
            <Form.Group style={{width: "50%"}}>
            <Form.Select onChange={(e) =>{setParaleloSeleccionado(e.target.value); fetchObservaciones();}}>
              <option>Paralelos: </option>
              {paraleloOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            </Form.Select>
            </Form.Group>
          </Form>
    </div>
    <MaterialReactTable table={table} />
    </Container>
</div>
  )
  
};

export default CursoParalelo;