module.exports = (RED) => {
    function LowerCaseNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        node.on('input', (msg) => {
            msg.payload = msg.payload.toLowerCase();
            node.send(msg);
        });
    }
    RED.nodes.registerType('lower-case', LowerCaseNode);
}
