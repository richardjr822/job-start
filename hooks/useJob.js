import { useState, useEffect, useCallback } from 'react';
import * as jobService from '../services/jobService';

export const useJobs = (initialFilters = {}) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  // Function to fetch jobs
  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await jobService.getJobs(filters);
      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const createJob = async (jobData) => {
    setIsLoading(true);
    setError(null);
    try {
      const newJob = await jobService.createJob(jobData);
      await fetchJobs();
      return newJob;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    jobs,
    isLoading,
    error,
    filters,
    setFilters, 
    createJob,
    refreshJobs: fetchJobs,
  };
};