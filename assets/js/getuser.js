// fatch user data from api here 

async function fetchAndDisplayUsers() {
  try {
    const response = await fetch("https://dummyjson.com/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json(); // Convert to JSON
    const usersContainer = document.getElementById("usersContainer"); // Container to display users

    // Clear any existing content
    usersContainer.innerHTML = "";

    // Display each user in the container
    data.users.forEach((user) => {
      const userElement = document.createElement("div"); // Create a new div for each user
      userElement.className = "user"; // Add class for styling

      userElement.innerHTML = `
                <div class="user-details">
                    <img src="${user.image}" alt="${user.firstName} ${user.lastName}" />
                    <div class="user-info">
                        <h4>${user.firstName} ${user.lastName}</h4>
                        <p>Username: ${user.username}</p>
                        <p>Email: ${user.email}</p>
                    </div>
                </div>
            `;

      // Append the user div to the container
      usersContainer.appendChild(userElement);
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// Fetch and display users when the page loads
window.onload = fetchAndDisplayUsers; // Use onload to trigger fetching when the page loads



// search user functionality  start here 


async function searchUsers(query) {
  try {
    const response = await fetch(
      `https://dummyjson.com/users/search?q=${query}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json(); // Convert to JSON
    return data; // Return the parsed data
  } catch (error) {
    console.error("Error searching users:", error);
    return null; // Return null if there's an error
  }
}

async function handleSearch() {
  const searchTerm = document.getElementById("searchInput").value.trim();
  const usersContainer = document.getElementById("usersContainer");

  // Clear previous results
  usersContainer.innerHTML = "";

  if (searchTerm === "") {
    usersContainer.innerHTML = "Please enter a search term."; // Basic validation
    return;
  }

  const data = await searchUsers(searchTerm); // Fetch users based on the search term

  if (data && data.users.length > 0) {
    // Display the found users
    data.users.forEach((user) => {
      const userElement = document.createElement("div");
      userElement.className = "user"; // Add a class for styling
      userElement.innerHTML = `
                        <div class="user-details">
                            <img src="${user.image}" alt="${user.firstName} ${user.lastName}" />
                            <div class="user-info">
                                <h6>${user.firstName} ${user.lastName}</h6>
                                <p>Username: ${user.username}</p>
                                <p>Email: ${user.email}</p>
                            </div>
                        </div>
                    `;

      usersContainer.appendChild(userElement); // Append the user element to the container
    });
  } else {
    usersContainer.innerHTML = "No users found."; // Display if no results
  }
}

// Add an event listener to the search button
document.getElementById("searchButton").addEventListener("click", handleSearch);


// get user and search user from api end here 