"use client";

import { useUserStore } from "@/hooks/useUserStore";
import { useEffect } from "react";
import SwipeCards from "@/components/swipeCards/SwipeCards";

export default function MeetDreamersLayout() {
  const { profile, matchProfiles, getMatchProfiles } = useUserStore(
    (state) => state
  );

  useEffect(() => {
    if (!profile?.userId) return;
    getMatchProfiles(profile.userId);
  }, [profile?.userId, getMatchProfiles]);

  return (
    <div className="container mx-auto">
      {matchProfiles && <SwipeCards profiles={matchProfiles} />}
    </div>
  );
}
