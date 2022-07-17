import { BotClient } from "@guildedjs/gil";
import RedisClient from "ioredis";

export class StarboardClient extends BotClient {
	public readonly redis = new RedisClient(process.env.REDIS_URL ?? "cache:6379");
}
