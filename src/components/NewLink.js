import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createNewLink } from '../api';

import { Button, Card, Form } from 'react-bootstrap';

const AddLink = ({ setCreatedLink }) => {
  const [link, setLink] = useState('');
  const [descript, setDescript] = useState('');
  const [tags, setTags] = useState('');

  async function handleSubmit() {
    await createNewLink(link, new Date(), descript, tags);
    setCreatedLink(link);
    setLink('');
    setDescript('');
    setTags('');
  }

  return (
    <header>
      <h1>The Great Linkerator</h1>
      <h5>Like Google Bookmarks - but not</h5>
      <Card>
        <Card.Body>
          <Form>
            <Form.Row>
              <Form.Control
                placeholder='Enter URL...'
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
              <Form.Control
                placeholder='Add Description...'
                value={descript}
                onChange={(e) => setDescript(e.target.value)}
              />
              <Form.Control
                placeholder='Add Tags Seperated By Spaces...'
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />

              <Button variant='primary' onClick={handleSubmit}>
                Add New Link
              </Button>
            </Form.Row>
          </Form>
        </Card.Body>
      </Card>
    </header>
  );
};

export default AddLink;
