import { FC, useRef, useEffect } from "react"; // ReactからFC、useRef、useEffectをインポート
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser"; // ZXingからBrowserMultiFormatReaderとIScannerControlsをインポート
import { Result, BarcodeFormat } from '@zxing/library'; // ZXingからResultをインポート

// MultiFormatReaderを定義
const Reader: FC<{ onReadCode: (text: Result) => void }> = ({ onReadCode }) => {
  const controlsRef = useRef<IScannerControls | null>(null); // スキャナーのコントロールを格納するためのリファレンス
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) { // ビデオがない場合の退避
      return;
    }

    const codeReader = new BrowserMultiFormatReader(); // ZXingのリーダーを作成

    // オプションを設定
    codeReader.decodeFromVideoDevice(
      undefined,
      videoRef.current,
      (result, error, controls) => { // コールバック関数
        if (error) { // エラーが発生した場合、処理を終了
          return;
        }
        if (result) { // QRコードが正常に読み取られた場合
          onReadCode(result); // 読み取った結果をコールバック関数に渡す
        }
        controlsRef.current = controls; // スキャナーのコントロールを更新
      }
    );

    return () => { // コンポーネントがアンマウントされるときのクリーンアップ関数
      if (!controlsRef.current) { // スキャナーのコントロールが存在しない場合、処理を終了
        return;
      }
      controlsRef.current.stop(); // スキャナーを停止
      controlsRef.current = null; // スキャナーのコントロールをnullに設定
    };
  }, [onReadCode]); // onReadCodeが変更されるたびにこのeffectが実行される

  return <video // ビデオ要素を描画
    style={{ maxWidth: "100%", maxHeight: "100%", height: "100%" }} // スタイルを設定
    ref={videoRef} // ビデオ要素のリファレンスを設定
  />;
};

export default Reader; // CodeReaderコンポーネントをエクスポート
