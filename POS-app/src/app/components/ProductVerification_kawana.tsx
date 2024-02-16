import React, { useState, useEffect } from 'react';
// 型定義インポート
import { IDtype, Producttype } from '../type';

type ProductVerificationProps = {
    productid: IDtype | null;
};

type Response = {
    status: number; // ステータスコードを数値で保持
    message?: Producttype;
};

const ProductVerification_kawana: React.FC<ProductVerificationProps> = ({ productid }) => {

    const [data, setData] = useState<Response | null>(null);

    useEffect(() => {
        // データを取得する非同期関数
        const fetchData = async () => {
            if (productid) {
                try {
                    // サーバーから製品情報を取得するリクエストを送信
                    const response = await fetch('http://127.0.0.1:8000/ProductVerification/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ code: productid.PRD_ID }),
                    });
                    // レスポンスをJSON形式で解析し、dataステートにセット
                    const result = await response.json();
                    setData({ status: response.status, ...result });
                } catch (error) {
                    console.error('Fetching data failed', error);
                    // エラーが発生した場合は、ステータスコード500としてセット
                    setData({ status: 500 }); 
                }
            }
        };
        // コンポーネントがマウントされた際にデータを取得する
        fetchData();
    // productid が変更されるたびに fetchData を実行する
    }, [productid]);


    // データフェッチングのステータスを表示
    return (
        <div className="px-5 py-5 mx-auto max-w-md">
            <div className="flex flex-col gap-4">
                <div className="flex justify-center items-center my-2">
                    <h1 className="text-1xl font-bold">ステータスコード：{data?.status}</h1>
                </div>
                <div 
                    className="w-full h-10 p-2 border border-gray-300 rounded text-center">
                    <div className="flex justify-center">
                    {data?.message ? (
                        <div>{data.message.NAME}</div>
                    ) : (
                        <div>商品名</div>
                    )}    
                    </div>
                </div>
                <div className="w-full h-10 p-2 border border-gray-300 rounded text-center">
                    <div className="flex justify-center">
                    {data?.message ? (
                        <div>{data.message.PRICE}円</div>
                    ) : (
                        <div>価格(円)</div>
                    )}   
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductVerification_kawana;