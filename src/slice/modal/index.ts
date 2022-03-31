import { ModalType } from "../../enum/ModalType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem } from "../../model";

export interface ModalState {
  isOpened: boolean;
  modalType?: ModalType;
  selectedItem?: IItem;
}

const initialState: ModalState = {
  isOpened: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalType>) => {
      state.isOpened = true;
      state.modalType = action.payload;
      state.selectedItem = undefined;
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.modalType = undefined;
      state.selectedItem = undefined;
    },
    openModalWith: (state, action: PayloadAction<ModalState>) => {
      state.isOpened = true;
      state.modalType = action.payload.modalType;
      state.selectedItem = action.payload.selectedItem;
    },
  },
});

export const { openModal, closeModal, openModalWith } = modalSlice.actions;

export default modalSlice.reducer;
