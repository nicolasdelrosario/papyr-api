import { Authenticate } from "@/modules/auth/application/use-cases/Authenticate";
import { ChangePassword } from "@/modules/auth/application/use-cases/ChangePassword";
import { DeleteAuthor } from "@/modules/authors/application/use-cases/DeleteAuthor";
import { FindAuthorById } from "@/modules/authors/application/use-cases/FindAuthorById";
import { ListAuthors } from "@/modules/authors/application/use-cases/ListAuthors";
import { RestoreAuthor } from "@/modules/authors/application/use-cases/RestoreAuthor";
import { SaveAuthor } from "@/modules/authors/application/use-cases/SaveAuthor";
import { SoftDeleteAuthor } from "@/modules/authors/application/use-cases/SoftDeleteAuthor";
import type { AuthorRepository } from "@/modules/authors/domain/repository/AuthorRepository";
import { DeleteBookGenre } from "@/modules/book-genres/application/use-cases/DeleteBookGenre";
import { FindBookGenreById } from "@/modules/book-genres/application/use-cases/FindBookGenreById";
import { ListBookGenres } from "@/modules/book-genres/application/use-cases/ListBookGenres";
import { ListBooksByGenreId } from "@/modules/book-genres/application/use-cases/ListBooksByGenreId";
import { ListGenresByBookId } from "@/modules/book-genres/application/use-cases/ListGenresByBookId";
import { RestoreBookGenre } from "@/modules/book-genres/application/use-cases/RestoreBookGenre";
import { SaveBookGenre } from "@/modules/book-genres/application/use-cases/SaveBookGenre";
import { SoftDeleteBookGenre } from "@/modules/book-genres/application/use-cases/SoftDeleteBookGenre";
import type { BookGenreRepository } from "@/modules/book-genres/domain/repository/BookGenreRepository";
import { DeleteBook } from "@/modules/books/application/use-cases/DeleteBook";
import { FindBookById } from "@/modules/books/application/use-cases/FindBookById";
import { ListBooks } from "@/modules/books/application/use-cases/ListBooks";
import { RestoreBook } from "@/modules/books/application/use-cases/RestoreBook";
import { SaveBook } from "@/modules/books/application/use-cases/SaveBook";
import { SoftDeleteBook } from "@/modules/books/application/use-cases/SoftDeleteBook";
import type { BookRepository } from "@/modules/books/domain/repository/BookRepository";
import { D1BookRepository } from "@/modules/books/infrastructure/repository/D1BookRepository";
import { DeleteGenre } from "@/modules/genres/application/use-cases/DeleteGenre";
import { FindGenreById } from "@/modules/genres/application/use-cases/FindGenreById";
import { ListGenres } from "@/modules/genres/application/use-cases/ListGenres";
import { RestoreGenre } from "@/modules/genres/application/use-cases/RestoreGenre";
import { SaveGenre } from "@/modules/genres/application/use-cases/SaveGenre";
import { SoftDeleteGenre } from "@/modules/genres/application/use-cases/SoftDeleteGenre";
import type { GenreRepository } from "@/modules/genres/domain/repository/GenreRepository";
import { D1GenreRepository } from "@/modules/genres/infrastructure/repository/D1GenreRepository";
import { DeletePublisher } from "@/modules/publishers/application/use-cases/DeletePublisher";
import { FindPublisherById } from "@/modules/publishers/application/use-cases/FindPublisherById";
import { ListPublishers } from "@/modules/publishers/application/use-cases/ListPublishers";
import { RestorePublisher } from "@/modules/publishers/application/use-cases/RestorePublisher";
import { SavePublisher } from "@/modules/publishers/application/use-cases/SavePublisher";
import { SoftDeletePublisher } from "@/modules/publishers/application/use-cases/SoftDeletePublisher";
import type { PublisherRepository } from "@/modules/publishers/domain/repository/PublisherRepository";
import { D1PublisherRepository } from "@/modules/publishers/infrastructure/repository/D1PublisherRepository";
import { DeleteUser } from "@/modules/users/application/use-cases/DeleteUser";
import { FindUserByEmail } from "@/modules/users/application/use-cases/FindUserByEmail";
import { FindUserById } from "@/modules/users/application/use-cases/FindUserById";
import { FindUserByUsername } from "@/modules/users/application/use-cases/FindUserByUsername";
import { ListUsers } from "@/modules/users/application/use-cases/ListUsers";
import { RestoreUser } from "@/modules/users/application/use-cases/RestoreUser";
import { SaveUser } from "@/modules/users/application/use-cases/SaveUser";
import { SoftDeleteUser } from "@/modules/users/application/use-cases/SoftDeleteUser";
import { BcryptEncryptionService } from "@auth/infrastructure/services/BcryptEncryptionService";
import { D1AuthorRepository } from "@authors/infrastructure/repository/D1AuthorRepository";
import { D1BookGenreRepository } from "@bookGenres/infrastructure/repository/D1BookGenreRepository";
import type { UserRepository } from "@users/domain/repository/UserRepository";
import { D1UserRepository } from "@users/infrastructure/repository/D1UserRepository";

export const services = (db: D1Database, jwtSecret: string) => {
  // repositories
  const userRepository: UserRepository = new D1UserRepository(db);
  const authorRepository: AuthorRepository = new D1AuthorRepository(db);
  const publisherRepository: PublisherRepository = new D1PublisherRepository(db);
  const genreRepository: GenreRepository = new D1GenreRepository(db);
  const bookRepository: BookRepository = new D1BookRepository(db);
  const bookGenreRepository: BookGenreRepository = new D1BookGenreRepository(db);

  // services
  const encryptionService = new BcryptEncryptionService();

  return {
    auth: {
      authenticate: new Authenticate(userRepository, encryptionService, jwtSecret),
      changePassword: new ChangePassword(userRepository, encryptionService),
    },
    users: {
      list: new ListUsers(userRepository),
      findById: new FindUserById(userRepository),
      findByEmail: new FindUserByEmail(userRepository),
      findByUsername: new FindUserByUsername(userRepository),
      save: new SaveUser(userRepository, encryptionService),
      delete: new DeleteUser(userRepository),
      restore: new RestoreUser(userRepository),
      softDelete: new SoftDeleteUser(userRepository),
    },
    authors: {
      list: new ListAuthors(authorRepository),
      findById: new FindAuthorById(authorRepository),
      save: new SaveAuthor(authorRepository),
      delete: new DeleteAuthor(authorRepository),
      restore: new RestoreAuthor(authorRepository),
      softDelete: new SoftDeleteAuthor(authorRepository),
    },
    publishers: {
      list: new ListPublishers(publisherRepository),
      findById: new FindPublisherById(publisherRepository),
      save: new SavePublisher(publisherRepository),
      delete: new DeletePublisher(publisherRepository),
      restore: new RestorePublisher(publisherRepository),
      softDelete: new SoftDeletePublisher(publisherRepository),
    },
    genres: {
      list: new ListGenres(genreRepository),
      findById: new FindGenreById(genreRepository),
      save: new SaveGenre(genreRepository),
      delete: new DeleteGenre(genreRepository),
      restore: new RestoreGenre(genreRepository),
      softDelete: new SoftDeleteGenre(genreRepository),
    },
    books: {
      list: new ListBooks(bookRepository),
      findById: new FindBookById(bookRepository, authorRepository, publisherRepository),
      save: new SaveBook(bookRepository, authorRepository, publisherRepository),
      delete: new DeleteBook(bookRepository),
      restore: new RestoreBook(bookRepository),
      softDelete: new SoftDeleteBook(bookRepository),
    },
    bookGenres: {
      list: new ListBookGenres(bookGenreRepository),
      listBooksByGenreId: new ListBooksByGenreId(bookGenreRepository),
      listGenresByBookId: new ListGenresByBookId(bookGenreRepository),
      findById: new FindBookGenreById(bookGenreRepository),
      save: new SaveBookGenre(bookGenreRepository, bookRepository, genreRepository),
      delete: new DeleteBookGenre(bookGenreRepository),
      restore: new RestoreBookGenre(bookGenreRepository),
      softDelete: new SoftDeleteBookGenre(bookGenreRepository),
    },
  };
};

export type Services = ReturnType<typeof services>;
