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
      console.log('I have a connection to:');
      console.log(connection);
      this.addConnection(connection);
      console.log('connections:');
      console.log(this.connections);
      this.send();
    });
  }

  public connect(id: string) {
    console.log('peer connecting to: ' + id);
    this.addConnection(this.peer.connect(id));
    console.log('connections:');
    console.log(this.connections);
  }

  public getID() {
    return this.peer.id;
  }

  public send() {
    console.log('trying to send message...');
    this.connections.forEach((connection) => {
      connection.send('hello this is message I am sending!!');
    });
    setTimeout(() => {
      this.send();
    }, 3000);
  }

  private addConnection(connection: any) {
    connection.on('data', (data) => {
      console.log('message recieved');
      console.log(data);
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
