import DownIcon from "./DownIcon";
import HeroPanel from "./HeroPanel";

function MainPage() {
  return (
    <main className="flex flex-col items-center">
      <HeroPanel />
      <DownIcon className="mt-24" />
    </main>
  );
}

export default MainPage;
