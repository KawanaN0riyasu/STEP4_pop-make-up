'use client'
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import TitleBar from '../components/TitleBar';
import { Stock, Product } from '../type';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const Home = () => {
  const [productDetail, setProductDetail] = useState<Product>("");
  const prd_id = useSearchParams().get("ID");
  const stock_id = useSearchParams().get("stock_ID");
  const router = useRouter(); // useRouterを初期化
  const [error, setError] = useState<Error | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  // メニュー追加ボタンを押した時の処理
  const handleAddMenuClick = () => {
    router.push('/02_MenuList'); // クリックすると'/02_MenuList'に遷移
  };


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8001/Products?ID=${prd_id}`, {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({ ID: prd_id }),
                });

            if (!response.ok) {
                throw new Error('Network response was not ok');
              }
      
              const data = await response.json() as { data: Product };
              console.log(data);
              setProductDetail(data.data); // 取得した商品情報を状態に保存
      
            } catch (error) {
              console.error('There was a problem with the fetch operation:', error);
            }
        };
            // 関数を呼び出し
            fetchProduct();
    }, []); // 空の依存リストを渡すことで、マウント時にのみ実行

    // 購入ボタンを押したときの処理
    const handlePurchase = async() => {
        const reservationData = {
            USER_ID: "1",
            STOCK_ID: stock_id,
            MY_COUPON_ID: "1111",
            RSV_TIME: new Date().toISOString().split('T')[0],
            MET: 1
        };

        try {
            const postReservationData = await fetch("http://localhost:8001/Reservation/", {
                method: 'POST',
                headers:{"Content-Type": "application/json" },
                body: JSON.stringify(reservationData),
            });

            if (!postReservationData.ok) {
                throw new Error(`Transaction APIエラー: ${ postReservationData.status}`);
            }

            const result = await postReservationData.json(); // postTransactionDataの結果を受け取る
            const trd_id = result.TRD_ID;  // TRD_IDを取り出す
            console.log('TRD_ID:', trd_id); // TRD_IDを使って何か処理をする

            setShowPopup(true); // ポップアップを表示
        
        } catch (error) {
            console.error('Posting transaction data failed', error);
        }
    };

    // ポップアップ閉じるボタンを押したときの処理
    const handlePopupClose = () => {
        setShowPopup(false);
        router.push('/01_YoyakuList'); // クリックすると'/01_YoyakuList'に遷移
    };

    // ポップアップウィンドウの表示内容
    const popupJSX = showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white rounded p-5 shadow-lg text-center">
                <p className="text-lg my-2">
                    {productDetail.PRD_NAME}を予約しました。
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
        <div className="artboard phone-4">
          <TitleBar/>
          <div className="flex flex-col justify-center items-center my-10">
              <p className="text-2xl mb-4 font-bold">メニュー詳細</p>
          </div>

            <div key={productDetail.ID} className="hero bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={productDetail.PRD_IMAGE} alt={productDetail.PRD_NAME} className="rounded-lg shadow-2xl flex justify-center" />
                    <div>
                    <h1 className="text-3xl font-bold flex justify-center">{productDetail.PRD_NAME}</h1>
                    <p className="py-6 text-center">{productDetail.DESCRIPTION}</p>
                    <p>価格：{productDetail.PRICE}円</p>
                    <p>カロリー: {productDetail.CAL}kcal</p>
                    <p>塩分: {productDetail.SALINITY}g</p>
                    </div>
                    <button 
                        className="btn btn-primary flex justify-center"
                        onClick={handlePurchase} 
                    >
                        Buy
                    </button>
                    {popupJSX}
                </div>
            </div>
          <div className="flex justify-center">
            <button
              onClick={handleAddMenuClick}
              className="w-2/5 bg-base-100 shadow-xl m-2 h-50"
            > 
              予約リストに戻る
            </button>
          </div>
        </div>
      );
    };
    
    export default Home;