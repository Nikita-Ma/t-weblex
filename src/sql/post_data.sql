-- Table: public.post_data

-- DROP TABLE IF EXISTS public.post_data;

CREATE TABLE IF NOT EXISTS public.post_data
(
    p_date text COLLATE pg_catalog."default" NOT NULL,
    p_data text COLLATE pg_catalog."default" NOT NULL,
    p_author text COLLATE pg_catalog."default" NOT NULL,
    user_data_id text COLLATE pg_catalog."default" NOT NULL,
    p_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    CONSTRAINT post_data_pkey PRIMARY KEY (p_id),
    CONSTRAINT user_data_fkey FOREIGN KEY (user_data_id)
        REFERENCES public.user_data (u_name) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.post_data
    OWNER to postgres;