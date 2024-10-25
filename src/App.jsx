import Aside from "./components/Aside"
import Hero from "./components/Hero"
import DataDisplay from "./utils/DataDisplay"

function App() {

  return (
    <>
      <Aside />
      <main>
        <Hero />
        <DataDisplay title="Popular Movies" endpoint="movie/popular" />
        <DataDisplay title="Popular TV Shows" endpoint="tv/top_rated" />
        <DataDisplay title="Top Rated Movies" endpoint="movie/top_rated" />
        <DataDisplay title="Top Rated Shows" endpoint="tv/top_rated" />
        <footer>
          <p>Developed by WadyZen &copy; {new Date().getFullYear()}</p>
        </footer>
      </main>
    </>
  )
}

export default App
