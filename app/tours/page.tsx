import { Metadata } from "next";
import Tours from "@/components/Tours";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Екскурсії по Львову | Доступні тури та маршрути",
  description: "Ознайомтесь з доступними екскурсіями по Львову. Історичний центр, легенди, кавовий Львів та архітектурні перлини.",
  keywords: "екскурсії Львів, тури Львів, маршрути Львів, історичний центр Львова, кавовий Львів",
};

export default function ToursPage() {
  return (
    <main className="min-h-screen">
      <Tours />
      <Footer />
    </main>
  );
}

