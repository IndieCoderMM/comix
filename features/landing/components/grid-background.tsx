const GridBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 flex h-[50rem] w-full items-center justify-center bg-black bg-grid-white/[0.2]">
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    </div>
  );
};

export default GridBackground;
