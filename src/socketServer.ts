const SocketServer = (s:any) => {
  s.on('chat_message', (msg:string) => {
    console.log('message: ' + msg);
    s.emit('chat_message', msg);

  });
  s.on('disconnect', () => {
    console.log('user disconnected');
  });

}

export default SocketServer;