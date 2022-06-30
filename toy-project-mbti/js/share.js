const url = 'http://127.0.0.1:5500/';

const setShare = () => {

  const resultImg = document.querySelector('#resultImg');
  const resultAlt = resultImg.firstElementChild.alt;

  const shareTitle = '십이간지 연애유형 결과';
  const shareDesc = infoList[resultAlt].name;
  const shareImage = `${url}/img/image-${resultAlt}.png`;
  const shareUrl = `${url}/pages/result-resultAlt.html`;

  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: shareTitle,
      description: shareDesc,
      imageUrl: shareImage,
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl,
      },
    },
    buttons: [
      {
        title: '결과확인하기',
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
    ],
  });
};



// itemContent: {
//   profileText: 'Kakao',
//   profileImageUrl:
//     'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
//   titleImageUrl:
//     'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
//   titleImageText: 'Cheese cake',
//   titleImageCategory: 'Cake',
//   items: [
//     {
//       item: 'Cake1',
//       itemOp: '1000원',
//     },
//     {
//       item: 'Cake2',
//       itemOp: '2000원',
//     },
//     {
//       item: 'Cake3',
//       itemOp: '3000원',
//     },
//     {
//       item: 'Cake4',
//       itemOp: '4000원',
//     },
//     {
//       item: 'Cake5',
//       itemOp: '5000원',
//     },
//   ],
//   sum: '총 결제금액',
//   sumOp: '15000원',
// },