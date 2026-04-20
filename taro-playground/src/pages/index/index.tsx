import { Button, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { ArrowBigDownDash, ArrowBigLeft, CookingPot, Square, User } from 'lucide-taro-base64';
import './index.less';

export default function Index() {
  return (
    <View className="index">
      <div className="text-[#acc855] text-[100px]">Hello world!</div>
      <button
        onClick={() => {
          Taro.navigateTo({ url: '/pages/test/index' });
        }}
      >
        test
      </button>
      <Button
        onClick={() => {
          Taro.navigateTo({ url: '/pages/user/index' });
        }}
      >
        user
      </Button>
      <div className="flex w-full flex-col items-center">
        <User
          color="blue"
          className="size-10 block"
        />
        <CookingPot
          color="red"
          className="size-52 block"
          strokeWidth={3}
        />
        <ArrowBigLeft
          color="#c8559e"
          className="size-32 block"
          fill="#ef4444"
        />
        <div className="flex w-2/3 items-center justify-center gap-2 rounded-full border-2 border-red-500 bg-transparent p-4 transition-all hover:bg-red-500/5 active:scale-95">
          <Square
            style={{ width: 32, height: 32 }}
            color="#ef4444"
            fill="#ef4444"
          />
          <div className="text-base font-medium text-red-500">停止</div>
        </div>
      </div>
    </View>
  );
}
