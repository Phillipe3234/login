import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { ShieldCheck, RefreshCcw } from 'lucide-react';

export default function Dashboard() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    const { data } = await supabase.from('audit_logs').select('*').order('created_at', { ascending: false });
    setLogs(data || []);
  };

  useEffect(() => { fetchLogs(); }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2"><ShieldCheck className="text-green-500"/> Auditoria</h1>
        <button onClick={fetchLogs} className="text-blue-600"><RefreshCcw size={20}/></button>
      </div>

      <div className="space-y-3">
        {logs.map(log => (
          <div key={log.id} className="bg-white p-4 rounded-xl border-l-4 border-blue-500 shadow-sm text-sm">
            <div className="flex justify-between font-bold">
              <span className="text-blue-600">{log.action}</span>
              <span className="text-gray-400 font-normal">{new Date(log.created_at).toLocaleTimeString()}</span>
            </div>
            <div className="text-gray-600 mt-1">{log.user_email}</div>
          </div>
        ))}
      </div>
    </div>
  );
}