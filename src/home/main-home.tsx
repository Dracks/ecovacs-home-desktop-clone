import { View } from '@nodegui/react-nodegui';
import React from 'react';

const ProtectedContent: React.FC = ()=>{
    return <View style={viewStyle} />
}

const viewStyle = `
  width:50px;
  height:30px; 
  background-color: yellow;
`;

export default ProtectedContent;