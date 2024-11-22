export interface NavLink {
  label: string;
  href: string;
}
export interface aboutSectionContent {
  id: number;
  contName: string;
  contHeading: string;
  contText: string;
}
export interface cards {
  id: number;
  img: string;
  top: string;
  left: string;
  content: string;
  leftimg: string;
}

export const NavLinks: NavLink[] = [
  { label: "How it works?", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact us", href: "/contact-us" },
];

export const aboutSectionContent: aboutSectionContent[] = [
  {
    id: 1,
    contName: "History",
    contHeading: "The History of Sync: From WhatsApp Group to Mobile App",
    contText: `Sync originated from the 'Bennett Carpooling' WhatsApp group at Bennett University, where students coordinated carpools, shared information, and bought and sold items. As the group's admin, you recognized the need for a more organized platform to enhance these interactions.

    Inspired by the group's success, you envisioned Sync as a mobile app that would streamline carpooling and incorporate marketplace and announcement features tailored to university students.

    With a dedicated team of developers, you set out to create an intuitive app that addresses the unique challenges faced by college students, providing a convenient, affordable, and sustainable transportation solution. Sync transformed from a simple WhatsApp group into an essential resource for the university community, showcasing the power of grassroots innovation.`,
  },
  {
    id: 2,
    contName: "Team",
    contHeading: "Meet the Team Behind Sync",
    contText: `The Sync team is a diverse group of talented individuals, each bringing a unique set of skills to the table. From developers and designers to project managers, everyone plays a vital role in turning Sync from an idea into a reality.

    Our developers worked tirelessly to build a user-friendly and efficient app that meets the needs of university students. The designers focused on creating a clean and modern interface that is easy to navigate.`,
  },
  {
    id: 3,
    contName: "Vision",
    contHeading: "Sync's Vision for the Future",
    contText: `At Sync, we believe in creating a connected community where students can seamlessly share resources, coordinate rides, and stay informed about campus life. Our vision extends beyond just carpooling — we aim to build a platform that fosters collaboration and sustainability.`,
  },
];
export const cards: cards[] = [
  {
    id: 1,
    image: "/cards_images/carLocation.svg",
    description:
      "Find rides by location, destination, and time. Our smart algorithm matches you with a ride companion based on both location and preferences.",
  },
  {
    id: 2,
    image: "/cards_images/hand.svg",
    description:
      "Make extra cash and help fellow students by offering rides you're already taking. Set your fare, manage your schedule, and choose who to connect with.",
  },
  {
    id: 3,
    image: "/cards_images/idea.svg",
    description:
      "Get updates on your ride with push notifications and in-app messaging.",
  },
  {
    id: 4,
    image: "/cards_images/cash.svg",
    description:
      "Share the ride, share the costs. Split gas and parking, reduce wear on your car, and save extra cash for other student essentials.",
  },
  {
    id: 5,
    image: "/cards_images/leaf.svg",
    description:
      "Make extra cash and help fellow students by offering rides you're already taking. Set your fare, manage your schedule, and choose who to connect with.",
  },
  {
    id: 6,
    image: "/cards_images/people.svg",
    description:
      "Link your Sync account to your social media to view mutual friends and build trust with potential ride partners.",
  },
];

