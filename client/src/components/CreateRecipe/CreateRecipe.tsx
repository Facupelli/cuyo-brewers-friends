import React from "react";
import * as yup from "yup";
import { RecipeList } from "../../redux/reducers/types";
import {
  useForm,
  SubmitHandler,
  FormProvider,
} from "react-hook-form";
import { HopsForm } from "./HopsForm";
import { MaltsForm } from "./MaltsForm";
import { WaterForm } from "./WaterForm";
import { BatchParams } from "./BatchParams";
import axios from "axios";
import { Characteristics } from "./Characteristics";
import { NavBar } from "../NavBar";
import { yupResolver } from "@hookform/resolvers/yup";
import { TitleInfo } from "./TItleInfo";

// const initialValues: Recipe = {
//   _id: 0,
//   title: "",
//   style: "",
//   sub_category: "",
//   brewery: "",
//   parameters: {
//     boil_time: 0,
//     batch_size: 0,
//     pre_boil_size: 0,
//     pre_boil_gravity: 0,
//     mash_ph: 0,
//     efficiency: 0,
//   },
//   characteristics: {
//     original_gravity: 0,
//     final_gravity: 0,
//     alcohol_by_volume: 0,
//     ibu: 0,
//     srm: 0,
//   },
//   ingredients: {
//     fermentables: [],
//     hops: [{ name: "", quantity: 0, boil_time: 0 }],
//     yeast: [],
//     water_profile: {
//       calcium: 0,
//       magnesium: 0,
//       sodium: 0,
//       chlorine: 0,
//       sulfate: 0,
//       bicarbonate: 0,
//     },
//   },
//   photos: [],
// };

const schema = yup.object().shape({
    title: yup.string().required().min(2).max(25),
    style: yup.string().required().min(2).max(200),
    sub_category: yup.string().required().min(2).max(25),
    brewery: yup.string().min(0).max(50),
    parameters: yup.object().shape({
      boil_time: yup.number().typeError('Must be a number').required().positive().min(0).max(500),
      batch_size: yup.number().typeError('Must be a number').required().positive().min(1).max(25),
      // pre_boil_size: yup.number().typeError('Must be a number').required().positive().min(1).max(1000),
      pre_boil_gravity: yup.number().typeError('Must be a number').required().positive().min(1).max(2000),
      mash_ph: yup.number().typeError('Must be a number').required().positive().min(0).max(10),
      efficiency: yup.number().typeError('Must be a number').required().positive().min(0).max(100),
    }),
    characteristics: yup.object().shape({
      original_gravity: yup.number().typeError('Must be a number').positive().min(0).max(1200),
      final_gravity: yup.number().typeError('Must be a number').positive().min(0).max(1200),
      alcohol_by_volume: yup.number().typeError('Must be a number').positive().min(0).max(20),
      ibu: yup.number().typeError('Must be a number').min(0).max(200),
      srm: yup.number().typeError('Must be a number').min(0).max(100),
    }),
    ingredients: yup.object().shape({
      fermentables: yup
        .array()
        .of(yup.object().shape({ name: yup.string(), quantity: yup.number().positive() })),
      hops: yup
        .array()
        .of(
          yup
            .object()
            .shape({
              name: yup.string(),
              quantity: yup.number().typeError('Must be a number').positive().min(1),
              time: yup.number().typeError('Must be a number'),
              use: yup.string(),
              temperature: yup.number().typeError('Must be a number')
            })
        ),
      water_profile: yup.object().shape({
        calcium: yup.number().typeError('Must be a number'),
        magnesium: yup.number().typeError('Must be a number'),
        sodium: yup.number().typeError('Must be a number'),
        chlorine: yup.number().typeError('Must be a number'),
        sulfate: yup.number().typeError('Must be a number'),
        bicarbonate: yup.number().typeError('Must be a number'),
      }),
    }),
});

export const CreateRecipe: React.FC<{}> = () => {
  const methods = useForm<RecipeList>({resolver: yupResolver(schema)});

  const errors = methods.formState.errors

  console.log('ERRORS', errors)

  const formSubmitHandler: SubmitHandler<RecipeList> = async (data: RecipeList) => {
    try {
      console.log("FORM DATA IS", data);
      const newRecipe = {
        recipe: data,
        username: "",
        user_id: "",
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
      <NavBar route="createrecipe" />
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
          
          <TitleInfo />

          {/* -------------------    PARAMETERS ------------------------ */}

          <BatchParams />

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
