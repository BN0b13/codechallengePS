Platform Science Software Development Engineer in Test assignment Bug Report
==========================================

## Environment - Staging

## Bugs

1. Expected - API returns a status code in the 400 range when the client fails to provide args. 

Actual - API returns 500 status code when no args are provided. Since the client is failing to provide the args, it is not a server error but a client side error. Code should be in 400 range.

Steps to reproduce - Send POST request to API without any args.

2. Expected - API returns a status code in the 400 range when the client provides args outside of the normal expected args.

Actual - API accepts impossible Hoover starting location args. Hoover should not start outside of the room size.

Steps to reproduce - Send POST request to API with Hoover starting position outside of the room size. EX: Room size - [5, 5] Hoover Starting location - [9, 9]

3. Expected - API returns a status code in the 400 range when the client provides args with negative values.

Actual - API accepts args with negative values. This applies for the room dimensions, the starting Hoover location and dirt locations. These are impossible params for the API to process.

Steps to reproduce - Send POST request to API with args that have negative values. EX: Hoover Starting location - [-2, -2]

4. Expected - API returns the correct amount of "hoovered" dirt patches.

Actual - API adds on additional "hoovered" value to results regardless of starting direction. The only inconsistency found was when the Hoover cleaned in an East direction. That direction returned the expected value when it was instructed to travel two spaces with one predetermined dirt patch. Results returned 1 hoovered patch as expected.

Steps to reproduce - Send POST request with two direction commands in the same direction and one dirt patch that is in the Hoover's path. Example JSON args:

{
  roomSize: [5, 5],
  coords: [2, 2],
  patches: [[0, 2]],
  instructions: "WW",
}