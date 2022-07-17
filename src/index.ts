import "dotenv/config";
import { StarboardClient } from "./Client";
import { join } from "node:path";
import reactionAdd from "./events/ReactionAdd";
import reactionRemove from "./events/ReactionRemove";

["GUILDED_TOKEN"].forEach((x) => {
	if (!process.env[x]) throw new Error(`Missing env var ${x}`);
});

const client = new StarboardClient({
	token: process.env.GUILDED_TOKEN!,
	sourceFolderPath: join(__dirname, "..", "dist"),
	prefix: "s!"
});
client.on("messageReactionCreated", reactionAdd(client));
client.on("messageReactionDeleted", reactionRemove(client));
client.on("ready", () => console.log(`Logged in as ${client.user!.name}`));
client.login();

process.on("unhandledRejection", console.log);
