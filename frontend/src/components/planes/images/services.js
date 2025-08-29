import { Camera, Film, Palette, Award, Monitor } from "lucide-react";

const services = [
  {
    id: 0,
    title: "CINE PUBLICITARIO",
    subtitle: "Comerciales Premium",
    description: "Con equipos de vanguardia y técnicas de postproducción avanzadas, creamos comerciales que destacan visualmente y transmiten el mensaje de manera efectiva.",
    fullDescription: "Filmamos ideas que trascienden, documentamos historias reales, soportamos a las mejores causas, trabajamos para marcas que no le temen a los riesgos, innovación es lo que traemos.",
    icon: <Film className="w-8 h-8" />,
    gradient: "from-red-900 via-red-700 to-orange-600",
    image: "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?w=800&h=600&fit=crop",
    features: ["Equipos 4K/8K", "Drones cinematográficos", "Postproducción avanzada", "Color grading profesional"]
  },
  {
    id: 1,
    title: "SESIÓN FOTOGRÁFICA",
    subtitle: "Historias Reales",
    description: "Capturamos historias auténticas con sensibilidad narrativa y técnica cinematográfica de alto nivel.",
    fullDescription: "Documentamos historias reales que importan, utilizando técnicas narrativas innovadoras para crear conexiones emocionales profundas con la audiencia.",
    icon: <Camera className="w-8 h-8" />,
    gradient: "from-blue-900 via-blue-700 to-cyan-600",
    image: "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?w=800&h=600&fit=crop",
    features: ["Narrativa cinematográfica", "Entrevistas profesionales", "Investigación profunda", "Edición narrativa"]
  },
  {
    id: 2,
    title: "BRANDED CONTENT",
    subtitle: "Contenido de Marca",
    description: "Creamos contenido que conecta marcas con audiencias de manera orgánica y memorable.",
    fullDescription: "Desarrollamos estrategias de contenido que posicionan marcas innovadoras, generando engagement auténtico y duradero.",
    icon: <Award className="w-8 h-8" />,
    gradient: "from-purple-900 via-purple-700 to-pink-600",
    image: "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?w=800&h=600&fit=crop",
    features: ["Estrategia digital", "Contenido viral", "Storytelling de marca", "Distribución multiplataforma"]
  },
  {
    id: 3,
    title: "MOTION GRAPHICS",
    subtitle: "Animación Avanzada",
    description: "Diseño y animación de alta calidad para dar vida a ideas complejas de manera visual y atractiva.",
    fullDescription: "Transformamos conceptos abstractos en experiencias visuales impactantes mediante técnicas de animación de vanguardia.",
    icon: <Palette className="w-8 h-8" />,
    gradient: "from-green-900 via-green-700 to-emerald-600",
    image: "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?w=800&h=600&fit=crop",
    features: ["Animación 2D/3D", "Efectos visuales", "Infografías animadas", "Identidad visual"]
  },
  {
    id: 4,
    title: "STREAMING",
    subtitle: "Producción en Vivo",
    description: "Soluciones completas para eventos en vivo, conferencias y transmisiones de alto impacto.",
    fullDescription: "Producimos eventos en vivo con calidad broadcast, integrando tecnología de streaming avanzada y experiencias interactivas.",
    icon: <Monitor className="w-8 h-8" />,
    gradient: "from-yellow-900 via-yellow-700 to-amber-600",
    image: "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?w=800&h=600&fit=crop",
    features: ["Multi-cámara", "Streaming 4K", "Interactividad", "Producción remota"]
  }
];

export default services;
