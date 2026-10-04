export type Tag = 'visuals' | 'music' | 'tools' | 'web3' | 'teaching' | 'life'

export const tags: Tag[] = ['visuals', 'music', 'tools', 'web3', 'teaching', 'life']

export interface Mentionable {
  year: string
  title: string
  where?: string
  tag: Tag
  link?: string
}

export const mentionables: Mentionable[] = [
  { year: '2026', title: 'Aimparency — OpenAI Build Week entry, developer tools', tag: 'tools', link: 'https://github.com/aimparency/v7' },
  { year: '2026', title: 'Guest lecture on real-time fulldome visuals, round two', where: 'Hochschule Bremen', tag: 'teaching' },
  { year: '2025', title: 'Live real-time visuals under the dome', where: 'Jena Fulldome Festival, Zeiss Planetarium', tag: 'visuals' },
  { year: '2025', title: 'Janus Award, newcomer category — AI-assisted fulldome film', tag: 'visuals' },
  { year: '2025', title: 'Guest lecture: programming visuals for planetaria', where: 'Hochschule Bremen', tag: 'teaching' },
  { year: '2025', title: 'Online workshop: fulldome visuals with modern AI tools', where: 'TH Lübeck', tag: 'teaching', link: 'https://dlc.sh/lernangebot/5519' },
  { year: '2025', title: 'Festival WiFi for ~5000 people via Starlink + 5G fallback', where: 'Wilde Möhre', tag: 'life' },
  { year: '—', title: 'Started a regular open jam — community music', where: 'Grandhotel Cosmopolis, Augsburg', tag: 'music' },
  { year: '—', title: 'Recorded jam sessions with friends', where: 'Hupfeldcenter, Leipzig', tag: 'music', link: 'https://soundcloud.com/fairlix/sets/hupfeldcenter-leipzig-jam-session-recordings' },
  { year: '2024', title: 'Browser-based projection mapping, Triebwerke stage', where: 'Fusion Festival', tag: 'visuals', link: 'https://www.youtube.com/watch?v=Mu_5WgnE25M' },
  { year: '2024', title: 'Gliders VR, Dragons, Music Box — WebXR & WebAudio pieces', tag: 'visuals', link: 'https://gfx.aimparency.org/gliders-vr/' },
  { year: '2023', title: 'Taught a neural net to anticipate kicks and snares in real time', tag: 'music', link: 'https://github.com/felixniemeyer/dance' },
  { year: '2023', title: 'End-of-line driver', where: 'Tesla Gigafactory Berlin', tag: 'life' },
  { year: '2023', title: 'Spacies — artwork with its own NFT contract on Ethereum mainnet', tag: 'web3', link: 'https://opensea.io/collection/spacies' },
  { year: '2022', title: 'Von Ton zu Ton — AR sound sculptures, three exhibitions', where: 'D&C Studio, motion.lab, Lobe Block', tag: 'music', link: 'https://www.youtube.com/watch?v=EfrT8ds3aJU' },
  { year: '2022', title: 'Hackathon winner — Summits, community goal funding', where: 'NEAR', tag: 'web3', link: 'https://devpost.com/software/summits' },
  { year: '2022', title: 'Eyesoup — WebGL meets pose estimation', tag: 'visuals', link: 'https://gfx.aimparency.org/eyesoup/' },
  { year: '2021', title: '$5k community grant for a-jam, turn-based jam sessions', where: 'IPFS', tag: 'music', link: 'https://github.com/felixniemeyer/a-jam' },
  { year: '2019', title: 'Sense — an artful indie game', where: 'Revision demoparty', tag: 'visuals' },
  { year: '2019', title: 'Volunteered at an artistic social project', where: 'Grandhotel Cosmopolis, Augsburg', tag: 'life' },
  { year: '2018', title: 'Exchange semester, a little Mandarin', where: 'Peking University', tag: 'life' },
  { year: '—', title: 'GPU particle aquarium in Rust & Vulkan', tag: 'visuals', link: 'https://github.com/felixniemeyer/aquarium' },
  { year: '2017', title: 'Started Aimparency — mapping how ideas get realized', tag: 'tools' },
  { year: '2015', title: 'IT consultant for BMW Bank & ING DiBa', where: 'Senacor', tag: 'life' },
  { year: '2012', title: 'Student assistant — web apps for personalized medicine research', where: 'HPI Potsdam', tag: 'life' },
  { year: '2011', title: 'Real-time Mandelbrot explorer on the GPU — my school final project', tag: 'visuals' },
]

export interface Work {
  title: string
  kind: string
  text: string
  link: string
  image?: string
  // shown side by side instead of image
  images?: string[]
  youtube?: string
  hue: number
  wide?: boolean
  code?: string
  // show the whole image, e.g. a round domemaster frame
  contain?: boolean
}

export const reel = {
  title: 'Showreel 2023–24',
  caption: 'web artworks in TypeScript × WebGL',
  youtube: 'qSFPjT7S720',
}

export const works: Work[] = [
  {
    title: 'Onyx Orbital',
    kind: 'fulldome',
    text: 'A fulldome piece in collaboration with the Berlin-based Actias.',
    link: 'https://www.youtube.com/watch?v=ACkpjPBUipg',
    youtube: 'ACkpjPBUipg',
    hue: 300,
    wide: true,
    contain: true,
  },
  {
    title: 'Aimparency',
    kind: 'open source · since 2017',
    wide: true,
    text: 'A local-first graph for breaking ideas into realizable steps — next to real repos, shared between humans and agents. Open source on GitHub.',
    link: 'https://github.com/aimparency/v7',
    image: '/img/aimparency.webp',
    hue: 160,
  },
  {
    title: 'Fusion Festival',
    kind: 'projection mapping',
    text: 'Browser-based art mapped onto the Triebwerke stage.',
    link: 'https://www.youtube.com/watch?v=Mu_5WgnE25M',
    youtube: 'Mu_5WgnE25M',
    hue: 320,
  },
  {
    title: 'Dome Control',
    kind: 'multiplayer fulldome',
    text: 'The audience picks up their phones and steers the planetarium together — orientation sensors fly a shared camera through raymarched worlds, over WebRTC.',
    link: 'https://www.instagram.com/reel/Da-R67aO0nX/',
    code: 'https://github.com/felixniemeyer/domecontrol',
    images: ['/img/domecontrol-phone.webp', '/img/domecontrol-dome.webp'],
    hue: 200,
  },
  {
    title: 'Von Ton zu Ton',
    kind: 'AR sound installation',
    text: 'Point your phone at virtual shapes, morph them with your fingers. The same raymarching shader renders image and sound.',
    link: 'https://www.youtube.com/watch?v=EfrT8ds3aJU',
    youtube: 'EfrT8ds3aJU',
    hue: 40,
  },
  {
    title: 'avonx & av-controls',
    kind: 'platform · protocol',
    text: 'A marketplace for web-based visuals, plus the open-source stack around it: a protocol to steer an artwork from a touchscreen in another tab or device, a live controller and a timeline editor.',
    link: 'https://avonx.space/',
    image: 'https://i.ytimg.com/vi/ON_HjSk2mFM/hqdefault.jpg',
    code: 'https://github.com/avonx2/av-controls',
    hue: 260,
  },
  {
    title: 'a-jam',
    kind: 'WebAudio · IPFS grant',
    text: 'Multiplayer, turn-based GarageBand. Record on top of each other, asynchronously.',
    link: 'https://github.com/felixniemeyer/a-jam',
    image: '/img/a-jam.webp',
    hue: 20,
  },
  {
    title: 'entour.fyi',
    kind: 'live · for travelers',
    text: 'Draw where you went, pin photos and stories to the way.',
    link: 'https://entour.fyi',
    image: '/img/entour.webp',
    hue: 120,
  },
  {
    title: 'Dance',
    kind: 'PyTorch',
    text: 'A network that anticipates kick and snare onsets in live audio, so visuals can hit on the beat instead of after it.',
    link: 'https://github.com/felixniemeyer/dance',
    hue: 290,
  },
  {
    title: 'Eyesoup',
    kind: 'WebGL · TensorFlow.js',
    text: 'Your body, read by PoseNet, stirring a soup of eyes.',
    link: 'https://gfx.aimparency.org/eyesoup/',
    image: '/img/eyesoup.webp',
    hue: 0,
  },
  {
    title: 'Sense',
    kind: 'game · Revision 2019',
    text: 'An artful little indie game, made for the demoscene.',
    link: 'https://github.com/felixniemeyer',
    image: '/img/sense.webp',
    hue: 210,
  },
  {
    title: 'Space Cities',
    kind: 'generative 3D',
    text: 'Animated cities floating in nothing. Its sibling Spacies lives on Ethereum.',
    link: 'https://opensea.io/collection/spacies',
    image: '/img/space-cities.webp',
    hue: 230,
  },
  {
    title: 'Aquarium',
    kind: 'Rust · Vulkan',
    text: 'A GPU particle system, written close to the metal.',
    link: 'https://youtu.be/5SW9_pk5zME',
    youtube: '5SW9_pk5zME',
    hue: 180,
  },
  {
    title: 'Showreel 2024–25',
    kind: 'TypeScript × WebGL',
    text: 'A year of real-time visuals for clubs, festivals and domes. Everything runs in a browser tab.',
    link: 'https://youtu.be/GMfG0bsNeqY',
    youtube: 'GMfG0bsNeqY',
    hue: 190,
  },
]

export const contact = {
  email: 'niemeyer.felix@gmail.com',
  github: 'https://github.com/felixniemeyer',
  soundcloud: 'https://soundcloud.com/fairlix',
  youtube: 'https://www.youtube.com/@meowcrobe',
  instagram: 'https://instagram.com/fairlix',
}

export interface Track {
  title: string
  text: string
  link: string
}

export const music = {
  jam: {
    title: 'Open jam at Grandhotel Cosmopolis',
    text: 'A regular community music round I started in Augsburg, connected to Marja Burchard of Embryo and the phenomenon of community music.',
  },
  tracks: [
    {
      title: 'Seven Sketches',
      text: 'An album of seven songs.',
      link: 'https://www.youtube.com/playlist?list=PL1InbvtAEdhYEEp44h2rz9InanjzMrNM2',
    },
    {
      title: 'Hupfeldcenter jam sessions',
      text: 'Recorded with friends in Leipzig.',
      link: 'https://soundcloud.com/fairlix/sets/hupfeldcenter-leipzig-jam-session-recordings',
    },
  ] as Track[],
  built: [
    { title: 'a-jam', text: 'turn-based jam sessions in the browser', link: 'https://github.com/felixniemeyer/a-jam' },
    { title: 'Von Ton zu Ton', text: 'AR shapes you can play', link: 'https://www.youtube.com/watch?v=EfrT8ds3aJU' },
    { title: 'Dance', text: 'a net that hears the kick coming', link: 'https://github.com/felixniemeyer/dance' },
    { title: 'Music Box', text: 'my first WebAudio piece', link: 'https://gfx.aimparency.org/music-box/' },
  ] as Track[],
}
