import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import RecipeReviewCard from "./components/Recipe/Recipe.tsx";
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RecipeReviewCard/>
  </React.StrictMode>,
)
