import React, { useState, useEffect } from 'react';
// 型定義インポート
import { IDtype, Producttype } from '../type';

type OutputAriaProps = {
    productid: IDtype | null;
};

type Response = {
    status: number; // ステータスコードを数値で保持
    message?: Producttype;
};

const OutputAria: React.FC<OutputAriaProps> = ({ productid }) => {

    const [data, setData] = useState<Response | null>(null);

    useEffect(() => {
        // データを取得する非同期関数
        const fetchData = async () => {
            if (productid) {
                try {
                    // サーバーから製品情報を取得するリクエストを送信
                    const response = await fetch('http://127.0.0.1:8000/search_product/', {
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
        <div className="border border-gray-300 p-5 mx-auto max-w-md">
            <div className="text-left py-2">
                <div>ステータスコード：{data?.status}</div>
                {data?.message && (
                    <>
                        <div>PRO_ID：{data.message.PRD_ID}</div>
                        <div>PRD_CD：{data.message.PRD_CODE}</div>
                        <div>PRD_NAME：{data.message.NAME}</div>
                        <div>PRD_PRICE：{data.message.PRICE}</div>
                    </>
                )}
            </div>
        </div>
    );
}

export default OutputAria;