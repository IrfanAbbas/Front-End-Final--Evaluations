async function fetchAndDisplayPosts() {
  try {
    // Fetch posts data
    const response = await fetch("https://dummyjson.com/posts?limit=10&skip=5");
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
                               
                                <p id="show-comments${
                                  post.id
                                }" class="showcoment"> </p>
                              
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
      postsContainer.appendChild(postElement);
    }
  } catch (error) {
    console.error("Error fetching and displaying posts:", error);
  }
}

fetchAndDisplayPosts(); // Call the function to fetch and display posts

async function deleteComment(commentId) {
  try {
    const response = await fetch(
      `https://dummyjson.com/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete comment (status: ${response.status})`);
    }

    const data = await response.json();
    alert("Comment delete successfully");
    return data; // Return the response data if needed
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error; // Rethrow the error for handling elsewhere if needed
  }
}

async function updatePostTitle(postId, newTitle) {
  try {
    const response = await fetch(`https://dummyjson.com/posts/${postId}`, {
      method: "PUT", // Or 'PATCH' depending on the API's expectations
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update post (status: ${response.status})`);
    }

    const updatedPost = await response.json(); // Convert the response to JSON
    console.log("Updated post:", updatedPost); // Log the updated data for debugging
    alert("Comment Updated successfully");

    return updatedPost; // Return the updated post data
  } catch (error) {
    console.error("Error updating post:", error);
    throw error; // Rethrow the error to handle it higher up
  }
}

async function addComment(postId) {
  try {
    let jwtToken = localStorage.getItem("jwtToken");
    console.log(jwtToken);
    jwtToken = jwtToken && JSON.parse(jwtToken);
    const commentInput = document.getElementById(postId);
    const comment = commentInput.value.trim(); // Trim to remove extra spaces

    // Check if comment is not empty
    if (comment) {
      const commentsSection = document.getElementById(`show-comments${postId}`);
      commentsSection.textContent = comment; // Use textContent to avoid HTML injection
      console.log(`Posted comment: ${comment}`);

      // Clear the input field after posting
    } else {
      console.warn("Cannot post an empty comment.");
    }
    const response = await fetch("https://dummyjson.com/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        body: comment,
        postId,
        userId: jwtToken.id,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add comment (status: ${response.status})`);
    }

    const newComment = await response.json();
    console.log("New comment added:", newComment); // Debugging/logging
    alert("Comment Added successfully");
    commentInput.value = "";

    return newComment; // Return the new comment data
  } catch (error) {
    console.error("Error adding comment:", error); // Error handling
    throw error; // Rethrow error for further handling
  }
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    fetchAndDisplayPosts(); // Call the function
  }
});
