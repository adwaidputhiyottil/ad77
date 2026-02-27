import React from 'react';
import { MessageSquare, Trash2 } from 'lucide-react';

const MessageManager = ({ messages, onDelete }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
      {messages.length === 0 ? (
        <div className="p-20 text-center">
          <MessageSquare size={48} className="mx-auto text-neutral-200 mb-4" />
          <h3 className="text-xl font-bold text-neutral-400">No messages yet</h3>
          <p className="text-neutral-400 text-sm">When users use the contact form, they will appear here.</p>
        </div>
      ) : (
        <table className="w-full text-left">
          <thead className="bg-neutral-50 border-b border-neutral-100">
            <tr>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">User</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Message</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400 hidden sm:table-cell">Date</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(message => (
              <tr key={message.id} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/50 transition-colors">
                <td className="p-6 align-top">
                  <p className="font-bold text-sm leading-tight">{message.name}</p>
                  <p className="text-[10px] text-neutral-400 mt-1">{message.email}</p>
                </td>
                <td className="p-6 align-top">
                  <p className="text-sm text-neutral-600 leading-relaxed max-w-lg">{message.message}</p>
                </td>
                <td className="p-6 align-top hidden sm:table-cell">
                  <span className="text-[10px] font-bold text-neutral-400 whitespace-nowrap">
                    {new Date(message.date).toLocaleDateString()}
                  </span>
                </td>
                <td className="p-6 align-top">
                  <button onClick={() => onDelete(message.id)} className="p-2 hover:bg-white rounded-lg text-neutral-400 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);

export default MessageManager;
