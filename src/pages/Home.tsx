import "./style.css";
import Card from "../components/card/Card";
import { Quote } from "../common/types";
import { useFetch } from "../common/use-fetch.hook";

const Home = () => {
  const quote = useFetch<Quote[]>(
    "https://api.quotable.io/quotes/random?limit=18",
    undefined,
    []
  );

  const removeDuplicateTags = (quotes: Quote[]): Quote[] => {
    const uniqueTagsSet = new Set<string>();
    const uniqueQuotes: Quote[] = [];

    quotes.forEach((quote) => {
      const uniqueTag = quote.tags.find((tag) => !uniqueTagsSet.has(tag));
      if (uniqueTag) {
        uniqueQuotes.push({ ...quote, tags: [uniqueTag] });
        uniqueTagsSet.add(uniqueTag);
      }
    });

    return uniqueQuotes;
  };

  return (
    <>
      <main className="header">
        <div className="header__quote_of_the_day">
          <h1 className="header__title">
            <strong>Random Best Quotes</strong>
            <br />
          </h1>
        </div>
      </main>
      <section className="quote-section">
        <div className="card-container">
          {removeDuplicateTags(quote).map((quote, index) => (
            <div key={index}>
              <Card {...quote} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
