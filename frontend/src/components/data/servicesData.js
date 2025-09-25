// src/data/servicesData.js
import {
  Code,
  Smartphone,
  Palette,
  ShoppingCart,
  Cloud,
  BarChart3
} from 'lucide-react';

export const services = [
  {
    id: 1,
    title: "Desarrollo Web",
    description: "Creamos sitios web modernos, rápidos y responsivos con las últimas tecnologías.",
    icon: Code,
    features: ["React & Next.js", "Node.js Backend", "Base de Datos", "SEO Optimizado"],
    price: "Desde $2,500",
    popular: false
  },
  {
    id: 2,
    title: "Aplicaciones Móviles",
    description: "Desarrollo nativo e híbrido para iOS y Android con experiencia excepcional.",
    icon: Smartphone,
    features: ["iOS & Android", "React Native", "Flutter", "Publicación en Stores"],
    price: "Desde $4,000",
    popular: true
  },
  {
    id: 3,
    title: "Diseño UI/UX",
    description: "Diseños intuitivos y atractivos que convierten visitantes en clientes.",
    icon: Palette,
    features: ["Wireframes", "Prototipos", "Design System", "Testing Usuario"],
    price: "Desde $1,500",
    popular: false
  },
  {
    id: 4,
    title: "E-Commerce",
    description: "Tiendas online completas con pasarelas de pago y gestión de inventario.",
    icon: ShoppingCart,
    features: ["Shopify/WooCommerce", "Pagos Online", "Inventario", "Analytics"],
    price: "Desde $3,500",
    popular: false
  },
  {
    id: 5,
    title: "Cloud & DevOps",
    description: "Infraestructura escalable en la nube con CI/CD automatizado.",
    icon: Cloud,
    features: ["AWS/Azure", "Docker", "CI/CD", "Monitoreo 24/7"],
    price: "Desde $2,000",
    popular: false
  },
  {
    id: 6,
    title: "Marketing Digital",
    description: "Estrategias digitales para aumentar tu presencia online y ventas.",
    icon: BarChart3,
    features: ["SEO/SEM", "Social Media", "Email Marketing", "Analytics"],
    price: "Desde $1,200",
    popular: false
  }
];