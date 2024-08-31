"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";
import { liveblocks } from "../liveblocks";
import { parse } from "path";

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

export const getDocumentUsers = async ({
  roomId,
  currentUser,
  text,
}: {
  roomId: string;
  currentUser: string;
  text: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const users = Object.keys(room.usersAccesses).filter(
      (email) => email !== currentUser
    );

    if (text.length) {
      const lowerText = text.toLowerCase();

      const filteredUsers = users.filter((email) =>
        email.toLowerCase().includes(lowerText)
      );

      return parseStringify(filteredUsers);
    }
    return parseStringify(users);
  } catch (error) {
    console.log("Error fetching document users: ", error);
  }
};
