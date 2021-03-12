import React, { FC } from 'react';
import {
  ActionSheet,
  ActionSheetItem,
  ActionSheetProps,
} from '@vkontakte/vkui';

export const ActionSheet1: FC<
  Omit<ActionSheetProps, 'toggleRef' | 'iosCloseItem'>
> = (props) => {
  return (
    <ActionSheet
      {...props}
      iosCloseItem={
        <ActionSheetItem autoclose mode="cancel">
          Отменить
        </ActionSheetItem>
      }
    >
      <ActionSheetItem autoclose>Тестовая кнопка</ActionSheetItem>
    </ActionSheet>
  );
};
