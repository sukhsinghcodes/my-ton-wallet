import { useEffect, useState } from 'react';
import Counter from '../contracts/counter';
import { useTonClient } from './useTonClient';
import { useAsyncInitialise } from './useAsyncInitialise';
import { Address, OpenedContract } from 'ton-core';
import { useTonConnect } from './useTonConnect';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useCounterContract() {
  const client = useTonClient();
  const [val, setVal] = useState<null | string>();
  const { sender } = useTonConnect()

  const counterContract = useAsyncInitialise((): OpenedContract<Counter> | undefined => {
    if (!client) return;
    const contract = new Counter(
      Address.parse('EQAs_FnCP8sD-KRM88VmK6j80lLGQUSKYoU0M_-ecZ6Pvt3C') // counter contract address
    );
    return client.open(contract);
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!counterContract) return;
      setVal(null);
      const val = await counterContract.getCounter();
      setVal(val.toString());
      await sleep(5000)
      void getValue()
    }
    void getValue();
  }, [counterContract]);

  return {
    value: val,
    address: counterContract?.address.toString(),
    sendIncrement: () => {
      return counterContract?.sendIncrement(sender)
    }
  };
}
