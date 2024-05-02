document.addEventListener("DOMContentLoaded", function () {
  let jwtToken = localStorage.getItem("jwtToken");
  console.log(jwtToken);
  jwtToken = jwtToken && JSON.parse(jwtToken);
  if (jwtToken?.token) {
    fetchUserData(jwtToken?.token);
  } else {
    if (window.location.pathname !== "/login.html") {
      window.location.replace("login.html");
    }
  }
});
async function fetchUserData(jwtToken) {
  try {
    // Make the GET request with the Authorization header
    const response = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Use the token from localStorage
      },
    });

    // Check if the response is okay
    if (response.ok) {
      if (window.location.pathname === "/login.html") {
        window.location.replace("index.html");
      }

      const data = await response.json();
      updateUserProfileImages(data.image);
      console.log(data); // Log response data to console
      return data; // Return the fetched data
    } else {
      throw new Error("Failed to authenticate. Please log in again.");
    }
  } catch (error) {
    localStorage.removeItem("jwtToken");
    console.error("Error:", error);
    alert(error.message);
  }
}

function updateUserProfileImages(newSrc) {
  // Select all elements with the class name 'user-profile-img'
  const profileImages = document.querySelectorAll(".user-profile-img");

  profileImages.forEach((img) => {
    img.src = newSrc;
  });
}

function bgClean() {
  document.getElementById("dropdownMenuButton").style.background = "none";
}

function heartBg() {
  // Changing the icon color to red
  document.getElementById("heart").style.color = "red";
}

function lsclear() {
  localStorage.clear();
  alert("are you sure to logout");
  window.location.href = "login.html";
}
