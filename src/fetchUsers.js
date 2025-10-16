const sdk = require("node-appwrite");

module.exports = async function (req, res) {
  const client = new sdk.Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY); // API key with Users read permission

  const users = new sdk.Users(client);

  try {
    const result = await users.list();
    // Only return safe user info (e.g. id, email)
    const safeUsers = result.users.map(u => ({
      $id: u.$id,
      email: u.email
    }));
    res.json({ users: safeUsers });
  } catch (err) {
    res.json({ users: [], error: err.message });
  }
};