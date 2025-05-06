export type FindBookByIdResponseDto = {
  book: {
    id: string;
    authorId: string;
    publisherId: string;
    title: string;
    description: string | null;
    isbn: string | null;
    publicationDate: Date;
    coverUrl: string | null;
    pages: number;
    language: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    author: {
      id: string;
      name: string;
    };
    publisher: {
      id: string;
      name: string;
    };
  };
};
