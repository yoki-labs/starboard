import { Command } from "@guildedjs/gil";
import type { Message } from "guilded.js";
import { INVITE_LINK } from "../constants";
import { GeneralResponseEmbed } from "../structs/GeneralResponseEmbed";

export default class Invite extends Command {
	readonly name = "invite";

	public execute(message: Message) {
		return message.reply(new GeneralResponseEmbed().setTitle("Hey there!").setDescription(`You can invite me [here](${INVITE_LINK}).`));
	}

	public init() {
		return void 0;
	}
}
