import Aside from "./components/Aside"
import Hero from "./components/Hero"
import DataCards from "./utils/DataCards"

function App() {

  return (
    <>
      <Aside />
      <main>
        <Hero />
        <DataCards title="Popular Movies" endpoint="movie/popular" />
        <DataCards title="Popular TV Shows" endpoint="tv/top_rated" />
        <DataCards title="Top Rated Movies" endpoint="movie/top_rated" />
        <DataCards title="Top Rated Shows" endpoint="tv/top_rated" />
        <footer>
          <p>Developed by WadyZen &copy; {new Date().getFullYear()}</p>
        </footer>
      </main>
    </>
  )
}

export default App
