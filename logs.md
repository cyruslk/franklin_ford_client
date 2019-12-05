# 2019.10.24

I've decided to split the backend from the front-end and change a bit the project's architecture. Here's how it works now:

1.  The server-side does the computation, create the Tweets and the Reddit + save to the database.
2. The client-side call the data through an API endpoint, store the data and manipulates it.


The server-side code is accessible here: https://github.com/cyruslk/franklin-ford-bot
Note: I will clean the code soon. Stay tuned.

The client-side code is accessible at this repo: https://github.com/cyruslk/franklin_ford_client
Note: I now need to clean the db - and decide with Juliette what to use/what to discard. 
https://www.youtube.com/watch?v=azAreVfBS0o

