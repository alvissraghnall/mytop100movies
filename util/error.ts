export let server_error = "Something went wrong from our end, we promise to fix it soon. Please bear with us.";

export let unauthorized_error = "Invalid email, please check and try again. And if you're not registered, duly note that You must first be a registered user to login.";

export let validator_403_middleware = "Missing credentials. Please fill out all fields.";

export let mail_exists = "Email already exists. Please check the email, and try again, or create a new account."

export class InvalidAccessTokenError extends Error {
  
  constructor() {
    super("Token Invalid.");
  }
}

export class NoTokenProvidedError extends Error {
  constructor() {
    super("No (jwt) token provided in your request. Provide one, to authenticate.");
  }
}

export class NoUserFound extends Error {
  constructor() {
    super("No user with email provided found. Please register, or confirm the email address provided.");
  }
}
