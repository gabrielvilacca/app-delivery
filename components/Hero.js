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
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-3xl text-zinc-800 font-bold mt-12 mb-2">
            Rafa's Burguer
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
            <span className="font-semibold text-gray-800">4,5km de você </span>
          </div>
          <div className="text-sm font-medium text-gray-800 flex space-x-4">
            <span className="flex items-center space-x-2">
              <i>
                <svg
                  className="w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="coins"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M512 80C512 98.01 497.7 114.6 473.6 128C444.5 144.1 401.2 155.5 351.3 158.9C347.7 157.2 343.9 155.5 340.1 153.9C300.6 137.4 248.2 128 192 128C183.7 128 175.6 128.2 167.5 128.6L166.4 128C142.3 114.6 128 98.01 128 80C128 35.82 213.1 0 320 0C426 0 512 35.82 512 80V80zM160.7 161.1C170.9 160.4 181.3 160 192 160C254.2 160 309.4 172.3 344.5 191.4C369.3 204.9 384 221.7 384 240C384 243.1 383.3 247.9 381.9 251.7C377.3 264.9 364.1 277 346.9 287.3C346.9 287.3 346.9 287.3 346.9 287.3C346.8 287.3 346.6 287.4 346.5 287.5L346.5 287.5C346.2 287.7 345.9 287.8 345.6 288C310.6 307.4 254.8 320 192 320C132.4 320 79.06 308.7 43.84 290.9C41.97 289.9 40.15 288.1 38.39 288C14.28 274.6 0 258 0 240C0 205.2 53.43 175.5 128 164.6C138.5 163 149.4 161.8 160.7 161.1L160.7 161.1zM391.9 186.6C420.2 182.2 446.1 175.2 468.1 166.1C484.4 159.3 499.5 150.9 512 140.6V176C512 195.3 495.5 213.1 468.2 226.9C453.5 234.3 435.8 240.5 415.8 245.3C415.9 243.6 416 241.8 416 240C416 218.1 405.4 200.1 391.9 186.6V186.6zM384 336C384 354 369.7 370.6 345.6 384C343.8 384.1 342 385.9 340.2 386.9C304.9 404.7 251.6 416 192 416C129.2 416 73.42 403.4 38.39 384C14.28 370.6 .0003 354 .0003 336V300.6C12.45 310.9 27.62 319.3 43.93 326.1C83.44 342.6 135.8 352 192 352C248.2 352 300.6 342.6 340.1 326.1C347.9 322.9 355.4 319.2 362.5 315.2C368.6 311.8 374.3 308 379.7 304C381.2 302.9 382.6 301.7 384 300.6L384 336zM416 278.1C434.1 273.1 452.5 268.6 468.1 262.1C484.4 255.3 499.5 246.9 512 236.6V272C512 282.5 507 293 497.1 302.9C480.8 319.2 452.1 332.6 415.8 341.3C415.9 339.6 416 337.8 416 336V278.1zM192 448C248.2 448 300.6 438.6 340.1 422.1C356.4 415.3 371.5 406.9 384 396.6V432C384 476.2 298 512 192 512C85.96 512 .0003 476.2 .0003 432V396.6C12.45 406.9 27.62 415.3 43.93 422.1C83.44 438.6 135.8 448 192 448z"
                  ></path>
                </svg>
              </i>
              Pedido Mínimo
              <b>R$ 10,00</b>
            </span>
            <div className="flex items-center space-x-2">
              <span className="flex items-center space-x-2">
                <i>
                  <svg
                    className="w-5"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="motorcycle"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path
                      fill="currentColor"
                      d="M342.5 32C357.2 32 370.7 40.05 377.6 52.98L391.7 78.93L439.1 39.42C444.9 34.62 452.1 32 459.6 32H480C497.7 32 512 46.33 512 64V96C512 113.7 497.7 128 480 128H418.2L473.3 229.1C485.5 226.1 498.5 224 512 224C582.7 224 640 281.3 640 352C640 422.7 582.7 480 512 480C441.3 480 384 422.7 384 352C384 311.1 402.4 276.3 431.1 252.8L415.7 224.2C376.1 253.4 352 299.8 352 352C352 362.1 353.1 373.7 355.2 384H284.8C286.9 373.7 287.1 362.1 287.1 352C287.1 263.6 216.4 192 127.1 192H31.1V160C31.1 142.3 46.33 128 63.1 128H165.5C182.5 128 198.7 134.7 210.7 146.7L255.1 192L354.1 110.3L337.7 80H279.1C266.7 80 255.1 69.25 255.1 56C255.1 42.75 266.7 32 279.1 32L342.5 32zM448 352C448 387.3 476.7 416 512 416C547.3 416 576 387.3 576 352C576 316.7 547.3 288 512 288C509.6 288 507.2 288.1 504.9 288.4L533.1 340.6C539.4 352.2 535.1 366.8 523.4 373.1C511.8 379.4 497.2 375.1 490.9 363.4L462.7 311.2C453.5 322.3 448 336.5 448 352V352zM253.8 376C242.5 435.2 190.5 480 128 480C57.31 480 0 422.7 0 352C0 281.3 57.31 224 128 224C190.5 224 242.5 268.8 253.8 328H187.3C177.9 304.5 154.9 288 128 288C92.65 288 64 316.7 64 352C64 387.3 92.65 416 128 416C154.9 416 177.9 399.5 187.3 376H253.8zM96 352C96 334.3 110.3 320 128 320C145.7 320 160 334.3 160 352C160 369.7 145.7 384 128 384C110.3 384 96 369.7 96 352z"
                    ></path>
                  </svg>
                </i>{" "}
                <b>30-50</b> min
              </span>
              <span className="text-[#077c22]"> Grátis</span>
            </div>
          </div>
          <div className="font-medium text-sm text-gray-800 flex items-center space-x-2">
            <i aria-hidden="true" data-fa-i2svg="">
              <svg
                className="w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="star"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"
                ></path>
              </svg>
            </i>
            <b>4,9 </b>
            (2.136 avaliações)
          </div>
          <div className="text-sm font-semibold text-red-600">
            Aberto • 24 Horas
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
