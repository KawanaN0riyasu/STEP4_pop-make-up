'use client'
import React, { useState } from 'react';
import TitleBar from '../components/TitleBar';

export default function Home() {
  const message = "3/18(月)の商品一覧";

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
            <p>サーモンサラダ</p>
            <p>値段: 350円</p>
            <p>カロリー: 300kcal</p>
            <p>塩分: 3.0g</p>
            <p>残数: 13個</p>
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
            <p>残数: 28個</p>
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
            <p>残数: 28個</p>
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
            <p>残数: 28個</p>
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
            <p>残数: 28個</p>
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
            <p>残数: 28個</p>
            <div className="card-actions"></div>
          </div>
        </div>
      </div>

    </div>
  );
}