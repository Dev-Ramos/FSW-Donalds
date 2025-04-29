import Image from "next/image";
import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import { ConsumptionMethodOption } from "./components/consumption-method-option";
import TypeWriterComponent from "./components/type-writer";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

async function RestaurantPage({ params }: RestaurantPageProps) {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return notFound();
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      {/* Logo e Titulo */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={82}
          height={82}
        />
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>
      {/* Bem-vindo */}
      <div className="space-y-2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
        <TypeWriterComponent
          className="opacity-55 h-20"
          words={[
            "Estamos aqui para oferecer praticidade e sabor em cada detalhe. Escolha como prefere aproveitar sua refeição.",
          ]}
          cursor={true}
          typeSpeed={100}
          deleteSpeed={50}
          delaySpeed={2000}
          loop={0}
        />
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 pt-14">
        <ConsumptionMethodOption
          imageUrl="/dine_in.png"
          imageAlt="Para comer aqui"
          buttonText="Para comer aqui"
          option="DINE_IN"
          slug={slug}
        />
        <ConsumptionMethodOption
          imageUrl="/take_away.png"
          imageAlt="Para levar"
          buttonText="Para levar"
          option="TAKEAWAY"
          slug={slug}
        />
      </div>
    </div>
  );
}

export default RestaurantPage;
