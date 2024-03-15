'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import TitleBar from '../components/TitleBar';

export default function Home() {
  const message = "3/18(月)の予約内容";
  const router = useRouter(); // useRouterを初期化

  // メニュー追加ボタンを押した時の処理
  const handleAddMenuClick = () => {
    router.push('/02_MenuList'); // クリックすると'/02_MenuList'に遷移
  };

  // メニュー追加ボタンを押した時の処理
  const handleUseCouponClick = () => {
    router.push('/03_CouponList'); // クリックすると'/03_CouponList'に遷移
  };

    // 商品受取ボタンを押した時の処理
    const handleReceiveClick = () => {
      router.push('/04_Receipt'); // クリックすると'/03_CouponList'に遷移
    };

  return (
    <div className="artboard phone-4">
      <TitleBar/>
      <div className="flex flex-col justify-center items-center my-10">
          <p className="text-2xl mb-4">{message}</p>
          <p>品数: 2品</p>
          <p>合計金額: 300円</p>
          <p>総カロリー: 450kcal</p>
          <p>塩分: 4.0g</p>
      </div>

      <div className="flex flex-wrap justify-center items-center -mx-2">
        <div className="card w-2/5 bg-base-100 shadow-xl m-2 h-50">
          <figure className="px-2 pt-2">
            <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="サーモンサラダ" className="rounded-xl w-full h-auto" />
          </figure>
          <div className="card-body items-center text-center p-1 text-sm h-30 leading-tight">
            <p>サーモンサラダ</p>
            <p>値段: 350円</p>
            <p>カロリー: 300kcal</p>
            <p>塩分: 3.0g</p>
            <div className="card-actions"></div>
          </div>
        </div>
        
        <div className="card w-2/5 bg-base-100 shadow-xl m-2 h-50">
          <figure className="px-2 pt-2">
            <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="ミニチョコクロワッサン" className="rounded-xl w-full h-auto" />
          </figure>
          <div className="card-body items-center text-center p-1 text-sm h-30 leading-tight">
            <p>バターロール</p>
            <p>値段: 50円</p>
            <p>カロリー: 150kcal</p>
            <p>塩分: 1.0g</p>
            <div className="card-actions"></div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={handleAddMenuClick}
          className="w-2/5 bg-base-100 shadow-xl m-2 h-50"
        > 
          メニューを追加
        </button>
      </div>

      <div className="flex flex-wrap justify-center items-center -mx-2">
        <div className="card w-2/5 bg-base-100 shadow-xl m-2 h-50">
          <figure className="px-2 pt-2">
            <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="サーモンサラダ" className="rounded-xl w-full h-auto" />
          </figure>
          <div className="card-body items-center text-center p-1 text-sm h-30 leading-tight">
            <p>100円引クーポン</p>
            <p>8000歩x7日達成</p>
            <p>獲得: 2024年2月</p>
            <p>期限: 2024年3月</p>
            <div className="card-actions"></div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleUseCouponClick}
          className="w-2/5 bg-base-100 shadow-xl m-2 h-50"
        > 
          クーポンを使う
        </button>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleReceiveClick}
          className="w-4/5 bg-base-100 shadow-xl m-2 h-50"
        > 
          商品を受け取る
        </button>
      </div>

    </div>
  );
}