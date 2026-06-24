import { getPetrolPrice } from "@/lib/petrol";
import SavingsCalculatorClient from "@/components/home/SavingsCalculatorClient";

/** Server wrapper: fetches the (live-ready) petrol price, then renders the
    interactive client calculator. ISR-cached daily via lib/petrol. */
export default async function SavingsCalculator() {
  const petrol = await getPetrolPrice();
  return <SavingsCalculatorClient petrol={petrol} />;
}
