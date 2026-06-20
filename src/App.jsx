import Home from "./components/Home.jsx"
import DataProvider from "./context/DataProvider.jsx"
import { ThemeModeProvider } from "./context/ThemeModeContext.jsx"

function App() {
  return (
    <ThemeModeProvider>
      <DataProvider>
        <Home/>
      </DataProvider>
    </ThemeModeProvider>
  )
}
export default App

