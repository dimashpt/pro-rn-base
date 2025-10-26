import { useEffect, useState } from 'react';

import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

interface NetworkStatus {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  type: NetInfoState['type'] | null;
}

export function useNetworkStatus(): NetworkStatus {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isConnected: true,
    isInternetReachable: true,
    type: null,
  });

  useEffect(() => {
    function handleNetworkStateChange(state: NetInfoState): void {
      setNetworkStatus({
        isConnected: state.isConnected ?? true,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
      });
    }

    // Get initial network state
    NetInfo.fetch().then(handleNetworkStateChange);

    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener(handleNetworkStateChange);

    return () => {
      unsubscribe();
    };
  }, []);

  return networkStatus;
}
