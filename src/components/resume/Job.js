import React from 'react';

const Job = (props) => (
  <li className="job-item">
    <div>
      <h3>{props.jobTitle}</h3>
      <h3>{props.employer}</h3>
    </div>
  </li>
);

export default Job;
