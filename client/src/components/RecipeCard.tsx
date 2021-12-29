import React from "react";
import { Recipe } from "../redux/reducers/types";
import { Link } from "react-router-dom";

type Props = {
  recipe: Recipe;
  id: string;
};

export const RecipeCard: React.FC<Props> = ({ recipe, id }) => {

  return (
    <div className="border border-blueLight rounded m-2 p-6 w-1/2">
      <div>
        <div>
          <Link to={`/recipe/${id}`}>
            <p className="text-gray-800 font-semibold">{recipe.title}</p>
          </Link>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-brownLight text-sm ">{recipe.style.split(". ")[1]}</p>
          <p className="text-gray-900">{recipe.sub_category}</p>
        </div>
      </div>

      <div className="flex justify-start gap-6">
        <div className="flex items-center gap-2">
          <p className="text-brown1">OG:</p>
          <p>{recipe.characteristics.original_gravity}</p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-brown1">FG:</p>
          <p>{recipe.characteristics.final_gravity}</p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-brown1">ABV:</p>
          <p>{recipe.characteristics.alcohol_by_volume}</p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-brown1">IBU:</p>
          <p>{recipe.characteristics.ibu}</p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-brown1">SRM:</p>
          <p>{recipe.characteristics.srm}</p>
        </div>
      </div>
    </div>
  );
};
