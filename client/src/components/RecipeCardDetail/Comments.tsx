import React from "react";
import { FaStar } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormInputs {
  score: number;
  comment: string;
}

const schema = yup.object().shape({
  score: yup.number().required().min(1).max(5),
  comment: yup.string().required().min(1).max(2000),
});

export const Comments: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({ resolver: yupResolver(schema) });

  console.log("ERRORS:", errors);
  return (
    <form className="mt-16">
      <p className="text-2xl font-semibold pb-8"> Recipe discussion</p>
      <div className="grid grid-cols-6 ">
        <div className="col-span-2 items-start justify-self-center flex gap-6">
          <label className="flex flex-col-reverse">
            <input
              type="radio"
              value="5"
              {...register("score")}
              name="score"
            />
            5
          </label>

          <label className="flex flex-col-reverse">
            <input
              type="radio"
              value="4"
              {...register("score")}
              name="score"
            />
            4
          </label>

          <label className="flex flex-col-reverse">
            <input
              type="radio"
              value="3"
              {...register("score")}
              name="score"
            />
            3
          </label>

          <label className="flex flex-col-reverse">
            <input
              type="radio"
              value="2"
              {...register("score")}
              name="score"
            />
            2
          </label>

          <label className="flex flex-col-reverse">
            <input
              type="radio"
              value="1"
              {...register("score")}
              name="score"
            />
            1
          </label>
        </div>

        <div className="col-span-4">
          <textarea
            placeholder="What you love and what you don't like about this recipe"
            {...register("comment")}
            required
            className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
          />
        </div>
      </div>
    </form>
  );
};