// 정현수 바부

import React from 'react'
import Authentication from '../../util/Authentication/Authentication'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import AppLayout from "./components/Layout";
import io from 'socket.io-client'

const API_URL = 'https://8081.test.pikodev.me'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.Authentication = new Authentication()

        //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
        this.twitch = window.Twitch ? window.Twitch.ext : null
        this.state = {
            finishedLoading: false,
            theme: 'light',
            isVisible: true
        }
    }

    contextUpdate(context, delta) {
        if (delta.includes('theme')) {
            this.setState(() => {
                return {theme: context.theme}
            })
        }
    }

    visibilityChanged(isVisible) {
        this.setState(() => {
            return {
                isVisible
            }
        })
    }

    componentDidMount() {
        if (this.twitch) {
            this.twitch.onAuthorized((auth) => {
                this.Authentication.setToken(auth.token, auth.userId)
                if (!this.state.finishedLoading) {
                    console.log(auth.token)
                    this.socket = io.connect(API_URL, {
                        query: {
                            auth: auth.token
                        },
                    })
                    this.setState(() => {
                        return {finishedLoading: true}
                    })
                }
            })

            this.twitch.listen('broadcast', (target, contentType, body) => {
                this.twitch.rig.log(`New PubSub message!\n${target}\n${contentType}\n${body}`)
            })

            this.twitch.onVisibilityChanged((isVisible, _c) => {
                this.visibilityChanged(isVisible)
            })

            this.twitch.onContext((context, delta) => {
                this.contextUpdate(context, delta)
            })
        }
    }

    componentWillUnmount() {
        if (this.twitch) {
            this.twitch.unlisten('broadcast', () => console.log('successfully unlistened'))
        }
    }

    render() {
        if (this.state.finishedLoading && this.state.isVisible) {
            return (
                <div className="App">
                    <div className={this.state.theme === 'light' ? 'App-light' : 'App-dark'}>
                        <AppLayout>
                            <div className="mt-4">
                                <h2 className="text-center">현재 맵: ㅁㄴㅇㄻㄴㅇㄹ</h2>
                            </div>
                            {/*<p>Hello world!</p>*/}
                            {/*<p>My token is: {this.Authentication.state.token}</p>*/}
                            {/*<p>My opaque ID is {this.Authentication.getOpaqueId()}.</p>*/}
                            {/*<div>{this.Authentication.isModerator() ?*/}
                            {/*    <p>I am currently a mod, and here's a special mod button <input value='mod button'*/}
                            {/*                                                                    type='button'/>*/}
                            {/*    </p> : 'I am currently not a mod.'}</div>*/}
                            {/*<p>I*/}
                            {/*    have {this.Authentication.hasSharedId() ? `shared my ID, and my user_id is ${this.Authentication.getUserId()}` : 'not shared my ID'}.</p>*/}
                        </AppLayout>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="App">
                </div>
            )
        }

    }
}