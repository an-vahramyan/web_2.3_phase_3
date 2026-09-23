import { useForm, type SubmitHandler } from "react-hook-form";
import type { User } from "./UserList";
import { requiredValidator, salaryValidator } from "../helpers/validator";
import type React from "react";

export type Account = Omit<User, "id">;

type Props = {
  onAdd: (user: Account) => void;
};
export const AddUser: React.FC<Props> = ({ onAdd }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Account>();

  const handleAdd: SubmitHandler<Account> = (data) => {
    onAdd(data);
  };
  return (
    <section className="rounded-2xl border border-indigo-500/20 bg-slate-900/90 p-5 shadow-2xl shadow-indigo-950/30 sm:p-6">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
          Team directory
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-white">
          Add a new user
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Create a profile for a member of your team.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(handleAdd)}
        className="grid gap-5 sm:grid-cols-2"
      >
        <div>
          {errors.name && <p className="text-red-400">{errors.name.message}</p>}
          <label
            htmlFor="first-name"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            First name
          </label>
          <input
            id="first-name"
            type="text"
            {...register("name", requiredValidator)}
            placeholder="e.g. Olivia"
            className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/25"
          />
        </div>
        <div>
          {errors.surname && (
            <p className="text-red-400">{errors.surname.message}</p>
          )}

          <label
            htmlFor="surname"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Surname
          </label>
          <input
            id="surname"
            {...register("surname", requiredValidator)}
            type="text"
            placeholder="e.g. Bennett"
            className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/25"
          />
        </div>
        <div>
          {errors.gender && (
            <p className="text-red-400">{errors.gender.message}</p>
          )}
          <label
            htmlFor="gender"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Gender
          </label>
          <select
            {...register("gender", requiredValidator)}
            id="gender"
            defaultValue=""
            name="gender"
            className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/25"
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="salary"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Annual salary
          </label>
          <div className="relative">
            {errors.salary && (
              <p className="text-red-400">{errors.salary.message}</p>
            )}

            <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-sm text-slate-500">
              $
            </span>
            <input
              id="salary"
              type="number"
              {...register("salary", salaryValidator)}
              min="0"
              placeholder="0.00"
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 py-2.5 pl-8 pr-3.5 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/25"
            />
          </div>
        </div>
        <div className="sm:col-span-2 sm:flex sm:justify-end">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/40 transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-slate-900 sm:w-auto"
          >
            <span className="text-lg leading-none">+</span>
            Add user
          </button>
        </div>
      </form>
    </section>
  );
};
