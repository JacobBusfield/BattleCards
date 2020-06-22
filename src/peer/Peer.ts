import Peerjs from './peerjs.min.js';
import store from '@/store/index';

export default class Peer {
  private peer: Peerjs;
  private connections: any[] = Array<any>();

  constructor() {
    // NOTE: Uses a local peerjs server for local development.
    if (process.env.NODE_ENV === 'production') {
      this.peer = new Peerjs();
    } else {
      this.peer = new Peerjs(this.guidGenerator(), {
        host: 'localhost',
        port: 9000,
        path: '/myapp',
      });
    }

    this.peer.on('open', (id) => {
      // Don't do anything.
    });

    this.peer.on('connection', (connection) => {
      this.addConnection(connection);
      this.send();
    });
  }

  public connect(id: string) {
    this.addConnection(this.peer.connect(id));
  }

  public getID() {
    return this.peer.id;
  }

  public send() {
    this.connections.forEach((connection) => {
      connection.send('hello this is message I am sending!!');
    });
    setTimeout(() => {
      this.send();
    }, 3000);
  }

  private addConnection(connection: any) {
    connection.on('data', (data) => {
      store.commit('message', data);
    });

    const index = this.connections.findIndex((o) => o.peer === connection.peer);
    if (index === -1) {
      this.connections.push(connection);
    } else {
      this.connections[index] = connection;
    }
  }

  private guidGenerator() {
    const S4 = () => {
      // tslint:disable-next-line:no-bitwise
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    );
  }
}
