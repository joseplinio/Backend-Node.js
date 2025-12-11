CREATE TABLE "users" (
	"userID" varchar PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar NOT NULL,
	"hashpasswd" varchar NOT NULL,
	"admin" boolean DEFAULT false NOT NULL,
	CONSTRAINT "users_userID_unique" UNIQUE("userID"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "sessionUser" (
	"userID" varchar NOT NULL,
	"accessID" varchar NOT NULL,
	"refreshID" varchar NOT NULL,
	"createAt" varchar NOT NULL,
	"revoked" boolean NOT NULL,
	CONSTRAINT "sessionUser_accessID_unique" UNIQUE("accessID"),
	CONSTRAINT "sessionUser_refreshID_unique" UNIQUE("refreshID")
);
