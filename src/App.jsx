import Connect4Grid from "./Connect4Grid";

function App() {
  return (
    <>
      <header className="w-full text-center my-5">
        <h1 className="text-8xl text-yellow-100 [text-shadow:_#FC0_1px_0_10px] dancing-script-bold">
          Connect 4!
        </h1>
      </header>

      <div className="flex justify-between mx-10 flex-wrap">
        <aside className="my-32 w-[300px] h-[50vh] bg-gradient-to-r from-sky-700 to-blue-900 p-2 rounded-lg shadow-2xl outline-8 outline-sky-900 outline-none outline-offset-0 sm:order-2 2xl:order-1">
          <div className="text-white text-lg text-center">
            <p>Player 1: Red</p>
            <p>Player</p>
          </div>
        </aside>

        <main className="sm:order-1 2xl: order-2">
          <Connect4Grid />
        </main>

        <aside className="my-32 w-[300px] h-[50vh] bg-gradient-to-r from-sky-700 to-blue-900 p-2 rounded-lg shadow-2xl outline-8 outline-sky-900 outline-none outline-offset-0 sm:order-3 2xl:">
          <div className="text-white text-lg text-center">
            <p>Player 2: Yellow</p>
            <p>Player</p>
          </div>
        </aside>
      </div>
    </>
  );
}

export default App;
