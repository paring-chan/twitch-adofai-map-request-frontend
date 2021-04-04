// 정현수 바부

import React from 'react'
import Authentication from '../../util/Authentication/Authentication'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import AppLayout from "./components/Layout";
import io from 'socket.io-client'
import axios from "axios";
import Map from "./components/Map";
import {API_URL} from "./constants";

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.Authentication = new Authentication()

        //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
        this.twitch = window.Twitch ? window.Twitch.ext : null
        this.state = {
            finishedLoading: false,
            theme: 'light',
            isVisible: true,
            maps: [],
            current: null
        }
    }

    loadMaps() {
        return axios.get(`${API_URL}/requests`).then(res => {
            this.setState({maps: res.data})
        }).then(() => axios.get(`${API_URL}/current`)).then(res => {
            this.setState({current: res.data})
        })
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
                    axios.defaults.headers.Authorization = `Bearer ${auth.token}`
                    this.socket = io.connect(API_URL, {
                        query: {
                            auth: auth.token
                        },
                    })
                    this.socket.on('reload', () => {
                        this.loadMaps()
                    })
                    this.loadMaps().then(() => {
                        this.setState(() => {
                            return {finishedLoading: true}
                        })
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
            this.socket.disconnect()
        }
    }

    render() {
        if (this.state.finishedLoading && this.state.isVisible) {
            return (
                <div className="App">
                    <div className={this.state.theme === 'light' ? 'App-light' : 'App-dark'}>
                        <AppLayout>
                            <div className="container d-flex flex-column pb-5 flex-grow-1">
                                <div className="mt-4">
                                    <h2 className="text-center">현재 맵</h2>
                                    {this.state.current ?
                                        <Map mod={this.Authentication.isModerator()} map={this.state.current} dark={this.state.theme === 'dark'}/> :
                                        <h5 className="text-center">진행중인 맵이 없습니다.</h5>}
                                </div>
                                <div className="mt-4 flex-grow-1 d-flex flex-column">
                                    <h4>대기중인 추천맵 목록</h4>
                                    <div style={{
                                        overflowY: 'visible',
                                    }} className="flex-grow-1">
                                        <div className="d-flex flex-column" style={{
                                            gap: 10
                                        }}>
                                            {this.state.maps.map(map => <Map mod={this.Authentication.isModerator()} dark={this.state.theme === 'dark'}
                                                                             map={map} key={map._id}/>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
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