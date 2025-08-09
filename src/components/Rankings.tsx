import RankingsPage from "@/components/tables/rankings/page";
import RankingManubar from "./rankingMenubar/RankingMenubar";

const Rankings = () => {
  
  return (
    <div className="border mx-auto p-4">
      <RankingManubar />
      <RankingsPage />
    </div>
  );
};
export default Rankings;
