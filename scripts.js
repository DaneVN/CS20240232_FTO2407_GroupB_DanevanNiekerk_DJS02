/**
 * Form element used to capture user inputs.
 * @type {HTMLElement}
 */
const form = document.querySelector("[data-form]");

/**
 * Element to display the calculation result or error messages.
 * @type {HTMLElement}
 */
const result = document.querySelector("[data-result]");

/**
 * Event listener for the form's submit event.
 * Prevents default form submission and performs division operations.
 *
 * @param {SubmitEvent} event - The event object from the form submission.
 */
form.addEventListener("submit", (event) => {
  event.preventDefault();

  /**
   * Collects all form data as key-value pairs.
   * @type {FormData}
   */
  const entries = new FormData(event.target);

  /**
   * Destructures the entries into individual variables.
   * @type {Object}
   * @property {string} dividend - The dividend input value from the form.
   * @property {string} divider - The divider input value from the form.
   */
  const { dividend, divider } = Object.fromEntries(entries);

  /**
   * Calculates the integer division result by flooring the result.
   * @type {number}
   */
  //Scenario: Dividing numbers result in a decimal number
  const calcResult = Math.floor(dividend / divider);

  // Custom error handling for different scenarios
  //Scenario: Validation when values are missing
  try {
    if (!dividend || !divider) {
      throw `Division not performed. Both values are required in inputs. 
      Try again`;
    } else {
      result.innerText = calcResult;
    }
  } catch (err) {
    /**
     * Displays error message when one or both input fields are empty.
     * @type {string}
     */
    result.innerText = err;
  }

  //Scenario: An invalid division should log an error in the console
  try {
    if (divider == 0) {
      throw new Error(
        "Division not performed. Invalid number provided. Try again"
      );
    } else {
      result.innerText = calcResult;
    }
  } catch (err) {
    console.error(err.stack);
    result.innerText = err.message;
  }

  //Scenario: Providing anything that is not a number should crash the program
  try {
    if (isNaN(dividend) || isNaN(divider)) {
      throw new Error("Something critical went wrong. Please reload the page");
    }
  } catch (err) {
    //essentially replaces the entire document body with an error message in case of a critical issue .
    //i.e entering a NaN data type into input fields
    document.body.innerHTML = `<h2>${err.message}</h2>`;
  }
});
