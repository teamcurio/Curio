CREATE TABLE "Users" (
    "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "email" varchar(255) NOT NULL UNIQUE,
    "password" varchar(255) NOT NULL,
    "registration_date" DATE NOT NULL,
    CONSTRAINT "Users_pk" PRIMARY KEY ("id") 
    ) WITH (
    OIDS=FALSE
);

CREATE TABLE "Favorites" (
  "user_id" uuid NOT NULL,
  "image_id" integer NOT NULL,
  "primary_image" varchar(255) NOT NULL,
  "image_title" varchar(255),
  "artist_display_name" varchar(255),
  "artist_nationality" varchar(255),
  "artist_begin_date" varchar(255),
  "artist_end_date" varchar(255),
  "object_name" varchar(255),
  "object_begin_date" integer,
  "object_end_date" integer
) WITH (
  OIDS=FALSE
);

ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("id");

