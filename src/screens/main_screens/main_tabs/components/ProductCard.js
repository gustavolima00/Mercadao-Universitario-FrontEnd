import React, { Component } from 'react';
import { Image , TouchableHighlight} from 'react-native';
import { 
    Content, 
    Card, 
    CardItem, 
    Thumbnail, 
    Text, 
    Left, 
    Body, 
    Right 
} from 'native-base';

class ProductCard extends Component {
    render() {
        return (
              <Content>
                <Card>
                  <CardItem>
                    <Left>
                      <TouchableHighlight onPress={this.props.onPressVendorPhoto} underlayColor="white">
                        <Thumbnail source={{uri: this.props.vendorPhoto}} />
                      </TouchableHighlight>
                      <Body>
                        <Text>{this.props.productName}</Text>
                        <Text note>{this.props.vendorName}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <TouchableHighlight onPress={this.props.onPressCard} underlayColor="white">
                    <CardItem cardBody>
                      <Image source={{uri: this.props.productPhoto}} style={{height: 200, width: null, flex: 1}}/>
                    </CardItem>
                  </TouchableHighlight>
                  <CardItem>
                    <Left>
                    </Left>
                    <Right>
                      <Text>Preço: R$ {parseFloat(this.props.productPrice).toFixed(2)}</Text>
                    </Right>
                  </CardItem>
                </Card>
              </Content>
          );
    }

}
export default ProductCard;