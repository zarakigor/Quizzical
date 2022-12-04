import { useEffect, useState } from "react";
import { IProps } from "./types";

function useFetch(props: IProps) {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=5&difficulty=${props.diff}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return data;
}

export default useFetch;
