// import axios from 'axios'
// import { useEffect, useState } from 'react'
import type React from "react";
export type User = {
  id: number;
  name: string;
  surname: string;
  gender: "male" | "female";
  salary: number;
};
type Props = {
  users: User[];
};
export const UserList: React.FC<Props> = ({ users }) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-indigo-500/20 bg-slate-900/90 shadow-2xl shadow-indigo-950/30">
      <div className="flex items-center justify-between gap-4 border-b border-indigo-500/20 bg-indigo-950/30 px-5 py-5 sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
            Directory
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-white">
            User list
          </h1>
        </div>
        <span className="rounded-full border border-indigo-400/30 bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-200">
          {users.length} users
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead className="bg-slate-950/60 text-xs uppercase tracking-wider text-indigo-200/70">
            <tr>
              <th className="px-5 py-4 font-semibold sm:px-6">ID</th>
              <th className="px-5 py-4 font-semibold sm:px-6">Name</th>
              <th className="px-5 py-4 font-semibold sm:px-6">Surname</th>
              <th className="px-5 py-4 font-semibold sm:px-6">Gender</th>
              <th className="px-5 py-4 text-right font-semibold sm:px-6">
                Salary
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-500/10">
            {users.map((user) => (
              <tr
                key={user.id}
                className="transition-colors hover:bg-indigo-500/10"
              >
                <td className="px-5 py-4 font-mono text-xs text-indigo-300/60 sm:px-6">
                  #{user.id}
                </td>
                <td className="px-5 py-4 font-semibold text-white sm:px-6">
                  {user.name}
                </td>
                <td className="px-5 py-4 text-slate-300 sm:px-6">
                  {user.surname}
                </td>
                <td className="px-5 py-4 sm:px-6">
                  <span className="inline-flex rounded-full bg-indigo-400/15 px-2.5 py-1 text-xs font-medium capitalize text-indigo-200">
                    {user.gender}
                  </span>
                </td>
                <td className="px-5 py-4 text-right font-semibold tabular-nums text-indigo-100 sm:px-6">
                  ${user.salary.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
