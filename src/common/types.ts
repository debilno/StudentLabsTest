export interface Quote {
  _id: string;
  author: string;
  content: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export interface Tag {
  _id: string;
  name: string;
  slug: string;
  quoteCount: number;
}
