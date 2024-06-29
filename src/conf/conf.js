const conf = {
  appwriteEndpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECTID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASEID),
};

export default conf;
