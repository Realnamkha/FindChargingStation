import {
  Client,
  Account,
  Avatars,
  Databases,
  Storage,
} from "react-native-appwrite";
const APPWRITE_ENDPOINT = "https://nyc.cloud.appwrite.io/v1";
const PROJECT_ID = "68d900c10026a43a75af";

export const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1") // ✅ Appwrite endpoint
  .setProject("68d900c10026a43a75af") // ✅ Your project ID
  .setPlatform("com.namkha.app"); // Optional, for analytics or platform tracking

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const getFileUrl = (bucketId: string, fileId: string) => {
  return `${APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/view?project=${PROJECT_ID}`;
};
