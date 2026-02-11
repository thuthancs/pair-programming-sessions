# Job Board

## Requirements
- The page should show 6 jobs on initial load with a button to load more postings.
- Clicking on the "Load more" button will load the next page of 6 postings. The button does not appear if there aren't any more postings to load.
- If there's a url field returned for the job details, make the job title a link that opens the job details page in a new window when clicked.
- The timestamp can be formatted in any way you like.

## APIs

- Source: https://github.com/HackerNews/API
- Base URI: `https://hacker-news.firebaseio.com/v0/`
- Job Stories: 
  - URL: `https://hacker-news.firebaseio.com/v0/item/{id}.json`
  - Method: `GET`
  - Format: [35908337, 35904973, 35900922, 35893439, ...]
- Job Details:
  - URL: `https://hacker-news.firebaseio.com/v0/item/{id}.json`
  - Method: `GET`
  - Format:
  ```
  {
    "by": "jamilbk",
    "id": 35908337,
    "score": 1,
    "time": 1683838872,
    "title": "Firezone (YC W22) is hiring Elixir and Rust engineers",
    "type": "job",
    "url": "https://www.ycombinator.com/companies/firezone/jobs"
  }
  ```

## TODO
- [ ] Get the data from Hacker News API 
  - Get the list of IDs from the Job Stories from the API
  - Loop through each ID and get a response from the ID
    - Check if res.type === "job:
      - If yes, then query the following information: title, by, time, url
      - Convert the Unix Time into datetime: datetime.datetime.fromtimestamp(res.time)
      - The final item should look like this:
        [{
          "by":
          "time":
          "title":
          "url":
        },
        ...
        ]
- [ ] Display the data
  - Loop through each item and display it on the card