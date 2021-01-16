import React from 'react';
import { Card } from 'react-bootstrap';
//import Button from 'react-bootstrap/Button';

const Links = ({ link, descript, date, clicks, tags }) => {
  return (
    <Card>
      <Card.Header as='h5'>
        <a href={`http://${link}`} target='_blank'>
          {link}
        </a>
      </Card.Header>
      <Card.Body>
        <Card.Text>Description: {descript}</Card.Text>
        <Card.Text>Click Count: {clicks}</Card.Text>
        <Card.Text>Date Added: {date}</Card.Text>
        <Card.Text>{tags.map((tag) => tag.tagName).join(', ')}</Card.Text>
      </Card.Body>
      {/* <Card.Footer>
        <Button
          variant='primary'
          onClick={async (event) => {
            event.preventDefault();
            try {
              isActive = false;
              alert('Link successfully deleted');
              window.location.reload();
            } catch (error) {
              console.error(error);
            }
          }}
        >
          Delete
        </Button>
      </Card.Footer> */}
    </Card>
  );
};

export default Links;
