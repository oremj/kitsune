CREATE TABLE `waffle_flag_groups` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `flag_id` integer NOT NULL,
    `group_id` integer NOT NULL,
    UNIQUE (`flag_id`, `group_id`)
) ENGINE=InnoDB CHARACTER SET utf8 COLLATE utf8_unicode_ci;

ALTER TABLE `waffle_flag_groups` ADD CONSTRAINT `group_id_refs_id_604de174` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

CREATE TABLE `waffle_flag_users` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `flag_id` integer NOT NULL,
    `user_id` integer NOT NULL,
    UNIQUE (`flag_id`, `user_id`)
) ENGINE=InnoDB CHARACTER SET utf8 COLLATE utf8_unicode_ci;

ALTER TABLE `waffle_flag_users` ADD CONSTRAINT `user_id_refs_id_fbd267f2` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

CREATE TABLE `waffle_flag` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `name` varchar(100) NOT NULL UNIQUE,
    `everyone` bool,
    `percent` numeric(3, 1),
    `superusers` bool NOT NULL,
    `staff` bool NOT NULL,
    `authenticated` bool NOT NULL
) ENGINE=InnoDB CHARACTER SET utf8 COLLATE utf8_unicode_ci;

ALTER TABLE `waffle_flag_groups` ADD CONSTRAINT `flag_id_refs_id_1ae608ed` FOREIGN KEY (`flag_id`) REFERENCES `waffle_flag` (`id`);
ALTER TABLE `waffle_flag_users` ADD CONSTRAINT `flag_id_refs_id_73d6a0da` FOREIGN KEY (`flag_id`) REFERENCES `waffle_flag` (`id`);
