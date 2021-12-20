import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../../utils/recipesUtils";
import { RecipeList } from "../../redux/reducers/types";
import { NavBar } from "../NavBar";
import { CharacteristicsDetail } from "./CharacteristicsDetail";
import { ParametersDetail } from "./ParametersDetail";
import { FermentablesDetail } from "./FermentablesDetail";
import { HopsDetail } from "./HopsDetail";
import { WaterDetail } from "./WaterDetail";
import { Comments } from "./Comments";
import { UserData } from "./UserData";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer";

type RecipeCardDetailParams = {
  id: string;
};

interface State {
  recipe: RecipeList;
}

export const RecipeCardDetail: React.FC = () => {
  const [recipeState, setRecipeState] = useState<State>({
    recipe: {
      recipe: {
        title: "",
        style: "",
        sub_category: "",
        brewery: "",
        parameters: {
          boil_time: 0,
          batch_size: 0,
          pre_boil_size: 0,
          pre_boil_gravity: 0,
          mash_ph: 0,
          efficiency: 0,
        },
        characteristics: {
          original_gravity: 0,
          final_gravity: 0,
          alcohol_by_volume: 0,
          ibu: 0,
          srm: 0,
        },
        ingredients: {
          fermentables: [],
          hops: [{ name: "", quantity: 0, time: 0, use: "", temperature: 0 }],
          yeast: [],
          water_profile: {
            calcium: 0,
            magnesium: 0,
            sodium: 0,
            chlorine: 0,
            sulfate: 0,
            bicarbonate: 0,
          },
        },
        photos: [],
      },
      user_id: "",
      username: "",
      _id: "",
    },
  });


  console.log("RECIPE STATE", recipeState);

  const { id } = useParams<RecipeCardDetailParams>();

  useEffect(() => {
    getRecipeById(id)
      .then((data) => setRecipeState({ recipe: data }))
      .catch((e) => console.log(e));
  }, [id]);

  const { title, style }: { title: string; style: string } =
    recipeState.recipe.recipe;
  const { mash_ph }: { mash_ph: number } = recipeState.recipe.recipe.parameters;
  const { username }: { username: string } = recipeState.recipe;
  console.log(username);

  return (
    <>
      <NavBar route="recipeDetail" />

      <div className="my-8 mx-24">
        <div className="py-4">
          <p className="font-semibold text-4xl">{title}</p>
        </div>

        <div className="grid grid-cols-5 gap-4 ">
          <div className="col-span-1 border border-gray-800 rounded h-full ">
            <UserData username={username} />
          </div>
          <div className="col-span-4">
            <ParametersDetail
              style={style}
              parameters={recipeState.recipe.recipe.parameters}
            />
          </div>
        </div>

        <CharacteristicsDetail
          mash_ph={mash_ph}
          characteristics={recipeState.recipe.recipe.characteristics}
        />

        <WaterDetail
          water={recipeState.recipe.recipe.ingredients.water_profile}
        />

        <FermentablesDetail
          fermentables={recipeState.recipe.recipe.ingredients.fermentables}
        />

        <HopsDetail hops={recipeState.recipe.recipe.ingredients.hops} />

        <Comments />
     
      </div>
    </>
  );
};
