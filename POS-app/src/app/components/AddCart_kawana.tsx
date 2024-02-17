import React, { useState, useEffect } from 'react';
import { IDtype, Producttype } from '../type';
import ProductInfo from './ProductInfo_kawana';
import ErrorMessage from './ErrorMessage_kawana';

type AddCartProps = {
    productid: IDtype | null;
    resetInput: () => void; 
};

type Response = {
    status: number; // ステータスコード数値保持
    message?: Producttype;
};

const AddCart: React.FC<AddCartProps> = ({ productid, resetInput }) => {

    const [product, setProduct] = useState<Producttype | null>(null); // 製品情報を保持するステート
    const [error, setError] = useState<Error | null>(null); // エラーを保持するステート
    const [list, setList] = useState<Producttype[]>([]); // 購入リストを保持するステート
    const [showPopup, setShowPopup] = useState(false); // ポップアップ表示のステート

    useEffect(() => {
        // データ取得の非同期関数
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/ProductVerification/', {  
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code: productid?.PRD_ID }),
                });
                const result = await response.json(); 
                setProduct(result.message);
                setError(null); // エラーをリセット
            } catch (error) {
                console.error('Fetching data failed', error);
                setProduct(null); // productをリセット
                setError(error);  // エラーが発生した場合は、errorステートセット
            }
        }; 
        if (productid) {
            fetchData();  // productidがnullでない場合のみデータを取得
        } else {
            setProduct(null);  // productidがnullの場合はproductをリセット
            setError(null);
        }
    }, [productid]);  // productid が変更されるたびに fetchData を実行

    useEffect(() => {
        // 購入データを送信する非同期関数
        const PostData = async () => {
            try {
                // サーバーに購入情報を送信するリクエスト
                const response = await fetch('http://127.0.0.1:8000/search_product/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ }),
                });
            } catch (error) {
                console.error('Fetching data failed', error);
            }
        }
    }, []); 

    // 追加ボタンを押したときの処理
    const handleAdd = () => {
        if (product) {  //productがnullでない場合にのみlistに追加
            setList(list => [...list, product]);  //productをリセット
            setProduct(null);  //InputAreaの入力をリセット
            resetInput();  //resetInput関数を呼び出す
        }
    };

    // ポップアップ表示ボタンのクリックハンドラ
    const handleShowPopup = () => {
        setShowPopup(true); // ポップアップを表示する
    };

    // 購入リストの合計金額（税込）を計算する関数
    const calculateTotalPrice = () => {
        const subtotal = list.reduce((acc, cur) => acc + cur.PRICE, 0);  // 購入リスト合計金額（税抜）計算
        const taxRate = 0.08;
        const tax = Math.round(subtotal * taxRate); // 税額を計算する
        const total = subtotal + tax;  // 合計金額（税込）を計算する
        return total;  // 合計金額（税込）を返す
    };

    // ポップアップが閉じられたときに実行される処理
    const handlePopupClose = () => {
        setShowPopup(false); // ポップアップを閉じる
        setProduct(null); 
        resetInput();
        setList([]); // リストをリセットする
    };

    // ポップアップの JSX
    const popupJSX = showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white rounded p-5 shadow-lg text-center">
                <p className="text-lg my-2">
                    合計金額（税込）は {calculateTotalPrice()} 円です。
                </p>
                <button 
                    type="button"
                    className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring"
                    onClick={handlePopupClose}
                >
                    閉じる
                </button>
            </div>
        </div>
    );

    return (
        <div>
            <div className="px-5 py-5 mx-auto max-w-md">
                <div className="flex flex-col gap-4">
                    <ProductInfo product={product} productid={productid} />
                    <button
                        className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring"
                        onClick={handleAdd} 
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
                    <ErrorMessage error={error} />
                    <button
                        type="button"
                        className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring"
                        onClick={handleShowPopup} 
                    >
                        購入
                    </button>
                    {popupJSX}
                </div>
            </div>
        </div>
    );
}

export default AddCart;