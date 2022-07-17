import { Command } from "@guildedjs/gil";
import type { Message } from "guilded.js";
import type { StarboardClient } from "../Client";
import { DEFAULT_STAR_THRESHOLD } from "../constants";
import { starThreshold } from "../keys";
import { GeneralResponseEmbed } from "../structs/GeneralResponseEmbed";

interface IThresholdArgs {
	newLimit?: number;
}

export default class Threshold extends Command {
	readonly name = "threshold";
	readonly aliases = ["setThreshold"];
	readonly arguments = [
		{
			name: "newLimit",
			type: "number",
			required: false
		}
	] as const;

	public async execute(message: Message, { newLimit }: IThresholdArgs) {
		const { redis } = this.client as StarboardClient;
		const key = starThreshold(message.serverId!);
		if (!newLimit) {
			const existing = await redis.get(key);
			return message.send(
				new GeneralResponseEmbed().setTitle("This server's required star threshold").setDescription(`\`${existing ?? DEFAULT_STAR_THRESHOLD}\``)
			);
		}

		if (newLimit <= 1) return message.send(new GeneralResponseEmbed().setTitle("Error!").setDescription("New threshold must be above 1"));

		await redis.set(key, newLimit);
		return message.send(new GeneralResponseEmbed().setTitle("Successfully set").setDescription(`Star threshold has been set to ${newLimit}`));
	}

	public init() {
		return void 0;
	}
}
