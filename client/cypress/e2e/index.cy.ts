import formData from "../fixtures/form-input.json";

describe("forms", () => {
  it("the user should be able to sign up then get redirected to the login page to login", () => {
    cy.visit("/");

    //go to the Signup form
    cy.findByRole("link", { name: /sign up/i }).click();

    //fill the input fields
    cy.get("#fName").type(formData.firstName);
    cy.get("#lName").type(formData.lastName);
    cy.get("#email").type(formData.email);
    cy.get("#password").type(formData.password);
    cy.get("#confirmPassword").type(formData.password);

    //send the request
    cy.findByRole("button", { name: /sign up/i }).click();
    cy.intercept("POST", "/auth/signup", {
      message: "user created successfully",
    });

    //get redirected when successfull
    cy.location("pathname").should("equal", "/auth/login");
  });

  it("the user can login successfully", () => {
    cy.visit("/");

    //go to the login page
    cy.findByRole("link", { name: /log in/i }).click();

    //fill the input fields
    cy.get("#email").type(formData.email);
    cy.get("#password").type(formData.password);

    //send the request
    cy.findByRole("button", { name: /log in/i }).click();
    const token = "somerandomusertoken";
    cy.intercept("POST", "/auth/login", {
      statusCode: 202,
      body: { token: token },
    });

    //the user logged in if the userId is in the local storage
    cy.readLocalStorage("token").should("equal", token);

    //get redirected to the messages page when successfull
    cy.location("pathname").should("equal", "/messages");
  });

  it("the user can generate url and send messages to it", () => {
    cy.visit("/");

    //the user logs in
    cy.findByRole("link", { name: /log in/i }).click();
    cy.get("#email").type(formData.email);
    cy.get("#password").type(formData.password);
    cy.findByRole("button", { name: /log in/i }).click();
    const token = "somerandomusertoken";
    cy.intercept("POST", "/auth/login", {
      statusCode: 202,
      body: { token: token },
    });

    // go to the url generator page
    cy.get('[href="/geturl"]').click();
    cy.location("pathname").should("equal", "/geturl");

    // generate a link
    cy.findByRole("button", { name: /generate/i }).click();
    const url = "generatedLink";
    cy.intercept("GET", "/messages/path", { path: url });

    // check if the link is as expected
    const generated = "http://localhost:3000/messages/" + url;
    cy.get(".justify-around > .flex > .bg-green-100")
      .invoke("val")
      .should("equal", generated);

    // copy to clipboard
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.get(".aspect-square").click();
    cy.window().then((win) => {
      win.navigator.clipboard
        .readText()
        .then((text) => {
          expect(text).to.equal(generated);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    // visit the generated url
    cy.visit("/messages/" + url);

    // send a message
    const message = "test message";
    cy.get("#message").type(message);
    cy.findByRole("button", { name: /send/i }).click({ force: true });

    // check if the message is in the messages tab
    cy.get('[href="/messages"]').click();
    cy.intercept("GET", "/messages", { messages: [message] });
    cy.findByText(message).should("be.visible");
  });
});
