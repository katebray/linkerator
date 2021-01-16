import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Links from './Links';
import { Card, Form } from 'react-bootstrap';
import { getLinks } from '../api';

const Search = ({ createdLink }) => {
  const [allLinksData, setAllLinksData] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredLinks, setFilteredLinks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getLinks();
      setAllLinksData(result.allLinks);
    }
    fetchData();
  }, [createdLink]);

  useEffect(() => {
    setFilteredLinks(
      allLinksData.filter((link) => {
        return (
          link.title.toLowerCase().includes(search.toLowerCase()) ||
          link.tags.filter((tag) => {
            return tag.tagName.toLowerCase().includes(search.toLowerCase());
          }).length > 0
        );
      })
    );
  }, [search, allLinksData]);

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Search</Card.Title>
          <Form.Control
            placeholder='Search...'
            onChange={(e) => setSearch(e.target.value)}
          />
        </Card.Body>
      </Card>

      {filteredLinks.map((link) => (
        <Links
          key={link.id}
          link={link.title}
          descript={link.descript}
          tags={link.tags}
          date={link.date}
          clicks={link.clicks}
        />
      ))}
    </div>
  );
};

export default Search;
