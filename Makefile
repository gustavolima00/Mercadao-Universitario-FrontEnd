default:
	yarn
	react-native run-android

run:
	react-native run-android

rename:
	rm -rf ios
	rm -rf android
	react-native eject
	react-native link
	
	cp icon_backup/AndroidManifest.xml android/app/src/main

	cp icon_backup/res/mipmap-mdpi/ic_launcher.png android/app/src/main/res/mipmap-mdpi
	cp icon_backup/res/mipmap-mdpi/ic_launcher_round.png android/app/src/main/res/mipmap-mdpi

	cp icon_backup/res/mipmap-hdpi/ic_launcher.png android/app/src/main/res/mipmap-hdpi
	cp icon_backup/res/mipmap-hdpi/ic_launcher_round.png android/app/src/main/res/mipmap-hdpi

	cp icon_backup/res/mipmap-xhdpi/ic_launcher.png android/app/src/main/res/mipmap-xhdpi
	cp icon_backup/res/mipmap-xhdpi/ic_launcher_round.png android/app/src/main/res/mipmap-xhdpi

	cp icon_backup/res/mipmap-xxhdpi/ic_launcher.png android/app/src/main/res/mipmap-xxhdpi
	cp icon_backup/res/mipmap-xxhdpi/ic_launcher_round.png android/app/src/main/res/mipmap-xxhdpi

	cp icon_backup/res/mipmap-xxxhdpi/ic_launcher.png android/app/src/main/res/mipmap-xxxhdpi
	cp icon_backup/res/mipmap-xxxhdpi/ic_launcher_round.png android/app/src/main/res/mipmap-xxxhdpi