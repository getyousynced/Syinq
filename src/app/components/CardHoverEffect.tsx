import { HoverEffect } from "../utils/CardHoverUtils/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
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
