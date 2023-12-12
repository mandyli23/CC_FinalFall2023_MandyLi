const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try {
    const response = await axios.put(
      'https://api.chatengine.io/users/',
      {
        username: username,
        secret: 'secure_secret', // Replace with a secure method to generate a secret
        first_name: username
      },
      {
        headers: {
          "private-key": "d32c62e9-af38-4422-81c3-732d940d74e1"
        }
      }
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error creating ChatEngine user:", error.response?.data || error.message);
    return res.status(error.response?.status || 500).json({
      error: "Failed to create ChatEngine user."
    });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
