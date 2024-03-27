import React, { useState, useEffect } from 'react';
import { IDtype } from '../type';

interface InputAreaProps {
  onProductChange: (value: string) => void; 
  productid: IDtype | null;
  resetInput: () => void; 
}

// 入力エリアのコンポーネント
const InputArea: React.FC<InputAreaProps>  = ({ onProductChange, productid, resetInput }) => {
  const [inputValue, setInputValue] = useState("");  // 入力値を管理するステート

  // productid変更時の処理
  useEffect(() => {
    if (productid === null && inputValue !== "") {
      setInputValue(""); 
    }
  }, [productid]);  // productidが変更されたときに実行

  // フォーム送信時の処理
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // フォームのデフォルト送信動作を防ぐ
    const proId = (event.currentTarget.elements.namedItem('pro_id')as HTMLInputElement).value; // 入力された商品コードを取得
    onProductChange(proId); // 親コンポーネントに商品コードを伝える
    console.log('Sending PRO_ID:', proId); 
  };

  return (
    <div className="px-5 py-5 mx-auto max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="pro_id"
          name="pro_id"
          className="w-full p-2 border border-gray-300 rounded text-center"
          placeholder="商品コードを入力してください"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring"
        >
          商品コード読み取り
        </button>
      </form>
    </div>
  );
}

export default InputArea;