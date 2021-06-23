import { makeSchema } from "nexus";
import { ApolloServer } from "apollo-server-micro";
import { getSession } from "next-auth/client";
import path from "path";
import { ApolloError } from "apollo-server-errors";
import * as allTypes from "../../schema";

const schema = makeSchema({
  types: allTypes,
  outputs: {
    typegen: path.join(process.cwd(), "generated/nexus-typegen.ts"),
    schema: path.join(process.cwd(), "generated/schema.graphql"),
  },
});

const server = new ApolloServer({
  async context({ req }) {
    const session = await getSession({ req });

    if (!session)
      throw new ApolloError("Request not authenticated", "UNAUTHENTICATED");

    return { session };
  },
  playground: {
    settings: {
      "request.credentials": "include",
    },
  },
  schema,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({
  path: "/api/graphql",
});
