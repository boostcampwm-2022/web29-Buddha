import { useEffect, useState } from 'react';

import { AnyObject, Order } from '@/types';

interface Params {
  list: Order[];
}

function useListByDate({ list }: Params) {
  const [listByDate, setListByDate] = useState<AnyObject>({});

  useEffect(() => {
    if (!list) return;

    const result = list.reduce((prev: AnyObject, curr) => {
      const date = curr.date.slice(0, 10);
      // const time = curr.date.slice(11, 19);

      if (!prev[date]) return { ...prev, [date]: [{ ...curr }] };
      else return { ...prev, [date]: [...prev[date], { ...curr }] };
    }, {});

    setListByDate(result);
  }, [list]);

  return { listByDate };
}

export default useListByDate;
