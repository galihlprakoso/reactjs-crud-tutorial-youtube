import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import services from '../services';



const AddScreen = () => {
  const history = useHistory();
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  const handleSumbit = async () => {
    try {
      if(!photoTitle || !photoURL) {
        alert('Title or photo URL is required!');
        return;
      }
      const photo = {
        photoTitle,
        photoURL,
      };
      const resp = await services.addPhoto(photo);
      console.log(resp)
      alert('Photo added successfully!');
      history.replace('/');
    }catch(error) {
      console.log(error);
      alert('Add photo failed!');
    }
  }

  return (
    <Container style={{ padding: 16 }}>
      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>Photo Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter photo title ..."
                onChange={e => setPhotoTitle(e.target.value)}
                value={photoTitle}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Photo URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://example.com/photo.jpg ..."
                onChange={e => setPhotoURL(e.target.value)}
                value={photoURL}
              />
            </Form.Group>

            <Form.Group>
              <Button
                variant="primary"
                onClick={handleSumbit}
              >
                Add
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddScreen;
