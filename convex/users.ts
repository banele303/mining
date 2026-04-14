import { query } from "./_generated/server";
import { auth } from "./auth";

/**
 * Returns the currently authenticated user's information.
 */
export const viewer = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});
