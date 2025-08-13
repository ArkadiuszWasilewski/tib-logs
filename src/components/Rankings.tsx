import RankingsPage from "@/components/Tables/rankings/page";
import RankingMenubar from "@/components/RankingMenubar/RankingMenubar";

const Rankings = () => {
  return (
    <div className="mx-auto p-4">
      <RankingMenubar />
      <RankingsPage />
    </div>
  );
};
export default Rankings;
