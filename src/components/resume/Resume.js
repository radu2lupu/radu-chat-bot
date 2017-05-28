import React from 'react';

import Job from './Job'

import { jobs } from '../../data/resume';

const Resume = (props) => {
  let jobs = jobs.map((job) => {
    return <Job jobTitle={job.jobTitle}
             employer={job.employer}
             key={job.id}
            />
  }); 
  return (
    <div className="resume">
      <ul>
        {jobs}
      </ul>
    </div>
  );
}

export default Resume;