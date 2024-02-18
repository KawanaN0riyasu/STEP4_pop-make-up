import React, { useState, useEffect } from 'react';
import { IDtype, Producttype } from '../type';
import ProductInfo from './ProductInfo_kawana';
import ErrorMessage from './ErrorMessage_kawana';

type OutputProps = {
    productid: IDtype | null;
    resetInput: () => void; 
};

const OutputArea: React.FC<OutputProps> = ({ productid, resetInput }) => {
    const [product, setProduct] = useState<Producttype | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [list, setList] = useState<Producttype[]>([]);
    const [showPopup, setShowPopup] = useState(false);

    // データ取得の非同期関数
    useEffect(() => {
        if (productid) {
            fetchData();
        } else {
            setProduct(null);
            setError(null);
        }

        async function fetchData() {  
            try {
                const response = await fetch('http://127.0.0.1:8000/ProductVerification/', { 
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',},
                    body: JSON.stringify({ code: productid?.PRD_ID }),
                });
                const result = await response.json(); 
                setProduct(result.message);
                setError(null);
            } catch (error) {
                console.error('Fetching data failed', error);
                setProduct(null);
                setError(error);
            }
        }
    }, [productid]);  // productid が変更されるたびに fetchData を実行

    // 追加ボタンを押したときの処理
    const handleAdd = () => { 
        if (product) {
            setList([...list, product]); //productをlistに追加
            setProduct(null);
            resetInput();
        }
    };

    // 合計金額の計算処理
    const calculateTotalPrice = () => {
        return Math.round(list.reduce((acc, cur) => acc + cur.PRICE, 0) * 1.08);
    };

    // 購入ボタンを押したときの処理
    const handlePurchase = async() => {
        const totalPrice = calculateTotalPrice();
        const transactionData = {
            DATETIME: new Date().toISOString(),
            EMP_CD: "9999999999",
            STORE_CD: "30",
            POS_NO: "90",
            TOTAL_AMT: totalPrice,
            TOTAL_AMT_EX_TAX: Math.round(totalPrice / 1.1),
        };
        console.log('transactionData:', transactionData); 

        try {
            const postTransactionData = await fetch("http://localhost:8000/transactionData/", {
                method: 'POST',
                headers:{"Content-Type": "application/json" },
                body: JSON.stringify(transactionData),
            });

            if (!postTransactionData.ok) {
                throw new Error(`Transaction APIエラー: ${ postTransactionData.status}`);
            }

            setShowPopup(true); // ポップアップを表示
        
        } catch (error) {
            console.error('Posting transaction data failed', error);
        }
    };

    // ポップアップ閉じるボタンを押したときの処理
    const handlePopupClose = () => {
        setShowPopup(false); 
        setProduct(null);
        resetInput();
        setList([]);
    };

    // 購入リストの表示内容
    const renderProductList = () => {
        return list.length > 0 ? (
            Object.entries(list.reduce((acc, cur) => {
                acc[cur.NAME] = acc[cur.NAME] || { count: 0, total: 0 };
                acc[cur.NAME].count += 1;
                acc[cur.NAME].total += cur.PRICE;
                return acc;
            }, {})).map(([name, { count, total }], index) => (
                <div key={index}>
                    <span>{name}　</span>
                    <span>x{count}　</span>
                    <span>{total / count}円　</span>
                    <span>{total}円　</span>
                </div>
            ))
        ) : (
            <div>購入リストは空です。</div>
        );
    };

    // ポップアップウィンドウの表示内容
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
                            {renderProductList()}
                        </div>
                    </div>
                    <ErrorMessage error={error} />
                    <button
                        type="button"
                        className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring"
                        onClick={handlePurchase} 
                    >
                        購入
                    </button>
                    {popupJSX}
                </div>
            </div>
        </div>
    );
}

export default OutputArea;