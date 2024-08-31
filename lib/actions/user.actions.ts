"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    const { data } = await clerkClient.users.getUserList({
      emailAddress: userIds,
    });
    const users = data.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      avatar: user.imageUrl,
    }));

    const sortedUsers = userIds.map((email) =>
      users.find((user) => user.email === email)
    );

    return parseStringify(sortedUsers);
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
};

export const getClerkUsersFromId = async ({
  userIds,
}: {
  userIds: string[];
}) => {
  try {
    const { data } = await clerkClient.users.getUserList({ userId: userIds });
    const users = data.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      avatar: user.imageUrl,
    }));

    const userMap = new Map(users.map((user) => [user.id, user]));

    const sortedUsers = userIds
      .map((id) => userMap.get(id))
      .filter((user) => user !== undefined);

    console.log("data: ", sortedUsers);

    return parseStringify(sortedUsers);
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
};
