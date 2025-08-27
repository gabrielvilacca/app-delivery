import Image from "next/image";
import bannerpizza from "@/public/banner.jpeg";
import logo from "@/public/logo.jpeg";
import { useState, useEffect } from "react";

export default function Hero() {
  const [userCity, setUserCity] = useState("Carazinho - RS");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLocationAndCity();
  }, []);

  const getCoordinates = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocalização não suportada"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error("Permissão negada"));
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error("Localização indisponível"));
              break;
            case error.TIMEOUT:
              reject(new Error("Tempo limite excedido"));
              break;
            default:
              reject(new Error("Erro ao obter localização"));
          }
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  };

  const getCityName = async (latitude, longitude) => {
    try {
      // Delay para respeitar o rate limit do Nominatim
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&accept-language=pt-BR`
      );

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const data = await response.json();

      if (data && data.address) {
        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.municipality;
        const state = data.address.state || data.address.region;

        if (city && state) {
          return `${city} - ${state}`;
        }
      }

      throw new Error("Cidade não encontrada");
    } catch (error) {
      console.error("Erro ao obter cidade:", error);
      throw error;
    }
  };

  const getLocationAndCity = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const coords = await getCoordinates();
      const cityState = await getCityName(coords.latitude, coords.longitude);
      setUserCity(cityState);
    } catch (error) {
      console.error("Erro:", error);
      setError(error.message);
      // Mantém "Carazinho - RS" como fallback
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    getLocationAndCity();
  };

  return (
    <section className="relative w-full bg-[#f4f5f7] font-sans">
      {/* Banner */}
      <div className="relative w-full h-[200px] md:h-[250px] overflow-hidden">
        <Image
          src={bannerpizza}
          alt="Banner de pizza"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Card de Informações */}
      <div className="relative z-10 -mt-12 p-4 bg-white rounded-3xl border border-border text-black">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl md:text-2xl text-zinc-800 font-bold mt-12 mb-2">
            Imperio dos Combos
          </h1>
          <div className="flex items-center text-sm md:text-base text-gray-600 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="mr-4">
              {isLoading ? (
                <span className="text-gray-400">Perto de você</span>
              ) : error ? (
                <div className="flex items-center">
                  <span className="text-red-500">Erro: {error}</span>
                  <button
                    onClick={handleRetry}
                    className="ml-2 text-blue-500 hover:text-blue-700 text-xs underline"
                  >
                    Tentar novamente
                  </button>
                </div>
              ) : (
                userCity
              )}
            </span>
            <span className="font-semibold text-gray-800">
              Mais informações
            </span>
          </div>
          <div className="text-sm font-semibold text-red-600">
            Fechado • Abrimos amanhã às 18h00
          </div>
        </div>
      </div>

      {/* Logo Circular */}
      <div className="absolute top-[80px] md:top-[220px] left-1/2 transform -translate-x-1/2 w-28 h-28 md:w-36 md:h-36 z-20">
        <Image
          src={logo}
          alt="Logo da Pizzaria"
          className="rounded-full border-4 border-white shadow-lg"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </section>
  );
}
