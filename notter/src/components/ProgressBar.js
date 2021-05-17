import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';

const ProgressBar = ({ data, setData, setIsUploading }) => {
  const { progress, done } = useStorage(data);

  useEffect(() => {
    if (done) {
      setData(null);
      setIsUploading(false);
    }
  }, [done, setData, setIsUploading]);

  return (
    <div className="progress-bar" style={{width : progress + '%'}}></div>
  );
} 

export default ProgressBar;