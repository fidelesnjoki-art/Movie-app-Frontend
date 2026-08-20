// I created a collection of sample posts to populate the movie and series community with different reviews.
export const posts = [

  // Drama

  {

    id: 1,

    user: { name: "Marcus Webb" },

    movie: "The Shawshank Redemption",

    movieId: 278,

    body: "Few films manage to be simultaneously devastating and uplifting. Darabont's adaptation is a masterclass in hope — every frame earns its emotional weight.",

    likes: 214,

    comments: 31,

    stars: 5,

    commentList: [

      { id: 101, user: "Sofia Reyes", body: "The narration by Red is what makes it timeless.", createdAt: "Jan 12" },

      { id: 102, user: "Aisha Nkosi", body: "Watched it three times this year alone.", createdAt: "Jan 14" },

    ],

  },

  {

    id: 2,

    user: { name: "Aisha Nkosi" },

    movie: "Whiplash",

    movieId: 244786,

    body: "Chazelle turns a music conservatory into a war zone. Fletcher is one of cinema's great monsters — and yet you understand him completely by the end.",

    likes: 178,

    comments: 22,

    stars: 5,

    commentList: [

      { id: 103, user: "Lena Hoffmann", body: "The final performance scene is one of the best ever filmed.", createdAt: "Feb 3" },

    ],

  },

  {

    id: 3,

    user: { name: "Lena Hoffmann" },

    movie: "In the Mood for Love",

    movieId: 637,

    body: "Every time the camera lingers on those narrow corridors, the slow motion saturates every pixel with grief. Wong Kar-wai at his most achingly beautiful.",

    likes: 147,

    comments: 23,

    stars: 5,

    commentList: [],

  },

  {

    id: 4,

    user: { name: "James Park" },

    movie: "12 Angry Men",

    movieId: 389,

    body: "A single room. Twelve men. The entire weight of justice. Lumet proves you don't need spectacle when you have this much tension and this many ideas.",

    likes: 132,

    comments: 18,

    stars: 5,

    commentList: [],

  },

  // Horror

  {

    id: 5,

    user: { name: "Sofia Reyes" },

    movie: "Hereditary",

    movieId: 745,

    body: "Ari Aster doesn't just scare you — he dismantles your sense of safety. The dinner table scene alone is more disturbing than most entire horror films.",

    likes: 189,

    comments: 34,

    stars: 5,

    commentList: [

      { id: 104, user: "Marcus Webb", body: "Toni Collette was robbed of every award that year.", createdAt: "Mar 7" },

      { id: 105, user: "James Park", body: "I had to pause it three times. Genuinely unsettling.", createdAt: "Mar 9" },

    ],

  },

  {

    id: 6,

    user: { name: "Elena Vasquez" },

    movie: "The Shining",

    movieId: 694,

    body: "Kubrick weaponises architecture. The Overlook Hotel isn't just a setting — it's a character, a labyrinth of dread that mirrors Jack's unravelling mind.",

    likes: 156,

    comments: 27,

    stars: 5,

    commentList: [],

  },

  {

    id: 7,

    user: { name: "Marcus Webb" },

    movie: "Talk to Me",

    movieId: 539681,

    body: "The A24 horror formula done right. The Philippou brothers understand that the scariest thing isn't the demon — it's watching someone you love disappear.",

    likes: 98,

    comments: 14,

    stars: 4,

    commentList: [],

  },

  // Sci-Fi

  {

    id: 8,

    user: { name: "Lena Hoffmann" },

    movie: "Interstellar",

    movieId: 157336,

    body: "Nolan's most emotionally ambitious film. The docking scene, the tesseract, the bookshelf — it's flawed and magnificent in equal measure.",

    likes: 203,

    comments: 41,

    stars: 5,

    commentList: [

      { id: 106, user: "Sofia Reyes", body: "Hans Zimmer's score carries half the emotional weight.", createdAt: "Apr 2" },

    ],

  },

  {

    id: 9,

    user: { name: "James Park" },

    movie: "Blade Runner 2049",

    movieId: 335984,

    body: "Villeneuve had no right making a sequel this good. Roger Deakins' cinematography is the best of the decade — every frame is a painting.",

    likes: 167,

    comments: 29,

    stars: 5,

    commentList: [],

  },

  {

    id: 10,

    user: { name: "Aisha Nkosi" },

    movie: "2001: A Space Odyssey",

    movieId: 62,

    body: "Kubrick made a film about the entirety of human existence and somehow it works. The Star Gate sequence still feels like nothing else in cinema.",

    likes: 145,

    comments: 19,

    stars: 5,

    commentList: [],

  },

  // Thriller

  {

    id: 11,

    user: { name: "Elena Vasquez" },

    movie: "Pulp Fiction",

    movieId: 680,

    body: "Tarantino rewired what a film could be. The non-linear structure isn't a gimmick — it's the whole point. Every rewatch reveals something new.",

    likes: 221,

    comments: 38,

    stars: 5,

    commentList: [

      { id: 107, user: "Marcus Webb", body: "The Royale with Cheese scene is peak cinema dialogue.", createdAt: "May 1" },

    ],

  },

  {

    id: 12,

    user: { name: "Sofia Reyes" },

    movie: "Fight Club",

    movieId: 550,

    body: "A film that gets more relevant every year. Fincher and Palahniuk's critique of consumerism and masculinity hits harder now than it did in 1999.",

    likes: 198,

    comments: 33,

    stars: 5,

    commentList: [],

  },

  // World Cinema

  {

    id: 13,

    user: { name: "Marcus Webb" },

    movie: "Parasite",

    movieId: 496243,

    body: "Parasite holds up to the third and fourth viewing in ways that surprise me each time. The architecture as metaphor never gets old.",

    likes: 89,

    comments: 12,

    stars: 5,

    commentList: [],

  },

  {

    id: 14,

    user: { name: "James Park" },

    movie: "Spirited Away",

    movieId: 129,

    body: "Miyazaki's greatest achievement. A film that trusts children to handle complexity, grief, and wonder without ever condescending to them.",

    likes: 176,

    comments: 25,

    stars: 5,

    commentList: [

      { id: 108, user: "Aisha Nkosi", body: "The bathhouse sequence is pure imagination.", createdAt: "Jun 5" },

    ],

  },

  {

    id: 15,

    user: { name: "Lena Hoffmann" },

    movie: "Cinema Paradiso",

    movieId: 11216,

    body: "A love letter to cinema itself. The final reel of kisses is one of the most moving sequences ever committed to film. I cry every single time.",

    likes: 134,

    comments: 21,

    stars: 5,

    commentList: [],

  },

  // Noir

  {

    id: 16,

    user: { name: "Elena Vasquez" },

    movie: "Chinatown",

    movieId: 1422,

    body: "Polanski's masterpiece of moral rot. Gittes thinks he's the smartest man in the room — and that's exactly why he loses everything. Devastating.",

    likes: 112,

    comments: 16,

    stars: 5,

    commentList: [],

  },

  // C-Drama

  {

    id: 17,

    user: { name: "Sofia Reyes" },

    movie: "Go Go Squid",

    movieId: 90001,

    body: "Han Shangyan and Tong Nian are the ultimate opposites-attract couple. The e-sports backdrop is fresh and the slow-burn romance is absolutely worth every episode.",

    likes: 241,

    comments: 45,

    stars: 5,

    commentList: [

      { id: 109, user: "James Park", body: "The SP11 vs K&K rivalry is genuinely tense.", createdAt: "Jul 3" },

      { id: 110, user: "Aisha Nkosi", body: "Li Xian carried this entire show on his back.", createdAt: "Jul 5" },

    ],

  },

  {

    id: 18,

    user: { name: "Aisha Nkosi" },

    movie: "Falling Into Your Smile",

    movieId: 90002,

    body: "The first female pro gamer drama done right. Tong Yao and Cheng Xiao have effortless chemistry and the esports matches are actually exciting to watch.",

    likes: 198,

    comments: 37,

    stars: 5,

    commentList: [

      { id: 111, user: "Lena Hoffmann", body: "ZGDX team dynamics are so well written.", createdAt: "Aug 1" },

    ],

  },

  {

    id: 19,

    user: { name: "James Park" },

    movie: "Lighter and Princess",

    movieId: 90003,

    body: "A campus romance that actually respects both leads' intelligence. The coding subplot is surprisingly accurate and the emotional payoff in the final arc is devastating.",

    likes: 174,

    comments: 28,

    stars: 5,

    commentList: [],

  },

  {

    id: 20,

    user: { name: "Lena Hoffmann" },

    movie: "Meet Yourself",

    movieId: 90004,

    body: "A slow, healing drama about a burned-out woman who finds herself in a small Yunnan village. The scenery alone is worth watching but the character work is exceptional.",

    likes: 163,

    comments: 24,

    stars: 5,

    commentList: [

      { id: 112, user: "Sofia Reyes", body: "This drama genuinely made me want to move to Yunnan.", createdAt: "Sep 10" },

    ],

  },

  {

    id: 21,

    user: { name: "Marcus Webb" },

    movie: "Love Between Fairy and Devil",

    movieId: 90006,

    body: "Dylan Wang and Esther Yu have chemistry that leaps off the screen. The xianxia world-building is rich and the romance is genuinely earned rather than just declared.",

    likes: 145,

    comments: 19,

    stars: 4,

    commentList: [],

  },

  {

    id: 22,

    user: { name: "Elena Vasquez" },

    movie: "In Blossom",

    movieId: 90005,

    body: "A mystery romance set in Republican-era China with stunning production design. The dual timeline structure keeps you guessing and the leads are magnetic together.",

    likes: 187,

    comments: 31,

    stars: 5,

    commentList: [],

  },

  {

    id: 23,

    user: { name: "Sofia Reyes" },

    movie: "Story of Kunming Lake",

    movieId: 90007,

    body: "Palace intrigue meets genuine romance in this beautifully shot historical drama. The female lead is one of the most competent and well-written heroines in recent C-drama history.",

    likes: 156,

    comments: 22,

    stars: 5,

    commentList: [],

  },

  {

    id: 24,

    user: { name: "James Park" },

    movie: "Men in Love",

    movieId: 90008,

    body: "A refreshingly grounded modern romance about two very different men competing for the same woman. Funny, warm, and surprisingly emotionally honest about male vulnerability.",

    likes: 132,

    comments: 18,

    stars: 4,

    commentList: [],

  },

];