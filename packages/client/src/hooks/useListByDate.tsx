import { useEffect, useState } from 'react';

interface Params {
  list: any[];
}

function useListByDate({ list }: Params) {
  const [listByDate, setListByDate] = useState<any>({});

  useEffect(() => {
    if (!list) return;

    const result = list.reduce((prev: { [key: string]: any }, curr) => {
      const { date } = curr;

      if (!prev[date]) return { ...prev, [date]: [{ ...curr }] };
      else return { ...prev, [date]: [...prev[date], { ...curr }] };
    }, {});

    setListByDate(result);
  }, [list]);

  return { listByDate };
}

export default useListByDate;
