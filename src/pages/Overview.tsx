import DataCard from "@/components/ui/DataCard.tsx";

function Overview() {
  return (
      <div className="pt-5 px-6">
          <div className="text-center mb-8">
              <h1 className="text-4xl font-bold">Pozycja ISS w czasie rzeczywistym</h1>
              <p className="text-lg text-gray-600">Śledzenie Międzynarodowej Stacji Kosmicznej na orbicie Ziemi</p>
              <span className="mt-2 inline-block text-sm text-green-600 font-medium">🟢 Ostatnia aktualizacja: 00:00:00</span>
          </div>

          <div className="flex justify-center mb-10">
              <img
                  src="src/images/placeholdermap.png"
                  alt="Mapa ISS"
                  className="w-full max-w-5xl rounded-lg shadow-lg"
              />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <DataCard label="Szerokość" value="34.05" unit="°" type="latitude" />
              <DataCard label="Długość" value="-118.24" unit="°" type="longitude" />
              <DataCard label="Wysokość" value="400" unit="km" type="altitude" />
              <DataCard label="Prędkość" value="7" unit="km/s" type="speed" />
          </div>
      </div>
  );
}

export default Overview;
