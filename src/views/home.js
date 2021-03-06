import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Product from '../components/product';
import {useState} from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import GlobalStyles from './GlobalStyles';
import Carousel from 'react-native-snap-carousel';

import {Rating, AirbnbRating} from 'react-native-ratings';

import {Shadow} from 'react-native-neomorph-shadows';

import {Layout, Text} from '@ui-kitten/components';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ProductView from './productView';
import SearchResultView from './searchResultView';

import DismissKeyboardView from '../components/DismissKeyboard';

const SaleProducts = require('../db/onSaleProducts.json');

const HomeStack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{width: 48, height: 48}}
      source={require('../img/logo.png')}
    />
  );
}

function MainPage({navigation}) {
  const [text, setText] = useState('');
  const [selectedId, setSelectedId] = React.useState(null);
  const [touchControl, setTouchControl] = React.useState({
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRadius: 40,
  });

  const bannerImages = [require('../img/Banner1.png'), require('../img/Banner2.png')];

  const saleProductsData = [];
  let count = 0;

  for (let index = 0; index < SaleProducts.products.length; index++) {
    saleProductsData.push(SaleProducts.products[index]);
    count++;
  }

  const renderItem = ({item}) => {
    return (
      <SaleItem
        item={item}
        onPress={() => navigation.navigate('ProductView', {item})}
      />
    );
  };

  const SaleItem = ({item, onPress}) => {
    //backgroundColor:'rgba(120,120,120,0.08)

    return (
      <View style={{paddingTop: 3}}>
        <Shadow
          style={{
            paddingTop: responsiveHeight(2.5),
            shadowOffset: {width: 7, height: 7},
            shadowOpacity: 1,
            shadowColor: 'grey',
            shadowRadius: 10,
            borderRadius: 10,
            backgroundColor: 'white',
            borderColor: '#E7E5E4',
            borderWidth: 0.5,
            height: 320,
            width: responsiveWidth(45),
            alignSelf: 'center',
            marginLeft: responsiveWidth(3),
            marginRight: responsiveWidth(3),
          }}>
          <TouchableOpacity onPress={onPress} style={{alignItems: 'center'}}>
            <Image
              source={{uri: item.img_url[0]}}
              style={{width: 120, height: 150}}
              PlaceholderContent={<ActivityIndicator />}
            />
            <View style={{padding: 0, alignItems: 'center'}}>
              <AirbnbRating
                count={5}
                reviewSize={0.1}
                defaultRating={item.itemRating}
                size={12}
                isDisabled={true}
                //selectedColor={'#9a4b8d'}
              />
              <View style={{padding: 8, alignItems: 'center'}}>
                <Text
                  numberOfLines={2}
                  category="p1"
                  style={{
                    fontSize: 13,
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}>
                  {item.name}
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    position: 'absolute',
                    marginTop: 50,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'green',
                      borderRadius: 4,
                      padding: 3,
                      marginTop: 3,
                    }}>
                    <Text
                      category="s1"
                      style={{
                        fontSize: 15,
                        color: 'white',
                        fontWeight: 'bold',
                      }}>
                      {item.salePrice.toFixed(2) + '₺'}
                    </Text>
                  </View>
                  <Text
                    category="s1"
                    style={{
                      fontSize: 13,
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid',
                    }}>
                    {item.price.toFixed(2) + '₺'}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Shadow>
      </View>
    );
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={GlobalStyles.scrollViewContainer}>
        <View style={styles.LogoContainer}>
          <LogoTitle />
        </View>
        <View style={styles.searchbar}>
          <DismissKeyboardView>
            <SearchBar
              inputContainerStyle={{
                backgroundColor: 'white',
                borderColor: 'grey',
                borderWidth: 0.8,
                borderBottomWidth: 0.8,
                borderRadius: 40,
                width: responsiveWidth(85),
                height: 45,
              }}
              inputStyle={{
                fontSize: 16,
                color: 'black',
              }}
              containerStyle={touchControl}
              returnKeyType="search"
              onSubmitEditing={() => {
                console.log(text.toLowerCase());
                navigation.navigate('SearchResultView', text.toLowerCase());
              }}
              searchIcon={{
                containerStyle: {marginLeft: 8},
                size: 20,
              }}
              rightIconContainerStyle={{marginRight: 10}}
              placeholder="Aradığınız ürün burada"
              placeholderTextColor="#afafaf"
              onChangeText={(text) => setText(text)}
              onFocus={() =>
                setTouchControl({
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  borderBottomWidth: 0,
                  borderTopWidth: 0,
                  shadowColor: '#6B7280',
                  borderRadius: 40,
                  shadowOpacity: 0.6,
                  shadowRadius: 3.62,
                  elevation: 5,
                })
              }
              onBlur={() =>
                setTouchControl({
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  borderBottomWidth: 0,
                  borderTopWidth: 0,
                  borderRadius: 40,
                })
              }
              clear
              value={text}
            />
          </DismissKeyboardView>
        </View>
        <View style={styles.SliderBoxContainer}>
          <SliderBox
            images={bannerImages}
            sliderBoxHeight={300}
            parentWidth={responsiveWidth(90)}
            style={styles.SliderBox}
            onCurrentImagePressed={index => {
                if(index === 1){
                    navigation.navigate("ProductView", {item :{
                            "id": 7,
                            "name": "Philips SpeedPro Kablosuz Şarjlı Dikey Süpürge",
                            "brand": "Philips",
                            "price": 2399.0,
                            "salePrice": 2199.0,
                            "amount": 0,
                            "itemRating": 5,
                            "img_url": [
                                "https://raw.githubusercontent.com/donmezyusuf/GraduationProject/main/src/img/philips_speedpro_1.png",
                                "https://raw.githubusercontent.com/donmezyusuf/GraduationProject/main/src/img/philips_speedpro_2.png",
                                "https://raw.githubusercontent.com/donmezyusuf/GraduationProject/main/src/img/philips_speedpro_3.png"
                            ],
                            "keywords": ["philips", "süpürge", "dikeysüpürge", "dikey süpürge"],
                            "productInfo": "Yeni SpeedPro kablosuz elektrikli süpürge, etkili erişim özelliğiyle temizlik işini hızlıca halletmenizi sağlar.\n\n180 derecelik emiş başlığı duvar, mobilya kenarları ve köşeler gibi en zorlu noktalardaki tozları bile hassas şekilde çeker.",
                            "comments": [
                                {
                                    "rating": 5,
                                    "comment": "Gerçekten çok kaliteli bir ürün. Kablosuz olması sayesinde kablo derdi olmadan rahatlıkla evin her yerini temizleyebilirsiniz."
                                },
                                {
                                    "rating": 4,
                                    "comment": "Kaliteli bir ürün süpürmesi başarılı fakat şarjı daha uzun olabilirdi."
                                }
                            ]
                        }})
                }
                if(index === 0){
                    navigation.navigate("ProductView", {item :{
                            "id": 4,
                            "name": "IPhone XR 64GB Kırmızı",
                            "brand": "Apple",
                            "price": 6999.0,
                            "amount": 0,
                            "salePrice": 6499.0,
                            "itemRating": 5,
                            "img_url": [
                                "https://raw.githubusercontent.com/donmezyusuf/GraduationProject/main/src/img/iphone-xr-red.png",
                                "https://raw.githubusercontent.com/donmezyusuf/GraduationProject/main/src/img/iphone-xr-red-2.jpg",
                                "https://raw.githubusercontent.com/donmezyusuf/GraduationProject/main/src/img/iphone-xr-red-3.jpg"
                            ],
                            "keywords": [
                                "Iphone",
                                "İphone",
                                "iphone",
                                "IPHONE",
                                "İPHONE",
                                "IPhone",
                                "IPHone",
                                "IPHOne",
                                "IPHONe",
                                "İPhone",
                                "İPHone",
                                "İPHOne",
                                "İPHONe",
                                "Iphone XR",
                                "İphone XR",
                                "iphone XR",
                                "IPHONE XR",
                                "İPHONE XR",
                                "IPhone XR",
                                "IPHone XR",
                                "IPHOne XR",
                                "IPHONe XR",
                                "İPhone XR",
                                "İPHone XR",
                                "İPHOne XR",
                                "İPHONe XR",
                                "IphoneXR",
                                "İphoneXR",
                                "iphoneXR",
                                "IPHONEXR",
                                "İPHONEXR",
                                "IPhoneXR",
                                "IPHoneXR",
                                "IPHOneXR",
                                "IPHONeXR",
                                "İPhoneXR",
                                "İPHoneXR",
                                "İPHOneXR",
                                "İPHONeXR",
                                "i̇phone",
                                "Elektronik"
                            ],
                            "productInfo": "Üstün akıllı. Olağanüstü alımlı. Sektördeki en gelişmiş LCD ekran yepyeni Liquid Retina.\n\nDaha da hızlı Face ID.\n\nBir akıllı telefondaki en akıllı, en güçlü çip.\n\nVe çığır açan bir kamera sistemi.\niPhone XR. Her açıdan göz kamaştırıcı.",
                            "comments": [
                                {
                                    "rating": 5,
                                    "comment": "Gerçekten çok kaliteli bir ürün."
                                },
                                {
                                    "rating": 4,
                                    "comment": "Fazla söze gerek yok, IPhone!."
                                }
                            ]
                        }})
                }
            }}
          />
        </View>
        <Layout style={styles.SaleContainer}>
          <Text
            category="h1"
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 3,
            }}>
            Fırsat Ürünleri
          </Text>
          <FlatList
            data={saleProductsData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            extraData={selectedId}
            contentContainerStyle={styles.list}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{height:360}}
          />
        </Layout>
          <Layout style={{justifyContent:'center', alignItems:'center', marginTop:20}}>
              <Image
                  style={{width: 373, height: 90}}
                  source={require('../img/Reklam.png')}
              />
          </Layout>
      </ScrollView>
    </SafeAreaView>
  );
}

function HomeView() {
  return (
    <HomeStack.Navigator
      initialRouteName="MainPage"
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="MainPage" component={MainPage} />
      <HomeStack.Screen name="SearchResultView" component={SearchResultView} />
      <HomeStack.Screen name="ProductView" component={ProductView} />
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    width: responsiveWidth(100),
  },
  searchbar: {
    width: responsiveWidth(100),
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LogoContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(5),
    marginBottom: 25,
      marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SliderBoxContainer: {
    width: responsiveWidth(100),
    height: 300,
    marginTop: 15,
    alignItems: 'center',
  },
  SliderBox: {
    width: responsiveWidth(90),
    height: 300,
    borderRadius: 12,
  },
  SaleContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 28,
    width: responsiveWidth(90),
    /*
    borderRadius: 6,
    borderWidth:0.8,
    borderColor:"grey"
     */
  },
  SaleProductContainer: {
    paddingTop: responsiveHeight(2.5),
    height: responsiveHeight(37),
    width: responsiveWidth(45),
    borderWidth: 0.6,
    borderRadius: 8,
    borderColor: 'grey',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginLeft: responsiveWidth(5),
  },
  list: {
    marginTop: 10,
    marginRight: responsiveWidth(3.4),
  },
});

export default HomeView;
