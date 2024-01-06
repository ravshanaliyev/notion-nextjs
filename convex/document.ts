import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createTask = mutation({
    args: {
        title: v.string(),
        parentDocument: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated");
        }
        const userId = identity.subject;
        const document = await ctx.db.insert("documents", {
            title: args.title,
            userId,
            parentDocument: args.parentDocument,
            isArchived: false,
            isPublished: false,
        });
        return document;
    },
});