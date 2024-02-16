import React, { useState, useEffect } from 'react';
import { IDtype, Producttype } from '../type';

type ProductVerificationProps = {
    productid: IDtype | null;
    resetInput: () => void; // resetInput関数を追加
};

type Response = {
    status: number; // ステータスコードを数値保持
    message?: Producttype;
};

const ProductVerification: React.FC<ProductVerificationProps> = ({ productid }) => {

    const [product, setProduct] = useState<Producttype | null>(null); // 製品情報を保持するステート
    const [error, setError] = useState<Error | null>(null); // エラーを保持するステート
    const [list, setList] = useState<Producttype[]>([]); // 購入リストを保持するステート

    useEffect(() => {
        // データを取得する非同期関数
        const fetchData = async () => {
            try {
                // サーバーから製品情報を取得するリクエストを送信
                const response = await fetch('http://127.0.0.1:8000/ProductVerification/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code: productid?.PRD_ID }),
                });
                // レスポンスをJSON形式で解析し、dataステートにセット
                const result = await response.json();
                setProduct(result.message);
                setError(null); // エラーをリセット
            } catch (error) {
                console.error('Fetching data failed', error);
                // エラーが発生した場合は、errorステートにセット
                setProduct(null); // productをリセット
                setError(error);
            }
        };
        // productidがnullでない場合にのみデータを取得する
        if (productid) {
            fetchData();
        } else {
            // productidがnullの場合は、productをリセットする
            setProduct(null);
            setError(null);
        }
    // productid が変更されるたびに fetchData を実行する
    }, [productid]);

    // 追加ボタンを押したときの処理
    const handleAdd = () => {
        // productがnullでない場合にのみ、listに追加する
        if (product) {
            setList(list => [...list, product]);
        }
    };

    return (
        <div>
            <div className="px-5 py-5 mx-auto max-w-md">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-center items-center my-2">
                        <h1 className="text-1xl font-bold">製品情報</h1>
                    </div>
                    <div 
                        className="w-full h-10 p-2 border border-gray-300 rounded text-center">
                        <div className="flex justify-center">
                        {product ? (
                            <div>{product.NAME}</div>
                        ) : (
                            <div>{productid ? '商品がマスタ未登録です' : '商品名'}</div>
                        )}    
                        </div>
                    </div>
                    <div className="w-full h-10 p-2 border border-gray-300 rounded text-center">
                        <div className="flex justify-center">
                        {product ? (
                            <div>{product.PRICE}円</div>
                        ) : (
                            <div>価格(円)</div>
                        )}   
                        </div>
                    </div>
                    <button
                        className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring"
                        onClick={handleAdd} // 追加ボタンを押したときの処理を指定
                    >
                        追加
                    </button>
                    <div className="flex justify-center items-center my-2">
                        <h1 className="text-1xl font-bold">購入リスト</h1>
                    </div>
                    <div className="w-full border border-gray-300 p-5 mx-auto max-w-md">
                        <div className="text-left py-2">
                            {list.length > 0 ? (
                                // listの要素をループして、同じ製品をまとめる
                                Object.entries(list.reduce((acc, cur) => {
                                    // 製品名をキーとして、数量と合計金額を保持するオブジェクトを作る
                                    acc[cur.NAME] = acc[cur.NAME] || { count: 0, total: 0 };
                                    acc[cur.NAME].count += 1; // 数量をインクリメント
                                    acc[cur.NAME].total += cur.PRICE; // 合計金額に価格を加算
                                    return acc;
                                }, {})).map(([name, { count, total }], index) => (
                                    // 同じ製品をまとめたオブジェクトを表示する
                                    <div key={index}>
                                        <span>{name}　</span>
                                        <span>x{count}　</span>
                                        <span>{total / count}円　</span>
                                        <span>{total}円　</span>
                                    </div>
                                ))
                            ):(
                                <div>購入リストは空です。</div>
                            )}
                        </div>
                    </div>
                    {error && ( // エラーがある場合は、エラーメッセージを表示する
                        <div className="text-red-500">
                            {error.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductVerification;