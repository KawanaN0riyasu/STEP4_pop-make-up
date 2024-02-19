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
    }, [productid]);  // productidが変更されたときに実行

    // フォーム送信時の処理
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // フォームのデフォルト送信動作を防ぐ
        const proId = (event.currentTarget.elements.namedItem('pro_id')as HTMLInputElement).value; // 入力された商品コードを取得
        onProductChange(proId); // 親コンポーネントに商品コードを伝える
        console.log('Sending PRO_ID:', proId); 
    };

    // QRコードを読み取った時の実行する関数
    //const onNewScanResult = (result: any) => {
    //    console.log('QRコードスキャン結果');
    //    console.log(result);
    //    setScannedTime(new Date());
    //    setInputValue(result); 

    //    const event: SyntheticEvent<HTMLFormElement> = {  // SyntheticEvent<HTMLFormElement>型のオブジェクトを作成
    //        ...new Event('submit'), // Event型のオブジェクトを展開
    //        currentTarget: (document.getElementById("pro_id") as HTMLInputElement)?.form as HTMLFormElement, // currentTargetプロパティにフォームの要素を設定
    //        target: (document.getElementById("pro_id") as HTMLInputElement)?.form as HTMLFormElement, // targetプロパティにフォームの要素を設定
    //        nativeEvent: new Event('submit'), // nativeEventプロパティにEvent型のオブジェクトを設定
    //        preventDefault: () => {}, 
    //        stopPropagation: () => {}, 
    //        isDefaultPrevented: () => false, 
    //        isPropagationStopped: () => false, 
    //        persist: () => {}, 
    //    };
    //    handleSubmit(event); // フォーム送信処理を呼び出す
    //};

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