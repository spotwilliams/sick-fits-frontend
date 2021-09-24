import Document, { Html, Head, Main, NextScript } from 'next/document';
import Header from '../components/Header';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
