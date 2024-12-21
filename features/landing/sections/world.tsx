import Image from "next/image";

const World = () => {
  return (
    <section className="bg-white py-10 sm:py-16 lg:py-24">
      <div className="mx-container px-4 sm:px-6 lg:px-8">
        <div className="w-full text-center">
          <h2 className="mt-8 text-3xl font-bold leading-tight text-purple-gray sm:text-4xl lg:mt-12 lg:text-5xl">
            Join <span className="border-b-8 border-yellow-300">15,482</span>{" "}
            other developers
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-xl text-gray-600 md:mt-10">
            Track your commits and climb the global leaderboard. See where you
            stand and level up your skills!
          </p>
          <div className="relative flex w-full">
            <Image
              width={1000}
              height={500}
              src="/assets/landing/map.png"
              alt="map"
              className="h-full w-full object-cover"
            />

            <div className="absolute bottom-20 right-20 h-[40px] w-[40px] w-[70px] rounded-full bg-[#5d6680] p-[6px] sm:h-[70px]">
              <Image
                width={70}
                height={70}
                src="/assets/landing/people-01.png"
                alt="people"
                className="object-container h-full w-full"
              />
            </div>
            <div className="top-20h-[40px] absolute left-20 w-[40px] w-[70px] rounded-full bg-[#5d6680] p-[6px] sm:h-[70px]">
              <Image
                width={70}
                height={70}
                src="/assets/landing/people-02.png"
                alt="people"
                className="h-full w-full"
              />
            </div>
            <div className="absolute left-[45%] top-1/2 h-[40px] w-[40px] w-[70px] rounded-full bg-[#5d6680] p-[6px] sm:h-[70px]">
              <Image
                width={70}
                height={70}
                src="/assets/landing/people-03.png"
                alt="people"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default World;
