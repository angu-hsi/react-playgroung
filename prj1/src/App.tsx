import LoadingSpinner from "./components/LoadingSpinner";
import { Todos } from "./Todos";

function App() {
  return (
    <>
      <LoadingSpinner />
      <h1>Vite + React</h1>
      <Todos />
    </>
  );
}

export default App;
