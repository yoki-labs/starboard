import { Embed, MessageReaction } from "@guildedjs/gil";
import type { StarboardClient } from "../Client";
import { DEFAULT_STAR_THRESHOLD } from "../constants";
import { setMessageAsSent, starboardChannel, starMessage, starThreshold } from "../keys";

export default function reactionAdd(client: StarboardClient) {
	return async (reaction: MessageReaction) => {
		const { redis } = client as StarboardClient;
		if (reaction.emote.id !== 90001779) return;

		const serverStarboardChannel = await redis.get(starboardChannel(reaction.serverId));
		if (!serverStarboardChannel) return;

		const reactionCount = Number(await redis.get(starMessage(reaction.messageId))) ?? 0;
		const threshold = Number((await redis.get(starThreshold(reaction.serverId))) ?? DEFAULT_STAR_THRESHOLD);

		if (reactionCount + 1 === threshold) {
			const fetchedMessage = await client.messages.fetch(reaction.channelId, reaction.messageId);
			if (await redis.get(setMessageAsSent(fetchedMessage.id))) return;
			const author = await client.members.fetch(reaction.serverId!, fetchedMessage.createdById);
			await client.messages.send(serverStarboardChannel, {
				embeds: [
					new Embed()
						.setAuthor(author.displayName!, author.user?.avatar ?? null)
						.setDescription(
							[
								fetchedMessage.content,
								"",
								`[Jump to message](https://www.guilded.gg/Yoki/channels/${fetchedMessage.channelId}/chat?messageId=${fetchedMessage.id})`
							].join("\n")
						)
						.setFooter(fetchedMessage.id)
						.setTimestamp(fetchedMessage.createdAt)
				]
			});
			await redis.set(setMessageAsSent(fetchedMessage.id), 1);
		}
		return redis.set(starMessage(reaction.messageId), reactionCount + 1);
	};
}
