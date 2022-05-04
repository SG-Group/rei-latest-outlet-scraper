# rei-latest-outlet

Script to constantly run and scrape the "New Arrivals" section of REI Outlet for new items and price changes and persist the data to a locally ran database.
Incase the website has bot prevention, products are loaded one page at a time at a random interval between 1 and 3 minutes.

## Installation

1. Pull down/download the repository
2. Navigate to the local folder containing the project
3. Use the following node package manager (npm) command to install dependencies:

```bash
npm ci
```

## Usage

To run the project use:

```bash
npm run
```

From that point the project should run locally and persist data to db.sqlite

Use the following command to stop the script:

Windows:

```bash
Ctrl + C
```

Mac:

```bash
Command + C
```
