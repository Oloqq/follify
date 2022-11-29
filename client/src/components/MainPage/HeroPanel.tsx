function HeroPanel() {
  return (
    <section>
      <div className="flex flex-col items-center mt-12">
        <div className="w-24 h-24 bg-green-500" />
        <h1 className="text-6xl">FOLLIFY</h1>
        <p className="text-green-500">FOLLOW YOUR MUSIC</p>
      </div>

      <div className="flex flex-col items-center gap-12 mt-24">
        <p className="text-xl">
          Connect and stay up to date with your favourite music!
        </p>
        <button className="bg-green-500 hover:bg-green-400 transition-colors px-12 py-4 rounded-full text-2xl text-stone-800 font-bold">
          Connect!
        </button>
      </div>
    </section>
  );
}

export default HeroPanel;
