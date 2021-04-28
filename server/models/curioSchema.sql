CREATE TABLE "Users" (
    "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "registration_date" DATE NOT NULL,
    "favorites" INT ARRAY NOT NULL,
    CONSTRAINT "Users_pk" PRIMARY KEY ("id") 
    ) WITH (
    OIDS=FALSE
);

