require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-appmetrica-next"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = { "Yandex LLC" => "appmetrica@yandex-team.com" }
  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/yandexmobile/react-native-appmetrica-next.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,swift}"
  s.requires_arc = true
  s.static_framework = true

  s.dependency "React-Core"
  s.dependency 'YandexMobileMetrica', '4.0.0'
  # s.dependency 'YandexMobileMetricaPush', '1.1.1'
  # s.dependency 'Firebase/Messaging'
end
