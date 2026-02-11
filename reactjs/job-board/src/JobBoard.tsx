import { useEffect, useState } from 'react';
import { fetchJobDetail, fetchJobList, type Job } from './api';
import { convertUnixTime } from './util';

const JOBS_PER_PAGE = 6;

export default function JobBoard() {
    const [jobIDs, setJobIDs] = useState<number[]>([]);
    const [jobList, setJobList] = useState<Job[]>([]);
    const [displayedJobs, setDisplayedJobs] = useState(JOBS_PER_PAGE);

    useEffect(() => {
        async function loadJobs() {
            const result = await fetchJobList();
            setJobIDs(result);
        }
        loadJobs();
    }, []);

    useEffect(() => {
        async function loadJobDetail() {
            const idsToLoad = jobIDs.slice(0, displayedJobs);
            const details: Job[] = await Promise.all(
                idsToLoad.map(id => fetchJobDetail(id))
            );
            setJobList(details);
        }

        if (jobIDs.length > 0) {
            loadJobDetail();
        }
    }, [jobIDs, displayedJobs]);

    const handleLoadMore = () => {
        setDisplayedJobs(prev => prev + JOBS_PER_PAGE);
    }

    const hasMoreJobs = displayedJobs < jobIDs.length;

    return (
        <div className="min-h-screen bg-[#f5f5ee] py-8">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center text-[#ff6900]">Hacker News Jobs Board</h1>
                <div className="space-y-4">
                    {jobList.map((job) => (
                        <div key={job.id} className="bg-white border border-gray-200 rounded-[8px] p-4 hover:cursor-pointer">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2"><a href={job.url} target="_blank" rel="noopener noreferrer">{job.title}</a></h2>
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>By {job.by}</span>
                                <span>{convertUnixTime(job.time)}</span>
                            </div>
                        </div>
                    ))}
                </div>
                {hasMoreJobs && (
                    <div className="mt-8 text-center">
                        <button
                            onClick={handleLoadMore}
                            className="px-6 py-3 bg-[#ff6900] text-white rounded-lg hover:bg-[#ca3500] hover:cursor-pointer transition-colors font-medium"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}