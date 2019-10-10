import App, {Container} from 'next/app';
import Page from '../components/Page';

class MyApp extends App {
    render() {
        const {Component} = this.props;

        return (
            <div className="antialiased bg-red-200">
                <Page>
                    <Component />
                </Page>
            </div>
        );
    }
}

export default MyApp;