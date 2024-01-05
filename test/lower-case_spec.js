const helper = require("node-red-node-test-helper");
const lowerNode = require("../lower-case.js");

describe('lower-case Node', () => {

    afterEach(() => {
        helper.unload();
    });

    it('should be loaded', (done) => {
        const flow = [{ id: "n1", type: "lower-case", name: "test name" }];
        helper.load(lowerNode, flow, () => {
            const n1 = helper.getNode("n1");
            n1.should.have.property('name', 'test name');
            done();
        });
    });

    it('should make payload lower case', (done) => {
        const flow = [{ id: "n1", type: "lower-case", name: "test name", wires: [["n2"]] },
        { id: "n2", type: "helper" }];
        helper.load(lowerNode, flow, () => {
            const n2 = helper.getNode("n2");
            const n1 = helper.getNode("n1");
            n2.on("input", (msg) => {
                msg.should.have.property('payload', 'uppercase');
                done();
            });
            n1.receive({ payload: "UpperCase" });
        });
    });
});
