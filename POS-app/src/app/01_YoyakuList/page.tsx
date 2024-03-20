'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TitleBar from '../components/TitleBar';
import Cookies from 'js-cookie';

export default function Home() {
  const [dates, setDates] = useState<string[]>([]);
  const router = useRouter(); // useRouterを初期化

  // 日付設定
  useEffect(() => {
    const defaultDate = new Date().toLocaleDateString('ja-JP', { weekday: 'short', month: 'numeric', day: 'numeric' });
    const selectedDate = Cookies.get('selectedDate');
    // デフォルト値
    if (!selectedDate) {
      Cookies.set('selectedDate', defaultDate);
    // 値更新
    } else if (selectedDate === defaultDate) {
      handleDateChange(defaultDate);
    }
  
    const today = new Date();
    const nextWeekDates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() + i + 1);
      return d.toLocaleDateString('ja-JP', { weekday: 'short', month: 'numeric', day: 'numeric' });
    });
    setDates(nextWeekDates);
  }, []);

  // 日付が選択された時の処理
  const handleDateChange = (date: string) => {
    Cookies.set('selectedDate', date); // クッキーに選択された日付を保存
  };

  // メニュー追加ボタンを押した時の処理
  const handleAddMenuClick = () => {
    router.push('/02_MenuList'); // クリックすると'/02_MenuList'に遷移
  };

  // クーポン追加ボタンを押した時の処理
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
        <select 
          className="text-2xl mb-4"
          onChange={(e) => handleDateChange(e.target.value)}
        >
          {dates.map((date, index) => (
            <option key={index} value={date}>{date}予約リスト</option>
          ))}
        </select>
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