import { LedMap } from "../../types";

export const GlassesCoordinatesInput = `i	x	y
0	1	0
1	2	0
2	3	0
3	4	0
4	5	0
5	6	0
6	7	0
7	9	0
8	10	0
9	11	0
10	12	0
11	13	0
12	14	0
13	15	0
14	16	1
15	15	1
16	14	1
17	13	1
18	12	1
19	11	1
20	10	1
21	9	1
22	8	1
23	7	1
24	6	1
25	5	1
26	4	1
27	3	1
28	2	1
29	1	1
30	0	1
31	0	2
32	1	2
33	2	2
34	3	2
35	4	2
36	5	2
37	6	2
38	7	2
39	8	2
40	9	2
41	10	2
42	11	2
43	12	2
44	13	2
45	14	2
46	15	2
47	16	2
48	16	3
49	15	3
50	14	3
51	13	3
52	12	3
53	11	3
54	10	3
55	9	3
56	8	3
57	7	3
58	6	3
59	5	3
60	4	3
61	3	3
62	2	3
63	1	3
64	0	3
65	0	4
66	1	4
67	2	4
68	3	4
69	4	4
70	5	4
71	6	4
72	7	4
73	8	4
74	9	4
75	10	4
76	11	4
77	12	4
78	13	4
79	14	4
80	15	4
81	16	4
82	16	5
83	15	5
84	14	5
85	13	5
86	12	5
87	11	5
88	10	5
89	9	5
90	7	5
91	6	5
92	5	5
93	4	5
94	3	5
95	2	5
96	1	5
97	0	5
98	1	6
99	2	6
100	3	6
101	4	6
102	5	6
103	6	6
104	10	6
105	11	6
106	12	6
107	13	6
108	14	6
109	15	6`;

export const GlassesCoordinates: LedMap = {
  duplicateIndices: [],
  gaps: [],
  height: 7,
  input: GlassesCoordinatesInput,
  leds: [
    { index: 0, x: 1, y: 0 },
    { index: 1, x: 2, y: 0 },
    { index: 2, x: 3, y: 0 },
    { index: 3, x: 4, y: 0 },
    { index: 4, x: 5, y: 0 },
    { index: 5, x: 6, y: 0 },
    { index: 6, x: 7, y: 0 },
    { index: 7, x: 9, y: 0 },
    { index: 8, x: 10, y: 0 },
    { index: 9, x: 11, y: 0 },
    { index: 10, x: 12, y: 0 },
    { index: 11, x: 13, y: 0 },
    { index: 12, x: 14, y: 0 },
    { index: 13, x: 15, y: 0 },
    { index: 14, x: 16, y: 1 },
    { index: 15, x: 15, y: 1 },
    { index: 16, x: 14, y: 1 },
    { index: 17, x: 13, y: 1 },
    { index: 18, x: 12, y: 1 },
    { index: 19, x: 11, y: 1 },
    { index: 20, x: 10, y: 1 },
    { index: 21, x: 9, y: 1 },
    { index: 22, x: 8, y: 1 },
    { index: 23, x: 7, y: 1 },
    { index: 24, x: 6, y: 1 },
    { index: 25, x: 5, y: 1 },
    { index: 26, x: 4, y: 1 },
    { index: 27, x: 3, y: 1 },
    { index: 28, x: 2, y: 1 },
    { index: 29, x: 1, y: 1 },
    { index: 30, x: 0, y: 1 },
    { index: 31, x: 0, y: 2 },
    { index: 32, x: 1, y: 2 },
    { index: 33, x: 2, y: 2 },
    { index: 34, x: 3, y: 2 },
    { index: 35, x: 4, y: 2 },
    { index: 36, x: 5, y: 2 },
    { index: 37, x: 6, y: 2 },
    { index: 38, x: 7, y: 2 },
    { index: 39, x: 8, y: 2 },
    { index: 40, x: 9, y: 2 },
    { index: 41, x: 10, y: 2 },
    { index: 42, x: 11, y: 2 },
    { index: 43, x: 12, y: 2 },
    { index: 44, x: 13, y: 2 },
    { index: 45, x: 14, y: 2 },
    { index: 46, x: 15, y: 2 },
    { index: 47, x: 16, y: 2 },
    { index: 48, x: 16, y: 3 },
    { index: 49, x: 15, y: 3 },
    { index: 50, x: 14, y: 3 },
    { index: 51, x: 13, y: 3 },
    { index: 52, x: 12, y: 3 },
    { index: 53, x: 11, y: 3 },
    { index: 54, x: 10, y: 3 },
    { index: 55, x: 9, y: 3 },
    { index: 56, x: 8, y: 3 },
    { index: 57, x: 7, y: 3 },
    { index: 58, x: 6, y: 3 },
    { index: 59, x: 5, y: 3 },
    { index: 60, x: 4, y: 3 },
    { index: 61, x: 3, y: 3 },
    { index: 62, x: 2, y: 3 },
    { index: 63, x: 1, y: 3 },
    { index: 64, x: 0, y: 3 },
    { index: 65, x: 0, y: 4 },
    { index: 66, x: 1, y: 4 },
    { index: 67, x: 2, y: 4 },
    { index: 68, x: 3, y: 4 },
    { index: 69, x: 4, y: 4 },
    { index: 70, x: 5, y: 4 },
    { index: 71, x: 6, y: 4 },
    { index: 72, x: 7, y: 4 },
    { index: 73, x: 8, y: 4 },
    { index: 74, x: 9, y: 4 },
    { index: 75, x: 10, y: 4 },
    { index: 76, x: 11, y: 4 },
    { index: 77, x: 12, y: 4 },
    { index: 78, x: 13, y: 4 },
    { index: 79, x: 14, y: 4 },
    { index: 80, x: 15, y: 4 },
    { index: 81, x: 16, y: 4 },
    { index: 82, x: 16, y: 5 },
    { index: 83, x: 15, y: 5 },
    { index: 84, x: 14, y: 5 },
    { index: 85, x: 13, y: 5 },
    { index: 86, x: 12, y: 5 },
    { index: 87, x: 11, y: 5 },
    { index: 88, x: 10, y: 5 },
    { index: 89, x: 9, y: 5 },
    { index: 90, x: 7, y: 5 },
    { index: 91, x: 6, y: 5 },
    { index: 92, x: 5, y: 5 },
    { index: 93, x: 4, y: 5 },
    { index: 94, x: 3, y: 5 },
    { index: 95, x: 2, y: 5 },
    { index: 96, x: 1, y: 5 },
    { index: 97, x: 0, y: 5 },
    { index: 98, x: 1, y: 6 },
    { index: 99, x: 2, y: 6 },
    { index: 100, x: 3, y: 6 },
    { index: 101, x: 4, y: 6 },
    { index: 102, x: 5, y: 6 },
    { index: 103, x: 6, y: 6 },
    { index: 104, x: 10, y: 6 },
    { index: 105, x: 11, y: 6 },
    { index: 106, x: 12, y: 6 },
    { index: 107, x: 13, y: 6 },
    { index: 108, x: 14, y: 6 },
    { index: 109, x: 15, y: 6 },
  ],
  maxIndex: 109,
  maxX: 16,
  maxY: 6,
  middleX: 8,
  middleY: 3,
  minIndex: 0,
  minX: 0,
  minY: 0,
  width: 17,
};
