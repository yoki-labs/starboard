import { Command } from "@guildedjs/gil";
import type { Message } from "guilded.js";
import type { StarboardClient } from "../Client";
import { starboardChannel } from "../keys";
import { GeneralResponseEmbed } from "../structs/GeneralResponseEmbed";

interface IStarChannelArgs {
	newChannel?: string;
}

export default class starChannel extends Command {
	readonly name = "starchannel";
	readonly aliases = ["boardchannel", "setchannel"];
	readonly arguments = [
		{
			name: "newChannel",
			type: "string",
			required: false
		}
	] as const;

	public async execute(message: Message, { newChannel }: IStarChannelArgs) {
		const { redis } = this.client as StarboardClient;
		const key = starboardChannel(message.serverId!);
		if (!newChannel) {
			const existing = await redis.get(key);
			if (!existing) return message.send(new GeneralResponseEmbed().setTitle("No channel set!").setColor("YELLOW"));
			return message.send(new GeneralResponseEmbed().setTitle("This server's starboard channel").setDescription(`\`${existing}\``));
		}
		const fetchChannel = await this.client.channels.fetch(newChannel).catch(() => null);
		if (!fetchChannel)
			return message.send(
				new GeneralResponseEmbed()
					.setTitle("Error!")
					.setDescription("I cannot find this channel! Please make sure it exists and that I have permission to see it.")
			);
		await redis.set(key, newChannel);
		return message.send(
			new GeneralResponseEmbed().setTitle("Successfully set").setDescription(`Starboard channel has been set to ${fetchChannel.name}`)
		);
	}

	public init() {
		return void 0;
	}
}
