const JOB_STORIES_URL = "https://hacker-news.firebaseio.com/v0/jobstories.json";

export type Job = {
    by: string;
    id: number;
    title: string;
    time: number;
    url: string;
};

export async function fetchJobList(): Promise<number[]> {
    const response = await fetch(JOB_STORIES_URL);
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
}

export async function fetchJobDetail(id: number): Promise<Job> {
    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
}
