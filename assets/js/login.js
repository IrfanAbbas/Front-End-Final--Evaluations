document
  .getElementById("login-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    try {
      // Authentication API call
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 30, // optional, defaults to 60
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      localStorage.setItem("jwtToken", JSON.stringify(data));

      alert("Logged in successfully");
      // Optionally reset the form fields
      this.reset();
      window.location.href = "index.html"; // Change 'index.html' to the actual file name of your index page
    } catch (error) {
      console.error("Error:", error);
      // Display error message to the user
      alert("Login failed. Please check your credentials and try again.");
    }
  });

//   form validation

document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  emailInput.addEventListener("input", function (event) {
    const email = emailInput.value.trim();
    const emailError = document.getElementById("email-error");
    // username include only letters, numbers, and underscores
    if (/^[a-zA-Z0-9_-]+$/.test(email)) {
      emailInput.classList.add("is-invalid");
      emailError.textContent = "Please enter a valid UserN address.";
    } else {
      emailInput.classList.remove("is-invalid");
      emailError.textContent = "";
    }
  });

  passwordInput.addEventListener("input", function (event) {
    const password = passwordInput.value.trim();
    const passwordError = document.getElementById("password-error");
//password include only letters, numbers, and underscores and must be at max 12 characters long
    if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/.test(
        password
      )
    ) {
      passwordInput.classList.add("is-invalid");
      passwordError.textContent =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    } else {
      passwordInput.classList.remove("is-invalid");
      passwordError.textContent = "";
    }
  });
});

// Login. js end here 