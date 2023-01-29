import formData from "../fixtures/form-input.json";

describe("using forms", () => {
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
    cy.intercept("POST", "/auth/login", (req) => {
      req.reply(202, { token });
    });

    //the user logged in if the userId is in the local storage
    //@ts-ignore
    cy.readLocalStorage("token").should("equal", token);
  });
});
