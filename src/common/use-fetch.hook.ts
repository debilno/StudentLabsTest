import { useEffect, useState } from "react";

export const useFetch = <T> (input: RequestInfo | URL, init: RequestInit | undefined = undefined, defaultValue: T, deps?: React.DependencyList) => {
    const [response, setResponse] = useState<T>(defaultValue);
  
    useEffect(() => {
         fetch(input, init).then(async response => {
              const json = await response.json();
              setResponse(json);
         });
    }, deps ?? []);
  
    return response;
  }




  //before//

  // const [quoteResponse, setQuoteResponse] = useState<QuoteResponse | null>(
  //   null
  // );

  // const fetchQuotes = async (tag: string, page: number = 1) => {
  //   const response = await fetch(
  //     `https://api.quotable.io/quotes?page=${page}&tags=${tag}`
  //   );
  //   const json = await response.json();
  //   setQuoteResponse(json);
  // };

  // useEffect(() => {
  //   fetchQuotes(tag);
  // }, []);
