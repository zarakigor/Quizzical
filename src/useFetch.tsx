import { useEffect, useState } from "react";
import { IProps } from "./types";

function useFetch(props: IProps) {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=5&difficulty=${props.difficulty}&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
        //console.log(data);
      });
  }, [props.difficulty]);
  return data;
}

export default useFetch;
