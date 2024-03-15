'use client'
import TitleBar from '../components/TitleBar';

export default function Home() {
  const message = "保有クーポン一覧";

  return (
    <div className="artboard phone-4">
      <TitleBar/>
      <div className="flex flex-col justify-center items-center my-10">
          <p className="text-2xl mb-4">{message}</p>
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

    </div>
  );
}