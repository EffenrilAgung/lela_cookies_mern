import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
    console.log(keyword);
  };
  return (
    <>
      <Form onSubmit={submitHandler} className="d-flex">
        <Form.Control
          type="text"
          autoComplete="off"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Product..."
          className="rounded-0"
        ></Form.Control>
        <Button
          type="submit"
          variant="outline-success"
          className="rounded-0 bg-success"
        >
          <i className="fas fa-search text-white"></i>
        </Button>
      </Form>
    </>
  );
};

export default SearchBox;
