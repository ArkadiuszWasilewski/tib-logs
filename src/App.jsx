import Header from "./components/Header";
import PokemonCardContainer from "./components/PokemonCardContainer";
import "./output.css";

function App() {
  return (
    <div className="bg-gray-600 flex justify-center">
      <Header />
      <div className="pt-[100px] text-white max-w-screen-lg">
        <PokemonCardContainer />
      </div>
    </div>
  );
}

export default App;
