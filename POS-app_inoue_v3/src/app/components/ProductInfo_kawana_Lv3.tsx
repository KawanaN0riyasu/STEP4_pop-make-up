import React from 'react';
import { IDtype, Producttype } from '../type';

type ProductInfoProps = {
    product: Producttype | null;
    productid: IDtype | null;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product, productid }) => {
    return (
        <div>
            <div className="w-full h-10 p-2 border border-gray-300 rounded text-center">
                <div className="flex justify-center">
                    {product ? (
                        <div>{product.NAME}</div>
                    ) : (
                        <div>商品名</div>
                    )}
                </div>
            </div>
            <div className="flex">
                <div className="w-1/2 w-full h-10 p-2 border border-gray-300 rounded text-center mr-1">
                    <div className="flex justify-center">
                        {product ? (
                            <div>{product.PRICE}円</div>
                        ) : (
                            <div>単価(円)</div>
                        )}
                    </div>
                </div>
                <div className="w-1/2 w-full h-10 p-2 border border-gray-300 rounded text-center ml-1">
                    <div className="flex justify-center">
                        {product ? (
                            <div>{product.PRICE}円</div>
                        ) : (
                            <div>数量</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;