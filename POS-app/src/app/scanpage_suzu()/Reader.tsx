import { FC, useRef, useEffect } from "react"; // ReactからFC、useRef、useEffectをインポート
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser"; // ZXingからBrowserMultiFormatReaderとIScannerControlsをインポート
import { Result, BarcodeFormat } from '@zxing/library'; // ZXingからResultをインポート

// MultiFormatReaderを定義
const Reader: FC<{ onReadCode: (text: Result) => void,navigateWithCode: (code: string) => void }> = ({ onReadCode, navigateWithCode }) => {
  const controlsRef = useRef<IScannerControls | null>(null); 
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
      (result, error, controls) => { 
        if (error) { // エラーが発生した場合、処理を終了
          return;
        }
        if (result) { 
          onReadCode(result);
          navigateWithCode(result.getText()); 
        }
        controlsRef.current = controls; 
      }
    );

    return () => { 
      if (!controlsRef.current) { 
        return;
      }
      controlsRef.current.stop(); 
      controlsRef.current = null; 
    };
  }, [onReadCode]); 

  return <video 
    style={{ maxWidth: "100%", maxHeight: "100%", height: "100%" }} 
    ref={videoRef} 
  />;
};

export default Reader; 
