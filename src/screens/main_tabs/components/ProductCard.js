import React, { Component } from 'react';
import { Image } from 'react-native';
import { 
    Container, 
    Header, 
    Content, 
    Card, 
    CardItem, 
    Thumbnail, 
    Text, 
    Button, 
    Icon, 
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
                      <Thumbnail source={{uri: this.props.vendorPhoto}} />
                      <Body>
                        <Text>{this.props.productName}</Text>
                        <Text note>{this.props.vendorName}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <Image source={{uri: this.props.productPhoto}} style={{height: 200, width: null, flex: 1}}/>
                  </CardItem>
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