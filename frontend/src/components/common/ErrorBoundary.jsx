import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <div className="p-8 text-center text-[#EF4444] text-xs">⚠️ Something went wrong rendering this component.</div>;
    }
    return this.props.children;
  }
}
