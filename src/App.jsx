import Header from "./components/Header";
import PokemonCardContainer from "./components/PokemonCardContainer";
import "./output.css";

function App() {
  return (
    <div className="bg-gray-700 flex justify-center">
      <Header />
      <div className="pt-[90px] text-white max-w-[800px]">
        <PokemonCardContainer />
      </div>
    </div>
  );
}

export default App;
