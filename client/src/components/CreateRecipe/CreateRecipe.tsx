import React from "react";
import { Recipe } from "../../redux/reducers/types";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  Controller,
} from "react-hook-form";
import { HopsForm } from "./HopsForm";
import { MaltsForm } from "./MaltsForm";
import { WaterForm } from "./WaterForm";
import { BatchParams } from "./BatchParams";
import axios from "axios";
import { Characteristics } from "./Characteristics";
import { NavBar } from "../NavBar";

const initialValues: Recipe = {
  _id: 0,
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
    hops: [{ name: "", quantity: 0, boil_time: 0 }],
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
};

export const CreateRecipe: React.FC<{}> = () => {
  const methods = useForm<Recipe>();

  const formSubmitHandler: SubmitHandler<Recipe> = async (data: Recipe) => {
    try {
      console.log("FORM DATA IS", data);
      const newRecipe = {
        recipe: data,
        name: "",
        user_id: "",
        date: "",
      };
      const response = await axios.post("/recipes/create", newRecipe);
      console.log("RESPONSE:", response);
      methods.reset();
    } catch (e) {
      console.log({ onSubmitError: e });
    }
  };

  return (
    <div>
      <NavBar route='createrecipe' />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          {/* ------------    PART 1 ------------------------ */}
          <div className="mx-8 mt-8 flex justify-between ">
            <p className="text-2xl">Editing Recipe</p>
            <button
              type="submit"
              className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white p-2 border border-gray-500 hover:border-transparent rounded"
            >
              SAVE
            </button>
          </div>
          <div className="flex mx-8 mt-8 gap-8 bg-orange-100">
            <div className="p-4">
              <label className="my-2 text-gray-700 text-md font-semibold">
                Title
              </label>
              <Controller
                name="title"
                defaultValue=""
                control={methods.control}
                render={({ field }) => (
                  <input
                    placeholder="Hop Odisey"
                    className="ml-4 p-2 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="p-4">
              <label className="my-2 text-gray-700 text-md font-semibold">
                Brewery
              </label>
              <Controller
                name="brewery"
                defaultValue=""
                control={methods.control}
                render={({ field }) => (
                  <input
                    placeholder="--"
                    className="ml-4 p-2 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          <BatchParams />

          {/* -------------------    PARAMETERS ------------------------ */}

          {/* <label htmlFor="Pre_Boil_Gravity">Pre Boil Gravity</label>
        <input
          placeholder="pre boil gravity"
          {...register("parameters.pre_boil_gravity")}
        /> */}

          {/* --------------------    CHARACTERISTICS ------------------------ */}

          <Characteristics />

          {/* ------------------------ INGREDIENTS ----------------------------- */}
          <div className="grid grid-cols-2">
            <div className="grid-cols-1">
              <HopsForm />
            </div>

            <div className="grid-cols-1">
              <MaltsForm />
            </div>

            <div className="grid-cols-1">
              <WaterForm />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
