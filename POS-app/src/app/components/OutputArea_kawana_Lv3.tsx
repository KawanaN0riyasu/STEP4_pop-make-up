import React, { useState, useEffect, useRef } from 'react';
import { IDtype, Producttype } from '../type';
import ErrorMessage from './ErrorMessage_kawana';

type OutputAreaProps = {
    productid: IDtype | null;
    resetInput: () => void; 
    setProductid: (productId: IDtype | null) => void;
};

const OutputArea: React.FC<OutputAreaProps> = ({ productid, resetInput, setProductid }) => {
    const [product, setProduct] = useState<Producttype | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [list, setList] = useState<Producttype[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [clickedProduct, setClickedProduct] = useState<Producttype | null>(null);
    const [newQuantity, setNewQuantity] = useState<number>(1); // 数量入力フィールドの値を保持
    const clickedIndexRef = useRef<number | null>(null); // クリックされたインデックスを記録
    
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
            } catch (error: any) {
                console.error('Fetching data failed', error);
                setProduct(null);
                setError(error);
            }
        }
    }, [productid]);  // productid が変更されるたびに fetchData を実行

    // ↑ボタンがクリックされたときにインデックスを記録する関数
    const setClickedIndex = (index: number) => {
        return new Promise<void>((resolve) => {
            clickedIndexRef.current = index;
            resolve();
        });
    };

    // 追加ボタンを押したときの処理
    const handleAdd = () => { 
        if (product && product.NAME) {
            setList([...list, product]); //productをlistに追加
            setProduct(null);
            resetInput();
        }
    };

    // productステートが変更されたときにhandleAddを呼び出す
    useEffect(() => {
        if (product && clickedIndexRef.current === null) { // クリックされた場合はhandleAddを呼び出さない
            handleAdd();
        }
    }, [product]); // productが依存配列に追加される

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

        try {
            const postTransactionData = await fetch("http://localhost:8000/transactionData/", {
                method: 'POST',
                headers:{"Content-Type": "application/json" },
                body: JSON.stringify(transactionData),
            });

            if (!postTransactionData.ok) {
                throw new Error(`Transaction APIエラー: ${ postTransactionData.status}`);
            }

            const result = await postTransactionData.json(); // postTransactionDataの結果を受け取る
            const trd_id = result.TRD_ID;  // TRD_IDを取り出す
            console.log('TRD_ID:', trd_id); // TRD_IDを使って何か処理をする

            //  購入リストのデータを取引明細に追加する
            const transactionStatement = list.map(item => ({
                TRD_ID: trd_id,
                PRD_NAME: item.NAME,
                PRD_PRICE: item.PRICE,
                TAC_CD: "01",
            }));
            console.log('TransactionStatementData:', transactionStatement);
            const postTransactionStatementData = await fetch("http://localhost:8000/transactionStatementData/", {
                method: 'POST',
                headers:{"Content-Type": "application/json" },
                body: JSON.stringify(transactionStatement),
            });

            if (!postTransactionStatementData.ok) {
                throw new Error(`TransactionStatement APIエラー: ${ postTransactionStatementData.status}`);
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

    // リスト削除ボタンを押したときの処理
    const handleDeleteList = () => {
        if (clickedProduct) {
            const updatedList = list.filter(item => item.NAME !== clickedProduct.NAME);
            setList(updatedList);
            setClickedProduct(null); // clickedProductをリセット
        }
    };

    // 数量変更ボタンを押したときの処理
    const handleQuantityChange = () => {
        if (clickedProduct) {
            const existingProductIndex = list.findIndex(item => item.NAME === clickedProduct.NAME);
            const updatedList = [...list]; // listのコピーを作成
            if (updatedList.length > newQuantity) {
                updatedList.splice(newQuantity); // 新しい数量よりも多い場合は、余分な製品を削除
            } else {
                while (updatedList.filter(item => item.NAME === clickedProduct.NAME).length < newQuantity) {
                    updatedList.push({ ...clickedProduct }); // 新しい数量に足りない分だけclickedProductを追加
                }
            }
            setList(updatedList); // 更新されたリストを設定
        }
    };

    // 数量入力フィールドの変更ハンドラ
    const handleQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1 && value <= 99) {
            setNewQuantity(value);
        }
    };

    // 購入リストの表示内容
    const renderProductList = () => {
        const counts: { [key: string]: number } = {};
        list.forEach(item => {
            counts[item.NAME] = (counts[item.NAME] || 0) + 1;
        });

        return Object.entries(counts).map(([name, count], index) => {
            const total = list.filter(item => item.NAME === name).reduce((acc, cur) => acc + cur.PRICE, 0);

            // ↑ボタンをクリックしたときの処理
            const handleClick = async (name: string) => {
                const clickedProduct = list.find(item => item.NAME === name); // list[index] で商品情報を取得
                if (clickedProduct) {
                    const convertedProduct: IDtype = {
                        PRD_ID: clickedProduct.PRD_CODE // PRD_CODE を IDtype に割り当てる
                    };
                    const index = list.findIndex(item => item.NAME === name);
                    await setClickedIndex(index); // クリックされたインデックスを記録
                    console.log('Productid:', convertedProduct);
                    setProductid(convertedProduct); // setProductidを非同期的に実行 
                    setTimeout(() => {
                        clickedIndexRef.current = null;
                    }, 500); // 500ミリ秒後に実行
                    setClickedProduct(clickedProduct); // clickedProductを設定
                }
            };

            return (
                <div className="flex justify-between items-center">
                    <div key={index} >
                        <span>{name}, </span>
                        <span>{total / count}円  </span>
                        <span>x{count}  </span>
                        <span>=  {total}円 </span>
                    </div>
                    <button 
                        className="bg-blue-500 text-white rounded hover:bg-blue-600 px-2 py-1 focus:outline-none focus:ring h-5 flex items-center justify-center"
                        onClick={() =>  handleClick(name)}
                    >
                        ↑
                    </button>
                </div>
            );
        })
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
                <div className="flex flex-col gap-2">
                <div className="w-full h-10 p-2 border border-gray-300 rounded text-center">
                        <div className="flex justify-center">
                            {product ? (
                                <div>{product.NAME}</div>
                            ) : (
                                <div>商品名</div>
                            )}
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/2 w-full h-10 p-2 border border-gray-300 rounded text-center mr-1">
                            <div className="flex justify-center">
                                {product ? (
                                    <div>{product.PRICE}円</div>
                                ) : (
                                    <div>単価</div>
                                )}
                            </div>
                        </div>
                        <div className="w-1/2 w-full h-10 p-2 border border-gray-300 rounded text-center ml-1">
                            {product ? (
                                <div className="flex justify-center">
                                    <input 
                                        type="number"
                                        min="1"
                                        max="99"
                                        value={newQuantity}
                                        onChange={handleQuantityInputChange}
                                        className="ml-2 w-1/4 text-center"
                                        defaultValue={list.filter(item => item.NAME === product.NAME).length}
                                    />
                                    <div>個</div>
                                </div>
                            ) : (
                                <div>数量</div>
                            )}
                        </div>
                    </div>
                    <div className="flex">
                        <button
                            className="w-1/2 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring mr-1"
                            onClick={handleDeleteList} 
                        >
                            リスト削除
                        </button>
                        <button
                            className="w-1/2 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring ml-1"
                            onClick={handleQuantityChange}
                        >
                            数量変更
                        </button>
                    </div>
                    <div className="flex justify-center items-center mt-4">
                        <h1 className="text-1xl font-bold">購入リスト</h1>
                    </div>
                    <div className="w-full border border-gray-300 rounded p-5 mx-auto max-w-md">
                        <div className="text-left py-2">
                            {renderProductList()}
                        </div>
                    </div>
                    <ErrorMessage error={error} />
                    <div className="w-full p-3 mx-auto max-w-md">
                        <div className="flex">
                            <div className="text-left py-2 mx-4 max-w-xs">
                                合計
                            </div>
                            <div className="border border-gray-300 rounded text-left py-2 flex-grow  text-center">
                            {calculateTotalPrice()} （税抜 {Math.round(calculateTotalPrice() / 1.10)}）円
                            </div>
                        </div>

                    </div>
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