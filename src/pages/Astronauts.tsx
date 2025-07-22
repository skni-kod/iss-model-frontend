import AstronautCard from "../components/AstronautCard";
function Astronauts() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Astronauci obecnie stacjonujący na ISS</h1>
        <div className="@container grid grid-cols-3 items-center gap-6">
            <AstronautCard></AstronautCard>
            <AstronautCard></AstronautCard>
            <AstronautCard></AstronautCard>
            <AstronautCard></AstronautCard>
            <AstronautCard></AstronautCard>
            <AstronautCard></AstronautCard>
        </div>
    </div>
  );
}

export default Astronauts;
