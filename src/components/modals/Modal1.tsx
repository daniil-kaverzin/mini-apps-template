import { FC } from 'react';
import {
  Div,
  ModalPage,
  ModalPageHeader,
  ModalPageProps,
} from '@vkontakte/vkui';
import { useParams } from '@happysanta/router';

export const Modal1: FC<ModalPageProps> = (props) => {
  const { id } = useParams();

  return (
    <ModalPage
      {...props}
      header={<ModalPageHeader>Значение id: {id}</ModalPageHeader>}
    >
      <Div>Какой-то текст</Div>
    </ModalPage>
  );
};
