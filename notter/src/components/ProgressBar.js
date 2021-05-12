import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';

const ProgressBar = ({ data, setData }) => {
  const { progress, done } = useStorage(data);

  useEffect(() => {
    if (done) {
      setData(null);
    }
  }, [done, setData]);

  return (
    <div className="progress-bar" style={{width : progress + '%'}}></div>
  );
} 

export default ProgressBar;