import * as sdk from "node-appwrite";

export default async ({ req, res, log, error }) => {
  const client = new sdk.Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY); // API key with Users read permission

  const users = new sdk.Users(client);

  try {
    const result = await users.list();
    // Only return safe user info (e.g. id, email)
    const safeUsers = result.users.map((u) => ({
      $id: u.$id,
      email: u.email,
    }));

    // ✅ Use `return res.json()` (Appwrite runtime expects a returned response)
    return res.json({ users: safeUsers });
  } catch (err) {
    error(err.message); // Log the error to Appwrite console
    return res.json({ users: [], error: err.message });
  }
};
