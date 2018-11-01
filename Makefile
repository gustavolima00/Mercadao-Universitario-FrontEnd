default:
	cd FrontEnd && yarn
	cd FrontEnd && react-native run-android
rename:
	rm -rf FrontEnd/ios
	rm -rf FrontEnd/android
	cd FrontEnd && react-native eject
	cd FrontEnd && react-native link 