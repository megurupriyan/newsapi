# newsapi

Here are the steps to build the news API service using Node.js and Express:

Install Node.js and npm (Node Package Manager) on your computer if you haven't already.

Create a new directory for your project and navigate to it in your terminal.

Initialize a new Node.js project by running the command npm init in your terminal. This will create a package.json file for your project.

Install the required dependencies for your project using the command npm install express cors axios moment.

This project sets up an Express server that listens on port 8080 and exposes an endpoint at /api/news. This endpoint accepts query parameters such as q (search query), lang (language), country, category, from (start date), to (end date), and pageSize (number of results per page).

When a client makes a request to this endpoint, the server first checks if the requested data is already cached in memory. If it is, and the cache is less than 5 minutes old, it returns the cached data. Otherwise, it fetches the data from the GNews API, stores it in the cache, and returns it to the client.

Start the server by running the command node index.js in your terminal. Your API should now be running and ready to accept requests.
