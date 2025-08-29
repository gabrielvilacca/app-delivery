"use client";

import Image from "next/image";
import r1 from "@/public/comentarios/r1.jpg";
import r2 from "@/public/comentarios/r2.png";
import r3 from "@/public/comentarios/r3.png";
import r4 from "@/public/comentarios/r4.jpg";
import r5 from "@/public/comentarios/r5.jpg";
import r6 from "@/public/comentarios/r6.png";
import r7 from "@/public/comentarios/r7.png";
import r8 from "@/public/comentarios/r8.png";
import r9 from "@/public/comentarios/r9.jpg";
import r10 from "@/public/comentarios/r10.png";
import r11 from "@/public/comentarios/r11.png";
import r12 from "@/public/comentarios/r12.jpg";

// Componente para uma estrela de avaliação
const StarIcon = ({ fill }) => (
  <svg
    className="h-5 w-5"
    fill={fill}
    viewBox="0 0 576 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" />
  </svg>
);

// Componente para uma estrela de meia avaliação
const HalfStarIcon = ({ fill }) => (
  <svg
    className="h-5 w-5"
    fill={fill}
    viewBox="0 0 576 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7zM288 376.4L288.1 376.3L399.7 435.9L378.4 309.6L469.2 219.8L343.8 201.4L288.1 86.85L288 87.14V376.4z" />
  </svg>
);

// Componente reutilizável para um único comentário
const UserComment = ({ name, rating, comment, imageSrc }) => {
  // Converte a nota para um array de estrelas cheias
  const stars = Array(Math.floor(rating))
    .fill(null)
    .map((_, i) => <StarIcon key={i} fill="currentColor" />);

  return (
    <div className="flex items-start justify-between p-4 border-b border-gray-200 last:border-b-0">
      <div className="flex-grow">
        <h3 className="font-bold text-lg text-[#333]">{name}</h3>
        <div className="flex items-center">
          <span className="font-bold text-lg text-[#333] mr-2">
            {rating.toFixed(1).replace(".", ",")}
          </span>
          <span className="flex space-x-1 text-yellow-400">{stars}</span>
        </div>
        <p className="mt-2 text-sm text-[#555]">{comment}</p>
      </div>
      {imageSrc && (
        <div className="ml-4 flex-shrink-0">
          <figure className="m-0">
            <Image
              src={imageSrc}
              width={70}
              height={70}
              loading="lazy"
              alt={`Lanche avaliado por ${name}`}
              className="rounded-lg cursor-pointer"
            />
          </figure>
        </div>
      )}
    </div>
  );
};

// Dados de exemplo para demonstrar a escalabilidade
const commentsData = [
  {
    id: 1,
    name: "Cinthia",
    rating: 5,
    comment: "Surpreendentemente gostoso.",
    imageSrc: r1,
  },
  {
    id: 2,
    name: "Lucas",
    rating: 4,
    comment:
      "Sinceramente? Melhor custo-benefício que já vi! Lanche bom, preço sensacional e entrega rápida.",
    imageSrc: r2,
  },
  {
    id: 3,
    name: "Luiza",
    rating: 5,
    comment:
      "A batata frita estava maravilhosa, bem sequinha, perfeita, com um molho gostoso de alho, não deixe de experimentar... Os hambúrgueres também estavam muito bons, a carne no ponto perfeito. Pedirei mais vezes",
    imageSrc: r3,
  },
  {
    id: 4,
    name: "Ronald",
    rating: 5,
    comment:
      "Quando vi o preço achei q ia ser pequeno, mas me enganei! a qualidade é absurda.",
    imageSrc: r4,
  },
  {
    id: 5,
    name: "Carlla",
    rating: 5,
    comment:
      " A comida fresquinha, saborosa, chegou rapidamente e estava quentinha! ",
    imageSrc: r5,
  },
  {
    id: 6,
    name: "Gregory",
    rating: 5,
    comment:
      "Uma delícia como sempre a comida, parabéns para o pessoal da cozinha.",
    imageSrc: r6,
  },
  {
    id: 7,
    name: "Gustavo",
    rating: 5,
    comment:
      "Bom, barato e entrega rápida. Não tem erro, semana que vem peço de novo",
    imageSrc: r7,
  },
  {
    id: 8,
    name: "Julia",
    rating: 5,
    comment: "Pedi pela primeira vez e td mundo gostou, vamos pedir mais!",
    imageSrc: r8,
  },
  {
    id: 9,
    name: "Jussara",
    rating: 5,
    comment: "Burguer top, amei",
    imageSrc: r9,
  },
  {
    id: 10,
    name: "Isabely",
    rating: 5,
    comment: "Gostei muito Sério kkk",
    imageSrc: r10,
  },
  {
    id: 11,
    name: "Kaue",
    rating: 5,
    comment: "Muito bom, esta de parabénsk",
    imageSrc: r11,
  },
  {
    id: 12,
    name: "Ana",
    rating: 5,
    comment: "Comida saborosa, batata sequinha e crocante e boa porção.",
    imageSrc: r12,
  },
];

const Coments = () => {
  return (
    <div className="flex flex-col gap-4 items-center min-h-screen">
      <div className="w-full max-w-lg p-3 bg-white border-2 border-black rounded-lg shadow-md space-y-4">
        {/* Avaliação Geral */}
        <div className="text-center rounded-md">
          <div className="flex flex-col justify-center items-center space-x-1 mb-2">
            <span className="text-2xl font-bold">4,8</span>
            <div className="flex space-x-0.5">
              <StarIcon fill="#FFD700" />
              <StarIcon fill="#FFD700" />
              <StarIcon fill="#FFD700" />
              <StarIcon fill="#FFD700" />
              <HalfStarIcon fill="#FFD700" />
            </div>
          </div>
          <p className="text-md text-gray-600">
            <span className="font-bold">136 avaliações</span> • últimos 90 dias
          </p>
          <p className="text-md text-gray-400 mt-1">
            1.007 avaliações no total
          </p>
        </div>
      </div>{" "}
      <div className="w-full max-w-lg p-3 space-y-4">
        {/* Lista de Comentários Dinâmica */}
        {commentsData.map((comment) => (
          <UserComment
            key={comment.id}
            name={comment.name}
            rating={comment.rating}
            comment={comment.comment}
            imageSrc={comment.imageSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default Coments;
