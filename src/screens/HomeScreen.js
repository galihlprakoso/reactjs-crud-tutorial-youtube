import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import services from '../services';
import PhotoItem from '../components/PhotoItem';

const HomeScreen = () => {
  const [photos, setPhotos] = useState(null)

  const fetchPhotos = async () => {
    try {
      const resp = await services.getAllPhotos()
      setPhotos(resp.data)
    }catch (error) {
      alert('Failed to fetch photos.')      
    }
  }

  useEffect(() => {
    fetchPhotos()
  }, [])

  if(!photos) {
    return (
      <Container>
        <Col>
          <p>Loading photos...</p>
        </Col>
      </Container>
    )
  }

  return (
    <Container style={{ padding : 16 }}>
      <Row>
        {photos.reverse().slice(0, 50).map(photoItem => (
          <PhotoItem
            key={photoItem.id}
            id={photoItem.id}            
            title={photoItem.title}
            thumbnailUrl={photoItem.thumbnailUrl}
          />
        ))}
      </Row>
    </Container>
  );
};

export default HomeScreen;
