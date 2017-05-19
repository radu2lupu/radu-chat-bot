import React from 'react';

const StoredResponse = (props) => {
  let response = props.response;
  if (Array.isArray(response)) {
    const listItems = response.map((item) =>
      <li key={response.indexOf(item)}>{item}</li>
    );
    return (
      <div>
        <p>Here are some:</p>
        <ul>{listItems}</ul>
      </div>
    );
  } else {
    return <p>{response}</p>
  }
};

export default StoredResponse;
