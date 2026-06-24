export type Testimonial = {
  name: string;
  role: string; // campus / year
  city: string;
  route: string;
  saving: string;
  quote: string;
  photo: string;
};

/**
 * City/campus-attributed testimonials with a specific route + saving (Bob-style
 * specificity). Photos are real campus faces from the brand asset set.
 * Marked as early-member experiences.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ananya Gupta",
    role: "3rd year, Bennett University",
    city: "Greater Noida",
    route: "Campus → Pari Chowk",
    saving: "₹140 / day",
    quote:
      "I used to spend ₹200+ on a solo cab to the metro. Now I pool with two classmates from my own batch, same route, verified faces, and we split it three ways.",
    photo: "/revamp/photos/testimonial-f.webp",
  },
  {
    name: "Rohit Singh",
    role: "Host · Galgotias University",
    city: "Greater Noida",
    route: "Knowledge Park → Campus",
    saving: "fills 3 seats daily",
    quote:
      "I was driving in empty anyway. Hosting on Syinq covers most of my fuel, and the OTP boarding means I always know exactly who's getting in.",
    photo: "/revamp/photos/testimonial-m.webp",
  },
  {
    name: "Priya Sharma",
    role: "2nd year, Sharda University",
    city: "Greater Noida",
    route: "PG → Campus",
    saving: "₹90 / trip",
    quote:
      "No more spamming five WhatsApp groups at 8am. I save my route as Looking and Syinq pings me the moment someone from campus is going the same way.",
    photo: "/revamp/photos/rider-portrait-f.webp",
  },
];
