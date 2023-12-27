import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default class Avisos extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal show={this.props.show} centered>
        <Modal.Header style={{justifyContent: "center",  backgroundColor: "black", color: "white"}}>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <div style={{display: "flex",height: "100px", paddingInline: "5em",justifyContent:"center", alignItems:"center"}}>{this.props.content}</div>
        <Modal.Footer style={{justifyContent: 'center', alignItems:"center"}}>
          <Button style={{color: 'black', backgroundColor:'E0001A', borderColor: 'E0001A'}}
          onClick={this.props.close}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}