const Metrics = () => {
  return (
    <div className="relative flex w-full items-center justify-center bg-blackO bg-gradient-to-t from-black to-transparent">
      <div className="max-container relative flex w-full items-center justify-center gap-10">
        <div className="absolute bottom-0 left-0 right-0 z-50 h-24 bg-gradient-to-t from-blackO to-transparent" />
        <MetricCard
          num={5}
          unit="million"
          description="GlassFlow can process up to 6M events/sec with low latency."
        />
        <MetricCard
          num={5}
          unit="million"
          description="GlassFlow can process up to 6M events/sec with low latency."
        />
        <MetricCard
          num={5}
          unit="million"
          description="GlassFlow can process up to 6M events/sec with low latency."
        />
      </div>
    </div>
  );
};

export default Metrics;

const MetricCard = ({
  num,
  unit,
  description,
}: {
  num: number;
  unit: string;
  description: string;
}) => {
  return (
    <div className="relative z-20 flex h-[250px] w-full flex-col overflow-hidden rounded-lg bg-[#0C0C0E] px-8 py-4">
      <span className="bg-bento-card absolute left-0 right-0 top-0 h-full"></span>
      <span
        className="border-linear [linear-gradient(-63.57deg,#1d1d21_45.3259%,_#131315)] border-box absolute inset-0 !z-0 rounded-[inherit]"
        aria-hidden="true"
      ></span>
      <p>
        <span className="text-gradient text-h2 tracking-tighter">{num}</span>
        <span className="inline-flex items-center px-0.5 text-h3 capitalize text-neutral-300">
          <span className="whitespace-pre">&nbsp;</span>
          {unit}
        </span>
      </p>
      <p className="text-body3 leading-relaxed text-neutral-300">
        {description}
      </p>
    </div>
  );
};
