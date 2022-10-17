Feature("Hoover movement tests");

//Direction results for all directions

Scenario("POST Hoover with no direction commands", ({ I }) => {
  // POST request with no direction commands for Hoover
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [1, 1],
    patches: [],
    instructions: "",
  });
  I.seeResponseCodeIs(200);
  I.seeResponseContainsKeys(["coords", "patches"]);
  // Expect same coords returned as args
  I.seeResponseContainsJson({ coords: [1, 1] });
});

Scenario("Hoover verify N direction", ({ I }) => {
  // Expect N to move Hoover +1 on Y axis
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [1, 1],
    patches: [],
    instructions: "N",
  });
  I.seeResponseCodeIs(200);
  I.seeResponseContainsKeys(["coords"]);
  I.seeResponseContainsJson({ coords: [1, 2] });
});

Scenario("Hoover verify E direction", ({ I }) => {
  // Expect E to move Hoover +1 on X axis
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [1, 1],
    patches: [],
    instructions: "E",
  });
  I.seeResponseCodeIs(200);
  I.seeResponseContainsKeys(["coords"]);
  I.seeResponseContainsJson({ coords: [2, 1] });
});

Scenario("Hoover verify S direction", ({ I }) => {
  // Expect S to move Hoover -1 on Y axis
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [1, 1],
    patches: [],
    instructions: "S",
  });
  I.seeResponseCodeIs(200);
  I.seeResponseContainsKeys(["coords"]);
  I.seeResponseContainsJson({ coords: [1, 0] });
});

Scenario("Hoover verify W direction", ({ I }) => {
  //Expect E to move Hoover -1 on X axis
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [1, 1],
    patches: [],
    instructions: "W",
  });
  I.seeResponseCodeIs(200);
  I.seeResponseContainsKeys(["coords"]);
  I.seeResponseContainsJson({ coords: [0, 1] });
});

// Hoover wall collision handling

Scenario("Hoover wall collision N direction", ({ I }) => {
  // Expect wall collision detection moving Hoover with N direction
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [4, 4],
    patches: [],
    instructions: "N",
  });
  I.seeResponseCodeIs(200);
  I.seeResponseContainsKeys(["coords"]);
  // Expect wall collision detection to prevent Hoover from changing location
  I.seeResponseContainsJson({ coords: [4, 4] });
});

Scenario("Hoover wall collision E direction", ({ I }) => {
  // Expect wall collision detection moving Hoover with E direction
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [4, 4],
    patches: [],
    instructions: "E",
  });
  I.seeResponseCodeIs(200);
  I.seeResponseContainsKeys(["coords"]);
  // Expect wall collision detection to prevent Hoover from changing location
  I.seeResponseContainsJson({ coords: [4, 4] });
});

Scenario("Hoover wall collision S direction", ({ I }) => {
  // Expect wall collision detection moving Hoover with S direction
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [0, 0],
    patches: [],
    instructions: "S",
  });
  I.seeResponseCodeIs(200);
  I.seeResponseContainsKeys(["coords"]);
  // Expect wall collision detection to prevent Hoover from changing location
  I.seeResponseContainsJson({ coords: [0, 0] });
});

Scenario("Hoover wall collision W direction", ({ I }) => {
  // Expect wall collision detection moving Hoover with W direction
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [0, 0],
    patches: [],
    instructions: "W",
  });
  I.seeResponseCodeIs(200);
  I.seeResponseContainsKeys(["coords"]);
  // Expect wall collision detection to prevent Hoover from changing location
  I.seeResponseContainsJson({ coords: [0, 0] });
});
