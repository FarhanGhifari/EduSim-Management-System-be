--
-- PostgreSQL database dump
--

\restrict vZ7a6bdRnFVcqZgadwRDURw97MJFa3c86v28hP3LJgxj4PYgFKvhV5LxV4fCARc

-- Dumped from database version 17.10 (Ubuntu 17.10-1.pgdg24.04+1)
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: assets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assets (
    id integer NOT NULL,
    title character varying(255),
    type character varying(255),
    order_index integer
);


ALTER TABLE public.assets OWNER TO postgres;

--
-- Name: assets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.assets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.assets_id_seq OWNER TO postgres;

--
-- Name: assets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.assets_id_seq OWNED BY public.assets.id;


--
-- Name: attempt_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attempt_details (
    id integer NOT NULL,
    attempt_id integer,
    question_id integer,
    selected_option_id integer
);


ALTER TABLE public.attempt_details OWNER TO postgres;

--
-- Name: attempt_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.attempt_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.attempt_details_id_seq OWNER TO postgres;

--
-- Name: attempt_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.attempt_details_id_seq OWNED BY public.attempt_details.id;


--
-- Name: classes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.classes (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.classes OWNER TO postgres;

--
-- Name: classes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.classes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.classes_id_seq OWNER TO postgres;

--
-- Name: classes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.classes_id_seq OWNED BY public.classes.id;


--
-- Name: learning_materials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.learning_materials (
    id integer NOT NULL,
    module_id integer,
    title character varying(255),
    description text
);


ALTER TABLE public.learning_materials OWNER TO postgres;

--
-- Name: learning_materials_assets_links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.learning_materials_assets_links (
    learning_materials_id integer NOT NULL,
    assets_id integer NOT NULL
);


ALTER TABLE public.learning_materials_assets_links OWNER TO postgres;

--
-- Name: learning_materials_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.learning_materials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.learning_materials_id_seq OWNER TO postgres;

--
-- Name: learning_materials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.learning_materials_id_seq OWNED BY public.learning_materials.id;


--
-- Name: logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.logs (
    id integer NOT NULL,
    user_id integer,
    module_id integer,
    mode character varying(255),
    start_time timestamp with time zone,
    end_time timestamp with time zone
);


ALTER TABLE public.logs OWNER TO postgres;

--
-- Name: logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.logs_id_seq OWNER TO postgres;

--
-- Name: logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.logs_id_seq OWNED BY public.logs.id;


--
-- Name: modules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modules (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    parent_id integer,
    type character varying(255) NOT NULL,
    meta json,
    count json DEFAULT '0'::json,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.modules OWNER TO postgres;

--
-- Name: modules_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.modules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.modules_id_seq OWNER TO postgres;

--
-- Name: modules_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.modules_id_seq OWNED BY public.modules.id;


--
-- Name: object_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.object_list (
    id integer NOT NULL,
    object_id bigint NOT NULL,
    game_object_name character varying(255) NOT NULL,
    action_available json NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.object_list OWNER TO postgres;

--
-- Name: object_list_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.object_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.object_list_id_seq OWNER TO postgres;

--
-- Name: object_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.object_list_id_seq OWNED BY public.object_list.id;


--
-- Name: permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permissions (
    id integer NOT NULL,
    action character varying(255) NOT NULL
);


ALTER TABLE public.permissions OWNER TO postgres;

--
-- Name: permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permissions_id_seq OWNER TO postgres;

--
-- Name: permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permissions_id_seq OWNED BY public.permissions.id;


--
-- Name: permissions_role_links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permissions_role_links (
    id integer NOT NULL,
    permission_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.permissions_role_links OWNER TO postgres;

--
-- Name: permissions_role_links_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permissions_role_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permissions_role_links_id_seq OWNER TO postgres;

--
-- Name: permissions_role_links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permissions_role_links_id_seq OWNED BY public.permissions_role_links.id;


--
-- Name: question; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.question (
    id integer NOT NULL,
    module_id integer,
    question text,
    form_type character varying(255),
    status boolean
);


ALTER TABLE public.question OWNER TO postgres;

--
-- Name: question_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.question_id_seq OWNER TO postgres;

--
-- Name: question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.question_id_seq OWNED BY public.question.id;


--
-- Name: question_options; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.question_options (
    id integer NOT NULL,
    question_id integer,
    answer integer,
    is_correct character varying(25)
);


ALTER TABLE public.question_options OWNER TO postgres;

--
-- Name: question_options_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.question_options_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.question_options_id_seq OWNER TO postgres;

--
-- Name: question_options_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.question_options_id_seq OWNED BY public.question_options.id;


--
-- Name: reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reports (
    id integer NOT NULL,
    log_id integer,
    score double precision,
    total_step integer,
    correct_step integer,
    time_taken integer
);


ALTER TABLE public.reports OWNER TO postgres;

--
-- Name: reports_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reports_id_seq OWNER TO postgres;

--
-- Name: reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reports_id_seq OWNED BY public.reports.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    type character varying(255)
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: schedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schedule (
    id integer NOT NULL,
    module_id integer,
    title character varying(255),
    schedule_type character varying(255),
    date timestamp with time zone,
    duration_minutes integer,
    max_question integer,
    status character varying(255),
    is_locked boolean,
    class_id integer
);


ALTER TABLE public.schedule OWNER TO postgres;

--
-- Name: schedule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.schedule_id_seq OWNER TO postgres;

--
-- Name: schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.schedule_id_seq OWNED BY public.schedule.id;


--
-- Name: schedule_questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schedule_questions (
    schedule_id integer NOT NULL,
    question_id integer NOT NULL
);


ALTER TABLE public.schedule_questions OWNER TO postgres;

--
-- Name: step_results; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.step_results (
    id integer NOT NULL,
    log_id integer,
    game_object_name character varying(255),
    step_name character varying(255),
    is_correct boolean,
    "timestamp" timestamp with time zone
);


ALTER TABLE public.step_results OWNER TO postgres;

--
-- Name: step_results_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.step_results_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.step_results_id_seq OWNER TO postgres;

--
-- Name: step_results_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.step_results_id_seq OWNED BY public.step_results.id;


--
-- Name: test_attempts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.test_attempts (
    id integer NOT NULL,
    user_id integer,
    schedule_id integer,
    status character varying(25),
    score double precision,
    is_calculated boolean,
    start_time timestamp with time zone,
    end_time timestamp with time zone
);


ALTER TABLE public.test_attempts OWNER TO postgres;

--
-- Name: test_attempts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.test_attempts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.test_attempts_id_seq OWNER TO postgres;

--
-- Name: test_attempts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.test_attempts_id_seq OWNED BY public.test_attempts.id;


--
-- Name: user_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_details (
    id integer NOT NULL,
    user_id integer NOT NULL,
    name character varying(255) NOT NULL,
    date_of_birth timestamp with time zone,
    registration_number character varying(255) NOT NULL,
    work_unit character varying(255),
    "position" character varying(255),
    last_education character varying(255),
    class_id integer
);


ALTER TABLE public.user_details OWNER TO postgres;

--
-- Name: user_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_details_id_seq OWNER TO postgres;

--
-- Name: user_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_details_id_seq OWNED BY public.user_details.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    reset_password_token character varying(255),
    confirmation_token character varying(255),
    confirmed boolean NOT NULL,
    blocked boolean NOT NULL,
    last_login timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users_role_links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_role_links (
    id integer NOT NULL,
    user_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.users_role_links OWNER TO postgres;

--
-- Name: users_role_links_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_role_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_role_links_id_seq OWNER TO postgres;

--
-- Name: users_role_links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_role_links_id_seq OWNED BY public.users_role_links.id;


--
-- Name: assets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assets ALTER COLUMN id SET DEFAULT nextval('public.assets_id_seq'::regclass);


--
-- Name: attempt_details id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attempt_details ALTER COLUMN id SET DEFAULT nextval('public.attempt_details_id_seq'::regclass);


--
-- Name: classes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classes ALTER COLUMN id SET DEFAULT nextval('public.classes_id_seq'::regclass);


--
-- Name: learning_materials id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_materials ALTER COLUMN id SET DEFAULT nextval('public.learning_materials_id_seq'::regclass);


--
-- Name: logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logs ALTER COLUMN id SET DEFAULT nextval('public.logs_id_seq'::regclass);


--
-- Name: modules id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modules ALTER COLUMN id SET DEFAULT nextval('public.modules_id_seq'::regclass);


--
-- Name: object_list id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.object_list ALTER COLUMN id SET DEFAULT nextval('public.object_list_id_seq'::regclass);


--
-- Name: permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions ALTER COLUMN id SET DEFAULT nextval('public.permissions_id_seq'::regclass);


--
-- Name: permissions_role_links id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions_role_links ALTER COLUMN id SET DEFAULT nextval('public.permissions_role_links_id_seq'::regclass);


--
-- Name: question id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question ALTER COLUMN id SET DEFAULT nextval('public.question_id_seq'::regclass);


--
-- Name: question_options id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_options ALTER COLUMN id SET DEFAULT nextval('public.question_options_id_seq'::regclass);


--
-- Name: reports id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports ALTER COLUMN id SET DEFAULT nextval('public.reports_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: schedule id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule ALTER COLUMN id SET DEFAULT nextval('public.schedule_id_seq'::regclass);


--
-- Name: step_results id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.step_results ALTER COLUMN id SET DEFAULT nextval('public.step_results_id_seq'::regclass);


--
-- Name: test_attempts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_attempts ALTER COLUMN id SET DEFAULT nextval('public.test_attempts_id_seq'::regclass);


--
-- Name: user_details id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_details ALTER COLUMN id SET DEFAULT nextval('public.user_details_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: users_role_links id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_role_links ALTER COLUMN id SET DEFAULT nextval('public.users_role_links_id_seq'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20260714000000-create-classes.js
20260714000001-create-users.js
20260714000002-create-user-details.js
20260714000003-create-roles.js
20260714000004-create-permissions.js
20260714000005-create-users-role-links.js
20260714000006-create-permissions-role-links.js
20260714000007-create-modules.js
20260714000008-create-object-list.js
20260714000009-create-learning-materials.js
20260714000010-create-assets.js
20260714000011-create-learning-materials-assets-links.js
20260714000012-create-question.js
20260714000013-create-question-options.js
20260714000014-create-schedule.js
20260714000015-create-schedule-questions.js
20260714000016-create-test-attempts.js
20260714000017-create-attempt-details.js
20260714000018-create-logs.js
20260714000019-create-step-results.js
20260714000020-create-reports.js
20260714000021-add-class-id-to-user-details-and-schedule.js
20260714000022-update-test-attempts-schedule-fk.js
\.


--
-- Data for Name: assets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.assets (id, title, type, order_index) FROM stdin;
1	https://api-minio.10.70.0.45.nip.io/pusdatin/about_processor_11.jpg	Image	1
2	https://api-minio.10.70.0.45.nip.io/pusdatin/about_processor_11.pdf	PDF	2
3	https://api-minio.10.70.0.45.nip.io/pusdatin/about_processor_11.mp4	Video	3
4	https://api-minio.10.70.0.45.nip.io/pusdatin/about_monitor.jpg	Image	1
5	https://api-minio.10.70.0.45.nip.io/pusdatin/about_monitor.mp4	Video	2
6	https://api-minio.10.70.0.45.nip.io/pusdatin/about_monitor.pdf	PDF	3
7	https://api-minio.10.70.0.45.nip.io/pusdatin/about_ac_denso.jpg	Image	1
8	https://api-minio.10.70.0.45.nip.io/pusdatin/about_ac_denso.pdf	PDF	2
9	https://api-minio.10.70.0.45.nip.io/pusdatin/about_car_holder.jpg	Image	1
10	https://api-minio.10.70.0.45.nip.io/pusdatin/about_car_holder.mp4	Video	2
\.


--
-- Data for Name: attempt_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attempt_details (id, attempt_id, question_id, selected_option_id) FROM stdin;
\.


--
-- Data for Name: classes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.classes (id, name, created_at, updated_at) FROM stdin;
1	Kelas A	2026-11-04 11:57:04.672+07	2026-11-04 11:57:04.672+07
2	Kelas B	2026-11-04 11:57:04.672+07	2026-11-04 11:57:04.672+07
3	Kelas C	2026-11-04 11:57:04.672+07	2026-11-04 11:57:04.672+07
\.


--
-- Data for Name: learning_materials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.learning_materials (id, module_id, title, description) FROM stdin;
1	6	About Processor Intel 7 Gen 11	Materi tentang Processor Intel 7 Gen 11 beserta spesifikasi lengkapnya.
2	6	About Processor Intel 7 Gen 12	Materi tentang Processor Intel 7 Gen 12 beserta spesifikasi lengkapnya.
3	2	About Monitor HP	Materi panduan penggunaan dan panduan troubleshooting Monitor HP.
4	14	About AC Car Denso	Materi perbaikan dan pemeliharaan AC Mobil Denso.
5	15	Panduan Pemasangan Car Holder	Langkah-langkah pemasangan Car Holder pada dashboard mobil.
\.


--
-- Data for Name: learning_materials_assets_links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.learning_materials_assets_links (learning_materials_id, assets_id) FROM stdin;
1	1
1	2
1	3
3	4
3	5
3	6
4	7
4	8
5	9
5	10
\.


--
-- Data for Name: logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.logs (id, user_id, module_id, mode, start_time, end_time) FROM stdin;
\.


--
-- Data for Name: modules; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.modules (id, title, parent_id, type, meta, count, created_at, updated_at) FROM stdin;
1	Motherboard	\N	module	\N	0	2026-11-04 11:57:04.645+07	2026-11-04 11:57:04.645+07
2	Monitor	\N	module	\N	0	2026-11-04 11:57:04.645+07	2026-11-04 11:57:04.645+07
3	Garasi	\N	module	\N	0	2026-11-04 11:57:04.645+07	2026-11-04 11:57:04.645+07
4	Keyboard	\N	module	\N	0	2026-11-04 11:57:04.645+07	2026-11-04 11:57:04.645+07
5	Storage	\N	module	\N	0	2026-11-04 11:57:04.645+07	2026-11-04 11:57:04.645+07
6	Processor	1	sub_module	\N	0	2026-11-04 11:57:04.645+07	2026-11-04 11:57:04.645+07
7	RAM	1	sub_module	\N	0	2026-11-04 11:57:04.645+07	2026-11-04 11:57:04.645+07
8	Chipset	1	sub_module	\N	0	2026-11-04 11:57:04.645+07	2026-11-04 11:57:04.645+07
9	Mobil	3	sub_module	\N	0	2026-11-04 11:57:04.645+07	2026-11-04 11:57:04.645+07
10	Motor	3	sub_module	\N	0	2026-11-04 11:57:04.645+07	2026-11-04 11:57:04.645+07
11	Mechanical	4	sub_module	\N	0	2026-11-04 11:57:04.645+07	2026-11-04 11:57:04.645+07
12	Membrane	4	sub_module	\N	0	2026-11-04 11:57:04.645+07	2026-11-04 11:57:04.645+07
13	SSD	5	sub_module	\N	0	2026-11-04 11:57:04.645+07	2026-11-04 11:57:04.645+07
14	AC	9	content	\N	0	2026-11-04 11:57:04.645+07	2026-11-04 11:57:04.645+07
15	Car Holder	9	content	\N	0	2026-11-04 11:57:04.645+07	2026-11-04 11:57:04.645+07
16	Knalpot	10	content	\N	0	2026-11-04 11:57:04.645+07	2026-11-04 11:57:04.645+07
17	Cherry MX Red	11	content	\N	0	2026-11-04 11:57:04.645+07	2026-11-04 11:57:04.645+07
18	Cherry MX Blue	11	content	\N	0	2026-11-04 11:57:04.645+07	2026-11-04 11:57:04.645+07
19	Rubber Dome	12	content	\N	0	2026-11-04 11:57:04.645+07	2026-11-04 11:57:04.645+07
20	NVMe	13	content	\N	0	2026-11-04 11:57:04.645+07	2026-11-04 11:57:04.645+07
\.


--
-- Data for Name: object_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.object_list (id, object_id, game_object_name, action_available, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permissions (id, action) FROM stdin;
1	create:users
2	read:users
3	update:users
4	delete:users
5	create:classes
6	read:classes
7	update:classes
8	delete:classes
9	create:tests
10	read:tests
11	update:tests
12	delete:tests
\.


--
-- Data for Name: permissions_role_links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permissions_role_links (id, permission_id, role_id) FROM stdin;
1	1	1
2	2	1
3	3	1
4	4	1
5	5	1
6	6	1
7	7	1
8	8	1
9	9	1
10	10	1
11	11	1
12	12	1
\.


--
-- Data for Name: question; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.question (id, module_id, question, form_type, status) FROM stdin;
1	1	Soal nomor 1 (Modul 1 - PRE_TEST #1 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
2	1	Soal nomor 2 (Modul 1 - PRE_TEST #2 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
3	1	Soal nomor 3 (Modul 1 - PRE_TEST #3 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
4	1	Soal nomor 4 (Modul 1 - PRE_TEST #4 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
5	1	Soal nomor 5 (Modul 1 - PRE_TEST #5 - Non-Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	f
6	1	Soal nomor 6 (Modul 1 - PRE_TEST #6 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
7	1	Soal nomor 7 (Modul 1 - PRE_TEST #7 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
8	1	Soal nomor 8 (Modul 1 - PRE_TEST #8 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
9	1	Soal nomor 9 (Modul 1 - PRE_TEST #9 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
10	1	Soal nomor 10 (Modul 1 - PRE_TEST #10 - Non-Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	f
11	1	Soal nomor 11 (Modul 1 - PRE_TEST #11 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
12	1	Soal nomor 12 (Modul 1 - PRE_TEST #12 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
13	1	Soal nomor 13 (Modul 1 - POST_TEST #13 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
14	1	Soal nomor 14 (Modul 1 - POST_TEST #14 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
15	1	Soal nomor 15 (Modul 1 - POST_TEST #15 - Non-Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	f
16	1	Soal nomor 16 (Modul 1 - POST_TEST #16 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
17	1	Soal nomor 17 (Modul 1 - POST_TEST #17 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
18	1	Soal nomor 18 (Modul 1 - POST_TEST #18 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
19	1	Soal nomor 19 (Modul 1 - POST_TEST #19 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
20	1	Soal nomor 20 (Modul 1 - POST_TEST #20 - Non-Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	f
21	2	Soal nomor 21 (Modul 2 - PRE_TEST #1 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
22	2	Soal nomor 22 (Modul 2 - PRE_TEST #2 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
23	2	Soal nomor 23 (Modul 2 - PRE_TEST #3 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
24	2	Soal nomor 24 (Modul 2 - PRE_TEST #4 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
25	2	Soal nomor 25 (Modul 2 - PRE_TEST #5 - Non-Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	f
26	2	Soal nomor 26 (Modul 2 - PRE_TEST #6 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
27	2	Soal nomor 27 (Modul 2 - PRE_TEST #7 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
28	2	Soal nomor 28 (Modul 2 - PRE_TEST #8 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
29	2	Soal nomor 29 (Modul 2 - PRE_TEST #9 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
30	2	Soal nomor 30 (Modul 2 - PRE_TEST #10 - Non-Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	f
31	2	Soal nomor 31 (Modul 2 - PRE_TEST #11 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
32	2	Soal nomor 32 (Modul 2 - PRE_TEST #12 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
33	2	Soal nomor 33 (Modul 2 - POST_TEST #13 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
34	2	Soal nomor 34 (Modul 2 - POST_TEST #14 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
35	2	Soal nomor 35 (Modul 2 - POST_TEST #15 - Non-Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	f
36	2	Soal nomor 36 (Modul 2 - POST_TEST #16 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
37	2	Soal nomor 37 (Modul 2 - POST_TEST #17 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
38	2	Soal nomor 38 (Modul 2 - POST_TEST #18 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
39	2	Soal nomor 39 (Modul 2 - POST_TEST #19 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
40	2	Soal nomor 40 (Modul 2 - POST_TEST #20 - Non-Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	f
41	3	Soal nomor 41 (Modul 3 - PRE_TEST #1 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
42	3	Soal nomor 42 (Modul 3 - PRE_TEST #2 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
43	3	Soal nomor 43 (Modul 3 - PRE_TEST #3 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
44	3	Soal nomor 44 (Modul 3 - PRE_TEST #4 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
45	3	Soal nomor 45 (Modul 3 - PRE_TEST #5 - Non-Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	f
46	3	Soal nomor 46 (Modul 3 - PRE_TEST #6 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
47	3	Soal nomor 47 (Modul 3 - PRE_TEST #7 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
48	3	Soal nomor 48 (Modul 3 - PRE_TEST #8 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
49	3	Soal nomor 49 (Modul 3 - PRE_TEST #9 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
50	3	Soal nomor 50 (Modul 3 - PRE_TEST #10 - Non-Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	f
51	3	Soal nomor 51 (Modul 3 - PRE_TEST #11 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
52	3	Soal nomor 52 (Modul 3 - PRE_TEST #12 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
53	3	Soal nomor 53 (Modul 3 - POST_TEST #13 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
54	3	Soal nomor 54 (Modul 3 - POST_TEST #14 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
55	3	Soal nomor 55 (Modul 3 - POST_TEST #15 - Non-Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	f
56	3	Soal nomor 56 (Modul 3 - POST_TEST #16 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
57	3	Soal nomor 57 (Modul 3 - POST_TEST #17 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
58	3	Soal nomor 58 (Modul 3 - POST_TEST #18 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
59	3	Soal nomor 59 (Modul 3 - POST_TEST #19 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
60	3	Soal nomor 60 (Modul 3 - POST_TEST #20 - Non-Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	f
61	4	Soal nomor 61 (Modul 4 - PRE_TEST #1 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
62	4	Soal nomor 62 (Modul 4 - PRE_TEST #2 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
63	4	Soal nomor 63 (Modul 4 - PRE_TEST #3 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
64	4	Soal nomor 64 (Modul 4 - PRE_TEST #4 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
65	4	Soal nomor 65 (Modul 4 - PRE_TEST #5 - Non-Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	f
66	4	Soal nomor 66 (Modul 4 - PRE_TEST #6 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
67	4	Soal nomor 67 (Modul 4 - PRE_TEST #7 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
68	4	Soal nomor 68 (Modul 4 - PRE_TEST #8 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
69	4	Soal nomor 69 (Modul 4 - PRE_TEST #9 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
70	4	Soal nomor 70 (Modul 4 - PRE_TEST #10 - Non-Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	f
71	4	Soal nomor 71 (Modul 4 - PRE_TEST #11 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
72	4	Soal nomor 72 (Modul 4 - PRE_TEST #12 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
73	4	Soal nomor 73 (Modul 4 - POST_TEST #13 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
74	4	Soal nomor 74 (Modul 4 - POST_TEST #14 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
75	4	Soal nomor 75 (Modul 4 - POST_TEST #15 - Non-Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	f
76	4	Soal nomor 76 (Modul 4 - POST_TEST #16 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
77	4	Soal nomor 77 (Modul 4 - POST_TEST #17 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
78	4	Soal nomor 78 (Modul 4 - POST_TEST #18 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
79	4	Soal nomor 79 (Modul 4 - POST_TEST #19 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
80	4	Soal nomor 80 (Modul 4 - POST_TEST #20 - Non-Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	f
81	5	Soal nomor 81 (Modul 5 - PRE_TEST #1 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
82	5	Soal nomor 82 (Modul 5 - PRE_TEST #2 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
83	5	Soal nomor 83 (Modul 5 - PRE_TEST #3 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
84	5	Soal nomor 84 (Modul 5 - PRE_TEST #4 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
85	5	Soal nomor 85 (Modul 5 - PRE_TEST #5 - Non-Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	f
86	5	Soal nomor 86 (Modul 5 - PRE_TEST #6 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
87	5	Soal nomor 87 (Modul 5 - PRE_TEST #7 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
88	5	Soal nomor 88 (Modul 5 - PRE_TEST #8 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
89	5	Soal nomor 89 (Modul 5 - PRE_TEST #9 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
90	5	Soal nomor 90 (Modul 5 - PRE_TEST #10 - Non-Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	f
91	5	Soal nomor 91 (Modul 5 - PRE_TEST #11 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
92	5	Soal nomor 92 (Modul 5 - PRE_TEST #12 - Aktif): Manakah pernyataan berikut yang paling tepat?	pre_test	t
93	5	Soal nomor 93 (Modul 5 - POST_TEST #13 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
94	5	Soal nomor 94 (Modul 5 - POST_TEST #14 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
95	5	Soal nomor 95 (Modul 5 - POST_TEST #15 - Non-Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	f
96	5	Soal nomor 96 (Modul 5 - POST_TEST #16 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
97	5	Soal nomor 97 (Modul 5 - POST_TEST #17 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
98	5	Soal nomor 98 (Modul 5 - POST_TEST #18 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
99	5	Soal nomor 99 (Modul 5 - POST_TEST #19 - Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	t
100	5	Soal nomor 100 (Modul 5 - POST_TEST #20 - Non-Aktif): Manakah pernyataan berikut yang paling tepat?	post_test	f
\.


--
-- Data for Name: question_options; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.question_options (id, question_id, answer, is_correct) FROM stdin;
1	1	1	true
2	1	2	false
3	1	3	false
4	1	4	false
5	2	1	false
6	2	2	true
7	2	3	false
8	2	4	false
9	3	1	false
10	3	2	false
11	3	3	true
12	3	4	false
13	4	1	false
14	4	2	false
15	4	3	false
16	4	4	true
17	5	1	true
18	5	2	false
19	5	3	false
20	5	4	false
21	6	1	false
22	6	2	true
23	6	3	false
24	6	4	false
25	7	1	false
26	7	2	false
27	7	3	true
28	7	4	false
29	8	1	false
30	8	2	false
31	8	3	false
32	8	4	true
33	9	1	true
34	9	2	false
35	9	3	false
36	9	4	false
37	10	1	false
38	10	2	true
39	10	3	false
40	10	4	false
41	11	1	false
42	11	2	false
43	11	3	true
44	11	4	false
45	12	1	false
46	12	2	false
47	12	3	false
48	12	4	true
49	13	1	true
50	13	2	false
51	13	3	false
52	13	4	false
53	14	1	false
54	14	2	true
55	14	3	false
56	14	4	false
57	15	1	false
58	15	2	false
59	15	3	true
60	15	4	false
61	16	1	false
62	16	2	false
63	16	3	false
64	16	4	true
65	17	1	true
66	17	2	false
67	17	3	false
68	17	4	false
69	18	1	false
70	18	2	true
71	18	3	false
72	18	4	false
73	19	1	false
74	19	2	false
75	19	3	true
76	19	4	false
77	20	1	false
78	20	2	false
79	20	3	false
80	20	4	true
81	21	1	true
82	21	2	false
83	21	3	false
84	21	4	false
85	22	1	false
86	22	2	true
87	22	3	false
88	22	4	false
89	23	1	false
90	23	2	false
91	23	3	true
92	23	4	false
93	24	1	false
94	24	2	false
95	24	3	false
96	24	4	true
97	25	1	true
98	25	2	false
99	25	3	false
100	25	4	false
101	26	1	false
102	26	2	true
103	26	3	false
104	26	4	false
105	27	1	false
106	27	2	false
107	27	3	true
108	27	4	false
109	28	1	false
110	28	2	false
111	28	3	false
112	28	4	true
113	29	1	true
114	29	2	false
115	29	3	false
116	29	4	false
117	30	1	false
118	30	2	true
119	30	3	false
120	30	4	false
121	31	1	false
122	31	2	false
123	31	3	true
124	31	4	false
125	32	1	false
126	32	2	false
127	32	3	false
128	32	4	true
129	33	1	true
130	33	2	false
131	33	3	false
132	33	4	false
133	34	1	false
134	34	2	true
135	34	3	false
136	34	4	false
137	35	1	false
138	35	2	false
139	35	3	true
140	35	4	false
141	36	1	false
142	36	2	false
143	36	3	false
144	36	4	true
145	37	1	true
146	37	2	false
147	37	3	false
148	37	4	false
149	38	1	false
150	38	2	true
151	38	3	false
152	38	4	false
153	39	1	false
154	39	2	false
155	39	3	true
156	39	4	false
157	40	1	false
158	40	2	false
159	40	3	false
160	40	4	true
161	41	1	true
162	41	2	false
163	41	3	false
164	41	4	false
165	42	1	false
166	42	2	true
167	42	3	false
168	42	4	false
169	43	1	false
170	43	2	false
171	43	3	true
172	43	4	false
173	44	1	false
174	44	2	false
175	44	3	false
176	44	4	true
177	45	1	true
178	45	2	false
179	45	3	false
180	45	4	false
181	46	1	false
182	46	2	true
183	46	3	false
184	46	4	false
185	47	1	false
186	47	2	false
187	47	3	true
188	47	4	false
189	48	1	false
190	48	2	false
191	48	3	false
192	48	4	true
193	49	1	true
194	49	2	false
195	49	3	false
196	49	4	false
197	50	1	false
198	50	2	true
199	50	3	false
200	50	4	false
201	51	1	false
202	51	2	false
203	51	3	true
204	51	4	false
205	52	1	false
206	52	2	false
207	52	3	false
208	52	4	true
209	53	1	true
210	53	2	false
211	53	3	false
212	53	4	false
213	54	1	false
214	54	2	true
215	54	3	false
216	54	4	false
217	55	1	false
218	55	2	false
219	55	3	true
220	55	4	false
221	56	1	false
222	56	2	false
223	56	3	false
224	56	4	true
225	57	1	true
226	57	2	false
227	57	3	false
228	57	4	false
229	58	1	false
230	58	2	true
231	58	3	false
232	58	4	false
233	59	1	false
234	59	2	false
235	59	3	true
236	59	4	false
237	60	1	false
238	60	2	false
239	60	3	false
240	60	4	true
241	61	1	true
242	61	2	false
243	61	3	false
244	61	4	false
245	62	1	false
246	62	2	true
247	62	3	false
248	62	4	false
249	63	1	false
250	63	2	false
251	63	3	true
252	63	4	false
253	64	1	false
254	64	2	false
255	64	3	false
256	64	4	true
257	65	1	true
258	65	2	false
259	65	3	false
260	65	4	false
261	66	1	false
262	66	2	true
263	66	3	false
264	66	4	false
265	67	1	false
266	67	2	false
267	67	3	true
268	67	4	false
269	68	1	false
270	68	2	false
271	68	3	false
272	68	4	true
273	69	1	true
274	69	2	false
275	69	3	false
276	69	4	false
277	70	1	false
278	70	2	true
279	70	3	false
280	70	4	false
281	71	1	false
282	71	2	false
283	71	3	true
284	71	4	false
285	72	1	false
286	72	2	false
287	72	3	false
288	72	4	true
289	73	1	true
290	73	2	false
291	73	3	false
292	73	4	false
293	74	1	false
294	74	2	true
295	74	3	false
296	74	4	false
297	75	1	false
298	75	2	false
299	75	3	true
300	75	4	false
301	76	1	false
302	76	2	false
303	76	3	false
304	76	4	true
305	77	1	true
306	77	2	false
307	77	3	false
308	77	4	false
309	78	1	false
310	78	2	true
311	78	3	false
312	78	4	false
313	79	1	false
314	79	2	false
315	79	3	true
316	79	4	false
317	80	1	false
318	80	2	false
319	80	3	false
320	80	4	true
321	81	1	true
322	81	2	false
323	81	3	false
324	81	4	false
325	82	1	false
326	82	2	true
327	82	3	false
328	82	4	false
329	83	1	false
330	83	2	false
331	83	3	true
332	83	4	false
333	84	1	false
334	84	2	false
335	84	3	false
336	84	4	true
337	85	1	true
338	85	2	false
339	85	3	false
340	85	4	false
341	86	1	false
342	86	2	true
343	86	3	false
344	86	4	false
345	87	1	false
346	87	2	false
347	87	3	true
348	87	4	false
349	88	1	false
350	88	2	false
351	88	3	false
352	88	4	true
353	89	1	true
354	89	2	false
355	89	3	false
356	89	4	false
357	90	1	false
358	90	2	true
359	90	3	false
360	90	4	false
361	91	1	false
362	91	2	false
363	91	3	true
364	91	4	false
365	92	1	false
366	92	2	false
367	92	3	false
368	92	4	true
369	93	1	true
370	93	2	false
371	93	3	false
372	93	4	false
373	94	1	false
374	94	2	true
375	94	3	false
376	94	4	false
377	95	1	false
378	95	2	false
379	95	3	true
380	95	4	false
381	96	1	false
382	96	2	false
383	96	3	false
384	96	4	true
385	97	1	true
386	97	2	false
387	97	3	false
388	97	4	false
389	98	1	false
390	98	2	true
391	98	3	false
392	98	4	false
393	99	1	false
394	99	2	false
395	99	3	true
396	99	4	false
397	100	1	false
398	100	2	false
399	100	3	false
400	100	4	true
\.


--
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reports (id, log_id, score, total_step, correct_step, time_taken) FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name, description, type) FROM stdin;
1	Admin	Administrator	Internal
2	Siswa	Student	Internal
3	Instruktur	Instructor	External
\.


--
-- Data for Name: schedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schedule (id, module_id, title, schedule_type, date, duration_minutes, max_question, status, is_locked, class_id) FROM stdin;
1	1	Pre-test Motherboard Sesi 1 (Aktif & Unlocked)	pre_test	2026-08-15 16:00:00+07	60	8	Active	f	1
2	1	Post-test Motherboard Sesi 1 (Aktif & Locked)	post_test	2026-08-16 17:00:00+07	45	4	Active	t	1
3	2	Pre-test Monitor Sesi 1 (Non-Aktif & Unlocked)	pre_test	2026-08-20 15:00:00+07	60	5	Inactive	f	2
4	2	Post-test Monitor Sesi 1 (Draft & Locked)	post_test	2026-08-22 20:00:00+07	30	4	Draft	t	2
5	3	Pre-test Garasi (Aktif & Unlocked)	pre_test	2026-08-25 16:30:00+07	90	6	Active	f	3
6	4	Pre-test Keyboard (Aktif & Unlocked)	pre_test	2026-08-28 18:00:00+07	60	7	Active	f	3
\.


--
-- Data for Name: schedule_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schedule_questions (schedule_id, question_id) FROM stdin;
\.


--
-- Data for Name: step_results; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.step_results (id, log_id, game_object_name, step_name, is_correct, "timestamp") FROM stdin;
\.


--
-- Data for Name: test_attempts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.test_attempts (id, user_id, schedule_id, status, score, is_calculated, start_time, end_time) FROM stdin;
\.


--
-- Data for Name: user_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_details (id, user_id, name, date_of_birth, registration_number, work_unit, "position", last_education, class_id) FROM stdin;
1	1	erick	1995-05-15 07:00:00+07	12345	Pusdatin	Staff IT	S1	\N
2	2	budi	2005-08-20 07:00:00+07	54321	Sekolah A	Staff Administrasi	SMA	1
3	3	ani	2006-02-10 07:00:00+07	54322	Sekolah A	Pustakawan	SMA	1
4	4	jana turner	2006-08-06 14:24:02.912+07	2025	Altenwerth, Borer and Lind	Pustakawan	S2	2
5	5	ms. tammy bogisich dds	2008-04-09 19:34:29.355+07	2025	Crona Group	Staff Administrasi	D3	3
6	6	miss chester nikolaus	1983-01-20 07:54:02.235+07	2024	Gulgowski Group	Kepala Seksi	S1	1
7	7	willie doyle	2004-10-04 21:45:46.843+07	2025	Funk - Collier	Kepala Seksi	S1	2
8	8	juan hermann	1990-07-28 04:12:50.515+07	2025	Runolfsson, Lehner and Reilly	Staff IT	S2	3
9	9	dixie bayer	1997-05-24 21:31:28.548+07	2026	Murphy, Okuneva and Barton	Programmer	S2	1
10	10	danny pouros	2000-11-27 08:32:59.001+07	2025	Reichert, Swift and Toy	Teknisi	S2	2
11	11	olivia yost	1990-05-11 12:28:20.192+07	2024	Langworth, Doyle and Keeling	Pustakawan	SMA	3
12	12	raquel mills	1987-04-16 01:43:18.793+07	2025	Swift - Shanahan	Teknisi	D3	1
13	13	mike hintz	1985-04-27 00:43:50.919+07	2026	Cormier - Beier	Analyst	S2	2
14	14	sergio rodriguez	2008-07-21 17:17:59.468+07	2026	Konopelski, Mosciski and Will	Pustakawan	S2	3
15	15	sandy torphy	2011-04-13 21:28:22.81+07	2025	Emard LLC	Analyst	S1	1
16	16	jerome flatley	2000-12-08 12:43:41.699+07	2024	Upton - Reinger	Staff Administrasi	S1	2
17	17	olivia mcdermott	1984-11-21 16:56:36.861+07	2024	Osinski and Sons	Programmer	D3	3
18	18	ramona schamberger	1983-07-02 10:02:56.989+07	2026	Fay, Crona and Lynch	Programmer	D3	1
19	19	desiree o'reilly	1976-12-19 17:28:53.59+07	2025	Hoeger - Parisian	Programmer	D3	2
20	20	ignacio grady	1996-05-04 05:39:34.155+07	2025	Ondricka Inc	Kepala Seksi	D3	3
21	21	julian kirlin	1997-08-09 09:07:14.355+07	2026	Ebert Group	Teknisi	D3	1
24	24	mario conroy	1990-12-09 05:44:49.007+07	2025	Stark LLC	Pustakawan	SMA	1
22	22	leticia leffler dds	2007-04-01 17:25:08.401+07	2024	Feeney, Towne and Ebert	Programmer	D3	2
23	23	loren von ii	2008-12-18 14:17:11.986+07	2024	Brown, Jenkins and Lockman	Programmer	S1	3
25	25	ebony stoltenberg	2007-05-07 17:41:07.103+07	2026	Will - Ziemann	Analyst	D3	2
26	26	reginald white	1991-10-08 06:11:02.708+07	2026	Cremin - Mosciski	Kepala Seksi	D3	3
27	27	jeffery o'reilly	1999-08-17 06:39:16.345+07	2025	Streich, Bartell and Bernier	Programmer	D3	1
28	28	alex weissnat	2006-12-25 23:37:01.171+07	2026	Bernhard, Smith and Parisian	Kepala Seksi	S2	2
29	29	perry batz	1977-01-31 05:12:42.118+07	2024	Aufderhar, West and McDermott	Staff IT	SMA	3
30	30	jesse hansen	1996-09-24 05:44:01.036+07	2026	Mraz, Treutel and Towne	Staff IT	D3	1
31	31	malcolm ryan	1999-02-05 12:41:49.912+07	2025	Anderson - Kulas	Programmer	S1	2
32	32	mr. eunice nienow v	1977-11-10 10:25:20.799+07	2025	Feest Inc	Teknisi	SMA	3
33	33	rafael bartoletti	1988-12-22 07:21:45.609+07	2024	Mertz and Sons	Programmer	D3	1
34	34	calvin gutmann md	2006-04-18 07:20:48.479+07	2024	Ankunding, Kreiger and Jerde	Kepala Seksi	D3	2
35	35	eugene wilkinson	1990-04-26 11:00:39.518+07	2025	Keebler - Williamson	Teknisi	S1	3
36	36	monica donnelly	1997-09-07 03:37:05.964+07	2024	Dare and Sons	Kepala Seksi	S2	1
37	37	miss ivan feil	2002-08-11 10:49:55.751+07	2025	Schinner - Schumm	Pustakawan	D3	2
38	38	noah hirthe	1976-08-23 12:55:41.205+07	2024	Morar Group	Staff Administrasi	S1	3
39	39	andrew bechtelar	2005-07-13 23:41:09.988+07	2026	Rolfson, Buckridge and Brown	Staff IT	S1	1
40	40	bert tromp	1990-11-19 22:48:54.377+07	2025	Satterfield and Sons	Staff Administrasi	S1	2
41	41	leticia hegmann	1993-01-31 02:02:40.621+07	2026	Bins Group	Pustakawan	S2	3
42	42	emilio huel	2005-10-27 05:51:19.323+07	2026	Yundt, Wuckert and Howell	Pustakawan	D3	1
43	43	della pagac	2003-09-03 08:11:41.613+07	2025	Lueilwitz - Connelly	Analyst	SMA	2
44	44	iris sipes	1985-01-17 07:25:04.014+07	2025	Moore - Mraz	Programmer	SMA	3
45	45	cecil metz	2005-05-04 08:14:53.358+07	2026	Batz LLC	Staff IT	D3	1
46	46	eleanor schultz	1987-04-17 12:09:48.352+07	2026	Koelpin - Collier	Staff IT	D3	2
47	47	casey berge iv	1994-05-18 14:01:25.196+07	2025	Larkin - Lindgren	Teknisi	S2	3
48	48	dr. gerald fritsch	1996-09-17 14:03:39.392+07	2025	Reichert Inc	Kepala Seksi	S1	1
49	49	travis lueilwitz	2008-07-07 21:11:25.289+07	2024	Ruecker - Volkman	Teknisi	S1	2
50	50	alton lueilwitz	1979-04-30 02:54:49.557+07	2026	Kunze - Casper	Kepala Seksi	D3	3
51	51	joe roberts i	1978-06-17 18:13:57.575+07	2024	Schmeler - Heaney	Analyst	S2	1
52	52	joshua kling	2004-01-04 16:39:24.327+07	2024	Harber Group	Staff IT	SMA	2
53	53	miss merle schumm i	1991-11-08 17:26:18.66+07	2025	Morar - Berge	Programmer	S2	3
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, reset_password_token, confirmation_token, confirmed, blocked, last_login, created_at, updated_at) FROM stdin;
1	admin1	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-admin-1	t	f	\N	2026-11-04 11:57:04.582+07	2026-11-04 11:57:04.582+07
2	siswa1	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-siswa-1	t	f	\N	2026-11-04 11:57:04.582+07	2026-11-04 11:57:04.582+07
3	siswa_inactive	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-siswa-inactive	f	f	\N	2026-11-04 11:57:04.582+07	2026-11-04 11:57:04.582+07
4	winnifredklocko834	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-4	t	f	\N	2026-11-04 11:57:04.582+07	2026-11-04 11:57:04.582+07
5	sophieharris435	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-5	t	f	\N	2026-11-04 11:57:04.582+07	2026-11-04 11:57:04.582+07
6	vitawunsch6	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-6	t	f	\N	2026-11-04 11:57:04.582+07	2026-11-04 11:57:04.582+07
7	dawson117	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-7	t	f	\N	2026-11-04 11:57:04.582+07	2026-11-04 11:57:04.582+07
8	kaylie298	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-8	t	f	\N	2026-11-04 11:57:04.582+07	2026-11-04 11:57:04.582+07
9	bonitaheidenreich539	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-9	t	f	\N	2026-11-04 11:57:04.582+07	2026-11-04 11:57:04.582+07
10	lunamosciski3810	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-10	t	f	\N	2026-11-04 11:57:04.582+07	2026-11-04 11:57:04.582+07
11	ryanpfannerstill8511	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-11	t	f	\N	2026-11-04 11:57:04.582+07	2026-11-04 11:57:04.582+07
12	alenegoyette2612	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-12	t	f	\N	2026-11-04 11:57:04.582+07	2026-11-04 11:57:04.582+07
13	everettepredovic13	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-13	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
14	deonhane4114	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-14	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
15	cristobalreichert6215	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-15	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
16	marianomante16	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-16	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
17	felipazboncak5117	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-17	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
18	cooperhamill2718	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-18	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
19	juanita2519	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-19	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
20	janice5520	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-20	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
21	zackarymonahan6821	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-21	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
22	odellkulas22	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-22	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
23	sofiadubuque223	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-23	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
24	maximusgusikowski024	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-24	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
25	jenagoldner1125	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-25	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
26	jessegrimes1626	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-26	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
27	emiliadoyle27	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-27	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
28	jordynpfannerstill28	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-28	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
29	ilianabruen5629	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-29	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
30	maudmuller30	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-30	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
31	abdulkuhic31	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-31	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
32	shadlittle32	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-32	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
33	sibylhahn5733	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-33	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
34	orvillegoyette2634	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-34	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
35	wendellkassulke35	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-35	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
36	brauliothiel8936	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-36	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
37	aglaestracke337	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-37	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
38	providencigrimes38	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-38	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
39	kathlynschmidt39	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-39	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
40	edisonmarquardt40	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-40	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
41	yesseniamcdermott041	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-41	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
42	roberta942	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-42	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
43	ismael243	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-43	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
44	eduardobergnaum44	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-44	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
45	maritzaauer45	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-45	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
46	grahamchristiansen46	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-46	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
47	wiley1947	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-47	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
48	victorparisian2148	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-48	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
49	lynnhuels49	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-49	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
50	serenaschamberger50	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-50	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
51	erickmoen51	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-51	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
52	liza2652	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-52	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
53	amari4353	$2b$10$ekmhDxUwKkAOs3zDrkDx4uSTFBtbjOmCaSvh6G4/NJfQDgAIjjkQW	\N	token-53	t	f	\N	2026-11-04 11:57:04.583+07	2026-11-04 11:57:04.583+07
\.


--
-- Data for Name: users_role_links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_role_links (id, user_id, role_id) FROM stdin;
1	1	1
2	2	2
3	3	2
4	4	2
5	5	2
6	6	2
7	7	2
8	8	2
9	9	2
10	10	2
11	11	2
12	12	2
13	13	2
14	14	2
15	15	2
16	16	2
17	17	2
18	18	2
19	19	2
20	20	2
21	21	2
22	22	2
23	23	2
24	24	2
25	25	2
26	26	2
27	27	2
28	28	2
29	29	2
30	30	2
31	31	2
32	32	2
33	33	2
34	34	2
35	35	2
36	36	2
37	37	2
38	38	2
39	39	2
40	40	2
41	41	2
42	42	2
43	43	2
44	44	2
45	45	2
46	46	2
47	47	2
48	48	2
49	49	2
50	50	2
51	51	2
52	52	2
53	53	2
\.


--
-- Name: assets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.assets_id_seq', 10, true);


--
-- Name: attempt_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.attempt_details_id_seq', 1, false);


--
-- Name: classes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.classes_id_seq', 3, true);


--
-- Name: learning_materials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.learning_materials_id_seq', 5, true);


--
-- Name: logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.logs_id_seq', 1, false);


--
-- Name: modules_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.modules_id_seq', 20, true);


--
-- Name: object_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.object_list_id_seq', 1, false);


--
-- Name: permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permissions_id_seq', 12, true);


--
-- Name: permissions_role_links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permissions_role_links_id_seq', 12, true);


--
-- Name: question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.question_id_seq', 100, true);


--
-- Name: question_options_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.question_options_id_seq', 400, true);


--
-- Name: reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reports_id_seq', 1, false);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- Name: schedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.schedule_id_seq', 6, true);


--
-- Name: step_results_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.step_results_id_seq', 1, false);


--
-- Name: test_attempts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.test_attempts_id_seq', 1, false);


--
-- Name: user_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_details_id_seq', 53, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 53, true);


--
-- Name: users_role_links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_role_links_id_seq', 53, true);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: assets assets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_pkey PRIMARY KEY (id);


--
-- Name: attempt_details attempt_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attempt_details
    ADD CONSTRAINT attempt_details_pkey PRIMARY KEY (id);


--
-- Name: classes classes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_pkey PRIMARY KEY (id);


--
-- Name: learning_materials_assets_links learning_materials_assets_links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_materials_assets_links
    ADD CONSTRAINT learning_materials_assets_links_pkey PRIMARY KEY (learning_materials_id, assets_id);


--
-- Name: learning_materials learning_materials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_materials
    ADD CONSTRAINT learning_materials_pkey PRIMARY KEY (id);


--
-- Name: logs logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_pkey PRIMARY KEY (id);


--
-- Name: modules modules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_pkey PRIMARY KEY (id);


--
-- Name: object_list object_list_game_object_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.object_list
    ADD CONSTRAINT object_list_game_object_name_key UNIQUE (game_object_name);


--
-- Name: object_list object_list_object_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.object_list
    ADD CONSTRAINT object_list_object_id_key UNIQUE (object_id);


--
-- Name: object_list object_list_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.object_list
    ADD CONSTRAINT object_list_pkey PRIMARY KEY (id);


--
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- Name: permissions_role_links permissions_role_links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions_role_links
    ADD CONSTRAINT permissions_role_links_pkey PRIMARY KEY (id);


--
-- Name: question_options question_options_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_options
    ADD CONSTRAINT question_options_pkey PRIMARY KEY (id);


--
-- Name: question question_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_pkey PRIMARY KEY (id);


--
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: schedule schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_pkey PRIMARY KEY (id);


--
-- Name: schedule_questions schedule_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_questions
    ADD CONSTRAINT schedule_questions_pkey PRIMARY KEY (schedule_id, question_id);


--
-- Name: step_results step_results_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.step_results
    ADD CONSTRAINT step_results_pkey PRIMARY KEY (id);


--
-- Name: test_attempts test_attempts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_attempts
    ADD CONSTRAINT test_attempts_pkey PRIMARY KEY (id);


--
-- Name: user_details user_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT user_details_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_role_links users_role_links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_role_links
    ADD CONSTRAINT users_role_links_pkey PRIMARY KEY (id);


--
-- Name: attempt_details attempt_details_attempt_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attempt_details
    ADD CONSTRAINT attempt_details_attempt_id_fkey FOREIGN KEY (attempt_id) REFERENCES public.test_attempts(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: attempt_details attempt_details_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attempt_details
    ADD CONSTRAINT attempt_details_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.question(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: attempt_details attempt_details_selected_option_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attempt_details
    ADD CONSTRAINT attempt_details_selected_option_id_fkey FOREIGN KEY (selected_option_id) REFERENCES public.question_options(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: learning_materials_assets_links learning_materials_assets_links_assets_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_materials_assets_links
    ADD CONSTRAINT learning_materials_assets_links_assets_id_fkey FOREIGN KEY (assets_id) REFERENCES public.assets(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: learning_materials_assets_links learning_materials_assets_links_learning_materials_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_materials_assets_links
    ADD CONSTRAINT learning_materials_assets_links_learning_materials_id_fkey FOREIGN KEY (learning_materials_id) REFERENCES public.learning_materials(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: learning_materials learning_materials_module_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_materials
    ADD CONSTRAINT learning_materials_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.modules(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: logs logs_module_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.modules(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: logs logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: modules modules_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.modules(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: permissions_role_links permissions_role_links_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions_role_links
    ADD CONSTRAINT permissions_role_links_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: permissions_role_links permissions_role_links_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions_role_links
    ADD CONSTRAINT permissions_role_links_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: question question_module_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.modules(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: question_options question_options_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_options
    ADD CONSTRAINT question_options_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.question(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: reports reports_log_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_log_id_fkey FOREIGN KEY (log_id) REFERENCES public.logs(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: schedule schedule_class_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.classes(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: schedule schedule_module_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.modules(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: schedule_questions schedule_questions_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_questions
    ADD CONSTRAINT schedule_questions_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.question(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: schedule_questions schedule_questions_schedule_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_questions
    ADD CONSTRAINT schedule_questions_schedule_id_fkey FOREIGN KEY (schedule_id) REFERENCES public.schedule(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: step_results step_results_log_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.step_results
    ADD CONSTRAINT step_results_log_id_fkey FOREIGN KEY (log_id) REFERENCES public.logs(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: test_attempts test_attempts_schedule_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_attempts
    ADD CONSTRAINT test_attempts_schedule_id_fkey FOREIGN KEY (schedule_id) REFERENCES public.schedule(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: test_attempts test_attempts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_attempts
    ADD CONSTRAINT test_attempts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: user_details user_details_class_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT user_details_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.classes(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: user_details user_details_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT user_details_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users_role_links users_role_links_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_role_links
    ADD CONSTRAINT users_role_links_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users_role_links users_role_links_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_role_links
    ADD CONSTRAINT users_role_links_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict vZ7a6bdRnFVcqZgadwRDURw97MJFa3c86v28hP3LJgxj4PYgFKvhV5LxV4fCARc

