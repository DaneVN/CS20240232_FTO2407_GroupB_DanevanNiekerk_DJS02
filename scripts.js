const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);
  const calcResult = Math.floor(dividend / divider);
  //still need to customise when the results are displayed and when they
  //don't happen

  try {
    if (!dividend || !divider) {
      throw `Division not performed. Both values are required in inputs. 
      Try again`;
    } else {
      result.innerText = calcResult;
    }
  } catch (err) {
    result.innerText = err;
  }

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
  try {
    if (isNaN(dividend) || isNaN(divider)) {
      throw new Error("Something critical went wrong. Please reload the page");
    }
  } catch (err) {
    document.body.innerHTML = `<h2>${err.message}</h2>`;
  }
});
