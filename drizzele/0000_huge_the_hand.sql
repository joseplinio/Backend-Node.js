-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "sessionUser" (
	"accessID" varchar NOT NULL,
	"refreshID" varchar NOT NULL,
	"userID" varchar NOT NULL,
	"createAt" varchar NOT NULL,
	"revoked" boolean NOT NULL,
	CONSTRAINT "sessionUser_accessID_unique" UNIQUE("accessID"),
	CONSTRAINT "sessionUser_refreshID_unique" UNIQUE("refreshID"),
	CONSTRAINT "sessionUser_userID_unique" UNIQUE("userID")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar NOT NULL,
	"hashpasswd" varchar NOT NULL,
	"admin" boolean DEFAULT false NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

*/