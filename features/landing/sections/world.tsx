const World = () => {
  return (
    <section className="bg-white py-10 sm:py-16 lg:py-24">
      <div className="mx-container px-4 sm:px-6 lg:px-8">
        <div className="w-full text-center">
          <div className="flex items-center justify-center">
            <div className="-mr-6 h-20 w-20 overflow-hidden rounded-full bg-gray-300">
              <img
                className="h-full w-full object-cover"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/2/female-avatar-1.jpg"
                alt=""
              />
            </div>

            <div className="relative h-28 w-28 overflow-hidden rounded-full border-8 border-white bg-gray-300">
              <img
                className="h-full w-full object-cover"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/2/male-avatar-1.jpg"
                alt=""
              />
            </div>

            <div className="-ml-6 h-20 w-20 overflow-hidden rounded-full bg-gray-300">
              <img
                className="h-full w-full object-cover"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/2/female-avatar-2.jpg"
                alt=""
              />
            </div>
          </div>

          <h2 className="mt-8 text-3xl font-bold leading-tight text-black sm:text-4xl lg:mt-12 lg:text-5xl">
            Join <span className="border-b-8 border-yellow-300">5,482</span>{" "}
            other developers
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-xl text-gray-600 md:mt-10">
            Start tracking your GitHub commits today and see how you stack up
            against other developers.
          </p>
          <div className="relative flex w-full">
            <img
              src="/assets/landing/map.png"
              alt="map"
              className="h-full w-full object-cover"
            />

            <div className="absolute bottom-20 right-20 h-[70px] w-[70px] rounded-full bg-[#5d6680] p-[6px]">
              <img
                src="/assets/landing/people-01.png"
                alt="people"
                className="h-full w-full"
              />
            </div>
            <div className="absolute left-20 top-20 h-[70px] w-[70px] rounded-full bg-[#5d6680] p-[6px]">
              <img
                src="/assets/landing/people-02.png"
                alt="people"
                className="h-full w-full"
              />
            </div>
            <div className="absolute left-[45%] top-1/2 h-[70px] w-[70px] rounded-full bg-[#5d6680] p-[6px]">
              <img
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
