import React, {Component} from 'react';
import { Header, Button, Left, Icon, Body, Title, Right, View} from 'native-base';
import { COLORS } from '../Utilities/AppConstants';


export default class BackHeader extends Component {

    render() {
        return (
            <Header style={{backgroundColor: COLORS.APP_DEFAULT_COLOR}}>
            <Left style={{flex:null, justifyContent: 'center'}}>
            <Button transparent onPress={this.props.goBackFunction}>
              <Icon style={{color: 'white'}} name='arrow-back' />
            </Button>
            </Left>
            <Body style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>
            <Title style={{ color: 'white'}}>{this.props.title}</Title>
            </Body>
            <Right style={{flex:null, justifyContent: 'center'}}>
                {(this.props.rightComponent) ? this.props.rightComponent : <View style={{alignSelf: 'stretch', width: '8%'}}/>}
            </Right>
            </Header>
          );
    }
}