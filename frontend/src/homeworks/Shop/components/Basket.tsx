import type { FC } from "react";
import type { BasketItem } from "../helpers/types";
type Props = {
  items: BasketItem[];
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
};


export const Basket: FC<Props> = ({ items, onIncrease, onDecrease, onRemove }) =>{
 return (
        <div className="min-h-screen bg-gradient-to-br  p-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-slate-900 mb-8">Basket</h2>
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-600 to-blue-700">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-white">product</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-white">price</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-white">subtotal</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-white">actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {
                                items.map(item =>
                                    <tr key={item.id} className="hover:bg-slate-50 transition-colors duration-200">
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{item.name}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{item.quantity}x{item.price} USD</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-blue-600">{item.price * item.quantity} USD</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button onClick={() => onRemove(item.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 active:scale-95 transform">X</button>
                                                <button onClick={() => onIncrease(item.id)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 active:scale-95 transform">+</button>
                                                <button onClick={() => onDecrease(item.id)} className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 active:scale-95 transform">-</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}