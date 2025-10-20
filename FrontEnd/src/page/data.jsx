import {
  School,
  LibraryBooks,
  SportsSoccer,
  Science,
  Apartment,
  Assignment
} from '@mui/icons-material';
import { 
      AddLocationAltOutlined, PhoneIphone,
      EmailOutlined, Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material"
import team1 from './functionimage/team-1.png';
import team2 from './functionimage/team-2.png';
import team3 from './functionimage/team-3.png';
import {
  Groups,
  EmojiEvents,
  Class,
  SportsBasketball
} from '@mui/icons-material';

export const about = [
  {
    title:"About",
    text: "Y-High School",
    name: "L'excellence pour tous",
    post: "Réussite et épanouissement",
    design: "École innovante, avenir brillant",
    p1:"Bienvenue à Y-High School, où l'excellence académique rencontre l'épanouissement personnel. Notre établissement forme les leaders de demain.",
    p2: "Chez Y-High School, nous croyons que chaque élève possède un talent unique. Notre mission : révéler son potentiel et nourrir sa curiosité.",
    p3: "Un environnement stimulant, des professeurs dévoués, une communauté bienveillante. Y-High School : bien plus qu'une école, un second foye"
},
]

export const services = [
  {
    id: 1,
    icon: <School />,
    title: "Orientation Personnalisée",
    desc: "Accompagnement sur-mesure pour aider chaque élève à construire son projet d'études et son avenir professionnel.",
  },
  {
    id: 2,
    icon: <LibraryBooks />,
    title: "Soutien Scolaire",
    desc: "Cours de rattrapage et tutorat par des enseignants dédiés pour garantir la réussite de tous les élèves.",
  },
  {
    id: 3,
    icon: <SportsSoccer />,
    title: "Activités Périscolaires",
    desc: "Musique, sport, théâtre et robotique : découvrez nos nombreux clubs et ateliers éducatifs.",
  },
  {
    id: 4,
    icon: <Science />,
    title: "Laboratoires Modernes",
    desc: "Équipements high-tech et laboratoires récents pour des cours de sciences pratiques et innovantes.",
  },
  {
    id: 5,
    icon: <Apartment />,
    title: "Internat & Vie Scolaire",
    desc: "Environnement sécurisé et bienveillant avec un internat moderne et une vie scolaire épanouissante.",
  },
  {
    id: 6,
    icon: <Assignment />,
    title: "Préparation aux Examens",
    desc: "Stages intensifs, bac blancs et méthodes de travail pour aborder sereinement le brevet et le baccalauréat.",
  },
]


export const functions = [
  {
    id: 1,
    text: "Y-High School a offert à mes enfants un environnement exceptionnel pour leur épanouissement. L'excellence académique et le suivi personnalisé font toute la différence.",
    image: team1,
    name: "Pierre Martin",
    post: "Directeur Général",
  },
  {
    id: 2,
    text: "En tant que professeur principal, je constate quotidiennement la qualité de l'enseignement et l'engagement des élèves. Une communauté éducative remarquable.",
    image: team2,
    name: "Sophie Bernard",
    post: "Professeure Principale",
  },
  {
    id: 3,
    text: "Les méthodes pédagogiques innovantes et l'accompagnement personnalisé ont permis à ma fille de progresser considérablement. Je recommande vivement cet établissement.",
    image: team3,
    name: "Marie Dubois",
    post: "Parent d'élève",
  },
  
]

export const contact = [
  {
    icon: <AddLocationAltOutlined />,
    text1: "2651 Main Street, Suit 124",
    text2: "Seattle, WA, 98101",
  },
  {
    icon: <PhoneIphone />,
    text1: "0123456789",
    text2: "0345627891",
  },
  {
    icon: <EmailOutlined />,
    text1: "hello@thetheme.io",
    text2: "inf0@brex-theme.io",
  },
]
export const social = [
  {
    icon: <Facebook />,
  },
  {
    icon: <Twitter />,
  },
  {
    icon: <Instagram />,
  },
  {
    icon: <YouTube />,
  },
]

export const project = [
  {
    id: 1,
    icon: <School />,
    num: "1250",
    title: "ÉLÈVES INSCRITS",
  },
  {
    id: 2,
    icon: <Groups />,
    num: "68",
    title: "ENSEIGNANTS QUALIFIÉS",
  },
{
  id: 3,
  icon: <EmojiEvents />,
  num: "25",
  title: "ANNÉES D'EXPÉRIENCE",
},
  {
    id: 4,
    icon: <Class />,
    num: "42",
    title: "CLASSES ACTIVES",
  },
  {
    id: 5,
    icon: <Science />,
    num: "15",
    title: "LABORATOIRES",
  },
  {
    id: 6,
    icon: <SportsBasketball />,
    num: "28",
    title: "ACTIVITÉS PÉRISCOLAIRES",
  },
]