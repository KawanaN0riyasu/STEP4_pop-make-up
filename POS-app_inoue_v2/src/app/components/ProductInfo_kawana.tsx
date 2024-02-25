import React from 'react';
import { Producttype } from '../type';

type ProductInfoProps = {
    product: Producttype | null;
    productid: string | null;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product, productid }) => {
    return (
        <div>
            <div className="flex justify-center items-center my-2">
                <h1 className="text-1xl font-bold">製品情報</h1>
            </div>
            <div className="w-full h-10 p-2 border border-gray-300 rounded text-center">
                <div className="flex justify-center">
                    {product ? (
                        <div>{product.NAME}</div>
                    ) : (
                        <div>{productid ? '商品がマスタ未登録です' : '商品名'}</div>
                    )}
                </div>
            </div>
            <div className="w-full h-10 p-2 border border-gray-300 rounded text-center">
                <div className="flex justify-center">
                    {product ? (
                        <div>{product.PRICE}円</div>
                    ) : (
                        <div>価格(円)</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;