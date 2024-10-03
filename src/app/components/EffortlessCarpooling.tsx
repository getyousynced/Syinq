import React from "react";

function EffortlessCarpooling() {
  const cards = [
    {
      id: 1,
      img: "/cards_images/car_location.png",
      leftimg: "10%",
      top: "5%",
      left: "10%",
      content:
        "Find rides by location, destination, and time. Our smart algorithm matches you with a ride companion based on both location and preferences.",
    },
    {
      id: 2,
      img: "/cards_images/hand.png",
      leftimg: "15%",
      top: "50%",
      left: "10%",
      content:
        "Make extra cash and help fellow students by offering rides you're already taking. Set your fare, manage your schedule, and choose who to connect with.",
    },
    {
      id: 3,
      img: "/cards_images/idea.png",
      leftimg: "25%",
      top: "100%",
      left: "25%",
      content:
        "Get updates on your ride with push notifications and in-app messaging.",
    },
    {
      id: 4,
      img: "/cards_images/cash.png",
      leftimg: "62%",
      top: "100%",
      left: "55%",
      content:
        "Share the ride, share the costs. Split gas and parking, reduce wear on your car, and save extra cash for other student essentials.",
    },
    {
      id: 5,
      img: "/cards_images/leaf.png",
      leftimg: "77%",
      top: "50%",
      left: "70%",
      content:
        "Make extra cash and help fellow students by offering rides you're already taking. Set your fare, manage your schedule, and choose who to connect with.",
    },
    {
      id: 6,
      img: "/cards_images/people.png",
      leftimg: "82%",
      top: "5%",
      left: "70%",
      content:
        "Link your Sync account to your social media to view mutual friends and build trust with potential ride partners.",
    },
  ];

  return (
    <section className="bg-white mb-20 sm:mb-40 lg:mb-80 font-manrope">
      <div className="px-4 sm:px-6 lg:px-8">
        <header className="w-full flex justify-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-[#099BE4] font-bold text-2xl sm:text-3xl lg:text-4xl text-center">
            Effortless Carpooling
          </h1>
        </header>
        <div className="w-full flex justify-center p-4 sm:p-8 lg:p-[8vw] relative bg-white">
          
          <img className="w-[60%] sm:w-[50%] lg:w-[36%] max-w-md lg:max-w-lg" src="/carpooling.svg" alt="Carpooling" />

          {cards.map((card) => (
            <div key={card.id} className="hidden lg:block">
              <div
                className="absolute"
                style={{ left: card.leftimg, top: card.top }}
              >
                <img className="w-[50%]" src={card.img} alt="icons" />
              </div>
              <div
                className="w-[20%] absolute border-2 rounded-lg border-[#099BE4] p-3 shadow-[#099BE4] shadow-sm"
                style={{ left: card.left, top: `calc(${card.top} + 11%)` }}
              >
                <p className="text-sm lg:text-md font-bold">{card.content}</p>
              </div>
            </div>
          ))}
        </div>

        <section className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {cards.map((card) => (
            <article key={card.id} className="border-2 rounded-lg border-[#099BE4] p-4 shadow-[#099BE4] shadow-sm">
              <img className="w-12 h-12 mb-3" src={card.img} alt="icons" />
              <p className="text-sm font-bold">{card.content}</p>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
}

export default EffortlessCarpooling;
