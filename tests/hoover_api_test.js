Feature("Hoover API");

// Hoover API connection test

Scenario("POST Hoover data", ({ I }) => {
  // POST request to test response and verify response schema
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [1, 2],
    patches: [
      [1, 0],
      [2, 2],
      [2, 3],
    ],
    instructions: "NNESEESWNWW",
  });
  I.seeResponseCodeIs(200);
  I.seeResponseContainsKeys(["coords", "patches"]);
  I.seeResponseMatchesJsonSchema(($) => {
    return $.object({
      coords: $.array(),
      patches: $.number(),
    });
  });
});

// Error tests

Scenario("POST Hoover without args", ({ I }) => {
  // POST request without args to test API error handling
  I.sendPostRequest("/v1/cleaning-sessions");
  // Expect 400 status code. Client failed to provide any args
  I.seeResponseCodeIsClientError();
  I.seeResponseContainsKeys(["error"]);
});

Scenario("POST Hoover with incorrect data type", ({ I }) => {
  // POST request with string as "patches" value to test API error handling
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [1, 1],
    patches: ["test error string"],
    instructions: "NNESEESWNWW",
  });
  // Expect 400 status code. Client provided incorrect data type
  I.seeResponseCodeIsClientError();
  I.seeResponseContainsKeys(["error"]);
});

Scenario("POST Hoover outside of room", ({ I }) => {
  // POST request with Hoover starting location outside of room
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [6, 6],
    patches: [],
    instructions: "NNESEESWNWW",
  });
  // Expect 400 status code. Client provided impossible Hoover start location
  I.seeResponseCodeIsClientError();
  I.seeResponseContainsKeys(["error"]);
});

Scenario("POST Room args negative", ({ I }) => {
  // POST request with negative room specification
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [-1, -1],
    coords: [1, 1],
    patches: [],
    instructions: "",
  });
  // Expect 400 status code. Client provided negative room specifications
  I.seeResponseCodeIsClientError();
  I.seeResponseContainsKeys(["error"]);
});

Scenario("POST Hoover starting location args negative", ({ I }) => {
  // POST request with negative Hoover starting location
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [-1, -1],
    patches: [],
    instructions: "",
  });
  // Expect 400 status code. Client provided negative Hoover starting location
  I.seeResponseCodeIsClientError();
  I.seeResponseContainsKeys(["error"]);
});

Scenario("POST dirt location args negative", ({ I }) => {
  // POST request with negative Hoover starting location
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [1, 2],
    patches: [[-1, -1]],
    instructions: "S",
  });
  // Expect 400 status code. Client provided negative Hoover starting location
  I.seeResponseCodeIsClientError();
  I.seeResponseContainsKeys(["error"]);
});
