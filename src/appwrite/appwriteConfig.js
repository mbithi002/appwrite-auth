import { Account, Client, Databases } from "appwrite";
import conf from "../conf/conf";

const client = new Client()
  .setEndpoint(conf.appwriteEndpoint)
  .setProject(conf.appwriteProjectId);

export const account = new Account(client);

// Database

export const databases = new Databases(client, conf.appwriteDatabaseId);

const getUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};

export default getUser;
