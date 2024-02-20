'use client';
import React, { useEffect, useState, SyntheticEvent } from 'react';
import { IDtype } from '../type';
import QrcodeReader from './QrcodeReader_kawana';

interface InputAreaProps {
    onProductChange: (value: string) => void;
    productid: IDtype | null;
    resetInput: () => void; 
}

// 入力エリアのコンポーネント
const InputArea: React.FC<InputAreaProps>  = ({ onProductChange, productid, resetInput }) => {
    const [inputValue, setInputValue] = useState("");  // 入力値を管理するステート
    const [scannedTime, setScannedTime] = useState(new Date()); // スキャン日時を管理するステート

    // productid変更時の処理
    useEffect(() => {
        if (productid === null && inputValue !== "") {
            setInputValue(""); 
        }
        if (productid !== null){
            updateInputValue();
        }
    }, [productid]);  // productidが変更されたときに実行

    // inputValueを更新する処理
    const updateInputValue = () => {
        if (productid !== null && productid.PRD_ID !== inputValue) {
            setInputValue(productid.PRD_ID);
        }
    };

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
                <>
                    <div>
                        {/* <h2>スキャン日時：{scannedTime.toLocaleDateString()}</h2> */}
                    </div>
                    <QrcodeReader
                        onScanComplete={(result: any, event: SyntheticEvent<HTMLFormElement>) => { // 変更
                            console.log('QRコードスキャン結果');
                            console.log(result);
                            setScannedTime(new Date());
                            setInputValue(result); 
                            onProductChange(result); // フォーム送信処理を呼び出す
                        }}
                        onScanFailure={(error: any) => {
                            // console.log('Qr scan error');
                        }}
                    />
                </>
                <input
                    type="text"
                    id="pro_id"
                    name="pro_id"
                    className="w-full p-2 border border-gray-300 rounded text-center"
                    placeholder="商品コード"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </form>
        </div>
    );
}

export default InputArea;