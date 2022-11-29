import { Route } from "wouter";
import AboutUs from "./components/AboutUs";
import MainPage from "./components/MainPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <main className="px-4 container m-auto">
        <Route path="/">
          <MainPage />
        </Route>
        <Route path="/about-us">
          <AboutUs />
        </Route>
      </main>
    </div>
  );
}

export default App;
