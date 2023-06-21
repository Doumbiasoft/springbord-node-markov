const { MarkovMachine } = require("./markov");

test('generate markov test', () => { 

    const text="the cat in the hat";
    let machine = new MarkovMachine(text);
    let val = machine.makeText();
    expect(text).toContain(val)

 });