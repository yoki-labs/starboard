import { Embed } from "@guildedjs/gil";

export class GeneralResponseEmbed extends Embed {
	public constructor() {
		super();
		super.setColor("GREEN").setFooter("Yoki Labs");
	}
}
