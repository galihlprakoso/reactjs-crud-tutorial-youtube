import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import services from '../services';



const EditScreen = ({match: { params }}) => {
  const history = useHistory();

  const photoId = params.id;
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  const loadPhoto = async () => {
    try {
      const resp = await services.editPhoto(photoId);
      const photo = resp.data;      
      setPhotoTitle(photo.title);
      setPhotoURL(photo.thumbnailUrl);
    }catch(error) {
      alert('Failed to get photo.')
    }
  }

  useEffect(() => {
    loadPhoto()
  }, []);


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
      await services.addPhoto(photo);
      alert('Photo updated successfully!');
      history.replace('/');
    }catch(error) {
      console.log(error);
      alert('update photo failed!');
    }
  }

  if(!photoTitle || !photoURL) {
    return (
      <Container>
        <Row>
          <Col>
            <p>Loading photo...</p>
          </Col>
        </Row>
      </Container>
    )
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
                Update
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditScreen;
