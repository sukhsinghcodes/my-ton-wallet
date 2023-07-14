import { getHttpEndpoint } from "@orbs-network/ton-access";
import { useAsyncInitialise } from "./useAsyncInitialise";
import { TonClient } from "ton";

export function useTonClient() {
  return useAsyncInitialise(
    async () => 
      new TonClient({
        endpoint: await getHttpEndpoint({ network: 'testnet'}),
      })
  )
}