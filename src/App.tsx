import './App.css'
import RecipeReviewCard from "./components/Recipe/Recipe.tsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/verify" element={<RecipeReviewCard />} />
          </Routes>
      </Router>
  )
}

export default App
