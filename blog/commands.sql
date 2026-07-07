CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  title text NOT NULL,
  url text NOT NULL<
  author text,
  likes int
)

insert into blogs (title, url, author, likes) values ('Megamanathon 2', 'https://wil.to/posts/megamanathon-2/', 'Mat Marquis', 0);
insert into blogs (title, url, author, likes) values ("I'm playing the Zelda games in timeline order", 'https://bell.bz/im-playing-the-zelda-games-in-timeline-order/', 'Andy Bell', 0);
