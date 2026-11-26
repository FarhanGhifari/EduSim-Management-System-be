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
    assets_id integer
);


ALTER TABLE public.learning_materials_assets_links OWNER TO postgres;

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
-- Name: object_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.object_list (
    id integer NOT NULL,
    object_id bigint NOT NULL,
    game_object_name character varying(255) NOT NULL,
    action_available json NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.object_list OWNER TO postgres;

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


ALTER TABLE public.permissions_id_seq OWNER TO postgres;

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


ALTER TABLE public.permissions_role_links_id_seq OWNER TO postgres;

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


ALTER TABLE public.roles_id_seq OWNER TO postgres;

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
    is_locked boolean
);


ALTER TABLE public.schedule OWNER TO postgres;

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
-- Name: user_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_details (
    id integer NOT NULL,
    user_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    date_of_birth timestamp with time zone,
    registration_number character varying(255) NOT NULL,
    work_unit character varying(255),
    "position" character varying(255),
    last_education character varying(255)
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


ALTER TABLE public.user_details_id_seq OWNER TO postgres;

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
    confirmed boolean DEFAULT true NOT NULL,
    blocked boolean DEFAULT false NOT NULL,
    last_login timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
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


ALTER TABLE public.users_id_seq OWNER TO postgres;

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


ALTER TABLE public.users_role_links_id_seq OWNER TO postgres;

--
-- Name: users_role_links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_role_links_id_seq OWNED BY public.users_role_links.id;


--
-- Name: permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions ALTER COLUMN id SET DEFAULT nextval('public.permissions_id_seq'::regclass);


--
-- Name: permissions_role_links id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions_role_links ALTER COLUMN id SET DEFAULT nextval('public.permissions_role_links_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


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
\.


--
-- Data for Name: assets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.assets (id, title, type, order_index) FROM stdin;
\.


--
-- Data for Name: attempt_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attempt_details (id, attempt_id, question_id, selected_option_id) FROM stdin;
\.


--
-- Data for Name: learning_materials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.learning_materials (id, module_id, title, description) FROM stdin;
\.


--
-- Data for Name: learning_materials_assets_links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.learning_materials_assets_links (learning_materials_id, assets_id) FROM stdin;
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
\.


--
-- Data for Name: permissions_role_links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permissions_role_links (id, permission_id, role_id) FROM stdin;
\.


--
-- Data for Name: question; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.question (id, module_id, question, form_type, status) FROM stdin;
\.


--
-- Data for Name: question_options; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.question_options (id, question_id, answer, is_correct) FROM stdin;
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

COPY public.schedule (id, module_id, title, schedule_type, date, duration_minutes, max_question, status, is_locked) FROM stdin;
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

COPY public.user_details (id, user_id, name, date_of_birth, registration_number, work_unit, "position", last_education) FROM stdin;
1	1	erick	1995-05-15 07:00:00+07	12345	Pusdatin	Staff IT	S1
2	2	budi	2005-08-20 07:00:00+07	54321	Sekolah A	Staff Administrasi	SMA
3	3	ani	2006-02-10 07:00:00+07	54322	Sekolah A	Pustakawan	SMA
4	4	marguerite schmeler	2005-01-02 14:17:04.502+07	2026	Adams - Witting	Kepala Seksi	D3
5	5	roderick farrell dvm	2010-12-18 04:00:21.371+07	2025	Cummerata - Doyle	Kepala Seksi	D3
6	6	dr. hugh cronin	1979-04-14 08:33:04.363+07	2025	Pagac, Emard and Bode	Pustakawan	D3
7	7	gustavo prohaska	1976-05-29 07:20:35.006+07	2025	Grant Inc	Pustakawan	S2
8	8	kayla romaguera i	1982-03-09 11:17:05.21+07	2025	Howe Group	Staff IT	S1
9	9	candice kertzmann	2008-05-14 00:17:33.759+07	2025	Christiansen, Ankunding and Johnson	Staff Administrasi	D3
10	10	dr. freddie bednar dvm	1994-10-08 21:17:24.461+07	2026	Quigley, Dietrich and Green	Analyst	S1
11	11	maureen miller	1982-07-08 14:05:05.007+07	2024	Cummings - Kerluke	Pustakawan	S1
12	12	steven kassulke	2001-10-17 01:25:49.243+07	2025	Dibbert, Nader and Goyette	Staff Administrasi	S1
13	13	annette dibbert	1995-09-20 19:55:11.633+07	2024	Rosenbaum, Hagenes and Conn	Pustakawan	S2
14	14	miss forrest aufderhar	1997-04-08 00:53:40.487+07	2026	Ratke, Romaguera and Franey	Staff IT	S2
15	15	judy wunsch	1992-04-22 04:44:30.763+07	2024	Rempel, Daugherty and Harvey	Kepala Seksi	S2
16	16	teri simonis	1997-10-27 17:48:26.284+07	2026	Schowalter - Braun	Pustakawan	S1
17	17	alberto gorczany	2005-11-15 01:09:22.933+07	2025	Nader, Leuschke and Stroman	Staff IT	S1
18	18	louise mitchell	1976-11-18 12:40:08.555+07	2026	Harris, Hagenes and Pfeffer	Staff IT	S1
19	19	mattie lehner	1991-11-26 21:32:06.912+07	2026	O'Reilly - Ebert	Staff Administrasi	S2
20	20	nina block	1988-01-22 00:03:31.977+07	2024	Herman, D'Amore and Weimann	Pustakawan	S2
21	21	joshua monahan	1989-11-14 02:24:53.799+07	2025	Prosacco - Ferry	Pustakawan	D3
22	22	jerome romaguera jr.	1991-08-09 13:33:33.815+07	2024	Kautzer Group	Staff IT	D3
23	23	monique stamm i	2000-06-29 21:24:04.59+07	2026	Shields and Sons	Kepala Seksi	D3
24	24	sammy mertz iii	1983-11-11 14:37:15.131+07	2025	Bauch, Moen and Sauer	Pustakawan	D3
25	25	ora gorczany md	2009-02-05 22:42:37.664+07	2025	Osinski - Walter	Analyst	S1
26	26	rickey walter phd	1986-09-28 23:01:06.36+07	2025	Schmeler - Kling	Programmer	SMA
27	27	perry hills	1996-09-16 08:04:12.192+07	2025	Wehner, Robel and Wiegand	Kepala Seksi	S1
28	28	joel o'reilly	1979-09-14 12:40:03.356+07	2026	Jaskolski Inc	Teknisi	SMA
29	29	melba streich	1996-08-08 07:49:58.757+07	2026	Gulgowski Group	Pustakawan	S1
30	30	stanley heaney	2006-03-29 21:12:51.436+07	2026	O'Conner and Sons	Pustakawan	D3
31	31	herbert ankunding	1996-04-10 12:00:29.598+07	2025	Ryan - Considine	Teknisi	D3
32	32	mack conn	1996-05-13 15:08:08.153+07	2025	Murray, Mohr and O'Reilly	Staff IT	D3
33	33	paula howell iv	2008-04-14 03:31:32.496+07	2026	Baumbach LLC	Staff Administrasi	SMA
34	34	jimmie crist	2000-04-11 19:02:43.898+07	2026	Ratke Inc	Teknisi	S1
35	35	alfredo hills	1982-06-08 11:13:48.334+07	2025	Bartoletti - Lynch	Staff Administrasi	SMA
36	36	gerald nolan v	1986-05-06 06:08:23.732+07	2024	Will - Bogan	Staff IT	D3
37	37	guadalupe herman	1989-01-02 10:09:38.138+07	2026	Casper - Kemmer	Pustakawan	S2
38	38	freda mills	2007-02-13 07:17:37.284+07	2024	Schinner, Emmerich and Mraz	Pustakawan	SMA
39	39	troy hoppe	1977-01-10 07:00:22.806+07	2025	Cummings, Barrows and Adams	Staff Administrasi	D3
40	40	kate von	2008-07-20 11:50:01.948+07	2026	Kemmer, Schuster and Carroll	Analyst	S1
41	41	bonnie bauch	2004-07-05 23:25:36.049+07	2026	Weber Group	Teknisi	S2
42	42	geoffrey kilback md	2004-01-19 06:00:12.695+07	2024	Walsh, Connelly and Beahan	Programmer	D3
43	43	oliver altenwerth	1997-05-27 05:47:43.813+07	2024	Adams - Considine	Pustakawan	D3
44	44	elias swift	1979-04-09 23:14:13.218+07	2025	Gorczany, Dare and Anderson	Programmer	S1
45	45	kellie spinka	2009-05-14 16:18:34.226+07	2024	O'Connell, Runolfsson and Hoeger	Staff IT	S1
46	46	mr. jenna steuber	1992-01-02 18:27:45.807+07	2026	Padberg, Renner and Terry	Kepala Seksi	SMA
47	47	rosemary treutel	1982-02-11 02:14:34.372+07	2026	Cartwright - Spencer	Analyst	SMA
48	48	mrs. grant jaskolski	2001-08-25 08:29:35.815+07	2026	Cassin LLC	Pustakawan	D3
49	49	cora pfeffer	1979-10-25 20:24:23.902+07	2026	Goldner Inc	Pustakawan	S1
50	50	april harris	2009-02-22 09:09:48.002+07	2024	Flatley, Kessler and Haley	Pustakawan	D3
51	51	dustin koch	1991-03-30 22:09:52.36+07	2024	Klocko - Dietrich	Staff IT	SMA
52	52	mrs. dana hamill	2000-02-04 21:29:55.073+07	2025	Schamberger, Conn and Kassulke	Programmer	SMA
53	53	kendra graham	1994-11-20 10:28:10.505+07	2025	Greenholt - Anderson	Pustakawan	SMA
54	54	Budi Santoso Kos	\N	REG-2026-001	\N	\N	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, reset_password_token, confirmation_token, confirmed, blocked, last_login, created_at, updated_at) FROM stdin;
1	admin1	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-admin-1	t	f	\N	2026-07-23 15:21:55.844+07	2026-07-23 15:21:55.844+07
2	siswa1	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-siswa-1	t	f	\N	2026-07-23 15:21:55.844+07	2026-07-23 15:21:55.844+07
3	siswa_inactive	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-siswa-inactive	f	f	\N	2026-07-23 15:21:55.844+07	2026-07-23 15:21:55.844+07
4	rogelio374	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-4	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
5	evan635	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-5	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
6	curtispurdy6	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-6	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
7	garnetmurphy7	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-7	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
8	danamraz8	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-8	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
9	marjoryharber09	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-9	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
10	preciousebert9610	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-10	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
11	donaldstark11	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-11	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
12	madiethiel12	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-12	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
13	rahul6813	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-13	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
14	madonnaprohaska14	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-14	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
15	seamus5815	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-15	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
16	geowehner16	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-16	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
17	juwan6017	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-17	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
18	rebeca9518	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-18	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
19	brennon6519	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-19	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
20	jolieprice9920	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-20	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
21	leatha1121	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-21	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
22	adriennepagac1522	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-22	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
23	tierrakihn23	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-23	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
24	adeliawisoky7424	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-24	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
25	pattie2925	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-25	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
26	ellsworthbuckridge26	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-26	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
27	karleetowne27	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-27	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
28	mozelle3728	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-28	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
29	halliestark29	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-29	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
30	armando4130	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-30	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
31	kira8031	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-31	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
32	alayna3332	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-32	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
33	quinten7233	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-33	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
34	daphnee3434	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-34	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
35	eliane435	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-35	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
36	dolores9836	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-36	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
37	melisa6537	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-37	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
38	jamarlynch638	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-38	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
39	iva6339	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-39	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
40	dayana6140	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-40	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
41	asiaferry2641	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-41	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
42	drew4442	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-42	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
43	maceymaggio2043	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-43	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
44	clairefisher44	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-44	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
45	haleighcollier4245	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-45	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
46	austyn7646	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-46	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
47	lucianorutherford47	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-47	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
48	juanahoeger48	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-48	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
49	maximilliadouglas049	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-49	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
50	isaacdickens350	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-50	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
51	sadierowe51	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-51	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
52	hudsonhermann52	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-52	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
53	kimnader4453	$2b$10$1SqQlCjUdgFJJaTzQWLCUucYKSgemPN/9GbQ0UUOIAUvr4cSghRq.	\N	token-53	t	f	\N	2026-07-23 15:21:55.845+07	2026-07-23 15:21:55.845+07
54	budisantoso2	Password123!	\N	\N	t	f	\N	2026-07-23 15:25:47.567+07	2026-07-24 13:25:17.09+07
\.


--
-- Data for Name: users_role_links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_role_links (id, user_id, role_id) FROM stdin;
4	54	2
\.


--
-- Name: permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permissions_id_seq', 1, false);


--
-- Name: permissions_role_links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permissions_role_links_id_seq', 1, false);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- Name: user_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_details_id_seq', 54, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 54, true);


--
-- Name: users_role_links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_role_links_id_seq', 4, true);


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
-- Name: learning_materials_assets_links learning_materials_assets_links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_materials_assets_links
    ADD CONSTRAINT learning_materials_assets_links_pkey PRIMARY KEY (learning_materials_id);


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
    ADD CONSTRAINT learning_materials_assets_links_assets_id_fkey FOREIGN KEY (assets_id) REFERENCES public.assets(id) ON UPDATE CASCADE ON DELETE SET NULL;


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
    ADD CONSTRAINT test_attempts_schedule_id_fkey FOREIGN KEY (schedule_id) REFERENCES public.schedule(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: test_attempts test_attempts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_attempts
    ADD CONSTRAINT test_attempts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


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
-- PostgreSQL database dump complete
--

