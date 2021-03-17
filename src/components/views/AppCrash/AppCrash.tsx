import { FC, memo } from 'react';
import { Button, Panel, Text, View } from '@vkontakte/vkui';

import './AppCrash.scss';
import emojiSadImage from '@/assets/emoji-sad.png';

interface AppCrashProps {
  onRestartClick(): void;
  error: string;
}

export const AppCrash: FC<AppCrashProps> = memo((props) => {
  const { onRestartClick, error } = props;

  return (
    <View className="AppCrash" activePanel="panel">
      <Panel id="panel" centered>
        <img src={emojiSadImage} alt="Грустный эмодзи" width={84} height={84} />
        <Text weight="regular">{error}</Text>
        <Button onClick={onRestartClick}>Перезапустить</Button>
      </Panel>
    </View>
  );
});
