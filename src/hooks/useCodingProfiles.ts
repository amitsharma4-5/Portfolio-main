import { useState, useEffect, useCallback } from "react";
import { fetchCodingProfiles, CodingProfileResponse } from "../services/codingProfileService";

export const useCodingProfiles = () => {
  const [data, setData] = useState<CodingProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<string>("");

  const loadProfiles = useCallback(async (forceRefresh = false) => {
    setIsLoading(true);
    setErrorMessage(null);

    const result = await fetchCodingProfiles(forceRefresh);

    if (result.success) {
      setData(result);
      setIsLive(true);
      
      const now = new Date();
      setLastSyncTime(
        now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
      );
    } else {
      setErrorMessage(result.error || "Failed to fetch live profile data");
      setIsLive(false);
    }
    
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  return {
    data,
    isLoading,
    isLive,
    errorMessage,
    lastSyncTime,
    refresh: () => loadProfiles(true),
  };
};
