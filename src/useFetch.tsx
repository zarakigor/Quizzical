import { useEffect, useState } from "react";
import { IProps } from "./types";

function useFetch(props: IProps) {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=5&difficulty=${props.difficulty}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        //console.log(data);
      });
  }, [props.difficulty]);
  return data;
}

export default useFetch;
