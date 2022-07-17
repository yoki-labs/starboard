import { Command } from "@guildedjs/gil";
import type { Message } from "guilded.js";
import { SUPPORT_LINK } from "../constants";
import { GeneralResponseEmbed } from "../structs/GeneralResponseEmbed";

export default class Support extends Command {
	readonly name = "support";
	readonly aliases = ["help"];

	public execute(message: Message) {
		return message.reply(new GeneralResponseEmbed().setTitle("Need help?").setDescription(`You can reach the support team [here](${SUPPORT_LINK}).`));
	}

	public init() {
		return void 0;
	}
}
