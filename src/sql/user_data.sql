-- Table: public.user_data

-- DROP TABLE IF EXISTS public.user_data;

CREATE TABLE IF NOT EXISTS public.user_data
(
    u_name text COLLATE pg_catalog."default" NOT NULL,
    u_password text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_data_pkey PRIMARY KEY (u_name, u_password),
    CONSTRAINT unique_username UNIQUE (u_name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_data
    OWNER to postgres;