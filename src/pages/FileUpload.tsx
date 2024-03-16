import { useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    setShowModal(true);
    setSelectedFile(false);
    document.getElementById('custom-file').value = '';
  };

  const handleClose = () => setShowModal(false);

  return (
    <Container className="py-5">
      <h1 className="mb-4">File Upload</h1>
      {showModal && (
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>File Upload Successfull ✅</Modal.Title>
          </Modal.Header>
        </Modal>
      )}

      <Form>
        <Form.Group>
          <Form.Control
            type="file"
            id="custom-file"
            onChange={handleFileChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          className="mt-3"
          onClick={handleUpload}
          disabled={!selectedFile}
        >
          Upload
        </Button>
      </Form>
    </Container>
  );
}
