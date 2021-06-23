import { extendType, nonNull, objectType, queryType, stringArg } from "nexus";
import prisma from "../prisma/client";
import { ApolloError } from "apollo-server-errors";

async function getUserFromAccessToken(accessToken: string) {
  const dbSession = await prisma.session.findUnique({
    where: {
      accessToken,
    },
  });
  const user = await prisma.user.findUnique({
    where: {
      id: dbSession?.userId,
    },
  });

  if (!user)
    throw new ApolloError("Request not authenticated", "UNAUTHENTICATED");

  return user;
}

export const Exercise = objectType({
  name: "Exercise",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
  },
});

export const QueryExercise = queryType({
  definition(t) {
    t.field("exercise", {
      type: Exercise,
      args: { id: nonNull(stringArg()) },
      resolve: async (_, args) =>
        prisma.exercise.findUnique({
          where: {
            id: args.id,
          },
        }),
    });

    t.list.field("allExercises", {
      type: Exercise,
      resolve: async (root, args, ctx) => {
        const user = await getUserFromAccessToken(ctx.session.accessToken);

        return prisma.exercise.findMany({
          where: {
            userId: user.id,
          },
        });
      },
    });
  },
});

export const CreateExercise = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("createExercise", {
      type: Exercise,
      args: { name: nonNull(stringArg()) },
      resolve: async (root, args, ctx) => {
        const user = await getUserFromAccessToken(ctx.session.accessToken);

        return prisma.exercise.create({
          data: { ...args, userId: user.id },
        });
      },
    });
  },
});
