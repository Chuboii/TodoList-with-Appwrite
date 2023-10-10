import { Client, Databases} from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6521585422ab430bf2cf');

// Subscribe to files channel
export const databases = new Databases(client)