import React from 'react';
import { Producttype } from '../type';

type PurchaseListProps = {
    list: Producttype[];
};

const PurchaseList: React.FC<PurchaseListProps> = ({ list }) => {
    return (
        <div className="w-full border border-gray-300 p-5 mx-auto max-w-md">
            <div className="text-left py-2">
                {list.length > 0 ? (
                    // listの要素をループして、同じ製品をまとめる
                    Object.entries(
                        list.reduce((acc, cur) => {
                            // 製品名をキーとして、数量と合計金額を保持するオブジェクトを作る
                            acc[cur.NAME] = acc[cur.NAME] || { count: 0, total: 0 };
                            acc[cur.NAME].count += 1; // 数量をインクリメント
                            acc[cur.NAME].total += cur.PRICE; // 合計金額に価格を加算
                            return acc;
                        }, {})
                    ).map(([name, { count, total }], index) => (
                        // 同じ製品をまとめたオブジェクトを表示する
                        <div key={index}>
                            <span>{name}　</span>
                            <span>x{count}　</span>
                            <span>{total / count}円　</span>
                            <span>{total}円　</span>
                        </div>
                    ))
                ) : (
                    <div>購入リストは空です。</div>
                )}
            </div>
        </div>
    );
};

export default PurchaseList;