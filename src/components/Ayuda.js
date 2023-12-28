import React, { useState, useEffect, useMemo } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { MaterialReactTable, useMaterialReactTable,} from "material-react-table";

const Ayuda = () => {

  useEffect(() => {

  }, []);

  return(
  <div style={{
    display: "flex",
    height: "86%",
    flexDirection: "column",
  }}>
    <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: '50'}}>
    <div style={{marginBottom:"20px"}}>AYUDA</div>
    </Container>
    <div style={{display: "flex", justifyContent: "center", marginBottom: "20px"}}>
      Descarga de archivo: <a style={{textDecoration: "none", Color: "black"}} href="https://docs.google.com/spreadsheets/d/1SVWkdN0aTIAa7kXqsilcNwqWQldVvEDJ/edit?usp=sharing&ouid=117434041326351003994&rtpof=true&sd=true">"alerta.xlsx"</a>
    </div>
    <div style={{ display : "flex", justifyContent: "center"}}>
    <iframe src="https://drive.google.com/file/d/1VmepMgT0p0xqB_LbgNVRjSXSvuM6bSlM/preview" width="840" height="670" allow="autoplay"></iframe>
    </div>
</div>
  )
  
};

export default Ayuda;