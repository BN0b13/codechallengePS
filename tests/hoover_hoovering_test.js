Feature("Hoover dirt hoovering tests");

// Hoover dirt hoovering capabilities for every direction without dirt

Scenario("POST Hoover verify no directions without dirt", ({ I }) => {
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [1, 1],
    patches: [],
    instructions: "",
  });
  I.seeResponseCodeIs(200);
  I.seeResponseContainsKeys(["coords", "patches"]);
  // Expect Hoover to have same starting coords with 0 patches hoovered
  I.seeResponseContainsJson({ coords: [1, 1], patches: 0 });
});

Scenario("POST Hoover verify N direction without dirt", ({ I }) => {
  // Expect N to move Hoover +1 on the Y axis
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [1, 1],
    patches: [],
    instructions: "N",
  });
  I.seeResponseCodeIs(200);
  I.seeResponseContainsKeys(["coords", "patches"]);
  I.seeResponseContainsJson({ coords: [1, 2], patches: 0 });
});

Scenario("POST Hoover verify E direction without dirt", ({ I }) => {
  // Expect E to move Hoover +1 on the X axis
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [1, 1],
    patches: [],
    instructions: "E",
  });
  I.seeResponseCodeIs(200);
  I.seeResponseContainsKeys(["coords", "patches"]);
  I.seeResponseContainsJson({ coords: [2, 1], patches: 0 });
});

Scenario("POST Hoover verify S direction without dirt", ({ I }) => {
  // Expect S to move Hoover -1 on the Y axis
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [1, 1],
    patches: [],
    instructions: "S",
  });
  I.seeResponseCodeIs(200);
  I.seeResponseContainsKeys(["coords", "patches"]);
  I.seeResponseContainsJson({ coords: [2, 0], patches: 0 });
});

Scenario("POST Hoover verify W direction without dirt", ({ I }) => {
  //Expect W to move Hoover -1 on the X axis
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [1, 1],
    patches: [],
    instructions: "W",
  });
  I.seeResponseCodeIs(200);
  I.seeResponseContainsKeys(["coords", "patches"]);
  I.seeResponseContainsJson({ coords: [0, 2], patches: 0 });
});

// Hoover dirt hoovering capabilities for every direction with dirt

Scenario("POST Hoover verify no directions with dirt", ({ I }) => {
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [1, 1],
    patches: [[0, 0]],
    instructions: "",
  });
  I.seeResponseCodeIs(200);
  I.seeResponseContainsKeys(["coords", "patches"]);
  // Expect Hoover to have same coords with 0 patches hoovered
  I.seeResponseContainsJson({ coords: [1, 1], patches: 0 });
});

Scenario("POST Hoover verify N direction with dirt", ({ I }) => {
  // Expect N to move Hoover +2 on the Y axis
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [2, 2],
    patches: [[2, 4]],
    instructions: "NN",
  });
  I.seeResponseCodeIs(200);
  I.seeResponseContainsKeys(["coords", "patches"]);
  I.seeResponseContainsJson({ coords: [2, 4], patches: 1 });
});

Scenario("POST Hoover verify E direction with dirt", ({ I }) => {
  // Expect E to move Hoover +2 on the X axis
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [2, 2],
    patches: [[4, 2]],
    instructions: "EE",
  });
  I.seeResponseCodeIs(200);
  I.seeResponseContainsKeys(["coords", "patches"]);
  I.seeResponseContainsJson({ coords: [4, 2], patches: 1 });
});

Scenario("POST Hoover verify S direction with dirt", ({ I }) => {
  // Expect S to move Hoover -2 on the Y axis
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [2, 2],
    patches: [[2, 0]],
    instructions: "SS",
  });
  I.seeResponseCodeIs(200);
  I.seeResponseContainsKeys(["coords", "patches"]);
  I.seeResponseContainsJson({ coords: [2, 0], patches: 1 });
});

Scenario("POST Hoover verify W direction with dirt", ({ I }) => {
  //Expect W to move Hoover -2 on the X axis
  I.sendPostRequest("/v1/cleaning-sessions", {
    roomSize: [5, 5],
    coords: [2, 2],
    patches: [[0, 2]],
    instructions: "WW",
  });
  I.seeResponseCodeIs(200);
  I.seeResponseContainsKeys(["coords", "patches"]);
  I.seeResponseContainsJson({ coords: [0, 2], patches: 1 });
});
