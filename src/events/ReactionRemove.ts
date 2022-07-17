import { MessageReaction } from "@guildedjs/gil";
import type { WSChannelMessageReactionDeletedPayload } from "@guildedjs/guilded-api-typings";
import type { StarboardClient } from "../Client";
import { starboardChannel, starMessage, starThreshold } from "../keys";

export default function reactionRemove(client: StarboardClient) {
	return async (reaction: MessageReaction | WSChannelMessageReactionDeletedPayload["d"]) => {
		const { redis } = client as StarboardClient;
		const extractedReaction = reaction instanceof MessageReaction ? reaction : reaction.reaction;
		if (extractedReaction.emote.id !== 90001779) return;

		const serverStarboardChannel = await redis.get(starboardChannel(reaction.serverId));
		if (!serverStarboardChannel) return;

		const reactionNum = await redis.get(starMessage(extractedReaction.messageId));
		if (!reactionNum) return;
		const reactionCount = Number(reactionNum);
		return redis.set(starMessage(extractedReaction.messageId), reactionCount - 1);
	};
}
