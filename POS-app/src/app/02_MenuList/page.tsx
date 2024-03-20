'use client'
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import TitleBar from '../components/TitleBar';
import { Stock } from '../type';
import { useRouter } from 'next/navigation';

const Home = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const selectedDate = Cookies.get('selectedDate') || '日付が選択されていません';
  const router = useRouter(); // useRouterを初期化

  // FastAPIにselectedDateを送信して商品在庫リストを受けとる
  useEffect(() => {
    const fetchStock = async () => {
      try {
        console.log('Selected Date:', selectedDate);
        const response = await fetch("http://localhost:8000/Stock/", {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ date: selectedDate }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json() as { data: Stock[] };
        console.log(data);
        setStocks(data.data); // 取得した在庫リストを状態に保存

      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchStock(); // 非同期関数呼び出し
  }, [selectedDate]); // selectedDateが変更されたら再実行

    // クーポン追加ボタンを押した時の処理
    const handleUseYoyakuClick = () => {
      router.push('/01_YoyakuList'); // クリックすると'/01_YoyakuList'に遷移
    };

  return (
    <div className="artboard phone-4">
      <TitleBar/>
      <div className="flex flex-col justify-center items-center my-10">
          <p className="text-2xl mb-4">{selectedDate}メニュー一覧</p>
      </div>

      <div className="flex flex-wrap justify-center items-center -mx-2">
        {stocks.map((stock) => (
          <div key={stock.ID} className="card w-2/5 bg-base-100 shadow-xl m-2 h-50">
            <figure className="px-2 pt-2">
              <img src={stock.PRD_IMAGE} alt={stock.PRD_NAME} className="rounded-xl w-full h-auto"/>
            </figure>
            <div className="card-body items-center text-center p-1 text-sm h-30 leading-tight">
              <p>{stock.PRD_NAME}</p>
              <p>価格：{stock.PRICE}円</p>
              <p>カロリー: {stock.CAL}kcal</p>
              <p>塩分: {stock.SALINITY}g</p>
              <p>残り: {stock.PIECES}個</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleUseYoyakuClick}
          className="w-2/5 bg-base-100 shadow-xl m-2 h-50"
        > 
          予約リストに戻る
        </button>
      </div>
    </div>
  );
};

export default Home;