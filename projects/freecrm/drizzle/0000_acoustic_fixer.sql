CREATE TABLE `contacts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text,
	`phone` text,
	`company` text,
	`job_title` text,
	`notes` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `interactions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`contact_id` text NOT NULL,
	`type` text NOT NULL,
	`subject` text,
	`notes` text,
	`date` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`contact_id`) REFERENCES `contacts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
