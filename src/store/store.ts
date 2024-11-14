import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMarketDomain, IMarketMainDomain} from "../models/models";
import {AppDispatch} from "./index";
import {httpClient} from "../api/axios";

interface IAppState {
    loading: boolean;
    error: string;
    gifts: IMarketDomain[];
    currentGift: IMarketDomain | null;
    hasNext: boolean;
    currentPage: number;
    giftTaken: boolean;
}

const initialState: IAppState = {
    loading: false,
    error: '',
    gifts: [],
    currentGift: null,
    hasNext: false,
    currentPage: 0,
    giftTaken: false
}

const appState = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        fetchingGifts(state) {
            state.loading = true;
            state.gifts = [];
            state.currentGift = null;
            state.error = '';
        },

        fetchGiftsSuccess(state, action: PayloadAction<IMarketMainDomain>) {
            state.loading = false;
            state.currentGift = null;
            state.gifts = action.payload.marketItems || [];
            state.hasNext = action.payload.hasNext || false;
        },

        fetchGiftsError(state, action: PayloadAction<string>) {
            state.loading = false;
            state.currentGift = null;
            state.gifts = [];
            state.hasNext = false;
            state.error = action.payload;
        },

        startTakingGift(state) {
            state.loading = true;
            state.error = '';
        },

        takeGiftSuccess(state) {
            state.loading = false;
            state.error = '';
            state.currentPage = 0;
            state.giftTaken = true;
            state.currentGift = null;
        },

        takeGiftError(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        setCurrentGift(state, action: PayloadAction<number | null>) {
            const gift = state.gifts.find(g => g.id === action.payload);
            if (gift) state.currentGift = gift;
            else state.currentGift = null;
        },

        setGiftTakenOff(state) {
            state.giftTaken = false;
        }
    }
})

export const {
    fetchingGifts,
    fetchGiftsSuccess,
    fetchGiftsError,
    setCurrentGift,
    startTakingGift,
    takeGiftError,
    takeGiftSuccess,
    setGiftTakenOff
} = appState.actions;

export default appState.reducer;

export const fetchGifts = (page: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchingGifts());
        const response = await httpClient.get<IMarketMainDomain>(
            '/market',
            {
                params: { page },
                headers: {
                    'Content-type': 'application/json;charset=UTF-8;'
                }
            }
        );
        dispatch(fetchGiftsSuccess(response.data));
    } catch (e) {
        dispatch(fetchGiftsError('Ошибка загрузки подарков'))
    }
}

export const takeGift = (gift: IMarketDomain) => async (dispatch: AppDispatch) => {
    try {
        dispatch(startTakingGift());
        await httpClient.post(
            '/market',
            gift,
            {
                headers: {
                    'Content-type': 'application/json;charset=UTF-8;',
                    'WWW-Authenticate': 'e48c8817-eadb-4196-9179-19b4dbc5e425'
                }
            }
        )
        dispatch(takeGiftSuccess());
        const response = await httpClient.get<IMarketMainDomain>(
            '/market',
            {
                params: { page: 0 },
                headers: {
                    'Content-type': 'application/json;charset=UTF-8;'
                }
            }
        );
        dispatch(fetchGiftsSuccess(response.data));
    } catch (e) {
        dispatch(takeGiftError('Ошибка при получении подарка'))
    }
}