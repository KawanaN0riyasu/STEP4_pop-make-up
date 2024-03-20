export type IDtype = {
    PRD_ID: string;
  };

export type Producttype = {
    PRD_ID: number;
    PRD_CODE: string;
    FROM_DATE: string;
    TO_DATE: string;
    NAME: string;
    PRICE: number;
  };

  export type TransactionStatementData = {
    TRD_ID: number;
    DTL_ID: number;
    PRD_ID: number;
    PRD_NAME: string;
    PRD_PRICE: number;
    TAC_CD: string;
  };

  export type Stock = {
    ID: number;
    PRD_CODE: string;
    PRD_NAME: string;
    PRD_IMAGE: string;
    DESCRIPTION: string;
    PRICE?: number; // オプショナルなプロパティ
    CAL?: number; // オプショナルなプロパティ
    SALINITY?: number; 
    ALLERGY_ID?: number;
    PRD_ID: string;
    STORE_ID: string;
    DATE_ID: string;
    LOT?: string;
    BEST_BY_DAY?: string; // オプショナルなプロパティ
    PIECES?: number; // オプショナルなプロパティ
  };