'use client'
import React, { useState } from 'react';
import TitleBar from '../components/TitleBar';
import InputArea from '../components/QrcodeReaderComponent_kawana';
import OutputArea from '../components/OutputArea_kawana_Lv3';
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
    <div className="artboard phone-4">
        <TitleBar/>
        <InputArea onProductChange={handleProductChange} productid={productid} resetInput={resetInput} />
        <OutputArea productid={productid} resetInput={resetInput} setProductid={setProductid} /> {/* resetInput関数をProductVerificationに渡す */}
        </div>
  );
}