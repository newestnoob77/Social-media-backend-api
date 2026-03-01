# Social-media-backend-api
 A backend project for social media app which contains authentication ,documentation, feature  for user profile crud operations ,post management  which involves crud operations and also contains  feature for comment crud of operation and retrieving number of likes  and adding likes also feature for sending verifying otp  
The API structure for the "Social-Media" project can be organized as follows:

Authentication Routes
/api/users/signup: Register a new user account.
/api/users/signin: Log in as a user.
/api/users/logout Log out the currently logged-in user.
/api/users/logout-all-devices: Log out the user from all devices.

User Profile Routes
/api/users/get-details/:userld: Retrieve user information, ensuring sensitive data like passwords is not exposed.
/api/users/get-all-details: Retrieve information for all users, avoiding display of sensitive credentials like passwords.
/api/users/update-details/:userld: Update user details while ensuring that sensitive data like passwords remains secure and undisclosed.

Post Routes
/api/posts/all: Retrieve all posts from various users to compile a news feed.
/api/posts/:postid: Retrieve a specific post by ID.
/api/posts/: Retrieve all posts for a specific user to display on their profile page.
/api/posts/: Create a new post.
/api/posts/:postid: Delete a specific post.
/api/posts/:postid: Update a specific post.
Note that for the same routes, you can change the HTTP methods (GET, POST, PUT, DELETE).
For example:
Use DELETE("/api/posts/:postld") to delete a specific post.
Use PUT("/api/posts/:postld") to update a specific post.

Comment Routes
/api/comments/:postld: Get comments for a specific post.
/api/comments/:postld:
Add a comment to a specific post.
/api/comments/:commentld:
Delete a specific comment.
/api/comments/:commentld:
Update a specific comment.
Note: For the same routes, change the HTTP methods (GET, POST, PUT, DELETE).

Like Routes
/api/likes/:id: Get likes for a specific post or comment.
/api/likes/toggle/:id: Toggle like on a post or comment.
Friendship Routes
/api/friends/get-friends/:userld: Get a user's friends.
/api/friends/get-pending-requests: Get pending friend requests.
/api/friends/toggle-friendship/:friendld: Toggle friendship with another user.
/api/friends/response-to-request/:friendld: Accept or reject a friend request.

OTP Routes
/api/otp/send: Send an OTP for password reset.
/api/otp/verify: Verify an OTP.
/api/otp/reset-password: Reset the user's password.
