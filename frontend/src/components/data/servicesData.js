// src/data/servicesData.js
import {
  Video,
  Camera,
  Users,
  Mic,
  Film,
  Radio
} from 'lucide-react';

export const services = [
  {
    id: 1,
    title: "Video Booth 360",
    description: "Cabina de video 360° con tecnología de punta para eventos inolvidables hasta 3 horas.",
    icon: Video,
    features: [
      "Plataforma hasta 3 personas",
      "Brazo extendible y aro LED",
      "Cámara UHD gran angular",
      "Monitor externo con live preview",
      "Sistema QR y Link",
      "4 paneles LED RGB",
      "6 tubos neón LED",
      "Máquina de humo"
    ],
    price: "Q 2,250.00",
    popular: true
  },
  {
    id: 2,
    title: "Sesión Fotográfica",
    description: "Sesión profesional de hasta 6 horas con equipo completo y retoque de 10 fotografías.",
    icon: Camera,
    features: [
      "Duración máxima 6 horas",
      "Cámara Canon profesional",
      "Lente UHD gran angular",
      "Monitor con live preview",
      "Iluminación móvil LED RGB",
      "Máquina de humo",
      "Gripería y stands",
      "2 asistentes",
      "Sistema flash HSS",
      "MacBook Pro para captura",
      "Retoque de 10 fotografías"
    ],
    price: "Q 1,800.00",
    popular: false
  },
  {
    id: 3,
    title: "Sesión Estudio Editorial",
    description: "Sesión en estudio tipo editorial con retoque profesional High End, 3 horas de duración.",
    icon: Film,
    features: [
      "Cámara Sony",
      "Óptica cinematica",
      "Iluminación continua o Flash",
      "Fondo color a elegir",
      "10 fotos estilo editorial con retoque High End",
      "3 horas de estudio"
    ],
    price: "Q 2,520.00",
    popular: false
  },
  {
    id: 4,
    title: "Producción Videos Chroma",
    description: "Paquete de 6 videos de 45min a 1 hora con producción profesional en estudio, 3 días de producción.",
    icon: Video,
    features: [
      "Cámara cinemática 6K SONY FX30",
      "Maleta óptica cinematica 4K",
      "Sistema prompter",
      "4 paneles LED RGB",
      "Maleta de gripería",
      "Kit de rebotes",
      "Trípode Manfroto",
      "Kit de microfonía Rode",
      "Monitor móvil",
      "Kits baterías V Mount",
      "Edición lineal",
      "Textos tipo IA",
      "2 horas estudio chroma",
      "2 clips por día"
    ],
    price: "Q 4,800.00",
    popular: true
  },
  {
    id: 5,
    title: "Live Anunciar Ganadores",
    description: "Transmisión en vivo profesional para anuncio de ganadores con set completo de 2 horas.",
    icon: Radio,
    features: [
      "Locación 2 horas set 50M2",
      "Cámaras con tripode",
      "Computadora y codificadores de stream",
      "Interfaces audio y video",
      "Microfonía profesional",
      "Iluminación set para TV 4 paneles LED",
      "Cintillos, animación de transición y logos"
    ],
    price: "Q 4,095.00",
    popular: false
  },
  {
    id: 6,
    title: "Live Eventos",
    description: "Cobertura completa de eventos en vivo con equipo profesional y paquetería de animaciones.",
    icon: Users,
    features: [
      "2 cámaras con tripode",
      "Ronin",
      "2 operadores",
      "Equipo de switcher",
      "Intercoms",
      "Computadora y codificadores de stream",
      "Microfonía profesional",
      "Iluminación set TV 4 paneles LED",
      "Cintillos, animación y logos",
      "Paquetería animaciones evento"
    ],
    price: "Q 9,652.50",
    popular: false
  }
];