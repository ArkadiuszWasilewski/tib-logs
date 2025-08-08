import PaymentsPage from "@/components/tables/payments/page";
import { data } from "@/lib/rankingData";
import RankingsPage from "@/components/tables/rankings/page";

const Rankings = () => {
  
  console.log(data);

  return (
    <>
      <RankingsPage />
      <PaymentsPage />
    </>
  );
};
export default Rankings;
