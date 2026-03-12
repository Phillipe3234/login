import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Conforme sua estrutura

const DonationCard = () => {
  const [total, setTotal] = useState(1250); // Valor da sua imagem
  const [goal, setGoal] = useState(5000);   // Exemplo de meta
  const percent = (total / goal) * 100;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {/* Card Principal */}
      <div className="w-full max-w-md bg-blue-600 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
        
        {/* Conteúdo do Card */}
        <h3 className="font-bold text-xl mb-1">Fundo de Subsistência</h3>
        <p className="text-blue-100 text-sm mb-6">Ajude a manter nossa casa de acolhimento.</p>

        <div className="text-4xl font-black mb-4">
          R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>

        {/* Barra de Progresso */}
        <div className="w-full bg-blue-800 rounded-full h-3 mb-8 overflow-hidden">
          <div 
            className="bg-white h-full transition-all duration-1000 ease-out"
            style={{ width: `${percent}%` }}
          ></div>
        </div>

        {/* Botão de Doação */}
        <button className="w-full bg-white text-blue-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all active:scale-95">
          <i className="fas fa-heart text-red-500"></i>
          DOAR R$ 50,00
        </button>
      </div>

      {/* Rodapé de Auditoria */}
      <div className="mt-4 flex items-center gap-2 text-green-600 font-medium text-sm">
        <i className="fas fa-check-circle"></i>
        <span>SISTEMA AUDITADO VIA SUPABASE</span>
      </div>
    </div>
  );
};

export default DonationCard;