async function fetchDisplayPosts() {
  const searchTerm = document.getElementById("searchInputPost").value.trim(); // Avoid redundant DOM queries and trim whitespace
  console.log(searchTerm, "ddddd");
  try {
    if (searchTerm) {
      const resultsDiv = document.getElementById("results");
      const postContainer = document.querySelector(".postPublished");

      // Hide the original post container when searching
      postContainer.style.display = "none";
      resultsDiv.innerHTML = ""; // Clear previous search results

      // Check for empty search term and return early

      if (!searchTerm) {
        resultsDiv.innerHTML = "Please enter a search term."; // User feedback for empty input
        return;
      }

      try {
        const data = await searchPosts(searchTerm); // Fetch search results

        if (data && data.posts.length > 0) {
          // Use a document fragment to build results in memory
          const fragment = document.createDocumentFragment();

          data.posts.forEach(async (post) => {
            // Fetch user data for the current post
            const userResponse = await fetch(
              `https://dummyjson.com/users/${post.userId}`
            );
            if (!userResponse.ok) {
              throw new Error("Failed to fetch user data");
            }

            const userData = await userResponse.json(); // Convert user data to JSON

            // Fetch comments for the current post
            const commentsResponse = await fetch(
              `https://dummyjson.com/posts/${post.id}/comments`
            );
            if (!commentsResponse.ok) {
              throw new Error("Failed to fetch comments");
            }

            const commentsData = await commentsResponse.json(); // Convert comments data to JSON

            // Create a new div for the post
            const postElement = document.createElement("div");
            postElement.className = "post-user-profile";

            // Populate post content
            postElement.innerHTML = `
                <div class="post-upper-profile d-flex justify-content-between">
                    <div class="user-post-profile-image d-flex align-items-center">
                        <img src="${
                          userData.image || "./images/profile-pic.png"
                        }" alt="User Profile" class="rounded-circle" width="50" height="50">
                        <p class="ms-2">${userData.username}</p>
                        
                    </div>
                    <div class="edit-post">
                    <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <img src="${
                          post.image || "./assets/img/wall.jpg"
                        }" alt="Post Image" width="100%">
                        <br><br><h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.body}</p>
                        <div class="d-flex justify-content-between likediv">
                            <div class="like">
                            <ion-icon name="heart-outline" class="like-share"></ion-icon>
                            <ion-icon name="share-social-outline" class="like-share" onlick="heartBg()" id="heart"></ion-icon>
                            </div>
                            <div class="save-post">
                            <ion-icon name="bookmark-outline" class="like-share"></ion-icon>
                            </div>
                        </div>
                        <div class="comment-section">
                            <h6>Comments:</h6>
                            <div class="inner-coment">
                         
                            <img src="${
                              userData.image + 1 || "./images/profile-pic.png"
                            }" alt="User Profile" class="rounded-circle" width="50" height="50">
                                <strong> ${userData.username}

                                </strong>
                                <br>
                                ${commentsData.comments
                                  .map(
                                    (comment) =>
                                      `<input type="text"class="input-comment" value="${comment.body}"/ >
                                      <button class="btn btn-danger del-updatebtn" 
                                      onclick="deleteComment(${comment.id})">Delete</button>
                                      <button class="btn btn-primary del-updatebtn"  onclick="updatePostTitle('${post.id}', '${comment.body}')">Update</button>

                                      `
                                  )

                                  .join("")} </p>
                                </div>
                                <div>
                                <img src="./assets/img/wall.jpg" alt="User Profile" class="rounded-circle" width="50" height="50">
                                <p id="show-comments${post.id}"> </p>
                               </div>
                                
                               
                                
                                </div>
                                <input type="search" class="form-control mt-3" placeholder="Post a comment here" id="${
                                  post.id
                                }">
                            <button class="btn btn-primary mt-3" onclick="addComment('${
                              post.id
                            }')">Post Comment</button>
                        </div>
                </div>
            </div>
         `;

            // Append to container
            resultsDiv.appendChild(postElement);
          });
        } else {
          resultsDiv.innerHTML = "No posts found."; // User feedback for no search results
        }
      } catch (error) {
        console.error("Error during search:", error);
        resultsDiv.innerHTML =
          "An error occurred while searching. Please try again later."; // User feedback for errors
      }
    } else {
      // Fetch posts data
      const response = await fetch("https://dummyjson.com/posts");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const postsData = await response.json(); // Convert the response to JSON
      const postsContainer = document.querySelector(".postPublished"); // Container for posts

      // Loop through the posts
      for (const post of postsData.posts) {
        // Fetch user data for the current post
        const userResponse = await fetch(
          `https://dummyjson.com/users/${post.userId}`
        );
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await userResponse.json(); // Convert user data to JSON

        // Create a new div for the post
        const postElement = document.createElement("div");
        postElement.className = "post-user-profile";

        // Populate post content
        postElement.innerHTML = `
                        <div class="post-upper-profile d-flex justify-content-between ">
                            <div class="user-post-profile-image d-flex align-items-center">
                                <img src="${
                                  userData.image || "./images/profile-pic.png"
                                }" alt="User Profile" class="rounded-circle" width="50" height="50">
                                <p class="ms-2">${userData.username}</p>
                            </div>
                            <div class="edit-post">
                                <i class="fas fa-ellipsis-h icon"></i>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <img src="${
                                  post.image || "./assets/img/wall.jpg"
                                }" alt="Post Image" width="100%">
                                <h5 class="card-title">${post.title}</h5>
                                <p class="card-text">${post.body}</p>
                                <div class="d-flex justify-content-between likediv">
                                    <div class="like">
                                        <i class="fas fa-heart icon"></i>
                                        <i class="fas fa-share icon"></i>
                                    </div>
                                    <div class="save-post">
                                        <i class="fas fa-bookmark icon"></i>
                                    </div>
                                </div>
                                <div class="comment-section">
                                    <input type="search" class="form-control mt-3" placeholder="Post a comment here" id="PostCommentBar">
                                    <button class="btn btn-primary mt-3" onclick="postComment()">Post Comment</button>
                                </div>
                            </div>
                        </div>
                    `;

        // Append to container
        postsContainer.appendChild(postElement);
      }
    }
  } catch (error) {
    console.error("Error fetching and displaying posts:", error);
  }
}

// fetchDisplayPosts(); // Call the function to fetch and display posts

function postComment() {
  const comment = document.getElementById("PostCommentBar").value;
  console.log(`Posted comment: ${comment}`);
}

document
  .getElementById("searcPosthButton")
  .addEventListener("click", fetchDisplayPosts);

async function searchPosts(query) {
  try {
    const response = await fetch(
      `https://dummyjson.com/posts/search?q=${query}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    return data; // Return the parsed JSON data
  } catch (error) {
    console.error("Error searching posts:", error);
    return null; // Return null on error
  }
}
