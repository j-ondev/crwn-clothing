--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id bigint NOT NULL,
    title text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    image_url text
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.categories ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id bigint NOT NULL,
    category bigint NOT NULL,
    name text NOT NULL,
    price numeric(5,2) NOT NULL,
    image_url text
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.products ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    googleid numeric(30,0),
    display_name text NOT NULL,
    email text NOT NULL,
    password text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone,
    permissions json DEFAULT '{ "users": "self", "products": "R" }'::json
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, title, active, image_url) FROM stdin;
1	hats	t	https://i.ibb.co/cvpntL1/hats.png
2	jackets	t	https://i.ibb.co/px2tCc3/jackets.png
3	mens	t	https://i.ibb.co/R70vBrQ/men.png
4	sneakers	t	https://i.ibb.co/0jqHpnp/sneakers.png
5	womens	t	https://i.ibb.co/GCCdy8t/womens.png
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, category, name, price, image_url) FROM stdin;
1	1	Brown Brim	25.00	https://i.ibb.co/ZYW3VTp/brown-brim.png
2	1	Blue Beanie	18.00	https://i.ibb.co/ypkgK0X/blue-beanie.png
3	1	Brown Cowboy	35.00	https://i.ibb.co/QdJwgmp/brown-cowboy.png
4	1	Grey Brim	25.00	https://i.ibb.co/RjBLWxB/grey-brim.png
5	1	Green Beanie	18.00	https://i.ibb.co/YTjW3vF/green-beanie.png
6	1	Palm Tree Cap	14.00	https://i.ibb.co/rKBDvJX/palm-tree-cap.png
7	1	Red Beanie	18.00	https://i.ibb.co/bLB646Z/red-beanie.png
8	1	Wolf Cap	14.00	https://i.ibb.co/1f2nWMM/wolf-cap.png
9	1	Blue Snapback	16.00	https://i.ibb.co/X2VJP2W/blue-snapback.png
10	4	Adidas NMD	220.00	https://i.ibb.co/0s3pdnc/adidas-nmd.png
11	4	Adidas Yeezy	280.00	https://i.ibb.co/dJbG1cT/yeezy.png
12	4	Black Converse	110.00	https://i.ibb.co/bPmVXyP/black-converse.png
13	4	Nike White AirForce	160.00	https://i.ibb.co/1RcFPk0/white-nike-high-tops.png
14	4	Nike Red High Tops	160.00	https://i.ibb.co/QcvzydB/nikes-red.png
15	4	Nike Brown High Tops	160.00	https://i.ibb.co/fMTV342/nike-brown.png
16	4	Air Jordan Limited	190.00	https://i.ibb.co/w4k6Ws9/nike-funky.png
17	4	Timberlands	200.00	https://i.ibb.co/Mhh6wBg/timberlands.png
18	2	Black Jean Shearling	125.00	https://i.ibb.co/XzcwL5s/black-shearling.png
19	2	Blue Jean Jacket	90.00	https://i.ibb.co/mJS6vz0/blue-jean-jacket.png
20	2	Grey Jean Jacket	90.00	https://i.ibb.co/N71k1ML/grey-jean-jacket.png
21	2	Brown Shearling	165.00	https://i.ibb.co/s96FpdP/brown-shearling.png
22	2	Tan Trench	185.00	https://i.ibb.co/M6hHc3F/brown-trench.png
23	5	Blue Tanktop	25.00	https://i.ibb.co/7CQVJNm/blue-tank.png
24	5	Floral Blouse	20.00	https://i.ibb.co/4W2DGKm/floral-blouse.png
25	5	Floral Dress	80.00	https://i.ibb.co/KV18Ysr/floral-skirt.png
26	5	Red Dots Dress	80.00	https://i.ibb.co/N3BN1bh/red-polka-dot-dress.png
27	5	Striped Sweater	45.00	https://i.ibb.co/KmSkMbH/striped-sweater.png
28	5	Yellow Track Suit	135.00	https://i.ibb.co/v1cvwNf/yellow-track-suit.png
29	5	White Blouse	20.00	https://i.ibb.co/qBcrsJg/white-vest.png
30	3	Camo Down Vest	325.00	https://i.ibb.co/xJS0T3Y/camo-vest.png
31	3	Floral T-shirt	20.00	https://i.ibb.co/qMQ75QZ/floral-shirt.png
32	3	Black & White Longsleeve	25.00	https://i.ibb.co/55z32tw/long-sleeve.png
33	3	Pink T-shirt	25.00	https://i.ibb.co/RvwnBL8/pink-shirt.png
34	3	Jean Long Sleeve	40.00	https://i.ibb.co/VpW4x5t/roll-up-jean-shirt.png
35	3	Burgundy T-shirt	25.00	https://i.ibb.co/mh3VM1f/polka-dot-shirt.png
\.

--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 6, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 35, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: categories categories_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_title_key UNIQUE (title);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_googleid_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_googleid_key UNIQUE (googleid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: products fk_category; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_category FOREIGN KEY (category) REFERENCES public.categories(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: crwn-admin
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
GRANT ALL ON SCHEMA public TO "crwn-admin";


--
-- Name: TABLE categories; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.categories TO "crwn-admin";


--
-- Name: SEQUENCE categories_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.categories_id_seq TO "crwn-admin";


--
-- Name: TABLE products; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.products TO "crwn-admin";


--
-- Name: SEQUENCE products_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.products_id_seq TO "crwn-admin";


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.users TO "crwn-admin";


--
-- Name: SEQUENCE users_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.users_id_seq TO "crwn-admin";


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO "crwn-admin";


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TYPES  TO "crwn-admin";


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO "crwn-admin";


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO "crwn-admin";


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES  TO "crwn-admin";


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES  TO "crwn-admin";


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS  TO "crwn-admin";


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES  TO "crwn-admin";


--
-- PostgreSQL database dump complete
--

