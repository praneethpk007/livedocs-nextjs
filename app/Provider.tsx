"use client";

import Loader from "@/components/Loader";
import { getClerkUsers, getClerkUsersFromId } from "@/lib/actions/user.actions";
import { clerkClient } from "@clerk/nextjs/server";
import {
  LiveblocksProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth"}
      resolveUsers={async ({ userIds }) => {
        console.log("userIds: ", userIds);
        const users = await getClerkUsersFromId({ userIds });
        console.log("resolveUsers: ", users);
        return users;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
