import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import PokemonCardContainer from "./components/PokemonCardContainer";
import "./output.css";

function App() {
  return (
    <div className="flex flex-col bg-gray-600 text-white min-h-screen">
      <Header />
      <HeroSection />
      <PokemonCardContainer />
      <Footer />
    </div>
  );
}

export default App;
