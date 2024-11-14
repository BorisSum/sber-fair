export interface IMarketDomain {
    id: number;
    image: string;
    title: string;
    price: string;
    owner: string;
    user: string;
}

export interface IMarketMainDomain {
    hasNext: boolean | null;
    marketItems: IMarketDomain[] | null;
}

export type TCardType = 'one' | 'two';

export type TInputType = 'text' | 'email';

export interface IUserInfo {
    fullName: string;
    email: string;
}