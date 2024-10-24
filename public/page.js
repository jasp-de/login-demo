console.log("Hello in the browser!");

const main = () => {
  const form = document.querySelector("#login-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const loginData = new FormData(e.target);
    const data = Object.fromEntries(loginData);

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.href = "/myAccount";
      } else {
        window.location.href = "/loginError";
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during login.");
    }
  });
};

document.addEventListener("DOMContentLoaded", main);
