import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
} from "react-native-appwrite";

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.js.aura",
    projectId: "674a13710031333f8986",
    databaseId: "674a14db00377bab2daa",
    userCollectionId: "674a15020011da4fd731",
    storageId: "674a16fd002467f17b7a",
};

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    storageId,
} = config;

const client = new Client();

client
    .setEndpoint(endpoint) // Your Appwrite Endpoint
    .setProject(projectId) // Your project ID
    .setPlatform(platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );
        if (!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            databaseId,
            userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl,
            }
        );

        return newUser;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

export const signIn = async (email, password) => {
    try {
        await account.deleteSession("current");
        const session = await account.createEmailPasswordSession(
            email,
            password
        );
        return session;
    } catch (e) {
        throw new Error(e);
    }
};

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (e) {
        console.log(e);
    }
};
