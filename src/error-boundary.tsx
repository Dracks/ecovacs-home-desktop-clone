import { ErrorInfo } from "react";
import { Text } from '@nodegui/react-nodegui';
import React from 'react';

interface ErrorState {
    error?: Error, 
    errorInfo?: ErrorInfo
}

class ErrorBoundary extends React.Component<{},ErrorState> {
    componentDidCatch(error: Error, errorInfo: ErrorInfo){
        this.setState({error, errorInfo})
        console.log(error, errorInfo)
    }

    render(){
        if (!this.state?.error){
            return this.props.children
        }
        return <Text> Error: {this.state.error.name} </Text>
    }
}

export default ErrorBoundary