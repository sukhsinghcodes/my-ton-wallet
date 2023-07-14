import { useEffect, useState } from "react";


export function useAsyncInitialise<T>(func: () => Promise<T> | T, deps: unknown[] = []): T | undefined {
  const [state, setState] = useState<T | undefined>();

  useEffect(() => {
    void (async () => {
      setState(await func());
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state
}