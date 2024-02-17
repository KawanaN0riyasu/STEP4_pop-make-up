'use client'
import React, { useState } from 'react';
import TitleBar from '../components/TitleBar';
import InputArea from '../components/InputArea_kawana';
import OutputArea from '../components/OutputArea_kawana';
import { IDtype } from '../type';

export default function Home() {
  const [productid, setProductid] = useState< IDtype | null >(null);  //型が IDtype か null で、初期値がnull。
  const message = "welcome";

  const handleProductChange = (newProductId: string) => {
    const newProduct: IDtype  = {
      PRD_ID: newProductId 
    };
    setProductid(newProduct);
  };
  // newProductId を受け取って新しい IDtype オブジェクト「newProduct」 を作成、setProductid を使って productid を更新する。

  const resetInput = () => {
    setProductid(null); // InputAreaの入力をリセットする
  };

  return (
    <>
    <TitleBar/>
    <div className="flex justify-center items-center my-10">
      <h1 className="text-4xl font-bold">{message}</h1>
    </div>
    <InputArea onProductChange={handleProductChange} productid={productid} resetInput={resetInput} />
    <OutputArea productid={productid} resetInput={resetInput} /> {/* resetInput関数をProductVerificationに渡す */}
    </>
  );
}