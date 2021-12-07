const { withAppDelegate } = require("@expo/config-plugins");
const { insertLinesHelper } = require("./utils");

exports.withAppMetricaIOS = (config) => {
    return withAppDelegate(config, async (config) => {
        config.modResults.contents = insertLinesHelper(
            "#import <YandexMobileMetricaPush/YMPYandexMetricaPush.h>",
            "start",
            config.modResults.contents
        );

        config.modResults.contents = insertLinesHelper(
            `
  // Enable in-app push notifications handling in iOS 10
  if ([UNUserNotificationCenter class] != nil) {
    id<YMPUserNotificationCenterDelegate> delegate = [YMPYandexMetricaPush userNotificationCenterDelegate];
    delegate.nextDelegate = [UNUserNotificationCenter currentNotificationCenter].delegate;
    [UNUserNotificationCenter currentNotificationCenter].delegate = delegate;
  }

  [YMPYandexMetricaPush handleApplicationDidFinishLaunchingWithOptions:launchOptions];

`,
            "didFinishLaunchingWithOptions",
            config.modResults.contents,
            2
        );

        config.modResults.contents = insertLinesHelper(
            `

- (void)application:(UIApplication *)application
    didReceiveRemoteNotification:(NSDictionary *)userInfo
{
    [YMPYandexMetricaPush handleRemoteNotification:userInfo];
}
- (void)application:(UIApplication *)application
    didReceiveRemoteNotification:(NSDictionary *)userInfo
    fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
    [YMPYandexMetricaPush handleRemoteNotification:userInfo];
}

@end
     `,
            "@end",
            config.modResults.contents,
            0,
            1
        );

        return config;
    });
};
