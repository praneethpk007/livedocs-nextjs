"use client";

import Loader from "@/components/Loader";
import {
  getClerkUsers,
  getClerkUsersFromId,
  getDocumentUsers,
} from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import {
  LiveblocksProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  const { user: clerkUser } = useUser();

  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth"}
      resolveUsers={async ({ userIds }) => {
        console.log("userIds: ", userIds);
        const users = await getClerkUsersFromId({ userIds });
        console.log("resolveUsers: ", users);
        return users;
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const roomUsers = await getDocumentUsers({
          roomId,
          currentUser: clerkUser?.emailAddresses[0].emailAddress!,
          text,
        });

        return roomUsers;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
