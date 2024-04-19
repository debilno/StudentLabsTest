import { Tag } from "../common/types";
import ListCategory from "../components/list-category/ListCategory";
import { useFetch } from "../common/use-fetch.hook";

const Categories = () => {
  const tags = useFetch<Tag[]>("https://api.quotable.io/tags", undefined, []);
  return (
    <main className="page">
      <h2 className="title-1">All categories</h2>

      <ListCategory tags={tags} />
    </main>
  );
};

export default Categories;
