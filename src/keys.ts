export const starboardChannel = (serverId: string) => `starchannel:default:${serverId}`;
export const starThreshold = (serverId: string) => `limit:default:${serverId}`;
export const starMessage = (messageId: string) => `message:${messageId}`;
export const setMessageAsSent = (messageId: string) => `sent:message:${messageId}`;
