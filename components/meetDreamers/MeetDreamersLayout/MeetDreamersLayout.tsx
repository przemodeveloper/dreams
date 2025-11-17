"use client";

import { useUserStore } from "@/hooks/useUserStore";
import { useEffect } from "react";
import SwipeCards from "@/components/swipeCards/SwipeCards";
import { LOADING_STATE } from "@/constants/user-profile";
import AppLoader from "@/components/appLoader/AppLoader";

export default function MeetDreamersLayout() {
  const { profile, matchProfiles, getMatchProfiles, matchProfilesLoading } =
    useUserStore((state) => state);

  useEffect(() => {
    if (!profile?.userId) return;
    getMatchProfiles(profile.userId);
  }, [profile?.userId, getMatchProfiles]);

  return (
    <div className="container mx-auto">
      {matchProfilesLoading === LOADING_STATE.PENDING && (
        <div className="flex h-screen items-center justify-center">
          <AppLoader />
        </div>
      )}
      {matchProfiles && matchProfiles.length > 0 && (
        <SwipeCards profiles={matchProfiles} />
      )}
      {matchProfilesLoading === LOADING_STATE.RESOLVED &&
        matchProfiles &&
        matchProfiles.length === 0 && (
          <div className="flex h-screen items-center justify-center">
            <h1 className="text-2xl text-center font-secondary text-emerald-600">
              No dreamers? Don't worry, they are signing up every day!
            </h1>
          </div>
        )}
    </div>
  );
}
