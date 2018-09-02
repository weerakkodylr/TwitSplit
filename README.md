# TwitSplit
Simple messaging app (no back-end) using ReactJS(Redux) with server side rendering (Messages sent will only be managed withing the memory).

## splitMessage function
splitMessage helper function (in /shared/common/helperFunctions.js) will devide a message longer than 50 (this can be changed from /shared/config/helperConfig file) and automatically sent as separate messages.

e.g.
Original message - 
"I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself."

Out come is two separate messages with part indicator at the beggining of each message -

"1/2 I can't believe Tweeter now supports chunking"

"2/2 my messages, so I don't have to do it myself."


## Error messages
Around 4000 charactors can be included in the message which then be converted in to chunks. Maximum support is up to 99 chunks.

An error message will be displayed if there are more than 99 chunks.

Other error message will get displayed if user enter nore than 50 characters without any white spaces in between.

## Running the project
1. npm install
2. npm run build (This step might not require since I have added the built files as well)
3. npm run start

## Running UNIT Tests
npm run test
