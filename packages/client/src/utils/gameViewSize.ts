interface GetGameViewSizeType {
  gameFrameWidth: number;
  gameFrameHeight: number;
}

export const getGameViewSize = (windowWidth: number, windowHeight: number, isChatActive: boolean, isMenuActive: boolean): GetGameViewSizeType => {
  const headerSize: number = 80;
  const toolbarSize: number = 62;
  const menuSize: number = 80;
  const menuActiveSize: number = 160; // menuSize + 160
  const chatSize: number = 400;
  const smallMargin: number = 7;
  const bigMargin: number = 40;

  let width = windowWidth - menuSize - smallMargin * 2;
  let height = windowHeight - headerSize - toolbarSize - smallMargin * 2;

  if (isChatActive) {
    width -= chatSize + bigMargin * 2 - smallMargin * 2;
    height -= bigMargin * 2 - smallMargin * 2;
  }
  if (isMenuActive) width -= menuActiveSize;
  
  if (height < width * 0.5625) { width = height * (100 / 56.25); } else { height = width * 0.5625; }

  return {
    gameFrameWidth: width,
    gameFrameHeight: height,
  };
};
