import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.REWARDED :'ca-app-pub-1511669721718109/1361354603'


function RewardedAds() {
  const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });

   rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
   
      rewarded.show();
    });
   rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
    );
    // setLoader(true)
    rewarded.load();

}
export default RewardedAds

