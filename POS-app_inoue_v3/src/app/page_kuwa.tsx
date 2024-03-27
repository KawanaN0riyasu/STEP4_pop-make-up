'use client'
import { useState,useEffect } from 'react';
import TitleBar from '../components/TitleBar';
import InputArea_kawana from '../components/InputArea_kawana';
import { IDtype } from '../type';
import PurchaseArea from '../components/PurchaseArea';

//型定義　PRD_ID
type ProductType = {
PRD_ID: string;
};

//関数コンポーネント
export default function Home() {
  //型が IDtype か null で、初期値がnull。
  const [productid, setProductid] = useState< IDtype | null >(null);
  const message = "welcome";
  //新しい商品IDを受け取る→IDtypeオブジェクトを作成
  const handleProductChange = (newProductId: string) => {
    const newProduct: IDtype  = {
      PRD_ID: newProductId 
    };
    setProductid(newProduct);
  };
  // newProductId を受け取って新しい IDtype オブジェクト「newProduct」 を作成、setProductid を使って productid を更新する。

  return (
    <>
      <TitleBar/>
      <div className="flex justify-center items-center my-10">
        <h1 className="text-4xl font-bold">{message}</h1>
      </div>
      <InputArea_kawana onProductChange={handleProductChange}/>
      <PurchaseArea productid={productid}/> 
    </>
  );
}